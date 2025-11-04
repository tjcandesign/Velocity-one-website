const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Function to create a placeholder image with text
function createImage(width, height, text, bgColor = '#f0f0f0', textColor = '#999') {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Fill background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);
  
  // Add text
  ctx.fillStyle = textColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Calculate font size based on canvas size
  const fontSize = Math.min(width / 10, height / 5);
  ctx.font = `bold ${fontSize}px Arial`;
  
  // Split text into multiple lines if needed
  const lines = text.split('\n');
  const lineHeight = fontSize * 1.2;
  const startY = (height - (lines.length - 1) * lineHeight) / 2;
  
  lines.forEach((line, index) => {
    ctx.fillText(line, width / 2, startY + (index * lineHeight));
  });
  
  return canvas.toBuffer('image/jpeg');
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
  createImage(1920, 1080, 'VELOCITY ONE\nAerospace Excellence\nSince 2023', '#0a1a35', '#ffffff')
);

// Generate leadership images
const leadershipDir = path.join(__dirname, 'images/leadership');
ensureDirectoryExists(leadershipDir);

const leaders = [
  { id: 'john-borduin', name: 'John Borduin', title: 'CEO' },
  { id: 'cory-tellbuescher', name: 'Cory Tellbuescher', title: 'CCO' },
  { id: 'christian-tomsich', name: 'Christian Tomsich', title: 'CFO' }
];

leaders.forEach(leader => {
  fs.writeFileSync(
    path.join(leadershipDir, `${leader.id}.jpg`),
    createImage(600, 800, `${leader.name}\n${leader.title}`, '#f8f9fa', '#0a1a35')
  );
});

// Generate company logos and hero images
const companiesDir = path.join(__dirname, 'images/companies');
ensureDirectoryExists(companiesDir);

const companies = [
  { 
    id: 'cad', 
    name: 'Cartridge Actuated Devices',
    description: 'Precision Engineering for Aerospace Safety'
  },
  { 
    id: 'emcore', 
    name: 'EMCORE Defense',
    description: 'Advanced Optoelectronics Solutions'
  },
  { 
    id: 'aerosphere', 
    name: 'Aerosphere Power',
    description: 'Next-Gen Aerospace Energy'
  }
];

companies.forEach(company => {
  // Logo (square format)
  fs.writeFileSync(
    path.join(companiesDir, `${company.id}-logo.png`),
    createImage(300, 300, company.name, '#ffffff', '#2a5dff')
  );
  
  // Hero image (landscape)
  fs.writeFileSync(
    path.join(companiesDir, `${company.id}-hero.jpg`),
    createImage(1200, 600, `${company.name}\n${company.description}`, '#0a1a35', '#ffffff')
  );
});

// Generate news images
const newsDir = path.join(__dirname, 'images/news');
ensureDirectoryExists(newsDir);

const newsArticles = [
  { 
    id: 'velocity-one-aerosphere', 
    title: 'Velocity One Acquires Aerosphere Power',
    date: '2023-10-15'
  },
  { 
    id: 'emcore-integration', 
    title: 'EMCORE Division Integration Complete',
    date: '2023-08-22'
  },
  { 
    id: 'leadership-expansion', 
    title: 'Leadership Team Expanded',
    date: '2023-06-05'
  }
];

newsArticles.forEach(article => {
  fs.writeFileSync(
    path.join(newsDir, `${article.id}.jpg`),
    createImage(800, 500, `${article.title}\n${article.date}`, '#1a2b4a', '#ffffff')
  );
});

console.log('✅ Generated all placeholder images with aerospace theme');
