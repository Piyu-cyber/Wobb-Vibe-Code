import fs from 'fs';
import path from 'path';

async function fetchLogo(url) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const html = await res.text();
    const match = html.match(/<meta property="og:image" content="([^"]+)"/);
    if (match) return match[1];
  } catch(e) {
    console.error(e);
  }
  return null;
}

async function fixYoutube() {
  const yPath = 'src/assets/data/search/youtube.json';
  const yData = JSON.parse(fs.readFileSync(yPath));
  
  for (const account of yData.accounts) {
    const p = account.account.user_profile;
    
    // Fix MrBeast6000 -> MrBeast
    if (p.username === 'MrBeast6000' || p.handle === 'MrBeast6000') {
      p.username = 'MrBeast';
      p.handle = 'MrBeast';
      
      const oldPath = 'src/assets/data/profiles/MrBeast6000.json';
      const newPath = 'src/assets/data/profiles/MrBeast.json';
      if (fs.existsSync(oldPath)) {
        const d = JSON.parse(fs.readFileSync(oldPath));
        d.data.user_profile.username = 'MrBeast';
        d.data.user_profile.handle = 'MrBeast';
        fs.writeFileSync(newPath, JSON.stringify(d, null, 2));
        fs.unlinkSync(oldPath);
        console.log('Renamed MrBeast profile');
      }
    }
    
    console.log('Fetching logo for', p.fullname);
    const logoUrl = await fetchLogo(p.url);
    if (logoUrl) {
      console.log('Found logo:', logoUrl);
      p.picture = logoUrl;
      
      const uName = p.username || p.handle;
      const profPath = path.join('src/assets/data/profiles', uName + '.json');
      if (fs.existsSync(profPath)) {
         const d = JSON.parse(fs.readFileSync(profPath));
         d.data.user_profile.picture = logoUrl;
         fs.writeFileSync(profPath, JSON.stringify(d, null, 2));
      }
    }
  }
  
  fs.writeFileSync(yPath, JSON.stringify(yData, null, 2));
  console.log('Youtube JSON updated!');
}

fixYoutube();
