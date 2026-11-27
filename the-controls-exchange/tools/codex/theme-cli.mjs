#!/usr/bin/env node
// Dark theme helper for pages built outside generate-public.mjs (worksheets, 404).
//   node theme-cli.mjs dark < light.css   prints the light CSS followed by its generated dark theme
//   node theme-cli.mjs boot               prints the head script that applies a saved dark theme
import fs from 'node:fs';
import {withDark, THEME_BOOT} from './theme.mjs';

const mode = process.argv[2];
if (mode === 'boot') process.stdout.write(THEME_BOOT);
else if (mode === 'dark') process.stdout.write(withDark(fs.readFileSync(0, 'utf8')));
else { console.error('usage: theme-cli.mjs dark|boot'); process.exit(2); }
