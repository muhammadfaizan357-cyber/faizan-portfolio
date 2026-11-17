import json
import math
import os
import struct
import subprocess
import wave
import imageio_ffmpeg
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from scipy.ndimage import gaussian_filter1d, map_coordinates

FFMPEG_EXE = imageio_ffmpeg.get_ffmpeg_exe()
AVATAR_PATH = "src/assets/avatar.png"
PORTRAIT_OUT_JPG = "src/assets/hero-portrait-pro.jpg"
AUDIO_MP3 = "public/faizan-intro.mp3"
WORDS_JSON = "public/faizan-words.json"
AUDIO_WAV_TEMP = "public/temp_audio_16k.wav"
OUTPUT_MP4 = "public/faizan-intro.mp4"

FPS = 24
W, H = 720, 900

# 1. Convert MP3 to 16kHz mono WAV for frame-accurate audio envelope
subprocess.run(
    [FFMPEG_EXE, "-y", "-i", AUDIO_MP3, "-ac", "1", "-ar", "16000", AUDIO_WAV_TEMP],
    check=True,
    stdout=subprocess.DEVNULL,
    stderr=subprocess.DEVNULL,
)

with wave.open(AUDIO_WAV_TEMP, "rb") as wf:
    n_samples = wf.getnframes()
    raw_bytes = wf.readframes(n_samples)
    duration = n_samples / 16000.0

samples = np.array(struct.unpack(f"<{n_samples}h", raw_bytes), dtype=np.float32)
total_frames = int(math.ceil(duration * FPS))
samples_per_frame = int(16000 / FPS)

# Compute instant RMS amplitude per frame
raw_amps = np.zeros(total_frames, dtype=np.float32)
for f in range(total_frames):
    s0 = f * samples_per_frame
    s1 = min(len(samples), s0 + samples_per_frame)
    chunk = samples[s0:s1]
    if len(chunk) > 0:
        rms = float(np.sqrt(np.mean(chunk * chunk)))
        raw_amps[f] = min(1.0, rms / 5200.0)

# 2. Load exact WordBoundary timings from edge-tts
with open(WORDS_JSON, "r", encoding="utf-8") as f:
    words_data = json.load(f)


def char_viseme(ch):
    c = ch.lower()
    if c in "mbp":
        # Bilabial closure: lips touch!
        return (0.0, 0.0, 0.0)
    if c in "fv":
        # Labiodental: slight opening
        return (0.22, 0.10, 0.0)
    if c in "szctdnlr":
        # Alveolar/dental consonant
        return (0.32, 0.22, 0.0)
    if c in "gkx":
        return (0.42, 0.15, 0.0)
    if c in "a":
        # Open vowel
        return (0.92, 0.30, 0.0)
    if c in "eiy":
        # Front wide vowel
        return (0.62, 0.70, 0.0)
    if c in "ouwq":
        # Rounded vowel / glide
        return (0.72, 0.0, 0.88)
    return (0.40, 0.15, 0.0)


# Build per-frame target viseme curves from word characters + audio envelope
open_curve = np.zeros(total_frames, dtype=np.float32)
width_curve = np.zeros(total_frames, dtype=np.float32)
round_curve = np.zeros(total_frames, dtype=np.float32)
brow_curve = np.zeros(total_frames, dtype=np.float32)
nod_curve = np.zeros(total_frames, dtype=np.float32)

EMPHASIS_WORDS = {
    "hi",
    "faizan",
    "full-stack",
    "php",
    "laravel",
    "mysql",
    "react",
    "apis",
    "shopify",
    "wordpress",
    "clean",
    "connect",
}

for w in words_data:
    text_clean = "".join(c for c in w["text"] if c.isalpha())
    if not text_clean:
        continue
    t0 = w["start"]
    dur = max(0.06, w["duration"])
    t1 = t0 + dur
    f0 = max(0, int(t0 * FPS))
    f1 = min(total_frames, int(math.ceil(t1 * FPS)))
    n_chars = len(text_clean)
    is_emph = w["text"].lower().strip(".,!") in EMPHASIS_WORDS

    for f in range(f0, f1):
        t_cur = f / float(FPS)
        rel = np.clip((t_cur - t0) / dur, 0.0, 0.999)
        idx = int(rel * n_chars)
        op, wi, ro = char_viseme(text_clean[idx])
        # Modulate vertical opening with real audio amplitude so syllable peaks match voice energy
        amp_mod = 0.35 + 0.65 * min(1.0, raw_amps[f] * 1.25)
        # Word envelope tapers slightly at start/end of word
        w_env = math.sin(rel * math.pi) ** 0.35
        open_curve[f] = op * amp_mod * w_env
        width_curve[f] = wi * w_env
        round_curve[f] = ro * w_env
        if is_emph:
            brow_curve[f] = 0.75 * math.sin(rel * math.pi)
            nod_curve[f] = 1.0 * math.sin(rel * math.pi)

# Smooth viseme curves with natural biomechanical inertia
open_curve = gaussian_filter1d(open_curve, sigma=0.75)
width_curve = gaussian_filter1d(width_curve, sigma=1.1)
round_curve = gaussian_filter1d(round_curve, sigma=1.1)
brow_curve = gaussian_filter1d(brow_curve, sigma=2.2)
nod_curve = gaussian_filter1d(nod_curve, sigma=2.5)

# Force complete mouth closure during silent pauses
for f in range(total_frames):
    if raw_amps[f] < 0.025:
        open_curve[f] *= 0.25

open_curve = gaussian_filter1d(open_curve, sigma=0.55)

# Natural eye blink schedule (timed at natural phrase pauses & mid-clauses)
BLINK_TIMES = [1.92, 5.72, 9.75, 14.15, 17.82, 21.12, 25.35]
blink_curve = np.zeros(total_frames, dtype=np.float32)
for bt in BLINK_TIMES:
    for f in range(total_frames):
        t = f / float(FPS)
        dt = abs(t - bt)
        if dt < 0.13:
            # Smooth fast close and reopen (260ms total blink)
            blink_curve[f] = max(
                blink_curve[f], 0.92 * (0.5 + 0.5 * math.cos(dt / 0.13 * math.pi))
            )

# 3. Prepare clean executive studio background (768x1024 to match avatar.png)
avatar_img = Image.open(AVATAR_PATH).convert("RGBA")
AV_W, AV_H = avatar_img.size  # 768 x 1024
avatar_arr = np.array(avatar_img, dtype=np.float32)

# Create rich dark executive studio background with subtle radial cyan-slate glow behind head/shoulders
yy_bg, xx_bg = np.mgrid[0:AV_H, 0:AV_W].astype(np.float32)
dist_center = np.sqrt(((xx_bg - 390.0) / 280.0) ** 2 + ((yy_bg - 380.0) / 340.0) ** 2)
glow = np.clip(1.0 - dist_center, 0.0, 1.0) ** 1.8
bg_arr = np.zeros((AV_H, AV_W, 4), dtype=np.uint8)
bg_arr[:, :, 0] = np.clip(5 + glow * 14, 0, 255).astype(np.uint8)
bg_arr[:, :, 1] = np.clip(10 + glow * 38, 0, 255).astype(np.uint8)
bg_arr[:, :, 2] = np.clip(18 + glow * 54, 0, 255).astype(np.uint8)
bg_arr[:, :, 3] = 255
studio_bg_full = Image.fromarray(bg_arr)

# Also save clean, 100% original-face studio portrait to src/assets/hero-portrait-pro.jpg (cropped to 720x900)
static_comp = Image.alpha_composite(studio_bg_full, avatar_img).convert("RGB")
# Crop y: 36..996, x: 0..768 -> resize to 720x900 (exact 4:5 aspect ratio)
static_portrait = static_comp.crop((0, 32, AV_W, 32 + 960)).resize(
    (W, H), Image.Resampling.LANCZOS
)
static_portrait.save(PORTRAIT_OUT_JPG, quality=94)
print(f"Updated clean original-face studio portrait: {PORTRAIT_OUT_JPG}")


# 4. Facial Rig Warper (operates on face ROI y=180..440, x=260..520 of avatar_arr)
ROI_Y0, ROI_Y1 = 180, 440
ROI_X0, ROI_X1 = 260, 520
base_roi = avatar_arr[ROI_Y0:ROI_Y1, ROI_X0:ROI_X1].copy()
RH, RW, _ = base_roi.shape
yy_roi, xx_roi = np.mgrid[ROI_Y0:ROI_Y1, ROI_X0:ROI_X1].astype(np.float32)

# Precompute static spatial weights for fast per-frame evaluation
MX_C = 390.0
MY_C_CURVE = 368.3 + 0.8 * ((xx_roi - MX_C) / 34.0) ** 2
JAW_HORIZ = np.exp(-(((xx_roi - MX_C) / 45.0) ** 2))
BELOW_MASK = (yy_roi >= MY_C_CURVE).astype(np.float32)
V_DIST_BELOW = np.clip((yy_roi - MY_C_CURVE) / (428.0 - MY_C_CURVE), 0.0, 1.0)
BLEND_JAW = np.clip(V_DIST_BELOW * 3.0, 0.0, 1.0)
JAW_VERT = (1.0 - V_DIST_BELOW**1.55) * BELOW_MASK

ABOVE_MASK = ((yy_roi < MY_C_CURVE) & (yy_roi > 348.0)).astype(np.float32)
V_DIST_ABOVE = np.clip((MY_C_CURVE - yy_roi) / (MY_C_CURVE - 348.0), 0.0, 1.0)
UPPER_VERT = (1.0 - V_DIST_ABOVE**1.4) * ABOVE_MASK

CORNER_ENV = np.exp(-(((yy_roi - 369.0) / 14.0) ** 2)) * np.exp(
    -(((np.abs(xx_roi - MX_C) - 27.0) / 17.0) ** 2)
)
SIGN_X = np.sign(xx_roi - MX_C)
CHEEK_ENV = np.exp(-(((yy_roi - 345.0) / 22.0) ** 2)) * np.exp(
    -(((np.abs(xx_roi - MX_C) - 38.0) / 20.0) ** 2)
)

BROW_ENV = np.zeros_like(xx_roi)
for bx in (342.0, 442.0):
    BROW_ENV += (
        np.exp(-(((xx_roi - bx) / 34.0) ** 2))
        * np.exp(-(((yy_roi - 228.0) / 11.0) ** 2))
        * (yy_roi < 244.0)
    )


def animate_avatar_frame(open_amt, width_amt, round_amt, blink_amt, brow_amt, t_sec, nod_val):
    dx = np.zeros_like(xx_roi)
    dy = np.zeros_like(yy_roi)

    eff_half_w = 32.5 * (1.0 - 0.25 * round_amt + 0.08 * width_amt)
    u_m = (xx_roi - MX_C) / eff_half_w
    mouth_horiz = np.clip(1.0 - u_m**2, 0.0, 1.0) ** (1.35 + 0.5 * round_amt)

    max_gap = open_amt * 11.2
    gap_x = max_gap * mouth_horiz

    horiz_profile = mouth_horiz * (1.0 - BLEND_JAW) + JAW_HORIZ * BLEND_JAW
    lower_shift = max_gap * 0.80 * horiz_profile * JAW_VERT
    upper_shift = -max_gap * 0.20 * mouth_horiz * UPPER_VERT
    dy -= lower_shift + upper_shift

    net_width = width_amt - 1.15 * round_amt
    dx -= SIGN_X * net_width * 2.8 * CORNER_ENV
    if net_width > 0:
        dy += net_width * 1.3 * CHEEK_ENV

    if brow_amt > 0.01:
        dy += brow_amt * 2.2 * BROW_ENV

    sample_y = yy_roi + dy
    sample_x = xx_roi + dx

    # Monotonic real-skin eyelid blink
    if blink_amt > 0.01:
        for ex, y_crease_c, y_lash_c, y_bot_c, rx in (
            (343.0, 246.2, 249.8, 263.2, 24.0),
            (441.5, 247.5, 251.0, 264.2, 24.0),
        ):
            u = (xx_roi - ex) / rx
            in_x = np.abs(u) < 1.0
            arch = np.clip(1.0 - u**2, 0.0, 1.0)
            y_crease = y_crease_c + 5.5 * (1.0 - arch)
            y_lash_open = y_lash_c + 4.5 * (1.0 - arch)
            y_bot = y_bot_c - 2.5 * (1.0 - arch)
            y_lash_curr = (
                y_lash_open + blink_amt * (y_bot - y_lash_open) * (arch**0.35)
            )

            m1 = in_x & (yy_roi >= y_crease) & (yy_roi <= y_lash_curr)
            t1 = (yy_roi - y_crease) / np.maximum(0.5, y_lash_curr - y_crease)
            sy1 = y_crease + t1 * (y_lash_open - y_crease)

            m2 = in_x & (yy_roi > y_lash_curr) & (yy_roi <= y_bot)
            t2 = (yy_roi - y_lash_curr) / np.maximum(0.5, y_bot - y_lash_curr)
            sy2 = y_lash_open + t2 * (y_bot - y_lash_open)

            sample_y = np.where(m1, sy1, np.where(m2, sy2, sample_y))

    sy_clipped = np.clip(sample_y - ROI_Y0, 0, RH - 1)
    sx_clipped = np.clip(sample_x - ROI_X0, 0, RW - 1)
    warped = np.zeros_like(base_roi)
    for c in range(4):
        warped[:, :, c] = map_coordinates(
            base_roi[:, :, c], [sy_clipped, sx_clipped], order=1, mode="nearest"
        )

    # Oral cavity rendering inside parted lips
    if open_amt > 0.03:
        top_lip_y = MY_C_CURVE - gap_x * 0.20
        bot_lip_y = MY_C_CURVE + gap_x * 0.80
        cavity_h = np.maximum(0.1, bot_lip_y - top_lip_y)
        t_cav = (yy_roi - top_lip_y) / cavity_h
        inside = (t_cav > 0.0) & (t_cav < 1.0) & (gap_x > 0.5)
        dist_edge = np.minimum(yy_roi - top_lip_y, bot_lip_y - yy_roi)
        cav_alpha = np.clip(dist_edge / 1.5, 0.0, 1.0) * inside

        cav_r = np.full_like(xx_roi, 24.0)
        cav_g = np.full_like(xx_roi, 10.0)
        cav_b = np.full_like(xx_roi, 12.0)

        teeth_w = 21.0 * (1.0 - 0.25 * round_amt)
        teeth_horiz = np.clip(1.0 - ((xx_roi - MX_C) / teeth_w) ** 2, 0.0, 1.0)
        teeth_vert = np.exp(-(((t_cav - 0.22) / 0.14) ** 2)) * (t_cav < 0.45)
        teeth_mask = (
            teeth_horiz * teeth_vert * np.clip((open_amt - 0.10) * 2.1, 0.0, 0.70)
        )
        cav_r = cav_r * (1.0 - teeth_mask) + 196.0 * teeth_mask
        cav_g = cav_g * (1.0 - teeth_mask) + 186.0 * teeth_mask
        cav_b = cav_b * (1.0 - teeth_mask) + 180.0 * teeth_mask

        tongue_mask = (
            np.clip(1.0 - ((xx_roi - MX_C) / 17.0) ** 2, 0.0, 1.0)
            * np.exp(-(((t_cav - 0.78) / 0.18) ** 2))
            * 0.52
        )
        cav_r = cav_r * (1.0 - tongue_mask) + 92.0 * tongue_mask
        cav_g = cav_g * (1.0 - tongue_mask) + 42.0 * tongue_mask
        cav_b = cav_b * (1.0 - tongue_mask) + 46.0 * tongue_mask

        warped[:, :, 0] = warped[:, :, 0] * (1.0 - cav_alpha) + cav_r * cav_alpha
        warped[:, :, 1] = warped[:, :, 1] * (1.0 - cav_alpha) + cav_g * cav_alpha
        warped[:, :, 2] = warped[:, :, 2] * (1.0 - cav_alpha) + cav_b * cav_alpha

    frame_av = avatar_arr.copy()
    frame_av[ROI_Y0:ROI_Y1, ROI_X0:ROI_X1] = warped
    av_pil = Image.fromarray(np.clip(frame_av, 0, 255).astype(np.uint8))

    # Subtle natural head/body conversational movement relative to studio background
    # Head & torso gentle sway + speech nod
    angle = math.sin(t_sec * 1.15) * 0.55 + math.cos(t_sec * 2.1) * 0.25
    tx = math.sin(t_sec * 0.95) * 2.2
    ty = math.sin(t_sec * 1.85) * 1.6 + nod_val * 2.2
    av_moved = av_pil.rotate(
        angle, resample=Image.Resampling.BILINEAR, center=(390, 460), translate=(tx, ty)
    )

    comp = Image.alpha_composite(studio_bg_full, av_moved).convert("RGB")
    # Crop to 4:5 frame (768x960 -> 720x900)
    return comp.crop((0, 32, AV_W, 32 + 960)).resize((W, H), Image.Resampling.BILINEAR)


# 5. Clean Subtitle Segments synchronized with speech (NO bulky cards or extra icons!)
CAPTIONS = [
    (
        0.0,
        5.90,
        "Hi, I'm Muhammad Faizan — Full-Stack Web Developer based in Karachi, Pakistan.",
    ),
    (
        5.90,
        14.30,
        "I specialize in building fast, secure web applications using PHP, Laravel, MySQL, and React.",
    ),
    (
        14.30,
        21.20,
        "From custom business platforms and REST APIs to high-converting Shopify and WordPress stores,",
    ),
    (
        21.20,
        25.55,
        "I deliver clean, scalable solutions tailored to your business goals.",
    ),
    (
        25.55,
        32.00,
        "Let's connect and build your next project together.",
    ),
]

# Also write updated VTT file
with open("public/faizan-intro.vtt", "w", encoding="utf-8") as vf:
    vf.write("WEBVTT\n\n")
    for s0, s1, txt in CAPTIONS:
        m0, sec0 = divmod(s0, 60)
        m1, sec1 = divmod(min(duration, s1), 60)
        vf.write(
            f"00:{int(m0):02d}:{sec0:06.3f} --> 00:{int(m1):02d}:{sec1:06.3f}\n{txt}\n\n"
        )


def get_font(size, bold=False):
    candidates = [
        "C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
    ]
    for path in candidates:
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


font_cap = get_font(21, bold=True)
font_name = get_font(16, bold=True)


def wrap_text(text, font, max_width, draw):
    words = text.split()
    lines, cur = [], ""
    for w in words:
        test = (cur + " " + w).strip()
        bbox = draw.textbbox((0, 0), test, font=font)
        if bbox[2] - bbox[0] <= max_width:
            cur = test
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


# Subtle bottom gradient ONLY in bottom 22% of frame so suit and face are 100% clear
bot_grad = Image.new("RGBA", (W, H), (0, 0, 0, 0))
g_draw = ImageDraw.Draw(bot_grad)
for y in range(int(H * 0.74), H):
    t_g = (y - H * 0.74) / (H * 0.26)
    alpha = int(min(220, (t_g**1.4) * 225))
    g_draw.line([(0, y), (W, y)], fill=(4, 9, 17, alpha))

cmd = [
    FFMPEG_EXE,
    "-y",
    "-f",
    "rawvideo",
    "-vcodec",
    "rawvideo",
    "-s",
    f"{W}x{H}",
    "-pix_fmt",
    "rgb24",
    "-r",
    str(FPS),
    "-i",
    "-",
    "-i",
    AUDIO_MP3,
    "-c:v",
    "libx264",
    "-preset",
    "veryfast",
    "-crf",
    "19",
    "-pix_fmt",
    "yuv420p",
    "-c:a",
    "aac",
    "-b:a",
    "128k",
    "-movflags",
    "+faststart",
    "-shortest",
    OUTPUT_MP4,
]

proc = subprocess.Popen(
    cmd, stdin=subprocess.PIPE, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL
)

for f in range(total_frames):
    t = f / float(FPS)
    frame_rgb = animate_avatar_frame(
        float(open_curve[f]),
        float(width_curve[f]),
        float(round_curve[f]),
        float(blink_curve[f]),
        float(brow_curve[f]),
        t,
        float(nod_curve[f]),
    )
    canvas = Image.alpha_composite(frame_rgb.convert("RGBA"), bot_grad)
    draw = ImageDraw.Draw(canvas)

    # Find active caption
    cap_text = CAPTIONS[-1][2]
    for s0, s1, txt in CAPTIONS:
        if s0 <= t < s1:
            cap_text = txt
            break

    # Clean, minimal caption at bottom (y: 790..855) — no clutter or icons!
    lines = wrap_text(cap_text, font_cap, W - 90, draw)
    y_text = 792 if len(lines) > 1 else 806
    for ln in lines[:2]:
        tb = draw.textbbox((0, 0), ln, font=font_cap)
        lw = tb[2] - tb[0]
        # Soft text shadow for readability
        draw.text(((W - lw) // 2 + 1, y_text + 1), ln, font=font_cap, fill=(0, 0, 0, 200))
        draw.text(((W - lw) // 2, y_text), ln, font=font_cap, fill=(248, 250, 252, 250))
        y_text += 28

    # Save a sample speaking frame at t ~ 1.5s ("Faizan") for verification
    if f == 36:
        canvas.convert("RGB").save(
            r"C:\Users\Zeeshan Ahmed\.gemini\antigravity\brain\0899fae6-acd6-4935-96d9-fd18fcb4488a\scratch\video_sample_frame.jpg",
            quality=92,
        )

    proc.stdin.write(canvas.convert("RGB").tobytes())

proc.stdin.close()
proc.wait()

if os.path.exists(AUDIO_WAV_TEMP):
    os.remove(AUDIO_WAV_TEMP)

print(
    f"Successfully generated lip-synced {OUTPUT_MP4} ({os.path.getsize(OUTPUT_MP4)} bytes, {duration:.1f}s)"
)
