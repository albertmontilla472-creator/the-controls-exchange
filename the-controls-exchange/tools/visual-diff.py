#!/usr/bin/env python3
"""Compare the before/after screenshots made by visual-compare.js.

For each view it reports the share of pixels that changed and writes
<view>-compare.png: before | after | changed pixels in red.
Usage: python3 the-controls-exchange/tools/visual-diff.py <out-dir> [threshold]
"""
import glob
import os
import sys

from PIL import Image, ImageChops


def main(out_dir, threshold=24):
    rows = []
    for before_path in sorted(glob.glob(os.path.join(out_dir, "*-before.png"))):
        name = os.path.basename(before_path)[:-len("-before.png")]
        after_path = os.path.join(out_dir, name + "-after.png")
        if not os.path.exists(after_path):
            continue
        before = Image.open(before_path).convert("RGB")
        after = Image.open(after_path).convert("RGB")
        width, height = max(before.width, after.width), max(before.height, after.height)
        canvas_b = Image.new("RGB", (width, height), "white"); canvas_b.paste(before, (0, 0))
        canvas_a = Image.new("RGB", (width, height), "white"); canvas_a.paste(after, (0, 0))
        diff = ImageChops.difference(canvas_b, canvas_a).convert("L").point(lambda v: 255 if v > threshold else 0)
        changed = sum(1 for v in diff.getdata() if v)
        share = 100.0 * changed / (width * height)
        overlay = canvas_a.copy()
        overlay.paste(Image.new("RGB", (width, height), (220, 30, 30)), (0, 0), diff)
        sheet = Image.new("RGB", (width * 3 + 20, height), (90, 90, 90))
        sheet.paste(canvas_b, (0, 0)); sheet.paste(canvas_a, (width + 10, 0)); sheet.paste(overlay, (width * 2 + 20, 0))
        sheet.save(os.path.join(out_dir, name + "-compare.png"))
        rows.append((share, name))
    for share, name in sorted(rows, reverse=True):
        print("%6.2f%% changed  %s" % (share, name))


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    main(sys.argv[1], int(sys.argv[2]) if len(sys.argv) > 2 else 24)
