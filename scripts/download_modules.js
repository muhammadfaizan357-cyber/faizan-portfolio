import https from 'https';
import fs from 'fs';

const baseUrl = 'https://framerusercontent.com/sites/3sFOKpq5a8X3zPzw7nc3tv/';
const files = [
  'rolldown-runtime.HIJuQoZM.mjs',
  'react.BtNJwqIS.mjs',
  'motion.BYoOlEwT.mjs',
  'framer.Dr2CWFxt.mjs',
  'f1aLcofrw.BKLkWiLd.mjs',
  'OizVdVoNQ.BFqISncD.mjs',
  'vWHfigGmg.DxgvFb1N.mjs',
  'shared-lib.ycQlGgUp.mjs',
  'Ak0TkcjLs.DeI288Mf.mjs',
  'TBCfJ0G8Y.DG9C6Kll.mjs'
];

function fetchFile(file) {
  return new Promise((resolve) => {
    https.get(baseUrl + file, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        fs.writeFileSync('scripts/' + file, data);
        console.log(`Saved ${file} (${data.length} bytes)`);
        resolve(data);
      });
    }).on('error', (e) => {
      console.error(`Error downloading ${file}:`, e.message);
      resolve(null);
    });
  });
}

async function run() {
  for (const f of files) {
    await fetchFile(f);
  }
  console.log('All files downloaded!');
}

run();
