// Dark theme (edition 5.48). Visitors pick it under Tools > Dark theme; the choice is stored in this browser only.
// The dark rules are generated from the light stylesheet every time pages are built, so the two themes never drift:
// each color is mapped by the job it does (text, background, line), keeping hues and the brand reds.
// Hand-tuned exceptions live in DARK_OVERRIDES; rules that already mention data-theme are left alone.

export const THEME_KEY = 'controls-exchange-theme-v1';
// Runs in <head> before the page paints, so a dark visitor never sees a light flash.
export const THEME_BOOT = "try{if(localStorage.getItem('" + THEME_KEY + "')==='dark')document.documentElement.setAttribute('data-theme','dark')}catch(e){}";
export const DARK_MARK = '/* Dark theme: generated from the light rules by tools/codex/theme.mjs. Do not edit by hand. */';
const DARK = ':root[data-theme="dark"]';

// role:#light -> #dark. Use for colors the formula gets wrong.
export const DARK_OVERRIDES = {
  'bg:#ffffff': '#1e2023',
  'fg:#ffffff': '#ffffff',
};

export function stripDark(css) {
  const i = css.indexOf(DARK_MARK);
  return (i < 0 ? css : css.slice(0, i)).replace(/\s+$/, '');
}

// Rules whose colors must stay as they are in the dark theme: white backings behind creator logos.
const DARK_KEEP = /logo-image|vendor-crop|-crop\b|home-building/;

export function withDark(css, extra = '') {
  const light = stripDark(css);
  return light + DARK_MARK + darkCss(light) + extra;
}

// ---------------------------------------------------------------- color math (OKLab / OKLCH)
const lin = c => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const gam = c => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);

function hexToRgb(hex) {
  let h = hex.slice(1).toLowerCase();
  if (h.length === 3 || h.length === 4) h = [...h].map(c => c + c).join('');
  return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16) / 255).concat(h.length === 8 ? [parseInt(h.slice(6, 8), 16) / 255] : []);
}

function rgbToOklch([r, g, b]) {
  [r, g, b] = [r, g, b].map(lin);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return [L, Math.hypot(A, B), Math.atan2(B, A)];
}

function oklchToRgb(L, C, h) {
  const A = C * Math.cos(h), B = C * Math.sin(h);
  const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3;
  const m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3;
  const s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3;
  return [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s];
}

function toHex(L, C, h, alpha) {
  L = Math.min(1, Math.max(0, L));
  let lo = 0, hi = C, rgb = oklchToRgb(L, C, h);
  const inside = v => v.every(x => x >= -1e-4 && x <= 1 + 1e-4);
  if (!inside(rgb)) {
    for (let i = 0; i < 24; i++) { const mid = (lo + hi) / 2; if (inside(oklchToRgb(L, mid, h))) lo = mid; else hi = mid; }
    rgb = oklchToRgb(L, lo, h);
  }
  const hex = rgb.map(v => Math.round(Math.min(1, Math.max(0, gam(Math.min(1, Math.max(0, v))))) * 255).toString(16).padStart(2, '0')).join('');
  return '#' + hex + (alpha === undefined ? '' : Math.round(alpha * 255).toString(16).padStart(2, '0'));
}

export function darkColor(hex, role) {
  const key = role + ':' + hex.toLowerCase();
  if (DARK_OVERRIDES[key]) return DARK_OVERRIDES[key];
  const rgba = hexToRgb(hex), alpha = rgba[3];
  const [L, C, h] = rgbToOklch(rgba.slice(0, 3));
  let Ld = L, Cd = C;
  if (role === 'bg') {
    if (C >= 0.09 && L < 0.8) return hex;                       // brand reds, selection blue, status colors
    if (L >= 0.62) { Ld = 0.235 + (1 - L) * 0.55; Cd = Math.min(C * 0.8, 0.045); }
    else { Ld = L * 0.62; Cd = C * 0.8; }                       // chrome that was already dark stays darker than the page
  } else if (role === 'fg') {
    if (L >= 0.9 && C < 0.05) return hex;                       // white text on colored buttons and bars
    if (C >= 0.06) { Ld = Math.max(0.74, 1.04 - L * 0.5); Cd = Math.min(C, 0.15); }
    else { Ld = 1.0 - L * 0.4; Cd = C * 0.6; }
  } else if (role === 'line') {
    if (C >= 0.09) { Ld = Math.max(L, 0.62); }
    else if (L >= 0.4) { Ld = 0.3 + (1 - L) * 0.45; Cd = Math.min(C, 0.03); }
    else { Ld = 0.22 + L * 0.3; }
  } else if (role === 'shadow') {
    if (L >= 0.8 && C < 0.06 && (alpha === undefined || alpha > 0.9)) return darkColor(hex, 'bg');   // solid light shadows extend a background
    return hex;
  } else return hex;
  return toHex(Ld, Cd, h, alpha);
}

// ---------------------------------------------------------------- CSS walking
function stripComments(css) {
  let out = '', i = 0, q = null;
  while (i < css.length) {
    const c = css[i];
    if (q) { out += c; if (c === '\\') { out += css[i + 1] || ''; i += 2; continue; } if (c === q) q = null; i++; continue; }
    if (c === '"' || c === "'") { q = c; out += c; i++; continue; }
    if (c === '/' && css[i + 1] === '*') { const j = css.indexOf('*/', i + 2); i = j < 0 ? css.length : j + 2; continue; }
    out += c; i++;
  }
  return out;
}

function parse(css) {
  const nodes = [];
  let i = 0;
  while (i < css.length) {
    const open = css.indexOf('{', i);
    if (open < 0) break;
    const prelude = css.slice(i, open).trim();
    let depth = 1, j = open + 1, q = null;
    while (j < css.length && depth) {
      const c = css[j];
      if (q) { if (c === '\\') j++; else if (c === q) q = null; }
      else if (c === '"' || c === "'") q = c;
      else if (c === '{') depth++;
      else if (c === '}') depth--;
      j++;
    }
    const body = css.slice(open + 1, j - 1);
    if (prelude.startsWith('@media') || prelude.startsWith('@supports')) nodes.push({ at: prelude, children: parse(body) });
    else if (!prelude.startsWith('@')) nodes.push({ selector: prelude, body });
    i = j;
  }
  return nodes;
}

function splitTop(text, sep) {
  const out = []; let depth = 0, q = null, cur = '';
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { cur += c; if (c === '\\') { cur += text[++i] || ''; } else if (c === q) q = null; continue; }
    if (c === '"' || c === "'") { q = c; cur += c; continue; }
    if (c === '(' || c === '[') depth++;
    if (c === ')' || c === ']') depth--;
    if (c === sep && depth === 0) { out.push(cur); cur = ''; continue; }
    cur += c;
  }
  if (cur.trim()) out.push(cur);
  return out;
}

function roleOf(prop) {
  if (prop.startsWith('--')) return null;
  if (['color', 'caret-color', 'text-decoration-color', '-webkit-text-fill-color', 'accent-color'].includes(prop)) return 'fg';
  if (prop.startsWith('background')) return 'bg';
  if (prop.startsWith('border') || prop.startsWith('outline') || prop.startsWith('column-rule')) return 'line';
  if (prop === 'box-shadow') return 'shadow';
  return null;                                                  // fills and strokes keep their colors
}

function rootTokens(nodes) {
  const vars = {};
  for (const n of nodes) {
    if (n.selector && /(^|,)\s*:root\s*($|,)/.test(n.selector))
      for (const d of splitTop(n.body, ';')) {
        const k = d.indexOf(':'); if (k < 0) continue;
        const name = d.slice(0, k).trim(); if (name.startsWith('--')) vars[name] = d.slice(k + 1).trim();
      }
  }
  const resolve = (v, seen = new Set()) => v.replace(/var\((--[\w-]+)\)/g, (m, name) => {
    if (seen.has(name) || vars[name] === undefined) return m;
    return resolve(vars[name], new Set([...seen, name]));
  });
  return resolve;
}

const COLOR = /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})\b/g;

function darkDecls(body, resolve) {
  const out = [];
  for (const d of splitTop(body, ';')) {
    const k = d.indexOf(':'); if (k < 0) continue;
    const prop = d.slice(0, k).trim().toLowerCase(), role = roleOf(prop);
    if (!role) continue;
    let value = d.slice(k + 1).trim();
    const resolved = resolve(value).replace(/(^|[\s,(])white\b/g, '$1#ffffff').replace(/(^|[\s,(])black\b/g, '$1#000000');
    if (!COLOR.test(resolved)) continue;
    COLOR.lastIndex = 0;
    const mapped = resolved.replace(COLOR, hex => darkColor(hex, role));
    out.push(prop + ':' + mapped);                                // unchanged colors too, so the dark rules keep the light cascade order
  }
  return out.join(';');
}

function prefix(selector) {
  return splitTop(selector, ',').map(s => {
    s = s.trim();
    if (s.startsWith(':root')) return DARK + s.slice(5);
    if (/^html\b/.test(s)) return 'html[data-theme="dark"]' + s.slice(4);
    return DARK + ' ' + s;
  }).join(',');
}

export function darkCss(lightCss) {
  const nodes = parse(stripComments(lightCss));
  const resolve = rootTokens(nodes);
  const emit = list => list.map(n => {
    if (n.at) { const inner = emit(n.children); return inner ? n.at + '{' + inner + '}' : ''; }
    if (n.selector.includes('data-theme') || DARK_KEEP.test(n.selector)) return '';
    const decls = darkDecls(n.body, resolve);
    return decls ? prefix(n.selector) + '{' + decls + '}' : '';
  }).join('');
  return DARK + '{color-scheme:dark}' + emit(nodes);
}
