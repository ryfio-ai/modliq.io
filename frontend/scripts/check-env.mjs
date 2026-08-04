import 'dotenv/config';

let url = (process.env.NEXT_PUBLIC_API_URL || '').trim();

if (!url || url.length === 0) {
  console.error(
    "\n❌ BUILD FAILED: NEXT_PUBLIC_API_URL is not set.\n" +
      "   Set it to the deployed backend URL before building for production,\n" +
      "   e.g. NEXT_PUBLIC_API_URL=https://modliq.onrender.com\n"
  );
  process.exit(1);
}

if (!/^https?:\/\//.test(url)) {
  console.log(`ℹ️ Formatting bare API host "${url}" to "http://${url}"`);
  url = `http://${url}`;
  process.env.NEXT_PUBLIC_API_URL = url;
}

console.log(`✓ NEXT_PUBLIC_API_URL validated: ${url}`);
