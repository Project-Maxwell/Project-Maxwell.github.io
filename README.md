# Project Maxwell

**Project Maxwell** is a research initiative focused on advancing wireless communications through artificial intelligence. This repository contains the official project website showcasing our research papers, team members, and contributions to the field.

🌐 **Live Website**: [https://project-maxwell.github.io/](https://project-maxwell.github.io/)

## ✨ Features

- **📱 Responsive Design**: Optimized for all devices and screen sizes
- **🌓 Dark/Light Mode**: Automatic theme detection with manual toggle
- **⚡ Fast Performance**: Lightweight HTML/CSS/JS with CDN resources
- **♿ Accessibility**: WCAG 2.1 AA compliant with proper ARIA labels and semantic markup
- **🔍 SEO Optimized**: Open Graph, Twitter Cards, JSON-LD structured data

## 🏗️ Architecture

This is a static website built with:

- **HTML5** with semantic markup
- **Tailwind CSS** (CDN) for styling and responsive design
- **Vanilla JavaScript** for interactivity and data management
- **GitHub Pages** for hosting and deployment

### Directory Structure

```
project-maxwell/
├── css/
│   └── styles.css          # Custom styles and component classes
├── js/
│   ├── app.js              # Main application logic
│   ├── data.js             # Research papers and team data
│   ├── i18n.js             # Translation utilities
│   ├── papers.js           # Papers page functionality
│   └── people.js           # People page functionality
├── index.html              # Homepage
├── papers.html             # Research papers page
├── people.html             # Team members page
├── 404.html                # Custom error page
├── sitemap.xml             # SEO sitemap
├── robots.txt              # Crawler instructions
└── README.md               # This file
```

## 🚀 Local Development

### Prerequisites

- A modern web browser
- A local web server (optional but recommended)

### Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/project-maxwell/project-maxwell.github.io.git
   cd project-maxwell.github.io
   ```

2. **Serve locally** (choose one method):

   **Option A: Python (recommended)**
   ```bash
   # Python 3
   python -m http.server 8000
   ```

   **Option B: Node.js**
   ```bash
   npx serve .
   ```

   **Option C: PHP**
   ```bash
   php -S localhost:8000
   ```

3. **Open in browser**: Visit `http://localhost:8000`

## 📝 Content Management

### Adding Research Papers

Edit `js/data.js` and add a new paper object to the `papers` array:

```javascript
{
    id: 'paper-slug',
    title: 'Paper Title',
    subtitle: 'Paper Subtitle',
    status: 'released', // 'released', 'preprint', 'in_submission'
    year: 2024,
    venue: 'Conference/Journal Name',
    authors: ['Author 1', 'Author 2'],
    links: {
        website: 'https://example.com',
        pdf: 'https://example.com/paper.pdf',
        code: 'https://github.com/username/repo'
    },
    keywords: ['Keyword1', 'Keyword2'],
    abstract: 'Paper abstract...'
}
```

### Adding Team Members

Edit `js/data.js` and add a new person object to the `people` array:

```javascript
{
    id: 'person-slug',
    name: 'Full Name',
    role: 'Position/Role',
    affiliation: 'Institution Name',
    links: {
        homepage: 'https://personal-website.com',
        scholar: 'https://scholar.google.com/citations?user=ID',
        github: 'https://github.com/username'
    },
    bio: 'Short biography...',
    type: 'member' // 'lead', 'member', 'advisor'
}
```

## 🚀 Deployment

### GitHub Pages (Automatic)

1. **Push to main branch**: Changes are automatically deployed
2. **Enable GitHub Pages**: Go to repository Settings → Pages → Source: Deploy from a branch
3. **Select branch**: Choose `main` branch and `/ (root)` folder

### Manual Deployment

For other hosting services:

1. **Upload files**: Upload all HTML, CSS, JS files to your web server
2. **Configure**: Ensure server serves `index.html` for directory requests

## 📧 Contact

- **Project Lead**: [Xin Li](https://lixin.ai/)
- **Institution**: Nanyang Technological University, Singapore

---

**Built with ❤️ for the research community**
