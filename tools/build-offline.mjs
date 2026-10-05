// Builds a single, self-contained VCFDesigner.html from the captured Vite build in source/www.
//
// The captured build needs an HTTP server only because of how it is packaged:
//   - <script type="module"> and dynamic import() are blocked by browsers on file:// (CORS, origin "null")
//   - asset URLs are absolute ("/assets/...") and resolve to the drive root on file://
//   - react-router uses browser history (real URL paths), which cannot work on file://
//
// This script re-bundles every chunk into one classic (non-module) script, inlines the CSS and
// logo, and patches the few places that assume an http:// origin. The result opens directly
// from disk by double-clicking, with no PowerShell, server, or network access.
//
// Usage: npm install && npm run build   ->   dist/VCFDesigner.html

import { build } from 'esbuild';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const www = join(repo, 'source', 'www');
const assets = join(www, 'assets');
const outFile = join(repo, 'dist', 'VCFDesigner.html');

// Each patch must match exactly once, so a changed upstream build fails loudly instead of silently.
function patch(code, file, find, replace, why) {
  const count = code.split(find).length - 1;
  if (count !== 1) throw new Error(`${file}: expected 1 match for patch "${why}", found ${count}`);
  return code.replace(find, typeof replace === 'function' ? replace : () => replace);
}

const entryPatches = [
  {
    why: 'hash routing instead of browser-history routing',
    // react-router's createBrowserHistory (minified as l_), rewritten as its createHashHistory.
    // Xr = parsePath, Nc = createLocation, Ka = createPath, d_ = getUrlBasedHistory.
    find:
      'function l_(t){t===void 0&&(t={});function e(s,r){let{pathname:i,search:a,hash:o}=s.location;' +
      'return Nc("",{pathname:i,search:a,hash:o},r.state&&r.state.usr||null,r.state&&r.state.key||"default")}' +
      'function n(s,r){return typeof r=="string"?r:Ka(r)}return d_(e,n,null,t)}',
    replace:
      'function l_(t){t===void 0&&(t={});function e(s,r){let{pathname:i="/",search:a="",hash:o=""}=Xr(s.location.hash.substr(1));' +
      'i.startsWith("/")||i.startsWith(".")||(i="/"+i);' +
      'return Nc("",{pathname:i,search:a,hash:o},r.state&&r.state.usr||null,r.state&&r.state.key||"default")}' +
      'function n(s,r){return"#"+(typeof r=="string"?r:Ka(r))}return d_(e,n,null,t)}',
  },
  {
    why: 'skip Vite chunk/CSS preloading (everything is already inlined)',
    find: 'let r=Promise.resolve();if(n&&n.length>0){',
    replace: 'let r=Promise.resolve();if(!1){',
  },
  {
    why: 'header logo',
    find: 'src:"/logo.svg"',
    replace: () => `src:${JSON.stringify(logo)}`,
  },
  {
    why: 'error page "Go home" button',
    find: 'window.location.href="/"',
    replace: '(window.location.hash="#/",window.location.reload())',
  },
];

// Chunks referenced by the app but absent from the HAR capture.
const stubChunk = (name) =>
  `import {j as jsx} from "./${vendorReactflow}";
export default function Unavailable({onClose}={}){return jsx.jsxs("section",{style:{padding:"32px",color:"#dce9f5",background:"#142132"},children:[jsx.jsx("h2",{children:"Feature unavailable in this capture"}),jsx.jsx("p",{children:"This feature was not captured in the supplied HAR: ${name}. Other captured features remain available."}),onClose?jsx.jsx("button",{onClick:onClose,children:"Close"}):jsx.jsx("a",{href:"#/",children:"Back to dashboard"})]})}
`;

const logo = 'data:image/svg+xml;base64,' + (await readFile(join(www, 'logo.svg'))).toString('base64');
const indexHtml = await readFile(join(www, 'index.html'), 'utf8');
const entryName = indexHtml.match(/<script type="module"[^>]*src="\/assets\/([^"]+)"/)[1];
const cssNames = [...indexHtml.matchAll(/<link rel="stylesheet"[^>]*href="\/assets\/([^"]+)"/g)].map((m) => m[1]);
const vendorReactflow = indexHtml.match(/href="\/assets\/(vendor-reactflow-[^"]+\.js)"/)[1];

const offlinePlugin = {
  name: 'offline',
  setup(b) {
    b.onResolve({ filter: /^\.\/.*\.js$/ }, async (args) => {
      const path = join(args.resolveDir, args.path);
      try {
        await readFile(path);
        return { path };
      } catch {
        console.warn(`  stubbed missing chunk ${basename(path)}`);
        return { path, namespace: 'stub', pluginData: { resolveDir: args.resolveDir } };
      }
    });
    b.onLoad({ filter: /.*/, namespace: 'stub' }, (args) => ({
      contents: stubChunk(basename(args.path)),
      resolveDir: args.pluginData.resolveDir,
      loader: 'js',
    }));
    b.onLoad({ filter: /\.js$/, namespace: 'file' }, async (args) => {
      const file = basename(args.path);
      let code = await readFile(args.path, 'utf8');
      if (file === entryName) {
        for (const p of entryPatches) code = patch(code, file, p.find, p.replace, p.why);
      }
      // "Back to dashboard" links in the captured stub chunks.
      if (code.includes('Feature unavailable in this capture')) {
        code = patch(code, file, 'href:"/"', 'href:"#/"', 'stub back link');
      }
      return { contents: code, loader: 'js' };
    });
  },
};

console.log(`Bundling ${entryName} ...`);
const result = await build({
  entryPoints: [join(assets, entryName)],
  bundle: true,
  format: 'iife',
  splitting: false,
  minify: true,
  charset: 'utf8',
  target: 'es2020',
  legalComments: 'none',
  logLevel: 'error', // upstream minified code triggers harmless lint warnings
  write: false,
  // vendor-docx has a Node-only require("buffer") fallback that never runs in a browser.
  external: ['buffer'],
  plugins: [offlinePlugin],
});
let js = result.outputFiles[0].text;

// Keep the inline script from being closed or comment-escaped early by the HTML parser.
js = js.replace(/<\/(script)/gi, '<\\/$1').replace(/<!--/g, '\\x3C!--');

let css = '';
for (const name of cssNames) css += (await readFile(join(assets, name), 'utf8')) + '\n';
css = css.replace(/<\/(style)/gi, '<\\/$1');

// A few plain <a href="/..."> links bypass the router; turn them into hash routes on click.
const linkShim = `<script>
      document.addEventListener('click', function (e) {
        var a = e.target.closest && e.target.closest('a[href^="/"]:not([href^="//"])');
        if (!a || e.defaultPrevented) return;
        e.preventDefault();
        location.hash = '#' + a.getAttribute('href');
      });
    </script>`;

let html = indexHtml
  .replace(/\s*<script type="module"[^>]*><\/script>/, '')
  .replace(/\s*<link rel="modulepreload"[^>]*>/g, '')
  .replace(/\s*<link rel="stylesheet"[^>]*>/g, '')
  .replace(/\s*<!-- Cloudflare Pages Analytics -->/g, '')
  .replace('href="/logo.svg"', `href="${logo}"`);
// Use function replacers so "$" sequences in the bundle are not treated as replacement patterns.
html = html.replace('</head>', () => `    ${linkShim}\n    <style>\n${css}</style>\n  </head>`);
html = html.replace('</body>', () => `<script>\n${js}</script>\n</body>`);

await mkdir(dirname(outFile), { recursive: true });
await writeFile(outFile, html);
console.log(`Wrote ${outFile} (${(html.length / 1024 / 1024).toFixed(1)} MB)`);
