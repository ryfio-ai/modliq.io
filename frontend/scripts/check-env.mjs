import 'dotenv/config';

const url = process.env.NEXT_PUBLIC_API_URL;

if (!url || url.trim().length === 0) {
  console.error(
    "\n❌ BUILD FAILED: NEXT_PUBLIC_API_URL is not set.\n" +
      "   Set it to the deployed backend URL before building for production,\n" +
      "   e.g. NEXT_PUBLIC_API_URL=https://modliq.onrender.com\n"
  );
  process.exit(1);
}

if (!/^https?:\/\//.test(url.trim())) {
  console.error(
    `\n❌ BUILD FAILED: NEXT_PUBLIC_API_URL must be an absolute URL, got "${url}".\n`
  );
  process.exit(1);
}

console.log(`✓ NEXT_PUBLIC_API_URL validated: ${url.trim()}`);
