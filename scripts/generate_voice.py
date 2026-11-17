import asyncio
import json
import edge_tts

TEXT = (
    "Hi, I'm Muhammad Faizan, a Full-Stack Web Developer based in Karachi, Pakistan. "
    "I specialize in building fast, secure web applications using PHP, Laravel, MySQL, and React. "
    "From custom business platforms and REST APIs to high-converting Shopify and WordPress stores, "
    "I deliver clean, scalable solutions tailored to your business goals. "
    "Let's connect and build your next project together."
)


async def main():
    voice = "en-US-AndrewMultilingualNeural"
    try:
        comm = edge_tts.Communicate(
            TEXT, voice, rate="-3%", pitch="-1Hz", boundary="WordBoundary"
        )
    except TypeError:
        comm = edge_tts.Communicate(TEXT, voice, rate="-3%", pitch="-1Hz")

    words = []
    with open("public/faizan-intro.mp3", "wb") as f:
        async for chunk in comm.stream():
            if chunk["type"] == "audio":
                f.write(chunk["data"])
            elif chunk["type"] in ("WordBoundary", "SentenceBoundary"):
                words.append(
                    {
                        "type": chunk["type"],
                        "text": chunk.get("text", ""),
                        "start": round(chunk["offset"] / 10_000_000.0, 3),
                        "duration": round(chunk["duration"] / 10_000_000.0, 3),
                    }
                )
    with open("public/faizan-words.json", "w", encoding="utf-8") as wf:
        json.dump(words, wf, indent=2)
    print(f"Saved audio and {len(words)} boundary events.")


if __name__ == "__main__":
    asyncio.run(main())
