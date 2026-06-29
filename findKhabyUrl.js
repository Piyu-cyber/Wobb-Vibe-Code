async function getDirectUrl() {
  try {
    const res = await fetch('https://commons.wikimedia.org/wiki/File:Khaby_Lame,_Nov_2025_(cropped1).jpg');
    const html = await res.text();
    // Search for upload.wikimedia.org links
    const matches = html.match(/https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/[a-zA-Z0-9_\/%.~-]+\.jpg/g);
    if (matches && matches.length > 0) {
      console.log('UNIQUE MATCHES:', Array.from(new Set(matches)));
    } else {
      console.log('No matches found');
    }
  } catch (e) {
    console.error(e);
  }
}
getDirectUrl();
