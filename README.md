# OpenMaxwell

Website of **OpenMaxwell**, an open research group on large language models and agents for wireless communications, led by
[Xin Li](https://lixin.ai/) at Nanyang Technological University, Singapore.

Site: https://openmaxwell.org

## How it works

A small static site in `site/` (home page plus four sub-pages), with no build step and no JavaScript. GitHub Actions (`.github/workflows/deploy.yml`) publishes
`site/` to GitHub Pages on every push to `master` (Settings → Pages → Source: GitHub Actions; custom domain openmaxwell.org).

```
site/index.html              home, the overview: hero, lead project, research, latest news, people in brief, join
site/research.html           all five papers in full; news.html, people.html, join.html likewise (hand-written HTML:
                             a fact that changes must be edited on the home page and on its sub-page)
site/projects.html, papers.html   redirects to research.html
site/style.css               one stylesheet for all pages; screens 1700px and wider are scaled up with `zoom`
site/fonts/                  Archivo (self-hosted, SIL OFL 1.1)
site/figures/                each paper's own Figure 1; RadioVISTA's Rome render from radiovista.github.io
site/brand/                  favicons
site/og.png                  share image (1200 × 630)
site/projects.html, papers.html, people.html, news.html, join.html
                             old addresses from the 2025 site, redirecting to the matching section (#research, #people, #news, #join)
site/404.html, robots.txt, sitemap.xml, CNAME
```

To preview locally: `python3 -m http.server -d site 8000`.

The page sets a Content-Security-Policy that allows only its own files (no external fonts, scripts or images), so new assets
must be added to `site/`.

The 2025-26 Astro version of the site is in the git history (commit d5695f4 and earlier).
