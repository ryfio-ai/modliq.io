import 'dotenv/config';

let url = (process.env.NEXT_PUBLIC_API_URL || 'https://modliq-backend.onrender.com').trim();

if (!/^https?:\/\//.test(url)) {
  console.log(`ℹ️ Formatting bare API host "${url}" to "https://${url}"`);
  url = `https://${url}`;
}

process.env.NEXT_PUBLIC_API_URL = url;
console.log(`✓ NEXT_PUBLIC_API_URL validated: ${url}`);
