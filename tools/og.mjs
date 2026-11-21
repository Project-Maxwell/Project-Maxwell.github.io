// Share card and PNG icons. Writes tools/og.html, then renders it with headless Chrome:
//   node tools/og.mjs && google-chrome --headless=new --hide-scrollbars --window-size=1200,630 \
//     --screenshot=public/og.png "file://$PWD/tools/og.html"
//   (icons: open tools/og.html#icon at 180x180 and 32x32 the same way, saving public/brand/icon-180.png / icon-32.png)
import { readFileSync, writeFileSync } from "node:fs";
const field = JSON.parse(readFileSync(new URL("../src/generated/field.json", import.meta.url)));
const markB = readFileSync(new URL("../src/generated/mark-b.svg.txt", import.meta.url), "utf8");
const icon = readFileSync(new URL("../public/brand/icon.svg", import.meta.url), "utf8");
const fonts = new URL("../node_modules/", import.meta.url).href;
const paths = field.paths.map((p) => `<path d="${p.d}" opacity="${p.level < 0 ? 0.32 : 0.55}"/>`).join("");
writeFileSync(new URL("og.html", import.meta.url), `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:S;src:url(${fonts}@fontsource-variable/source-serif-4/files/source-serif-4-latin-opsz-normal.woff2) format("woff2");font-weight:200 900}
@font-face{font-family:M;src:url(${fonts}@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2) format("woff2")}
html,body{margin:0}body{width:1200px;height:630px;background:#F6F4EE;color:#0F1D33;font-family:S;position:relative;overflow:hidden;--field:#2F7BD8}
.f{position:absolute;right:-330px;top:-65px;width:1440px;color:#2F7BD8;-webkit-mask-image:linear-gradient(90deg,transparent 30%,#000 65%)}
.f path{fill:none;stroke:currentColor;stroke-width:1.4}
.t{position:absolute;left:84px;top:96px;width:640px}
.b{display:flex;align-items:center;gap:18px;font-size:44px;color:#16325C}.b svg{width:52px;height:62px}.b b{font-weight:620}
h1{font-size:76px;line-height:1.02;font-weight:520;letter-spacing:-.022em;margin:64px 0 0}h1 em{font-weight:420}
p{position:absolute;left:84px;bottom:64px;margin:0;font-family:M;font-size:19px;letter-spacing:.06em;text-transform:uppercase;color:#6B778C}
#icon{display:none}:target{display:block!important;position:fixed;inset:0;background:#F6F4EE}:target svg{width:100%;height:100%}
</style><div class="f"><svg viewBox="0 0 ${field.width} ${field.height}">${paths}</svg></div>
<div class="t"><div class="b"><svg viewBox="4 -12 92 110" style="color:#16325C">${markB}</svg><span>Open<b>Maxwell</b></span></div>
<h1>LLMs and agents for <em>wireless</em>.</h1></div><p>An open research group · NTU Singapore · openmaxwell.org</p>
<div id="icon">${icon}</div>`);
console.log("og: tools/og.html");
