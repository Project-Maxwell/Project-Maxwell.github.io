# OpenMaxwell

Website of **OpenMaxwell**, an open research group on large language models and agents for wireless
communications, led by [Xin Li](https://lixin.ai/) at Nanyang Technological University, Singapore.

Site: https://openmaxwell.org

## How it works

A static site built with [Astro](https://astro.build/). Every page is plain HTML with its content in it; the only
script is the light/dark switch. GitHub Actions builds it and publishes `dist/` to GitHub Pages
(`.github/workflows/deploy.yml`; Settings → Pages → Source must be "GitHub Actions").

```
npm ci
npm run dev        # local server with live reload
npm run build      # figures, then the site, into dist/
```

## Where things live

```
src/data/site.ts      name, one-line description, lead, GitHub organisation, the three research directions,
                      which logo the site uses
src/data/papers.ts    every paper, newest first (the first FEATURED appear on the home page)
src/data/people.ts    the group
src/pages/            home, projects, people, join, 404; papers.html redirects old links to projects.html
src/styles/global.css colours (light and dark), type, layout
tools/figures.mjs     the home page figure: electric field lines of an oscillating dipole, computed at build time
tools/logos.mjs       logo variants A and B, written to public/brand/ (npm run logos)
tools/og.mjs          the share card public/og.png and the PNG icons (how to render them is in the file)
public/               served as is: brand/, og.png
```

To add a paper, add an entry to `src/data/papers.ts` with facts checked against the paper itself, and push.

## Settings

- **Site URL**: `MAXWELL_SITE` in `astro.config.mjs` (default `https://openmaxwell.org`). It feeds canonical links,
  the sitemap and the share card.
- **Custom domain**: `public/CNAME` (openmaxwell.org), also set under Settings → Pages.
- **GitHub organisation**: `github` / `githubName` in `src/data/site.ts`.
- **Preview**: `MAXWELL_PREVIEW=1` adds two private pages (`/logo`, `/review`) for decisions still open;
  `MAXWELL_BASE` sets the path the site is served under. Neither is used for a deploy.

## Photo credits

Member photos come from each person's own public pages and are used with the group lead's approval (11-21):

| Person | Source |
| --- | --- |
| Xin Li | https://lixin.ai/ |
| Mengbing Liu | https://liumengbing.com/ (image: /images/mengbing_new.png) |
| Yiyang Zhu | Google Scholar, https://scholar.google.com/citations?user=LWh42_8AAAAJ |
| Jiancheng An | https://jiancheng-an.github.io/ (image: /images/JianchengAn.jpg) |
| Chau Yuen | NTU DR-NTU profile, https://dr.ntu.edu.sg/entities/person/Chau-Yuen |

People without a public photo (Li Wei, Wenhe Zhang) are shown with a field signature generated from their name
(`src/lib/signature.ts`). To add or replace a photo, put a square 280 × 280 WebP in `public/people/`, set `photo` and
`photoSource` in `src/data/people.ts`, and add a row here.

## Project figures

RadioVISTA's card uses its Rome render and ray-traced field from radiovista.github.io. The WirelessMathBench-XL,
WirelessMathBench and LACP cards are redrawn in the site's style (`src/components/illus/`) from the papers' own figures
and text; WirelessMathBench's equations are typeset with KaTeX at build time.
