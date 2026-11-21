# OpenMaxwell

Website of **OpenMaxwell**, an open research group on large language models and agents for wireless communications, led by
[Xin Li](https://lixin.ai/) at Nanyang Technological University, Singapore.

Site: https://openmaxwell.org

## How it works

A single static page in `site/`, with no build step and no JavaScript. GitHub Actions (`.github/workflows/deploy.yml`) publishes
`site/` to GitHub Pages on every push to `master` (Settings → Pages → Source: GitHub Actions; custom domain openmaxwell.org).

```
site/index.html, style.css   the whole page: hero, lead project, research, news, people, join
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
