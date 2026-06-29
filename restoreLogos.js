import fs from 'fs';
import path from 'path';

const restores = {
  'checkgate': 'https://yt3.googleusercontent.com/ytc/AIdro_mR-I4TDlJI7Rc2jwF0cZf6uMnzDpkRggMK4zGOi4eOndY=s480-c-k-c0x00ffffff-no-rj',
  'KidsDianaShow': 'https://yt3.googleusercontent.com/ytc/AIdro_kWUVocierGiQqzhp6IVSjzD7AgfGErLQUuN5tq9yP54-o=s480-c-k-c0x00ffffff-no-rj',
  'LikeNastyaofficial': 'https://yt3.googleusercontent.com/ytc/AIdro_kj6ASR_jV8XSSGF_SSD4hUBJInCWwWRlR2mxEcwGVQW4s=s480-c-k-c0x00ffffff-no-rj',
  'WWEFanNation': 'https://yt3.googleusercontent.com/ytc/AIdro_kRzpOO6EOnWYXSBHEhJft2_uVXk2uIjCWVJSAlAOCUOdgc=s480-c-k-c0x00ffffff-no-rj'
};

const yPath = 'src/assets/data/search/youtube.json';
const yData = JSON.parse(fs.readFileSync(yPath));

for (const account of yData.accounts) {
  const p = account.account.user_profile;
  const lookup = p.username || p.handle;
  
  if (restores[lookup]) {
    p.picture = restores[lookup];
    console.log('Restored in youtube.json:', lookup);
  }
}

fs.writeFileSync(yPath, JSON.stringify(yData, null, 2));

for (const [uname, url] of Object.entries(restores)) {
  const profPath = path.join('src/assets/data/profiles', uname + '.json');
  if (fs.existsSync(profPath)) {
    const d = JSON.parse(fs.readFileSync(profPath));
    d.data.user_profile.picture = url;
    fs.writeFileSync(profPath, JSON.stringify(d, null, 2));
    console.log('Restored profile:', uname);
  }
}
