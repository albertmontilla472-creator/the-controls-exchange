# Public Codex rendering tools

These helpers share the rendering process without copying the private source
archive, backup configuration or machine-specific paths. They are maintenance
tools; the website does not import or execute them.

`generate-public.mjs` is a public-only adapter around the original rendering
modules. It reads the current repository's `index.html`, validates its public data,
and reproduces the workbench, ten collection pages, collection index,
privacy/terms, sitemap and robots file. All sixteen generated files were compared
with edition 5.39 and matched exactly.

Run from the repository root with Node.js:

```bash
node the-controls-exchange/tools/codex/generate-public.mjs --check
```

This checks only, with no writes. To extract the current public template, CSS,
app script and data into editable files outside the checkout:

```bash
node the-controls-exchange/tools/codex/generate-public.mjs --extract-dir ../cx-public-source
```

To render a separate draft from those files:

```bash
node the-controls-exchange/tools/codex/generate-public.mjs --source-dir ../cx-public-source --output-dir ../cx-public-draft
```

Without `--source-dir`, rendering uses the current public `index.html` directly.
Writes must target a directory outside the checkout. The helper does not change
the release, approve new domains/assets, copy drafts into the repository or publish.
Review the draft and follow the preview/publish rules before applying it.

The adjacent modules contain the original collection renderer, CSP/link
validation, fixed reviewed artwork/pins, folder-icon resolver, search matching,
resource reporting, share-card validation and addition-date helper. The public
security export omits the private archive's identifying URL. No nonpublic dataset,
study-note backup, credential or private publication state is included.

When editing icons or the app, update the corresponding exported module as well
as the public app. An old helper must not overwrite newer hand edits. Pull and
read the shared guide first; `--check` reports renderer drift for review.

After reviewing new logo artwork, update its public fingerprint inventory:

```bash
python3 the-controls-exchange/tools/check-site.py --write-icon-manifest
```

Also update `icons.mjs` when using this renderer: its immutable dimension/hash pins
are a separate validation gate. Never regenerate pins merely to accept an
unexpected file. For manual inline edits, `--fix-hashes` belongs to `check-site.py`;
the renderer calculates CSP hashes itself.
