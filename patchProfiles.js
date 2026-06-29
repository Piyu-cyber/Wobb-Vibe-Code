import fs from 'fs';
import path from 'path';

// 1. Update Khaby Lame
const khabyPic = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Khaby_Lame%2C_Nov_2025_%28cropped1%29.jpg/500px-Khaby_Lame%2C_Nov_2025_%28cropped1%29.jpg';

// Patch tiktok.json
const tiktokSearchPath = 'src/assets/data/search/tiktok.json';
if (fs.existsSync(tiktokSearchPath)) {
  const data = JSON.parse(fs.readFileSync(tiktokSearchPath, 'utf8'));
  for (const account of data.accounts) {
    const prof = account.account.user_profile;
    if (prof.username === 'khaby.lame') {
      prof.picture = khabyPic;
      console.log('Updated Khaby Lame search picture');
    }
    // Also patch MrBeast tiktok search picture to use his working logo since sptds.icu is blocked
    if (prof.username === 'mrbeast') {
      prof.picture = 'https://yt3.googleusercontent.com/nxYrc_1_2f77DoBadyxMTmv7ZpRZapHR5jbuYe7PlPd5cIRJxtNNEYyOC0ZsxaDyJJzXrnJiuDE=s900-c-k-c0x00ffffff-no-rj';
      console.log('Updated MrBeast TikTok search picture');
    }
  }
  fs.writeFileSync(tiktokSearchPath, JSON.stringify(data, null, 2));
}

// Patch khaby.lame.json
const khabyProfilePath = 'src/assets/data/profiles/khaby.lame.json';
if (fs.existsSync(khabyProfilePath)) {
  const data = JSON.parse(fs.readFileSync(khabyProfilePath, 'utf8'));
  data.data.user_profile.picture = khabyPic;
  fs.writeFileSync(khabyProfilePath, JSON.stringify(data, null, 2));
  console.log('Updated Khaby Lame profile picture');
}

// 2. Create mrbeast_tiktok.json by copying mrbeast.json and modifying it
const mrbeastYoutubePath = 'src/assets/data/profiles/mrbeast.json';
const mrbeastTiktokPath = 'src/assets/data/profiles/mrbeast_tiktok.json';
if (fs.existsSync(mrbeastYoutubePath)) {
  const data = JSON.parse(fs.readFileSync(mrbeastYoutubePath, 'utf8'));
  
  // Modify for TikTok
  data.data.user_profile.type = 'tiktok';
  data.data.user_profile.url = 'https://www.tiktok.com/@mrbeast';
  data.data.user_profile.description = 'I want to make the world a better place before I die.';
  data.data.user_profile.picture = 'https://yt3.googleusercontent.com/nxYrc_1_2f77DoBadyxMTmv7ZpRZapHR5jbuYe7PlPd5cIRJxtNNEYyOC0ZsxaDyJJzXrnJiuDE=s900-c-k-c0x00ffffff-no-rj';
  
  fs.writeFileSync(mrbeastTiktokPath, JSON.stringify(data, null, 2));
  console.log('Created mrbeast_tiktok.json');
}
