# Site guide: how The Controls Exchange is built

Reference for anyone (Claude, Codex or a person) changing the site. It describes the site as of **edition 5.38 (November 3, 2026)**. Update this file when the architecture changes.

## 1. What the site is

A free, independent directory of BAS (building automation) training: videos, playlists and public documentation for Niagara AX/N4/N5, Honeywell Optimizer/IRM, Classic Spyder, Spyder Model 5/7, CIPer Model 30/50, JCI Facility Explorer/CCT, Distech EC-gfxProgram, VYKON Pro and general BAS learning. It links to the original creators and never rehosts their material.

- Live site: https://albertmontilla472-creator.github.io/the-controls-exchange/
- Hosting: GitHub Pages, published from the **`main` branch, repository root**. Whatever is on `main` is live. There is no build step on the server (`.nojekyll` is present, so every file is served as-is).
- No backend, accounts, analytics, ads, trackers, embeds, web fonts or third-party scripts.

The interface is modelled on a **Niagara / Honeywell Optimizer Workbench** (menu bar, Nav tree, Learning palette, tabs, Properties inspector, status bar), restyled in the site's own red, charcoal and white. The tree mirrors Workbench: `My Host → Platform` and `My Host → Station (The Controls Exchange) → Home / Config / Files`.

## 2. Files

| File | What it is |
| --- | --- |
| `index.html` (~815 KB) | The whole learning workbench app: inline CSS, an inline JSON data block with every resource, and one inline app script. |
| `collections.html` | Index of the 10 shareable collection pages. |
| `bas-fundamentals.html`, `niagara-ax.html`, `niagara-4.html`, `niagara-5.html`, `honeywell-optimizer-irm.html`, `honeywell-classic-spyder.html`, `honeywell-spyder-model-5-7.html`, `honeywell-ciper.html`, `jci-fx-cct.html`, `distech-gfx.html` | **Pre-rendered** static collection pages (work without JavaScript). Each has its own small CSS and a tiny search script. |
| `privacy.html`, `terms.html` | Static notices. Their text mirrors `publicSite.privacy` / `publicSite.terms` in the data (keep both in sync). Their `<style>` is an **exact copy** of `index.html`'s `<style>`. No scripts. |
| `controls-exchange-mark.svg`, `-logo.svg`, `-icon.svg`, `favicon.svg`, `controls-exchange-share.png` | Brand artwork (the red "CX" mark, Home logo, social share image 1200×630). |
| `icons/` | Local logo files: `creator-*.png` (128×128 creator logos), `brand-vykon.png`, `ec-gfxprogram.png`, `facility-explorer.png`, `niagara-generations.webp`. Fingerprints are pinned in `the-controls-exchange/icons-manifest.json`. |
| `downloads/*.md` | Three original study worksheets (signal path, BACnet point checkout, programming practice). |
| `README.md` | Public project description. Each release appends an "Edition X.YZ" paragraph. |
| `SECURITY.md`, `robots.txt`, `sitemap.xml` | Security policy, crawler rules, and the list of public collection pages. |

There is **no generator script in the repository**. Earlier editions were produced by Codex with its own scripts. Edit the files directly (or with small one-off scripts) and verify with the tools in `the-controls-exchange/tools/`.

## 3. Content Security Policy: the #1 way to break the site

Every page has a `<meta http-equiv="Content-Security-Policy">` that allows inline code **only by SHA-256 hash**:

- `index.html` pins **two** script hashes, in document order: the JSON data block (`<script id="library-data" type="application/json">`), then the app script. It pins one style hash.
- Collection pages pin their one script and one style.
- `privacy.html` and `terms.html` have `script-src 'none'` and pin the shared style hash.
- `style-src-attr 'none'` and `script-src-attr 'none'`: **no `style="..."` attributes and no `onclick=` handlers anywhere.** Use classes and `addEventListener`.
- `img-src 'self'`: images must be local files (or inline SVG). No remote images.
- `connect-src 'none'`: no fetch/XHR.

If you change a single character inside any inline `<script>` or `<style>` (including the resource data), the hash changes. A wrong script hash makes **the whole page blank** (the app script is blocked). After any such edit run:

```bash
python3 the-controls-exchange/tools/check-site.py --fix-hashes
```

When `index.html`'s CSS changes, copy the identical `<style>` block into `privacy.html` and `terms.html` too, then fix hashes.

## 4. The data model (`index.html` → `<script id="library-data">`)

One JSON object. It round-trips byte-for-byte with:

```python
json.dumps(data, ensure_ascii=False, separators=(",", ":"))
```

Always write it back that way (compact, real Unicode characters such as ’ and ·, no `\u` escapes). Never put `</` inside a string.

Top-level keys:

| Key | Purpose |
| --- | --- |
| `groups` (7) | One per track: `niagara`, `optimizer`, `spyder`, `jci`, `distech`, `ciper`, `bas`. Name, intro, main source, note. |
| `items` (292) | Every learning resource (see below). |
| `sessions` (7) | Beginner study sequence blocks (Home "New to BAS?" route). |
| `programming` (5) | Programming paths: `kitcontrol`, `irm`, `classic-spyder`, `cct`, `gfx`. Each lists resource ids in order. |
| `recommended` | `publishers` (25 creators): name, channel, website, focus, description, access, scope. |
| `news` | Dated BAS news & references (6 items) plus review date. |
| `niagara5` | Release watch cards. |
| `software` (5), `downloads` (3) | Free tools and the original worksheets. |
| `sources` (10), `learningCards` (3) | Sources & updates page and Home cards. |
| `niagaraGenerations` (3) | `ax`, `n4`, `n5` labels and descriptions. |
| `collectionPages` (10) | Static page file → workbench folder id. |
| `release` | `version`, `updated`, `changes` of the current edition. |
| `maintenance` (56) | Full release history, newest first: `version`, `date`, `review`, `changes`. Shown on Sources & updates. |
| `publicSite` | Brand, title, description, repo URLs, `updated`, and the privacy/terms text. |
| `security.approvedHosts` | Allowlist of link hostnames. **A URL whose host is not listed renders as `#`.** |
| `retiredResourceIds` | Ids that were removed. They are reserved forever so old saved notes never attach to a different resource. |

### A resource record (`items[]`)

```json
{
  "id": "N90", "track": "niagara", "title": "…", "url": "https://…", "source": "https://…",
  "type": "Video | Supporting documentation | Playlist | Video library | …",
  "duration": "12 min | PDF reference | …", "minutes": 12,
  "focus": "What to learn from it (one sentence, imperative).",
  "note": "Scope, version caveats, licensing context.",
  "metadata": { "provider": "…", "tool": "…", "generation": "…", "stage": "…", "version": "…",
                "format": "…", "topic": "…", "niagaraVersions": ["n4"], "publishedAt": "2020-11-12" },
  "provider": "…", "tool": "…", "generation": "…", "stage": "Foundation | Next | Advanced | Reference",
  "version": "…", "format": "Tutorial | Lesson | Reference | Webinar | Class recording | Podcast | Feature demo | Playlist | Collection | Overview",
  "topic": "Programming | Graphics | Commissioning | …",
  "trackName": "Niagara training",
  "access": "Public link", "accessLabel": "Public link",
  "checked": "October 30, 2026",
  "added": true, "addedEdition": "5.35",
  "cue": "…", "publicFree": true, "accessDisplay": "Free public resource", "newInEdition": false,
  "practiceAccess": "Learning material is free to view. …"
}
```

Rules:

- **Ids are permanent.** Prefix by track: `N` niagara, `H` optimizer, `S` spyder, `C` ciper, `J` jci, `D` distech, `B` bas, then a number. Use the next free number (`check-site.py` prints them). Never renumber, never reuse a retired id. Browser study notes are keyed by id.
- The **flat fields duplicate `metadata`** (`provider`, `tool`, `generation`, `stage`, `version`, `format`, `topic`, plus `niagaraVersions`, `ciperModels`, `serviceModules`, `platformSections`, `publishedAt` when present). Keep both identical; the checker enforces it.
- `trackName` must equal the matching `groups[].name`.
- `checked` is the date the link was verified, written like `October 30, 2026`.
- `addedEdition` must be an edition in `maintenance`; that is how Home's "Recently added learning" dates appear. Use the true addition edition and don't change it later.
- `format: "Reference"` means documentation (listed under Documentation / PDFs, document icon). Everything else is a video or collection.
- `cue` is derived from format: videos use "Watch and explain the signal path, then note one thing you would test at the equipment."; references use "Find the matching task in this reference and check its documented release and hardware scope."; playlists/collections use "Use this collection to choose a lesson that supports the sequence or problem you are working on."
- `practiceAccess` default: "Learning material is free to view. Repeating vendor-tool demonstrations may require licensed software and compatible hardware." (BAS track and VYKON Pro have their own wording; copy from a sibling record.)
- Track-specific fields: Niagara needs `niagaraVersions` (`ax`/`n4`/`n5`); CIPer needs `ciperModels` (`30`/`50`); VYKON Pro uses `serviceModules: ["vykon-pro"]`; Platform lessons use `platformSections` (`commissioning`, `software-manager`, `tcp-ip`, `backup`, …).
- Only **free, public** material. No paid courses, enrollment catalogs, partner-only or login-gated material, no affiliate links.

## 5. How the Nav tree is built (automatic)

The app script builds the folder tree from the data at load time (`addFolder(...)` calls). You rarely edit the tree directly:

- `Drivers` → `Niagara` (→ AX / N4 / N5 → Videos & collections → per-tool → per-topic folders, plus Documentation), `Honeywell` (→ Optimizer/IRM, Spyder, CIPer → Model 30 / Model 50), `JCI`, `Distech`. Each distinct `tool` in a track gets its own folder, and a tool folder gets topic subfolders when its resources span more than one `topic`. (For Niagara, tool folders are built from videos only and sit under each generation's Videos & collections.)
- `Services` → Alarms, Histories, Schedules, Security, Tags / queries (by `topic`), and VYKON Pro (by `serviceModules`).
- `Platform` → Commissioning Wizard, Software Manager, TCP/IP Configuration, Backup & restore (by `platformSections`), Documentation.
- `General BAS Learning` → `BAS advanced` (track `bas`, tool `General BAS learning`, newest `publishedAt` first) and `BAS fundamentals` (tool `BAS fundamentals`).
- `Programming` → one folder per `programming[]` path.
- `Files` → Documentation, Recommended resources, Software & worksheets. `History` → Controls news, Release watch, Sources & updates.

So a new `tool` or `topic` value creates a new folder. Reuse existing values unless a new folder is intended. Folder icons come from `nodeIcon` (topic → tool → keyword fallbacks).

Deep links are `index.html#<view>/<folderId>`, e.g. `index.html#library/niagara-n4`. Static pages link to these. **Don't rename folder ids.**

Count badges show immediate contents. They are computed, never hand-typed.

## 6. Icons and logos

- Folder/function icons are original inline SVG in `iconArt` (in the app script).
- Video rows show the **creator's logo** via `creatorIconByProvider` (provider name → icon key). The key is either an `iconArt` entry or `icons/<key>.png`. Documents always show the document icon. Unknown or unverified creators show the generic video icon. Don't guess a logo.
- New logo: verify it is the creator's real mark, save it as a 128×128 PNG in `icons/`, add the mapping, then run `check-site.py --write-icon-manifest` to pin it.
- Manufacturer marks (Honeywell, Niagara AX/N4/N5, Facility Explorer, EC-gfxProgram, VYKON, JCI, Distech) are used only to identify products. Terms & notices says they imply no endorsement.

## 7. Browser storage (never break it)

| Key | Holds |
| --- | --- |
| `albert-controls-study-v1` | Saved lessons, studied marks, notes (by resource id). |
| `albert-ame-controls-study-v1` | Legacy key, read as a fallback when the current key is empty. Cleared together with it. |
| `controls-exchange-sidebar-width-v1` | Sidebar width preference. |
| `hvac-smarty-pants-explorer-split-v1` | Tree/palette split (legacy name, kept on purpose). |

Never rename these keys. Nothing is written just by browsing, only when the visitor saves something.

## 8. Static collection pages

Each `collectionPages[]` entry maps a page to a workbench folder. The pages are **fully pre-rendered**: an `<article class="resource collection-filter-row" id="resource-N39" data-resource-id="N39" data-find="…">` per resource, with videos first, then a Documentation / PDFs section, and header counts such as "3 resources · 1 videos & collections · 2 documents".

When resources are added, edited or removed, the matching collection page(s) must be updated by hand (copy a sibling `<article>` and adjust it). `check-site.py` flags ids or links that no longer match the data. Every page also carries the `?v=<edition>` cache-buster on the mark image and favicon.

## 9. Links and reporting

- Every external link: `https://` only, host in `security.approvedHosts`, `target="_blank" rel="noopener noreferrer"`. Pages send `no-referrer`.
- "Report via Gmail" builds a `mail.google.com/mail/?view=cm…` compose link to smarty.ctrl@gmail.com with the resource id, title and URL. Nothing is sent automatically.

## 10. Writing style

- Calm, factual, credit-first. Name the original creator, say what the resource covers, say what it doesn't cover.
- Label versions and dates honestly: "historical", "2019 series", "plans remain labeled as plans", "checked October 20, 2026".
- Licensing caveat whenever a lesson demonstrates a vendor tool.
- No hype, no "best", no claims of affiliation or endorsement.
- Dates are written `November 3, 2026`. Edition numbers are `5.38`.
- Release notes say what changed and what was **preserved** (ids, study records, counts, layout).

## 11. Verify before every push

```bash
python3 the-controls-exchange/tools/check-site.py
node the-controls-exchange/tools/smoke-test.js
```

The first is static (hashes, data rules, versions, links, icons, collection pages). The second loads every page in headless Chromium at desktop and phone sizes and fails on any console error, which is how a CSP mistake shows up.
