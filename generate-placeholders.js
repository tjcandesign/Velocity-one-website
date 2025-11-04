const fs = require('fs');
const path = require('path');

// Create SVG placeholder function
function createPlaceholder(width, height, text) {
  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" 
         xmlns="http://www.w3.org/2000/svg" 
         style="background-color: #f0f0f0; font-family: Arial, sans-serif; display: flex; align-items: center; justify-content: center;">
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#999" font-size="14">
        ${text} (${width}×${height})
      </text>
    </svg>
  `;
}

// Create images directory if it doesn't exist
function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Generate hero image
const heroDir = path.join(__dirname, 'images/hero');
ensureDirectoryExists(heroDir);
fs.writeFileSync(
  path.join(heroDir, 'hero-bg.jpg'),
  createPlaceholder(1920, 1080, 'Hero Background')
);

// Generate leadership images
const leadershipDir = path.join(__dirname, 'images/leadership');
ensureDirectoryExists(leadershipDir);

const leaders = [
  'john-borduin',
  'cory-tellbuescher',
  'christian-tomsich'
];

leaders.forEach(leader => {
  fs.writeFileSync(
    path.join(leadershipDir, `${leader}.jpg`),
    createPlaceholder(600, 800, leader.split('-').map(n => n[0].toUpperCase() + n.slice(1)).join(' '))
  );
});

// Generate company logos
const companiesDir = path.join(__dirname, 'images/companies');
ensureDirectoryExists(companiesDir);

const companies = [
  { id: 'cad', name: 'Cartridge Actuated Devices' },
  { id: 'emcore', name: 'EMCORE Defense Optoelectronics' },
  { id: 'aerosphere', name: 'Aerosphere Power' }
];

companies.forEach(company => {
  // Logo
  fs.writeFileSync(
    path.join(companiesDir, `${company.id}-logo.png`),
    createPlaceholder(300, 100, company.id.toUpperCase() + ' Logo')
  );
  
  // Hero image
  fs.writeFileSync(
    path.join(companiesDir, `${company.id}-hero.jpg`),
    createPlaceholder(1200, 600, company.name)
  );
});

// Generate news images
const newsDir = path.join(__dirname, 'images/news');
ensureDirectoryExists(newsDir);

const newsArticles = [
  'velocity-one-aerosphere',
  'emcore-integration',
  'leadership-expansion'
];

newsArticles.forEach((article, index) => {
  fs.writeFileSync(
    path.join(newsDir, `${article}.jpg`),
    createPlaceholder(800, 500, `News ${index + 1}`)
  );
});

console.log('✅ Generated all placeholder images');
