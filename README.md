# VCFDesigner – offline

A fully offline copy of VCFDesigner that runs as **one HTML file**. You don't need a web server, PowerShell or a network connection.

**To use it:** copy `dist/VCFDesigner.html` anywhere (local disk, USB stick, file share) and double-click it.

## Why the PowerShell server is no longer needed

The original package (`source/`) shipped `START-OFFLINE.cmd` + `server.ps1`, a small localhost web server. It had nothing to compute. It existed only because the captured Vite build can't run from `file://`:

| Problem on `file://` | Fix in `dist/VCFDesigner.html` |
|---|---|
| `<script type="module">` and lazy `import()` chunks are blocked by the browser (origin `null`) | All JS chunks are bundled into one classic inline script |
| Absolute URLs (`/assets/…`, `/logo.svg`, a few plain links) point at the drive root | CSS and logo are inlined, Vite's chunk preloader is disabled, and plain links are routed in the app |
| React Router uses real URL paths (`/domains`, `/nsx`, …) | Switched to hash routing (`VCFDesigner.html#/domains`) |

The Content-Security-Policy is kept as a `<meta>` tag, so the page still cannot contact external hosts.

## Moving your existing designs

The browser keys saved designs by origin. Designs saved while running on `http://127.0.0.1:8765` won't show up automatically in the file version.

1. In the old version, go to **Export → JSON** for each design.
2. In `VCFDesigner.html`, use **Import**.

Keep JSON exports as backups. In some browsers (notably Firefox), renaming or moving the HTML file can give it a fresh, empty storage area.

## Features missing from the capture

These features were not in the original capture, so they show "Feature unavailable in this capture". That is the same behaviour as the server version:
Help, Disaster Recovery, Migration Planner, Workload Mobility, External Comparison, the Pricing/Refund pages, and the **Document Pack** (ZIP) export.
The HLD, Technical Summary (LLD), Executive Brief, Runbook, Excel, draw.io and JSON exports all work.

## Rebuilding

```sh
npm install
npm run build      # source/www  ->  dist/VCFDesigner.html
```

`tools/build-offline.mjs` uses esbuild to re-bundle the build. It applies a few exact-match patches and fails loudly if a newer capture no longer matches them.
