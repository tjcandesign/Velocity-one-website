const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

// Create images directory if it doesn't exist
function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Download image from URL
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        // Convert to webp for better performance
        try {
          execSync(`cwebp -q 80 ${filepath} -o ${filepath}.webp`);
          fs.unlinkSync(filepath); // Remove original
          resolve();
        } catch (err) {
          console.warn(`Couldn't convert ${filepath} to webp, using original`);
          resolve();
        }
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete the file async
      reject(err);
    });
  });
}

// Stock photos from Unsplash (free to use, no attribution required)
const images = {
  hero: {
    url: 'https://images.unsplash.com/photo-1506197603053-75309a498c9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    filename: 'hero-bg.jpg'
  },
  leadership: [
    {
      id: 'john-borduin',
      url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      filename: 'john-borduin.jpg'
    },
    {
      id: 'cory-tellbuescher',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      filename: 'cory-tellbuescher.jpg'
    },
    {
      id: 'christian-tomsich',
      url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      filename: 'christian-tomsich.jpg'
    }
  ],
  companies: [
    {
      id: 'cad',
      logo: 'https://images.unsplash.com/photo-1581093196270-6682c03a0161?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      hero: 'https://images.unsplash.com/photo-1581093057302-7fe9dfb5cdcc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'emcore',
      logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      hero: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'aerosphere',
      logo: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      hero: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    }
  ],
  news: [
    {
      id: 'velocity-one-aerosphere',
      url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      filename: 'velocity-one-aerosphere.jpg'
    },
    {
      id: 'emcore-integration',
      url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      filename: 'emcore-integration.jpg'
    },
    {
      id: 'leadership-expansion',
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      filename: 'leadership-expansion.jpg'
    }
  ]
};

// Download all images
async function downloadAllImages() {
  try {
    // Download hero image
    console.log('Downloading hero image...');
    const heroDir = path.join(__dirname, 'images/hero');
    ensureDirectoryExists(heroDir);
    await downloadImage(images.hero.url, path.join(heroDir, images.hero.filename));

    // Download leadership images
    console.log('Downloading leadership images...');
    const leadershipDir = path.join(__dirname, 'images/leadership');
    ensureDirectoryExists(leadershipDir);
    for (const leader of images.leadership) {
      await downloadImage(leader.url, path.join(leadershipDir, leader.filename));
    }

    // Download company images
    console.log('Downloading company images...');
    const companiesDir = path.join(__dirname, 'images/companies');
    ensureDirectoryExists(companiesDir);
    for (const company of images.companies) {
      await downloadImage(company.logo, path.join(companiesDir, `${company.id}-logo.jpg`));
      await downloadImage(company.hero, path.join(companiesDir, `${company.id}-hero.jpg`));
    }

    // Download news images
    console.log('Downloading news images...');
    const newsDir = path.join(__dirname, 'images/news');
    ensureDirectoryExists(newsDir);
    for (const article of images.news) {
      await downloadImage(article.url, path.join(newsDir, article.filename));
    }

    console.log('✅ All images downloaded successfully!');
  } catch (error) {
    console.error('Error downloading images:', error);
  }
}

// Run the download
downloadAllImages();
