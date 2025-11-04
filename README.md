# Velocity One Website

A modern, responsive website for Velocity One, a private industrial platform focused on modernizing aerospace, defense, and industrial companies.

## Features

- Responsive design that works on all devices
- Smooth scrolling navigation
- Interactive elements with subtle animations
- Company information and leadership team sections
- News section with article cards
- Contact information and social links

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- (Optional) A local web server for development (e.g., Live Server in VS Code, `python -m http.server`)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd velocity-one-website
   ```

2. Open `index.html` in your web browser to view the website locally.

## Project Structure

```
velocity-one/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # Main stylesheet
├── js/
│   └── main.js         # Main JavaScript file
└── images/             # Image assets
    ├── hero/           # Hero section images
    ├── leadership/     # Leadership team photos
    ├── companies/      # Company logos and images
    └── news/           # News article images
```

## Adding Content

### Adding Team Members
1. Add team member photos to `images/leadership/`
2. Update the leadership section in `index.html` with the new team member's information

### Adding News Articles
1. Add article images to `images/news/`
2. Add a new article card in the news section of `index.html`

### Updating Company Information
Edit the relevant sections in `index.html` to update company details, descriptions, and other information.

## Deployment

The website can be deployed to any static web hosting service. Here are a few options:

### Netlify
1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Sign up for a Netlify account
3. Click "New site from Git" and select your repository
4. Configure the build settings (if needed) and deploy

### Vercel
1. Push your code to a Git repository
2. Sign up for a Vercel account
3. Import your repository
4. Deploy with default settings

### GitHub Pages
1. Push your code to a GitHub repository
2. Go to the repository settings
3. Under "GitHub Pages", select the `main` branch and `/ (root)` folder
4. Click "Save" to deploy

## Customization

### Colors
Edit the CSS variables in `css/styles.css` to change the color scheme:

```css
:root {
    --navy: #0a1a35;
    --navy-light: #1a2b4a;
    --white: #ffffff;
    --off-white: #f8f9fa;
    --silver: #e0e0e0;
    --accent: #2a5dff;
    --accent-hover: #1a4bd9;
}
```

### Typography
The website uses Inter font from Google Fonts. To change the font, update the font import in `index.html` and the font-family in `css/styles.css`.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Font Awesome](https://fontawesome.com/) for icons
- [Google Fonts](https://fonts.google.com/) for typography
- [Normalize.css](https://necolas.github.io/normalize.css/) for CSS resets
