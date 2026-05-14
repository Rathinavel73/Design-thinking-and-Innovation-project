// QR Code Generator for Hostel Feedback Project
const https = require('https');
const fs = require('fs');
const path = require('path');

// URL that the QR code will link to
const url = 'http://localhost:8080/index.html';
const size = 400; // QR code size in pixels

// Encode the URL for the API
const encodedUrl = encodeURIComponent(url);

// QR code API endpoint
const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedUrl}&margin=10&format=png`;

// Output path
const outputPath = path.join(__dirname, 'frontend', 'hostel-feedback-qr.png');
const outputDir = path.dirname(outputPath);

// Create frontend directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('🔄 Generating QR Code...');
console.log(`🔗 URL: ${url}`);
console.log(`📏 Size: ${size}x${size} pixels`);

// Download QR code image
https.get(apiUrl, (response) => {
  if (response.statusCode === 200) {
    const fileStream = fs.createWriteStream(outputPath);
    response.pipe(fileStream);
    
    fileStream.on('finish', () => {
      fileStream.close();
      console.log('✅ QR Code generated successfully!');
      console.log(`📁 Saved to: ${outputPath}`);
      console.log(`📱 Scan this QR code to open: ${url}`);
      console.log('✨ QR code image is ready to use!');
    });

    fileStream.on('error', (err) => {
      fs.unlink(outputPath, () => {}); // Delete file on error
      console.error(`❌ Error saving file: ${err}`);
      process.exit(1);
    });
  } else {
    console.error(`❌ Failed to download QR code: HTTP ${response.statusCode}`);
    process.exit(1);
  }
}).on('error', (err) => {
  console.error(`❌ Error: ${err}`);
  process.exit(1);
});
