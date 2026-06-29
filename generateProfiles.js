import fs from 'fs';
import path from 'path';

const profiles = {
  // YouTube
  checkgate: {
    type: "youtube",
    description: "Cocomelon makes learning fun with 3D animation, educational lyrics, and toe-tapping music! Kids will laugh, dance, sing, and play along.",
    posts_count: 1200,
    avg_likes: 250000,
    avg_comments: 5000,
    avg_views: 15000000,
    gender: "Other",
    age_group: "18-24"
  },
  setindia: {
    type: "youtube",
    description: "Sony Entertainment Television is one of the leading Hindi General Entertainment channels in India. Watch the best of Indian television.",
    posts_count: 125000,
    avg_likes: 15000,
    avg_comments: 400,
    avg_views: 250000,
    gender: "Other",
    age_group: "25-34"
  },
  VladandNiki: {
    type: "youtube",
    description: "Vlad and Niki are two brothers who love playing with toys, creating new adventures, and sharing their fun with kids around the world.",
    posts_count: 700,
    avg_likes: 180000,
    avg_comments: 0,
    avg_views: 12000000,
    gender: "Male",
    age_group: "18-24"
  },
  KidsDianaShow: {
    type: "youtube",
    description: "Kids Diana Show - the #1 rated kids YouTube channel! Discover toys, songs, and imaginative play with Diana and her brother Roma.",
    posts_count: 1100,
    avg_likes: 160000,
    avg_comments: 0,
    avg_views: 10000000,
    gender: "Female",
    age_group: "18-24"
  },
  LikeNastyaofficial: {
    type: "youtube",
    description: "Like Nastya is a fun and educational channel for kids, featuring Nastya's daily life, toy unboxing, and family adventures.",
    posts_count: 850,
    avg_likes: 200000,
    avg_comments: 0,
    avg_views: 14000000,
    gender: "Female",
    age_group: "18-24"
  },
  zeemusiccompany: {
    type: "youtube",
    description: "Zee Music Company is India's leading music label, bringing you the latest Bollywood and regional music hits.",
    posts_count: 9500,
    avg_likes: 45000,
    avg_comments: 1200,
    avg_views: 3000000,
    gender: "Other",
    age_group: "18-24"
  },
  PewDiePie: {
    type: "youtube",
    description: "I make videos. Subscribe to join the Bro Army! Gaming, commentary, and memes with Felix Kjellberg.",
    posts_count: 4700,
    avg_likes: 650000,
    avg_comments: 25000,
    avg_views: 4500000,
    gender: "Male",
    age_group: "25-34"
  },
  WWEFanNation: {
    type: "youtube",
    description: "WWE on YouTube is your number one spot to catch WWE original shows, exclusive highlights, and classic matches.",
    posts_count: 75000,
    avg_likes: 35000,
    avg_comments: 1500,
    avg_views: 1200000,
    gender: "Other",
    age_group: "25-34"
  },
  
  // TikTok
  charlidamelio: {
    type: "tiktok",
    description: "Don't worry, be happy! Dancing, lifestyle, and behind-the-scenes with Charli D'Amelio.",
    posts_count: 2300,
    avg_likes: 2100000,
    avg_comments: 45000,
    avg_reels_plays: 15000000,
    gender: "Female",
    age_group: "18-24"
  },
  willsmith: {
    type: "tiktok",
    description: "Just a guy having fun. Actor, producer, and part-time TikToker.",
    posts_count: 150,
    avg_likes: 3500000,
    avg_comments: 55000,
    avg_reels_plays: 25000000,
    gender: "Male",
    age_group: "45-54"
  },
  bellapoarch: {
    type: "tiktok",
    description: "I play video games and make faces. Welcome to my world of music and gaming.",
    posts_count: 420,
    avg_likes: 2800000,
    avg_comments: 35000,
    avg_reels_plays: 20000000,
    gender: "Female",
    age_group: "18-24"
  },
  addisonre: {
    type: "tiktok",
    description: "Addison Rae - beauty, fashion, dancing, and lifestyle content.",
    posts_count: 1800,
    avg_likes: 1500000,
    avg_comments: 25000,
    avg_reels_plays: 10000000,
    gender: "Female",
    age_group: "18-24"
  },
  "kimberly.loaiza": {
    type: "tiktok",
    description: "Hola linduras! Cantante, mamá, y creadora de contenido mexicana.",
    posts_count: 1400,
    avg_likes: 1900000,
    avg_comments: 40000,
    avg_reels_plays: 12000000,
    gender: "Female",
    age_group: "18-24"
  },
  tiktok: {
    type: "tiktok",
    description: "Make Your Day. The official TikTok account showcasing the best trends and creators.",
    posts_count: 500,
    avg_likes: 800000,
    avg_comments: 15000,
    avg_reels_plays: 8000000,
    gender: "Other",
    age_group: "18-24"
  },
  zachking: {
    type: "tiktok",
    description: "Bringing a little more magic into the world. Filmmaker and illusionist.",
    posts_count: 380,
    avg_likes: 4500000,
    avg_comments: 50000,
    avg_reels_plays: 35000000,
    gender: "Male",
    age_group: "25-34"
  },
  domelipa: {
    type: "tiktok",
    description: "Dominik Reséndez - lifestyle, dance, and trends.",
    posts_count: 2100,
    avg_likes: 1600000,
    avg_comments: 20000,
    avg_reels_plays: 9000000,
    gender: "Female",
    age_group: "18-24"
  },

  // Instagram
  leomessi: {
    type: "instagram",
    description: "Welcome to the official Leo Messi Instagram account. Professional footballer for Inter Miami and Argentina.",
    posts_count: 1150,
    avg_likes: 8500000,
    avg_comments: 95000,
    gender: "Male",
    age_group: "35-44"
  },
  selenagomez: {
    type: "instagram",
    description: "By grace, through faith. Founder of Rare Beauty. Actress, producer, and singer.",
    posts_count: 1950,
    avg_likes: 5500000,
    avg_comments: 45000,
    gender: "Female",
    age_group: "25-34"
  },
  kyliejenner: {
    type: "instagram",
    description: "Founder of Kylie Cosmetics. Reality TV star, entrepreneur, and mother.",
    posts_count: 7200,
    avg_likes: 4800000,
    avg_comments: 38000,
    gender: "Female",
    age_group: "25-34"
  },
  therock: {
    type: "instagram",
    description: "Founder of Seven Bucks Productions. Mana. Tequila. Iron. Energy. 🌍",
    posts_count: 7500,
    avg_likes: 2100000,
    avg_comments: 18000,
    gender: "Male",
    age_group: "45-54"
  },
  arianagrande: {
    type: "instagram",
    description: "Singer, songwriter, actress, and founder of r.e.m. beauty.",
    posts_count: 5100,
    avg_likes: 3500000,
    avg_comments: 25000,
    gender: "Female",
    age_group: "25-34"
  },
  kimkardashian: {
    type: "instagram",
    description: "SKIMS Founder. SKKN BY KIM. Reality TV royalty and entrepreneur.",
    posts_count: 6100,
    avg_likes: 2900000,
    avg_comments: 22000,
    gender: "Female",
    age_group: "35-44"
  },
  beyonce: {
    type: "instagram",
    description: "The official Instagram of Beyoncé. Cowboy Carter out now.",
    posts_count: 2300,
    avg_likes: 4100000,
    avg_comments: 35000,
    gender: "Female",
    age_group: "35-44"
  },
  khloekardashian: {
    type: "instagram",
    description: "Good American founder. Kardashian family member.",
    posts_count: 4400,
    avg_likes: 1500000,
    avg_comments: 12000,
    gender: "Female",
    age_group: "35-44"
  }
};

// Retrieve summaries to merge with the detailed info
const summariesFiles = {
  youtube: JSON.parse(fs.readFileSync('src/assets/data/search/youtube.json', 'utf8')),
  tiktok: JSON.parse(fs.readFileSync('src/assets/data/search/tiktok.json', 'utf8')),
  instagram: JSON.parse(fs.readFileSync('src/assets/data/search/instagram.json', 'utf8')),
};

const allSummaries = [
  ...summariesFiles.youtube.accounts,
  ...summariesFiles.tiktok.accounts,
  ...summariesFiles.instagram.accounts
].map(a => a.account.user_profile);

const outDir = 'src/assets/data/profiles';

for (const [username, details] of Object.entries(profiles)) {
  const summary = allSummaries.find(s => {
    const checkUser = s.username || s.handle || s.user_id;
    return checkUser.toLowerCase() === username.toLowerCase();
  });

  if (summary) {
    const fullProfile = {
      ...summary,
      ...details,
      is_business: true,
    };
    
    // Update summary username if it was missing in search json
    if (!fullProfile.username) {
        fullProfile.username = username;
    }

    fs.writeFileSync(
      path.join(outDir, `${username}.json`),
      JSON.stringify(fullProfile, null, 2)
    );
    console.log(`Created ${username}.json`);
  } else {
    console.log(`Could not find summary for ${username}`);
  }
}
