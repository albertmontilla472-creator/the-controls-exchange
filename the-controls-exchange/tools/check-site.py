#!/usr/bin/env python3
"""Pre-publish checks for The Controls Exchange.

Run from the repository root:

    python3 the-controls-exchange/tools/check-site.py               # check only
    python3 the-controls-exchange/tools/check-site.py --fix-hashes  # rewrite CSP hashes, then check
    python3 the-controls-exchange/tools/check-site.py --write-icon-manifest

Standard library only, so it runs the same for Claude, Codex or a person.
Exit code 0 means no errors (warnings are informational).
"""
import base64
import glob
import hashlib
import json
import os
import re
import struct
import sys
from collections import Counter
from urllib.parse import urlparse

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
MANIFEST = os.path.join(ROOT, "the-controls-exchange", "icons-manifest.json")
TRACK_PREFIX = {"niagara": "N", "optimizer": "H", "spyder": "S", "ciper": "C",
                "jci": "J", "distech": "D", "bas": "B"}
ALWAYS_PRESENT = ["id", "title", "url", "type", "access", "duration", "focus", "note", "track",
                  "trackName", "tool", "generation", "provider", "stage", "version", "format",
                  "accessLabel", "minutes", "topic", "checked", "source", "cue", "publicFree",
                  "accessDisplay", "newInEdition", "practiceAccess"]
DATE_RE = re.compile(r"^(January|February|March|April|May|June|July|August|September|October|November|December) \d{1,2}, \d{4}$")

errors, warnings = [], []


def err(msg):
    errors.append(msg)


def warn(msg):
    warnings.append(msg)


def sha(text):
    return base64.b64encode(hashlib.sha256(text.encode("utf-8")).digest()).decode()


def read(path):
    with open(os.path.join(ROOT, path), encoding="utf-8") as fh:
        return fh.read()


def write(path, text):
    with open(os.path.join(ROOT, path), "w", encoding="utf-8", newline="") as fh:
        fh.write(text)


SCRIPT_RE = re.compile(r"<script([^>]*)>(.*?)</script>", re.S)
STYLE_RE = re.compile(r"<style[^>]*>(.*?)</style>", re.S)
CSP_RE = re.compile(r'(http-equiv="Content-Security-Policy" content=")([^"]*)(")')


def expected_hashes(html):
    # Site convention: every inline <script> body is pinned, including the JSON data block.
    scripts = [sha(body) for attrs, body in SCRIPT_RE.findall(html) if "src=" not in attrs]
    styles = [sha(body) for body in STYLE_RE.findall(html)]
    return scripts, styles


def csp_directive_hashes(csp, name):
    m = re.search(r"(?:^|;\s*)" + name + r" ([^;]*)", csp)
    return re.findall(r"'sha256-([^']+)'", m.group(1)) if m else None


def fix_hashes(path):
    html = read(path)
    scripts, styles = expected_hashes(html)
    m = CSP_RE.search(html)
    if not m:
        return False
    csp = m.group(2)

    def replace(csp, name, hashes):
        none = "'none'"
        value = " ".join("'sha256-%s'" % h for h in hashes) if hashes else none
        return re.sub(r"((?:^|;\s*)" + name + r" )([^;]*)", lambda mm: mm.group(1) + value, csp, count=1)

    new = replace(replace(csp, "script-src", scripts), "style-src", styles)
    if new != csp:
        write(path, html[:m.start(2)] + new + html[m.end(2):])
        print("updated CSP hashes in", path)
        return True
    return False


def image_size(path):
    with open(path, "rb") as fh:
        head = fh.read(64)
    if head[:8] == b"\x89PNG\r\n\x1a\n":
        return struct.unpack(">II", head[16:24])
    if head[:4] == b"RIFF" and head[8:12] == b"WEBP":
        kind = head[12:16]
        if kind == b"VP8X":
            w = int.from_bytes(head[24:27], "little") + 1
            h = int.from_bytes(head[27:30], "little") + 1
            return w, h
        if kind == b"VP8L":
            b = head[21:25]
            w = 1 + (((b[1] & 0x3F) << 8) | b[0])
            h = 1 + (((b[3] & 0xF) << 10) | (b[2] << 2) | ((b[1] & 0xC0) >> 6))
            return w, h
        if kind == b"VP8 ":
            w, h = struct.unpack("<HH", head[26:30])
            return w & 0x3FFF, h & 0x3FFF
    return None


def icon_inventory():
    out = {}
    for path in sorted(glob.glob(os.path.join(ROOT, "icons", "*"))):
        with open(path, "rb") as fh:
            digest = hashlib.sha256(fh.read()).hexdigest()
        size = image_size(path)
        out["icons/" + os.path.basename(path)] = {
            "sha256": digest,
            "width": size[0] if size else None,
            "height": size[1] if size else None,
        }
    return out


def load_data(index_html):
    m = re.search(r'<script id="library-data" type="application/json">(.*?)</script>', index_html, re.S)
    if not m:
        err("index.html: library-data JSON block not found")
        return None, None
    raw = m.group(1)
    try:
        data = json.loads(raw)
    except json.JSONDecodeError as exc:
        err("index.html: library-data is not valid JSON: %s" % exc)
        return None, raw
    if json.dumps(data, ensure_ascii=False, separators=(",", ":")) != raw:
        warn("index.html: library-data is not in the compact form "
             "json.dumps(data, ensure_ascii=False, separators=(',', ':')); diffs will be noisy")
    if "</" in raw:
        err("index.html: library-data contains '</', which can terminate the script block")
    return data, raw


def check_pages(data):
    pages = sorted(os.path.basename(p) for p in glob.glob(os.path.join(ROOT, "*.html")))
    version = data["release"]["version"] if data else None
    index_style = STYLE_RE.findall(read("index.html"))
    for page in pages:
        html = read(page)
        m = CSP_RE.search(html)
        if not m:
            err("%s: no Content-Security-Policy meta tag" % page)
            continue
        scripts, styles = expected_hashes(html)
        csp = m.group(2)
        listed_scripts = csp_directive_hashes(csp, "script-src") or []
        listed_styles = csp_directive_hashes(csp, "style-src") or []
        if sorted(scripts) != sorted(listed_scripts):
            err("%s: CSP script-src hashes do not match the inline scripts (run with --fix-hashes)" % page)
        if sorted(styles) != sorted(listed_styles):
            err("%s: CSP style-src hashes do not match the inline styles (run with --fix-hashes)" % page)
        if re.search(r"\son[a-z]+\s*=", re.sub(r"<script.*?</script>|<style.*?</style>", "", html, flags=re.S)):
            err("%s: inline event handler attribute found; CSP blocks these (script-src-attr 'none')" % page)
        if re.search(r'\sstyle\s*=\s*"', html):
            err("%s: inline style attribute found; CSP blocks these (style-src-attr 'none')" % page)
        versions = set(re.findall(r"\?v=(\d+\.\d+)", html))
        if version and versions and versions != {version}:
            err("%s: cache-busting ?v= values %s do not all equal release %s" % (page, sorted(versions), version))
        for src in re.findall(r'(?:src|href)="(icons/[^"?#]+|[a-z0-9-]+\.(?:svg|png|webp|html|md))(?:[?#][^"]*)?"', html):
            if not os.path.exists(os.path.join(ROOT, src)):
                err("%s: references missing local file %s" % (page, src))
        for url in re.findall(r'href="(https?://[^"]+)"', html):
            host = urlparse(url).hostname
            if url.startswith("http://"):
                err("%s: insecure http link %s" % (page, url))
            elif data and host not in data["security"]["approvedHosts"] and host != "albertmontilla472-creator.github.io" and not url.startswith("https://mail.google.com/"):
                warn("%s: link host %s is not in security.approvedHosts" % (page, host))
    for page in ("privacy.html", "terms.html"):
        if os.path.exists(os.path.join(ROOT, page)) and STYLE_RE.findall(read(page)) != index_style:
            err("%s: its <style> must be an exact copy of index.html's <style>" % page)
    if data:
        updated = data["release"]["updated"]
        for page in ("privacy.html", "terms.html"):
            if os.path.exists(os.path.join(ROOT, page)) and ("Updated " + updated) not in read(page):
                warn("%s: does not say 'Updated %s' (release date)" % (page, updated))
    return pages


def check_data(data):
    items = data["items"]
    rel = data["release"]
    maint = data["maintenance"]
    if maint[0]["version"] != rel["version"]:
        err("release.version %s != newest maintenance entry %s" % (rel["version"], maint[0]["version"]))
    if maint[0]["date"] != rel["updated"]:
        err("release.updated '%s' != newest maintenance date '%s'" % (rel["updated"], maint[0]["date"]))
    if maint[0].get("changes") != rel.get("changes"):
        warn("release.changes differs from the newest maintenance entry's changes")
    if data["publicSite"].get("updated") != rel["updated"]:
        err("publicSite.updated '%s' != release.updated '%s'" % (data["publicSite"].get("updated"), rel["updated"]))
    if not DATE_RE.match(rel["updated"]):
        err("release.updated must look like 'November 3, 2026'")
    seen_versions = [m["version"] for m in maint]
    if len(seen_versions) != len(set(seen_versions)):
        err("maintenance has duplicate versions")

    ids = [r["id"] for r in items]
    for rid, count in Counter(ids).items():
        if count > 1:
            err("duplicate resource id %s" % rid)
    retired = set(data.get("retiredResourceIds", []))
    for rid in ids:
        if rid in retired:
            err("resource id %s is retired and must never be reused" % rid)
    approved = set(data["security"]["approvedHosts"])
    maint_versions = set(seen_versions)
    for r in items:
        rid = r.get("id", "?")
        for key in ALWAYS_PRESENT:
            if key not in r:
                err("%s: missing field '%s'" % (rid, key))
        prefix = TRACK_PREFIX.get(r.get("track"))
        if not prefix:
            err("%s: unknown track '%s'" % (rid, r.get("track")))
        elif not re.fullmatch(prefix + r"\d{2,3}", rid):
            err("%s: id must be '%s' + number for track '%s'" % (rid, prefix, r.get("track")))
        for field in ("url", "source"):
            u = r.get(field, "")
            host = urlparse(u).hostname
            if not u.startswith("https://"):
                err("%s: %s must be https:// (%s)" % (rid, field, u))
            elif host not in approved:
                err("%s: %s host '%s' is not in security.approvedHosts, so the site will render it as '#'" % (rid, field, host))
        for key, value in (r.get("metadata") or {}).items():
            if r.get(key) != value:
                err("%s: flattened field '%s' does not match metadata.%s" % (rid, key, key))
        group = next((g for g in data["groups"] if g["id"] == r.get("track")), None)
        if group and r.get("trackName") != group["name"]:
            err("%s: trackName '%s' should be '%s'" % (rid, r.get("trackName"), group["name"]))
        if not DATE_RE.match(r.get("checked", "")):
            err("%s: checked date '%s' should look like 'October 30, 2026'" % (rid, r.get("checked")))
        if r.get("addedEdition") and r["addedEdition"] not in maint_versions and r["addedEdition"] not in ("2.2", "2.3"):
            warn("%s: addedEdition %s has no maintenance entry, so it will not appear in Recently added" % (rid, r["addedEdition"]))
        if r.get("publicFree") is not True:
            err("%s: only free public resources are listed (publicFree must be true)" % rid)
        if r.get("track") == "niagara" and not r.get("niagaraVersions"):
            err("%s: Niagara resources need niagaraVersions (ax / n4 / n5)" % rid)
        if r.get("track") == "ciper" and not r.get("ciperModels"):
            err("%s: CIPer resources need ciperModels (30 / 50)" % rid)
    def walk(value, path):
        # Every link anywhere in the data (groups, creators, news, software) goes through safeUrl.
        if isinstance(value, dict):
            for k, v in value.items():
                walk(v, path + "." + k)
        elif isinstance(value, list):
            for i, v in enumerate(value):
                walk(v, "%s[%d]" % (path, i))
        elif isinstance(value, str) and re.match(r"https?://", value) and not path.startswith("data.items"):
            if urlparse(value).hostname not in approved or not value.startswith("https://"):
                err("%s: link %s is not https on an approved host" % (path, value[:100]))
    walk(data, "data")
    for rid, count in Counter(r["url"] for r in items).items():
        if count > 1:
            warn("duplicate resource url %s (shared resources should keep one id)" % rid)
    for path in data.get("programming", []):
        for rid in path.get("resources", []):
            if rid not in ids:
                err("programming path %s references unknown resource %s" % (path["id"], rid))
    return set(ids)


def check_collections(data, ids):
    by_id = {r["id"]: r for r in data["items"]}
    sitemap = read("sitemap.xml")
    for c in data["collectionPages"]:
        f = c["file"]
        if not os.path.exists(os.path.join(ROOT, f)):
            err("collection page %s is missing" % f)
            continue
        if f not in sitemap:
            warn("sitemap.xml does not list %s" % f)
        html = read(f)
        for rid in re.findall(r'data-resource-id="([^"]+)"', html):
            if rid not in ids:
                err("%s: lists resource %s that is not in the data" % (f, rid))
                continue
            r = by_id[rid]
            block = re.search(r'data-resource-id="%s".*?</article>' % re.escape(rid), html, re.S).group(0)
            esc = r["url"].replace("&", "&amp;")
            if esc not in block and r["url"] not in block:
                warn("%s: %s link differs from the data url (collection page may be stale)" % (f, rid))


def check_icons(index_html):
    inventory = icon_inventory()
    if os.path.exists(MANIFEST):
        with open(MANIFEST, encoding="utf-8") as fh:
            pinned = json.load(fh).get("files", {})
        for path, meta in inventory.items():
            if path not in pinned:
                warn("%s is not pinned in icons-manifest.json (run --write-icon-manifest after review)" % path)
            elif pinned[path] != meta:
                err("%s does not match its pinned fingerprint/dimensions in icons-manifest.json" % path)
        for path in pinned:
            if path not in inventory:
                warn("%s is pinned in icons-manifest.json but missing from icons/" % path)
    else:
        warn("icons-manifest.json not found; run --write-icon-manifest")
    art = re.search(r"const iconArt=(\{.*?\});\n", index_html)
    art_keys = set(json.loads(art.group(1))) if art else set()
    m = re.search(r"const creatorIconByProvider=(\{.*?\});", index_html)
    if m:
        for provider, key in json.loads(m.group(1)).items():
            # A creator icon is either an entry in iconArt (inline SVG or <img>) or a local PNG.
            if key not in art_keys and not os.path.exists(os.path.join(ROOT, "icons", key + ".png")):
                err("creator icon for '%s' has no iconArt entry and no icons/%s.png" % (provider, key))
    for src in set(re.findall(r'src=\\?"(icons/[^"\\]+)', index_html)):
        if not os.path.exists(os.path.join(ROOT, src)):
            err("index.html references missing %s" % src)


def main(argv):
    if "--write-icon-manifest" in argv:
        with open(MANIFEST, "w", encoding="utf-8") as fh:
            json.dump({"note": "SHA-256 fingerprints and pixel dimensions of every reviewed file in icons/. "
                               "Regenerate only after reviewing a new or changed logo.",
                       "files": icon_inventory()}, fh, indent=1)
            fh.write("\n")
        print("wrote", os.path.relpath(MANIFEST, ROOT))
    if "--fix-hashes" in argv:
        for page in sorted(os.path.basename(p) for p in glob.glob(os.path.join(ROOT, "*.html"))):
            fix_hashes(page)

    index_html = read("index.html")
    data, _ = load_data(index_html)
    check_pages(data)
    if data:
        ids = check_data(data)
        check_collections(data, ids)
        items = data["items"]
        videos = sum(1 for r in items if r["type"] == "Video")
        docs = sum(1 for r in items if r["format"] == "Reference")
        print("Edition %s · updated %s · %d resources (%d direct videos, %d documentation references) · %d credited publishers"
              % (data["release"]["version"], data["release"]["updated"], len(items), videos, docs,
                 len(data["recommended"]["publishers"])))
        print("Next free ids: " + ", ".join(
            "%s%02d" % (p, max([int(r["id"][1:]) for r in items if r["id"][0] == p]
                              + [int(x[1:]) for x in data.get("retiredResourceIds", []) if x[0] == p]) + 1)
            for p in "NHSCJDB"))
    check_icons(index_html)

    for w in warnings:
        print("WARN  " + w)
    for e in errors:
        print("ERROR " + e)
    print("%d error(s), %d warning(s)" % (len(errors), len(warnings)))
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
