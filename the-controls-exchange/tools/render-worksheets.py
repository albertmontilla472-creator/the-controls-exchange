#!/usr/bin/env python3
"""Render each worksheet in downloads/*.md as a printable page at the repository root.

The Markdown file stays the editable download; the page (same name, .html) is for reading and printing.
Pages carry no scripts, one hashed <style>, local images only and the current ?v= cache-buster.
Run from the repository root after editing a worksheet or bumping the edition:
    python3 the-controls-exchange/tools/render-worksheets.py
then: python3 the-controls-exchange/tools/check-site.py
"""
import base64
import hashlib
import html
import json
import os
import re
import subprocess

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))

CSS = """:root{color-scheme:light;--red:#d52e24;--ink:#20262d;--muted:#5b6570;--line:#d7dce2;--pane:#f7f8f9;--focus:#2468a5}
*{box-sizing:border-box}body{margin:0;background:#fff;color:var(--ink);font:15px/1.55 "Segoe UI",Arial,sans-serif}
a{color:#a82821;text-underline-offset:3px}a:hover{color:#8a1f19}a:focus-visible{outline:3px solid var(--focus);outline-offset:3px}
.brand-bar{border-top:5px solid var(--red);border-bottom:1px solid var(--line);background:#f3f3f3}
.brand-inner{max-width:880px;margin:0 auto;padding:10px 20px;display:flex;align-items:center;justify-content:space-between;gap:12px}
.brand{display:flex;align-items:center;gap:10px;color:var(--ink);font-weight:600;text-decoration:none}.brand img{display:block}
:root:not([data-theme="dark"]) .theme-dark,:root[data-theme="dark"] .theme-light{display:none!important}
.brand-note{color:var(--muted);font-size:13px}
main{max-width:880px;margin:0 auto;padding:22px 20px 40px}
.breadcrumbs{display:flex;flex-wrap:wrap;gap:6px;font-size:13px;color:var(--muted);margin-bottom:14px}
.eyebrow{margin:0 0 4px;color:#a82821;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase}
h1{margin:0 0 10px;font-size:26px;line-height:1.25}h2{margin:26px 0 10px;padding-top:12px;border-top:1px solid var(--line);font-size:18px}
p{margin:0 0 10px}ul,ol{margin:0 0 12px;padding-left:22px}li{margin:4px 0}
.actions{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin:4px 0 18px;padding:10px 12px;background:var(--pane);border:1px solid var(--line);font-size:14px}
.actions .tip{color:var(--muted)}
.field{display:flex;gap:10px;align-items:flex-end;margin:0 0 8px}.field span:first-child{flex:0 0 auto;font-weight:600}
.field .blank{flex:1;border-bottom:1px solid #8a939c;min-height:1.3em}
.checks{list-style:none;padding-left:0}.checks li{display:flex;gap:9px;align-items:flex-start}
.box{flex:0 0 auto;width:15px;height:15px;margin-top:4px;border:1.5px solid #5b6570;border-radius:2px;background:#fff}
table{width:100%;border-collapse:collapse;margin:6px 0 16px;font-size:14px;font-variant-numeric:tabular-nums}
th,td{border:1px solid #c5ccd3;padding:7px 8px;text-align:left;vertical-align:top}th{background:#eef1f4;font-weight:600}
td:empty{height:2.1em}
code{font-family:Consolas,Menlo,monospace;font-size:13px;background:#f1f3f5;padding:1px 4px;border-radius:3px}
.footer{margin-top:32px;padding-top:14px;border-top:1px solid var(--line);display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px;color:var(--muted);font-size:13px}
@media(max-width:640px){body{font-size:14px}h1{font-size:22px}table{font-size:12px}th,td{padding:5px 4px;word-break:break-word}}
@media print{.brand-bar,.breadcrumbs,.actions,.footer{display:none}body{font-size:11pt;color:#000}main{max-width:none;padding:0}
 h2{break-after:avoid}table,tr,.field{break-inside:avoid}a{color:#000;text-decoration:none}th{background:#eee}}
"""


def theme(mode, css=""):
    """Dark theme from tools/codex/theme.mjs, so worksheets match the rest of the site."""
    cli = os.path.join(ROOT, "the-controls-exchange", "tools", "codex", "theme-cli.mjs")
    return subprocess.run(["node", cli, mode], input=css, capture_output=True, text=True, check=True).stdout


def csp_hash(text):
    return "'sha256-" + base64.b64encode(hashlib.sha256(text.encode("utf-8")).digest()).decode() + "'"


def inline(text):
    out = html.escape(text, quote=False)
    out = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", out)
    out = re.sub(r"`([^`]+)`", r"<code>\1</code>", out)
    out = re.sub(r"\[([^\]]+)\]\((https://[^)\s]+)\)", r'<a href="\2" target="_blank" rel="noopener noreferrer">\1</a>', out)
    return out


def render_markdown(md):
    lines = md.replace("\r\n", "\n").split("\n")
    out, i, title = [], 0, ""
    while i < len(lines):
        line = lines[i]
        if not line.strip():
            i += 1
            continue
        if line.startswith("# "):
            title = line[2:].strip()
            i += 1
            continue
        if line.startswith("## "):
            out.append("<h2>%s</h2>" % inline(line[3:].strip()))
            i += 1
            continue
        if line.startswith("|"):
            rows = []
            while i < len(lines) and lines[i].startswith("|"):
                rows.append([c.strip() for c in lines[i].strip().strip("|").split("|")])
                i += 1
            head, body = rows[0], [r for r in rows[1:] if not all(re.fullmatch(r":?-{3,}:?", c) for c in r)]
            out.append("<table><thead><tr>%s</tr></thead><tbody>%s</tbody></table>" % (
                "".join("<th>%s</th>" % inline(c) for c in head),
                "".join("<tr>%s</tr>" % "".join("<td>%s</td>" % inline(c) for c in r) for r in body)))
            continue
        if re.match(r"- \[[ xX]\] ", line):
            items = []
            while i < len(lines) and re.match(r"- \[[ xX]\] ", lines[i]):
                items.append('<li><span class="box" aria-hidden="true"></span><span>%s</span></li>' % inline(lines[i][6:]))
                i += 1
            out.append('<ul class="checks">%s</ul>' % "".join(items))
            continue
        if line.startswith("- "):
            items = []
            while i < len(lines) and lines[i].startswith("- "):
                items.append("<li>%s</li>" % inline(lines[i][2:]))
                i += 1
            out.append("<ul>%s</ul>" % "".join(items))
            continue
        if re.match(r"\d+\. ", line):
            items = []
            while i < len(lines) and re.match(r"\d+\. ", lines[i]):
                items.append("<li>%s</li>" % inline(re.sub(r"^\d+\. ", "", lines[i])))
                i += 1
            out.append("<ol>%s</ol>" % "".join(items))
            continue
        if re.fullmatch(r"[^:|#]{1,80}:\s*", line):
            out.append('<p class="field"><span>%s</span><span class="blank"></span></p>' % inline(line.strip()))
            i += 1
            continue
        para = [line.strip()]
        i += 1
        while i < len(lines) and lines[i].strip() and not re.match(r"(#|\||- |\d+\. )", lines[i]) and not re.fullmatch(r"[^:|#]{1,80}:\s*", lines[i]):
            para.append(lines[i].strip())
            i += 1
        out.append("<p>%s</p>" % inline(" ".join(para)))
    return title, "\n".join(out)


def page(title, body, md_file, version, css, boot):
    csp = ("default-src 'none'; script-src %s; script-src-attr 'none'; style-src %s; style-src-attr 'none'; img-src 'self'; "
           "connect-src 'none'; frame-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'; worker-src 'none'; "
           "media-src 'none'; font-src 'none'; manifest-src 'none'; upgrade-insecure-requests;" % (csp_hash(boot), csp_hash(css)))
    short = re.sub(r"^The Controls Exchange\s+—\s+", "", title)
    return ('<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="%s">'
            '<meta name="viewport" content="width=device-width,initial-scale=1"><meta name="referrer" content="no-referrer">'
            '<meta name="theme-color" content="#d52e24"><title>%s | The Controls Exchange</title>'
            '<link rel="icon" type="image/svg+xml" href="controls-exchange-mark.svg?v=%s"><script>%s</script><style>%s</style></head><body>'
            '<header class="brand-bar"><div class="brand-inner"><a class="brand" href="index.html#library/home">'
            '<img class="theme-light" src="controls-exchange-mark-clear.svg?v=%s" alt="" width="30" height="30">'
            '<img class="theme-dark" src="controls-exchange-mark-clear-dark.svg?v=%s" alt="" width="30" height="30">The Controls Exchange</a>'
            '<span class="brand-note">Free study worksheet</span></div></header><main>'
            '<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="index.html#library/home">Home</a><span aria-hidden="true">/</span>'
            '<a href="index.html#software/downloads">Software &amp; worksheets</a></nav>'
            '<p class="eyebrow">Printable worksheet</p><h1>%s</h1>'
            '<div class="actions"><span class="tip">Print or save as PDF with your browser (Ctrl+P / Cmd+P).</span>'
            '<a href="downloads/%s" download="%s">Download the editable Markdown file ↓</a></div>%s'
            '<footer class="footer"><span>Original worksheet from The Controls Exchange. Free to print and use.</span>'
            '<span><a href="privacy.html">Privacy</a> · <a href="terms.html">Terms &amp; notices</a></span></footer>'
            '</main></body></html>\n') % (csp, html.escape(short), version, boot, css, version, version, html.escape(short), md_file, md_file, body)


def main():
    index = open(os.path.join(ROOT, "index.html"), encoding="utf-8").read()
    data = json.loads(re.search(r'<script id="library-data" type="application/json">(.*?)</script>', index, re.S).group(1))
    version = data["release"]["version"]
    css, boot = theme("dark", CSS), theme("boot")
    for d in data["downloads"]:
        md = open(os.path.join(ROOT, "downloads", d["file"]), encoding="utf-8").read()
        title, body = render_markdown(md)
        name = d["file"][:-3] + ".html"
        with open(os.path.join(ROOT, name), "w", encoding="utf-8") as fh:
            fh.write(page(title or d["title"], body, d["file"], version, css, boot))
        print("wrote", name)


if __name__ == "__main__":
    main()
