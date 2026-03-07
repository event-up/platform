// Generate social sharing image from SVG logo
// Usage: node generate-social-image.js
const fs = require('fs');
const path = require('path');

// This creates a simple instruction file - manual creation needed
// For now, we'll use the existing SVG but note that social platforms prefer PNG/JPG

console.log('Social image generation instructions:');
console.log('1. Convert eventup-logo-full.svg to PNG with dimensions 1200x630');
console.log('2. Save as social-share.png in public/images/');
console.log('3. Update layout.tsx to reference /images/social-share.png');

// For immediate fix, we can use the SVG but with proper type hint
console.log('\nAlternatively, update metadata directly in layout.tsx to point to an existing PNG image.');
