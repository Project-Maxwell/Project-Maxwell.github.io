// OpenMaxwell site. Static output: every page is plain HTML with its content in it.
//   MAXWELL_SITE      the site's public URL (canonical links, sitemap, share cards). Change it here or in the
//                     environment. The custom domain is in public/CNAME.
//   MAXWELL_BASE      path the site is served under (default "/"; the private preview uses /p/maxwell-preview/).
//   MAXWELL_LOOK      b (the chosen direction, default); a, the editorial alternative, is no longer maintained.
//   MAXWELL_PREVIEW=1 also builds /logo and /review, the pages for choices still open; never set it for a deploy.
import { defineConfig } from "astro/config";

const SITE = process.env.MAXWELL_SITE || "https://openmaxwell.org";
const BASE = process.env.MAXWELL_BASE || "/";
const PREVIEW = process.env.MAXWELL_PREVIEW === "1";
const LOOK = process.env.MAXWELL_LOOK === "a" ? "a" : "b";   // design direction under review: a (editorial) or b (bold)

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: "ignore",
  build: { format: "file" },
  integrations: [
    {
      name: "maxwell-preview-pages",
      hooks: {
        "astro:config:setup": ({ injectRoute }) => {
          if (!PREVIEW) return;
          injectRoute({ pattern: "/logo", entrypoint: "./src/preview/logo.astro" });
          injectRoute({ pattern: "/review", entrypoint: "./src/preview/review.astro" });
        },
      },
    },
  ],
  vite: { define: { "import.meta.env.MAXWELL_PREVIEW": JSON.stringify(PREVIEW), "import.meta.env.MAXWELL_LOOK": JSON.stringify(LOOK) } },
});
