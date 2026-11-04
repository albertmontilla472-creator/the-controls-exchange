import {createHash} from 'node:crypto';
// Fixed local artwork: original interface symbols and reviewed identifying logos.
// Manufacturer and creator marks identify subjects/publishers, not endorsement.
// Shared Lucid-style gradients; every page that draws icons includes this once.
export const ICON_DEFS="<svg class=\"icon-defs\" aria-hidden=\"true\" focusable=\"false\" width=\"0\" height=\"0\"><defs><linearGradient id=\"cxl-metal\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#ffffff\"/><stop offset=\".5\" stop-color=\"#e4e7ea\"/><stop offset=\"1\" stop-color=\"#b9bfc5\"/></linearGradient><linearGradient id=\"cxl-steel\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#eef0f2\"/><stop offset=\".5\" stop-color=\"#b8bec4\"/><stop offset=\"1\" stop-color=\"#7f878f\"/></linearGradient><linearGradient id=\"cxl-dark\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#7b838b\"/><stop offset=\".5\" stop-color=\"#4a5157\"/><stop offset=\"1\" stop-color=\"#2a2f34\"/></linearGradient><linearGradient id=\"cxl-gold\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#fff4b8\"/><stop offset=\".5\" stop-color=\"#f4c64e\"/><stop offset=\"1\" stop-color=\"#c8891a\"/></linearGradient><linearGradient id=\"cxl-fox\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#ffd27a\"/><stop offset=\".5\" stop-color=\"#f0962a\"/><stop offset=\"1\" stop-color=\"#bd630f\"/></linearGradient><linearGradient id=\"cxl-blue\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#a8d6ff\"/><stop offset=\".5\" stop-color=\"#3f8ddc\"/><stop offset=\"1\" stop-color=\"#1c5aa7\"/></linearGradient><linearGradient id=\"cxl-screen\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#9cc8f4\"/><stop offset=\".5\" stop-color=\"#3a7cd0\"/><stop offset=\"1\" stop-color=\"#1c4c99\"/></linearGradient><linearGradient id=\"cxl-red\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#ff9a86\"/><stop offset=\".5\" stop-color=\"#e33f2c\"/><stop offset=\"1\" stop-color=\"#a91e12\"/></linearGradient><linearGradient id=\"cxl-cream\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#fffdf0\"/><stop offset=\".5\" stop-color=\"#f8e7b2\"/><stop offset=\"1\" stop-color=\"#e9cd7f\"/></linearGradient><linearGradient id=\"cxl-paper\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#ffffff\"/><stop offset=\".5\" stop-color=\"#f3f4f6\"/><stop offset=\"1\" stop-color=\"#dde0e4\"/></linearGradient><linearGradient id=\"cxl-folder\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#fff0b3\"/><stop offset=\".5\" stop-color=\"#f7cf5c\"/><stop offset=\"1\" stop-color=\"#dca22a\"/></linearGradient><linearGradient id=\"cxl-folderb\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#f6d56b\"/><stop offset=\".5\" stop-color=\"#e5ae33\"/><stop offset=\"1\" stop-color=\"#c78c1c\"/></linearGradient><linearGradient id=\"cxl-green\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#d4f7c4\"/><stop offset=\".5\" stop-color=\"#5cc44f\"/><stop offset=\"1\" stop-color=\"#2c8a2b\"/></linearGradient><linearGradient id=\"cxl-purple\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#ead8fb\"/><stop offset=\".5\" stop-color=\"#a274db\"/><stop offset=\"1\" stop-color=\"#6b40a8\"/></linearGradient><linearGradient id=\"cxl-glass\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#ffffff\"/><stop offset=\".5\" stop-color=\"#eef4fa\"/><stop offset=\"1\" stop-color=\"#c9d7e5\"/></linearGradient><linearGradient id=\"cxl-sky\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#d7efff\"/><stop offset=\".5\" stop-color=\"#9fd2f7\"/><stop offset=\"1\" stop-color=\"#6bb2e6\"/></linearGradient><linearGradient id=\"cxl-chart\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#fde9a0\"/><stop offset=\".5\" stop-color=\"#f2c24c\"/><stop offset=\"1\" stop-color=\"#d39421\"/></linearGradient><linearGradient id=\"cxl-wood\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#c99a63\"/><stop offset=\".5\" stop-color=\"#9a6a36\"/><stop offset=\"1\" stop-color=\"#6f4a22\"/></linearGradient><linearGradient id=\"cxl-orange\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#ffd08a\"/><stop offset=\".5\" stop-color=\"#f59a32\"/><stop offset=\"1\" stop-color=\"#c9650e\"/></linearGradient></defs></svg>";

export const ICON_ART=Object.freeze({
  "protocol-lorawan": "<img class=\"logo-image\" src=\"icons/protocol-lorawan.png\" alt=\"\" width=\"192\" height=\"72\" decoding=\"async\">",
  "protocol-lora": "<img class=\"logo-image\" src=\"icons/protocol-lora.png\" alt=\"\" width=\"192\" height=\"72\" decoding=\"async\">",
  "creator-lumenradio": "<img class=\"logo-image\" src=\"icons/creator-lumenradio.png\" alt=\"\" width=\"128\" height=\"128\" decoding=\"async\">",
  "protocol-communications": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><rect x=\"4.5\" y=\"1\" width=\"7\" height=\"4\" rx=\".7\" fill=\"url(#cxl-green)\" stroke=\"#2a7a29\" stroke-width=\".8\"/><path d=\"M6 2.4h2.2\" stroke=\"#fff\" stroke-opacity=\".8\" stroke-width=\".6\" stroke-linecap=\"round\"/><circle cx=\"10\" cy=\"3\" r=\".55\" fill=\"#fff\"/><path d=\"M8 5v2.5\" stroke=\"#4a5157\" stroke-width=\".9\"/><path d=\"M1 8h14\" stroke=\"#a91e12\" stroke-width=\"2\" stroke-linecap=\"round\"/><path d=\"M1 8h14\" stroke=\"#ff6b57\" stroke-width=\".7\" stroke-linecap=\"round\"/><path d=\"M3 8.5v2M8 8.5v2M13 8.5v2\" stroke=\"#4a5157\" stroke-width=\".9\"/><rect x=\"1.2\" y=\"10.5\" width=\"3.6\" height=\"4\" rx=\".5\" fill=\"url(#cxl-blue)\" stroke=\"#1c4f92\" stroke-width=\".75\"/><rect x=\"6.2\" y=\"10.5\" width=\"3.6\" height=\"4\" rx=\".5\" fill=\"url(#cxl-blue)\" stroke=\"#1c4f92\" stroke-width=\".75\"/><rect x=\"11.2\" y=\"10.5\" width=\"3.6\" height=\"4\" rx=\".5\" fill=\"url(#cxl-blue)\" stroke=\"#1c4f92\" stroke-width=\".75\"/></svg>",
  "vykon-pro": "<img class=\"logo-image\" src=\"icons/brand-vykon.png\" alt=\"\" width=\"128\" height=\"128\" decoding=\"async\">",
  "folder": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M1.5 3.5h4.6l1.3 1.6h7.1v8.9h-13z\" fill=\"url(#cxl-folderb)\" stroke=\"#a87910\" stroke-width=\".8\" stroke-linejoin=\"round\"/><path d=\"M1.5 6.6h13v7.4h-13z\" fill=\"url(#cxl-folder)\" stroke=\"#a87910\" stroke-width=\".8\" stroke-linejoin=\"round\"/><path d=\"M2.4 7.6h11.2\" stroke=\"#fff\" stroke-opacity=\".75\" stroke-linecap=\"round\" stroke-width=\".7\"/></svg>",
  "folder-up": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M1.5 3.5h4.6l1.3 1.6h7.1v8.9h-13z\" fill=\"url(#cxl-folderb)\" stroke=\"#a87910\" stroke-width=\".8\" stroke-linejoin=\"round\"/><path d=\"M1.5 6.6h13v7.4h-13z\" fill=\"url(#cxl-folder)\" stroke=\"#a87910\" stroke-width=\".8\" stroke-linejoin=\"round\"/><path d=\"M2.4 7.6h11.2\" stroke=\"#fff\" stroke-opacity=\".75\" stroke-linecap=\"round\" stroke-width=\".7\"/><path d=\"M8 6.2l3.4 3.3H9.3v3.6H6.7V9.5H4.6z\" fill=\"url(#cxl-green)\" stroke=\"#2a7a29\" stroke-width=\".8\" stroke-linejoin=\"round\"/></svg>",
  "folder-back": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M1.5 3.5h4.6l1.3 1.6h7.1v8.9h-13z\" fill=\"url(#cxl-folderb)\" stroke=\"#a87910\" stroke-width=\".8\" stroke-linejoin=\"round\"/><path d=\"M1.5 6.6h13v7.4h-13z\" fill=\"url(#cxl-folder)\" stroke=\"#a87910\" stroke-width=\".8\" stroke-linejoin=\"round\"/><path d=\"M2.4 7.6h11.2\" stroke=\"#fff\" stroke-opacity=\".75\" stroke-linecap=\"round\" stroke-width=\".7\"/><path d=\"M3.6 10.2l3.6-3.3v2h4.8v2.6H7.2v2z\" fill=\"url(#cxl-blue)\" stroke=\"#1c4f92\" stroke-width=\".8\" stroke-linejoin=\"round\"/></svg>",
  "folder-forward": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M1.5 3.5h4.6l1.3 1.6h7.1v8.9h-13z\" fill=\"url(#cxl-folderb)\" stroke=\"#a87910\" stroke-width=\".8\" stroke-linejoin=\"round\"/><path d=\"M1.5 6.6h13v7.4h-13z\" fill=\"url(#cxl-folder)\" stroke=\"#a87910\" stroke-width=\".8\" stroke-linejoin=\"round\"/><path d=\"M2.4 7.6h11.2\" stroke=\"#fff\" stroke-opacity=\".75\" stroke-linecap=\"round\" stroke-width=\".7\"/><path d=\"M12.4 10.2l-3.6-3.3v2H4v2.6h4.8v2z\" fill=\"url(#cxl-blue)\" stroke=\"#1c4f92\" stroke-width=\".8\" stroke-linejoin=\"round\"/></svg>",
  "host": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><rect x=\"1.5\" y=\"2.5\" width=\"13\" height=\"7\" rx=\"1.3\" fill=\"url(#cxl-metal)\" stroke=\"#6c747c\" stroke-width=\".9\"/><path d=\"M2.6 3.7h10.8\" stroke=\"#fff\" stroke-opacity=\".75\" stroke-linecap=\"round\" stroke-width=\".8\"/><path d=\"M3.3 7.3h6.2\" stroke=\"#8e969e\" stroke-width=\".9\" stroke-linecap=\"round\"/><circle cx=\"12\" cy=\"7.3\" r=\".75\" fill=\"#45b53c\"/><path d=\"M8 9.5v2\" stroke=\"#2a63ad\" stroke-width=\"1.1\"/><rect x=\"5.6\" y=\"11.3\" width=\"4.8\" height=\"3.4\" rx=\".6\" fill=\"url(#cxl-blue)\" stroke=\"#1c4f92\" stroke-width=\".8\"/><path d=\"M7 12.7h2\" stroke=\"#d9ecff\" stroke-width=\".7\" stroke-linecap=\"round\"/></svg>",
  "platform": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><rect x=\"1.5\" y=\"1.5\" width=\"10.5\" height=\"12.5\" rx=\"1\" fill=\"url(#cxl-dark)\" stroke=\"#1f2428\" stroke-width=\".9\"/><path d=\"M2 5.6h9.5M2 9.7h9.5\" stroke=\"#9aa3ab\" stroke-width=\".7\"/><path d=\"M3.2 3.5h2.2M3.2 7.6h2.2M3.2 11.8h2.2\" stroke=\"#d6dde3\" stroke-width=\".8\" stroke-linecap=\"round\"/><circle cx=\"9.8\" cy=\"3.5\" r=\".65\" fill=\"#5ee057\"/><circle cx=\"9.8\" cy=\"7.6\" r=\".65\" fill=\"#5ee057\"/><path d=\"M10.3 9.799999999999999V8.299999999999999a1.95 1.95 0 0 1 3.9 0v1.5\" stroke=\"#8d6414\" stroke-width=\"1.1\"/><rect x=\"9\" y=\"9.6\" width=\"6.5\" height=\"5.3\" rx=\"1\" fill=\"url(#cxl-gold)\" stroke=\"#9a6a0e\" stroke-width=\".8\"/><path d=\"M12.25 11.5v1.5\" stroke=\"#7a5208\" stroke-width=\"1.1\" stroke-linecap=\"round\"/></svg>",
  "station": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M1.3 1.6 4.9 5h4.3l3.6-3.4.5 5.7-1.4 3.6-4.6 3.6-4.6-3.6L1.3 7.3z\" fill=\"url(#cxl-fox)\" stroke=\"#7c4210\" stroke-width=\".8\" stroke-linejoin=\"round\"/><path d=\"M2.4 3.4l.3 2.7 1.6-.9zM11.7 3.4l-.3 2.7-1.6-.9z\" fill=\"#6a350c\"/><path d=\"M3.2 9.1l3.85 1.5 3.85-1.5-3.85 4.5z\" fill=\"#fff3dc\"/><path d=\"M4.7 7.7l1.3.5M9.4 7.7l-1.3.5\" stroke=\"#3b220a\" stroke-width=\".9\" stroke-linecap=\"round\"/><path d=\"M6.45 12.1h1.2l-.6.75z\" fill=\"#3b220a\"/><path d=\"M10.3 9.799999999999999V8.299999999999999a1.95 1.95 0 0 1 3.9 0v1.5\" stroke=\"#8d6414\" stroke-width=\"1.1\"/><rect x=\"9\" y=\"9.6\" width=\"6.5\" height=\"5.3\" rx=\"1\" fill=\"url(#cxl-gold)\" stroke=\"#9a6a0e\" stroke-width=\".8\"/><path d=\"M12.25 11.5v1.5\" stroke=\"#7a5208\" stroke-width=\"1.1\" stroke-linecap=\"round\"/></svg>",
  "config": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><rect x=\"3\" y=\"1.5\" width=\"10\" height=\"13\" rx=\"1.4\" fill=\"url(#cxl-metal)\" stroke=\"#6c747c\" stroke-width=\".9\"/><path d=\"M3.5 4.3h9M3.5 7h9M3.5 9.7h9M3.5 12.4h9\" stroke=\"#8c949c\" stroke-width=\".8\"/><path d=\"M4.4 2.6h7.2\" stroke=\"#fff\" stroke-width=\".7\" stroke-linecap=\"round\"/></svg>",
  "services": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M8.00 2.70L9.37 1.13L10.68 1.53L10.94 3.59L11.75 4.25L13.82 4.11L14.47 5.32L13.20 6.97L13.30 8.00L14.87 9.37L14.47 10.68L12.41 10.94L11.75 11.75L11.89 13.82L10.68 14.47L9.03 13.20L8.00 13.30L6.63 14.87L5.32 14.47L5.06 12.41L4.25 11.75L2.18 11.89L1.53 10.68L2.80 9.03L2.70 8.00L1.13 6.63L1.53 5.32L3.59 5.06L4.25 4.25L4.11 2.18L5.32 1.53L6.97 2.80Z\" fill=\"url(#cxl-steel)\" stroke=\"#545c64\" stroke-width=\".8\" stroke-linejoin=\"round\"/><circle cx=\"8\" cy=\"8\" r=\"2.2\" fill=\"#fff\" stroke=\"#545c64\" stroke-width=\".8\"/><path d=\"M4.7 4.3a4.6 4.6 0 0 1 3.3-1.4\" stroke=\"#fff\" stroke-opacity=\".75\" stroke-linecap=\"round\" stroke-width=\".8\"/></svg>",
  "drivers": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M3.9 11.5A2.7 2.7 0 0 1 3.5 6.2 3.7 3.7 0 0 1 10.6 4.9 2.7 2.7 0 0 1 13.6 7.5\" fill=\"url(#cxl-glass)\" stroke=\"#8796a6\" stroke-width=\".9\" stroke-linecap=\"round\"/><path d=\"M3.9 11.5h3.6\" stroke=\"#8796a6\" stroke-width=\".9\" stroke-linecap=\"round\"/><rect x=\"7.6\" y=\"7.6\" width=\"7.4\" height=\"7\" rx=\".9\" fill=\"url(#cxl-dark)\" stroke=\"#1f2428\" stroke-width=\".8\"/><rect x=\"8.7\" y=\"8.8\" width=\"5.2\" height=\"2.9\" rx=\".3\" fill=\"url(#cxl-green)\" stroke=\"#256f23\" stroke-width=\".5\"/><path d=\"M9 13.2h1.4M11.3 13.2h1.4\" stroke=\"#cfd6dc\" stroke-width=\".8\" stroke-linecap=\"round\"/></svg>",
  "files": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><rect x=\"1.5\" y=\"4.5\" width=\"13\" height=\"7\" rx=\"1.5\" fill=\"url(#cxl-metal)\" stroke=\"#6c747c\" stroke-width=\".9\"/><path d=\"M2.7 5.7h10.6\" stroke=\"#fff\" stroke-opacity=\".75\" stroke-linecap=\"round\" stroke-width=\".8\"/><path d=\"M1.9 8.6h12.2\" stroke=\"#9aa2aa\" stroke-width=\".6\"/><path d=\"M3.4 10h5.4\" stroke=\"#7d858d\" stroke-width=\".9\" stroke-linecap=\"round\"/><circle cx=\"12.2\" cy=\"10\" r=\".7\" fill=\"#45b53c\"/></svg>",
  "backup": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><rect x=\"1.5\" y=\"6.5\" width=\"11\" height=\"6.5\" rx=\"1.4\" fill=\"url(#cxl-metal)\" stroke=\"#6c747c\" stroke-width=\".85\"/><path d=\"M3 10.9h4.5\" stroke=\"#7d858d\" stroke-width=\".9\" stroke-linecap=\"round\"/><circle cx=\"10.6\" cy=\"10.9\" r=\".65\" fill=\"#45b53c\"/><path d=\"M9.2 3.8a3.3 3.3 0 0 1 5.6 1.4\" stroke=\"#1c5aa7\" stroke-width=\"2.3\" stroke-linecap=\"round\"/><path d=\"M9.2 3.8a3.3 3.3 0 0 1 5.6 1.4\" stroke=\"#6fb2f2\" stroke-width=\"1.1\" stroke-linecap=\"round\"/><path d=\"M15.4 3.6l-.3 2.9-2.6-1.2z\" fill=\"url(#cxl-blue)\" stroke=\"#1c4f92\" stroke-width=\".6\" stroke-linejoin=\"round\"/></svg>",
  "document": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M3 1.5h6.8l3.2 3.2v9.8H3z\" fill=\"url(#cxl-paper)\" stroke=\"#868c93\" stroke-width=\".85\" stroke-linejoin=\"round\"/><path d=\"M9.8 1.5v3.2H13\" fill=\"#e2e5e9\" stroke=\"#868c93\" stroke-width=\".85\" stroke-linejoin=\"round\"/><path d=\"M5 7.3h6M5 9.3h6M5 11.3h4.3\" stroke=\"#a9afb6\" stroke-width=\".7\" stroke-linecap=\"round\"/></svg>",
  "history": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M1.2 12.8V6.8l3-3.1 3 3.5 3-3.2 3.6 3.9\" fill=\"url(#cxl-chart)\" stroke=\"#a07012\" stroke-width=\".8\" stroke-linejoin=\"round\"/><path d=\"M1.2 12.8h6\" stroke=\"#a07012\" stroke-width=\".8\"/><path d=\"M7.6 9.6v4c0 .75 1.6 1.3 3.5 1.3s3.5-.55 3.5-1.3v-4\" fill=\"url(#cxl-steel)\" stroke=\"#545c64\" stroke-width=\".8\"/><ellipse cx=\"11.1\" cy=\"9.6\" rx=\"3.5\" ry=\"1.3\" fill=\"url(#cxl-metal)\" stroke=\"#545c64\" stroke-width=\".8\"/><path d=\"M7.6 11.7c0 .75 1.6 1.3 3.5 1.3s3.5-.55 3.5-1.3\" stroke=\"#6f777f\" stroke-width=\".6\"/></svg>",
  "alarm": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M8 2.2c-2.7 0-4.3 2.1-4.3 4.7v2.8L2.2 12h11.6l-1.5-2.3V6.9C12.3 4.3 10.7 2.2 8 2.2z\" fill=\"url(#cxl-gold)\" stroke=\"#9a6a0e\" stroke-width=\".8\" stroke-linejoin=\"round\"/><circle cx=\"8\" cy=\"1.9\" r=\".9\" fill=\"#c98a16\"/><path d=\"M6.6 13.2a1.4 1.4 0 0 0 2.8 0\" fill=\"#b97a10\"/><path d=\"M5.4 5.6c.3-1 1-1.7 1.9-1.9\" stroke=\"#fff\" stroke-opacity=\".75\" stroke-linecap=\"round\" stroke-width=\".8\"/></svg>",
  "schedule": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><rect x=\"2\" y=\"2.6\" width=\"12\" height=\"11.9\" rx=\"1.2\" fill=\"url(#cxl-paper)\" stroke=\"#7d848b\" stroke-width=\".85\"/><path d=\"M2 3.8a1.2 1.2 0 0 1 1.2-1.2h9.6A1.2 1.2 0 0 1 14 3.8v2.2H2z\" fill=\"url(#cxl-red)\" stroke=\"#8f2a1c\" stroke-width=\".7\"/><path d=\"M5 1.5v2.4M11 1.5v2.4\" stroke=\"#5d656d\" stroke-width=\"1.1\" stroke-linecap=\"round\"/><rect x=\"3.6\" y=\"7.3\" width=\"1.6\" height=\"1.4\" fill=\"#aab2ba\"/><rect x=\"6.1\" y=\"7.3\" width=\"1.6\" height=\"1.4\" fill=\"#aab2ba\"/><rect x=\"8.6\" y=\"7.3\" width=\"1.6\" height=\"1.4\" fill=\"#aab2ba\"/><rect x=\"11.1\" y=\"7.3\" width=\"1.6\" height=\"1.4\" fill=\"#aab2ba\"/><rect x=\"3.6\" y=\"9.6\" width=\"1.6\" height=\"1.4\" fill=\"#aab2ba\"/><rect x=\"6.1\" y=\"9.6\" width=\"1.6\" height=\"1.4\" fill=\"#e33f2c\"/><rect x=\"8.6\" y=\"9.6\" width=\"1.6\" height=\"1.4\" fill=\"#aab2ba\"/><rect x=\"11.1\" y=\"9.6\" width=\"1.6\" height=\"1.4\" fill=\"#aab2ba\"/><rect x=\"3.6\" y=\"11.9\" width=\"1.6\" height=\"1.4\" fill=\"#aab2ba\"/><rect x=\"6.1\" y=\"11.9\" width=\"1.6\" height=\"1.4\" fill=\"#aab2ba\"/><rect x=\"8.6\" y=\"11.9\" width=\"1.6\" height=\"1.4\" fill=\"#aab2ba\"/></svg>",
  "security": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M5 7.3V5.2a3 3 0 0 1 6 0v2.1\" stroke=\"#7f878f\" stroke-width=\"1.5\"/><path d=\"M5 7.3V5.2a3 3 0 0 1 6 0\" stroke=\"#e6eaee\" stroke-width=\".5\"/><rect x=\"2.8\" y=\"7\" width=\"10.4\" height=\"7.6\" rx=\"1.4\" fill=\"url(#cxl-gold)\" stroke=\"#9a6a0e\" stroke-width=\".85\"/><circle cx=\"8\" cy=\"10.1\" r=\"1.1\" fill=\"#7a5208\"/><path d=\"M8 10.5v2\" stroke=\"#7a5208\" stroke-width=\"1\" stroke-linecap=\"round\"/><path d=\"M3.9 8.2h8.2\" stroke=\"#fff6cf\" stroke-width=\".6\"/></svg>",
  "query": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M10 10l4.2 4.2\" stroke=\"#3c4248\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M10.3 10.3l3.6 3.6\" stroke=\"#8b939b\" stroke-width=\".8\" stroke-linecap=\"round\"/><circle cx=\"6.6\" cy=\"6.6\" r=\"4.6\" fill=\"url(#cxl-glass)\" stroke=\"#5c6670\" stroke-width=\"1.3\"/><path d=\"M4.2 5.4a2.7 2.7 0 0 1 2.2-2\" stroke=\"#fff\" stroke-width=\"1\" stroke-linecap=\"round\"/></svg>",
  "program": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M1.3 5h2.9M1.3 8h2.9M1.3 11h2.9\" stroke=\"#2f74c2\" stroke-width=\"1\"/><path d=\"M11.8 8h2.9\" stroke=\"#2c8a2b\" stroke-width=\"1\"/><circle cx=\"1.5\" cy=\"5\" r=\".75\" fill=\"#3f8ddc\"/><circle cx=\"1.5\" cy=\"8\" r=\".75\" fill=\"#3f8ddc\"/><circle cx=\"1.5\" cy=\"11\" r=\".75\" fill=\"#3f8ddc\"/><circle cx=\"14.5\" cy=\"8\" r=\".75\" fill=\"#5cc44f\"/><rect x=\"4.2\" y=\"2\" width=\"7.6\" height=\"12\" rx=\"1\" fill=\"url(#cxl-paper)\" stroke=\"#5d656d\" stroke-width=\".85\"/><path d=\"M4.2 3a1 1 0 0 1 1-1h5.6a1 1 0 0 1 1 1v1.6H4.2z\" fill=\"url(#cxl-blue)\" stroke=\"#1c4f92\" stroke-width=\".6\"/><path d=\"M5.6 7.2h4.8M5.6 9.2h4.8M5.6 11.2h3.2\" stroke=\"#a9afb6\" stroke-width=\".7\" stroke-linecap=\"round\"/></svg>",
  "route": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><rect x=\"7.2\" y=\"4.5\" width=\"1.6\" height=\"10.2\" rx=\".3\" fill=\"url(#cxl-wood)\" stroke=\"#5b3a18\" stroke-width=\".55\"/><path d=\"M2.6 1.7h8.4l2.3 1.8-2.3 1.8H2.6z\" fill=\"url(#cxl-blue)\" stroke=\"#1c4f92\" stroke-width=\".75\" stroke-linejoin=\"round\"/><path d=\"M13.4 6.4H5l-2.3 1.8L5 10h8.4z\" fill=\"url(#cxl-green)\" stroke=\"#2a7a29\" stroke-width=\".75\" stroke-linejoin=\"round\"/><path d=\"M3.6 2.7h6.5M5.8 7.4h6.6\" stroke=\"#fff\" stroke-opacity=\".7\" stroke-width=\".6\" stroke-linecap=\"round\"/></svg>",
  "news": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><rect x=\"1.5\" y=\"2.5\" width=\"13\" height=\"11\" rx=\"1\" fill=\"url(#cxl-paper)\" stroke=\"#7d848b\" stroke-width=\".85\"/><rect x=\"3\" y=\"4\" width=\"10\" height=\"1.7\" rx=\".3\" fill=\"#4d5863\"/><rect x=\"3\" y=\"7\" width=\"4.4\" height=\"4\" fill=\"url(#cxl-sky)\" stroke=\"#5f7c96\" stroke-width=\".5\"/><path d=\"M8.6 7.5h4.4M8.6 9.2h4.4M8.6 10.9h4.4M3 12.3h10\" stroke=\"#a3a9b0\" stroke-width=\".75\" stroke-linecap=\"round\"/></svg>",
  "release": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><circle cx=\"8\" cy=\"8\" r=\"6.4\" fill=\"url(#cxl-paper)\" stroke=\"#2e6db5\" stroke-width=\"1.3\"/><path d=\"M8 2.9v1M8 12.1v1M2.9 8h1M12.1 8h1\" stroke=\"#7d848b\" stroke-width=\".8\" stroke-linecap=\"round\"/><path d=\"M8 8V4.9M8 8l2.5 1.6\" stroke=\"#2a2f34\" stroke-width=\"1.1\" stroke-linecap=\"round\"/><circle cx=\"8\" cy=\"8\" r=\".8\" fill=\"#e33f2c\"/></svg>",
  "info": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><circle cx=\"8\" cy=\"8\" r=\"6.6\" fill=\"url(#cxl-blue)\" stroke=\"#1c4f92\" stroke-width=\".85\"/><path d=\"M4.3 5.6a4.4 4.4 0 0 1 7.4 0\" stroke=\"#fff\" stroke-opacity=\".55\" stroke-width=\"1\" stroke-linecap=\"round\"/><circle cx=\"8\" cy=\"4.9\" r=\"1.05\" fill=\"#fff\"/><rect x=\"7.05\" y=\"6.8\" width=\"1.9\" height=\"5.6\" rx=\".6\" fill=\"#fff\"/></svg>",
  "bookmark": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M8.00 1.60L9.70 6.25L14.66 6.44L10.76 9.50L12.11 14.26L8.00 11.50L3.89 14.26L5.24 9.50L1.34 6.44L6.30 6.25Z\" fill=\"url(#cxl-gold)\" stroke=\"#9a6a0e\" stroke-width=\".8\" stroke-linejoin=\"round\"/><path d=\"M6.6 6.2 8 3.3\" stroke=\"#fff\" stroke-opacity=\".8\" stroke-width=\".7\" stroke-linecap=\"round\"/></svg>",
  "notes": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M2 1.5h7.4l2.1 2.1V14.5H2z\" fill=\"url(#cxl-paper)\" stroke=\"#868c93\" stroke-width=\".85\" stroke-linejoin=\"round\"/><path d=\"M3.6 5h5.4M3.6 7h5.4M3.6 9h3.8M3.6 11h3\" stroke=\"#a9afb6\" stroke-width=\".7\" stroke-linecap=\"round\"/><path d=\"M14.6 4.6l1 1-6.4 6.4-1.6.6.6-1.6z\" fill=\"url(#cxl-orange)\" stroke=\"#93500d\" stroke-width=\".7\" stroke-linejoin=\"round\"/><path d=\"M8.2 11.4l-.6 1.6 1.6-.6z\" fill=\"#3b2a18\"/></svg>",
  "software": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><rect x=\"4\" y=\"4.6\" width=\"8\" height=\"10\" rx=\"2.3\" fill=\"url(#cxl-glass)\" stroke=\"#7d8fa1\" stroke-width=\".85\"/><rect x=\"4.5\" y=\"1.8\" width=\"7\" height=\"3\" rx=\".8\" fill=\"url(#cxl-gold)\" stroke=\"#9a6a0e\" stroke-width=\".8\"/><path d=\"M5.7 6.6v5.8\" stroke=\"#fff\" stroke-width=\"1\" stroke-linecap=\"round\"/><path d=\"M5 2.9h6\" stroke=\"#fff6cf\" stroke-width=\".6\"/></svg>",
  "home": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><rect x=\"11\" y=\"2.2\" width=\"1.7\" height=\"3.4\" fill=\"url(#cxl-red)\" stroke=\"#8f2a1c\" stroke-width=\".6\"/><path d=\"M2.7 7.2h10.6v7.3H2.7z\" fill=\"url(#cxl-cream)\" stroke=\"#a5833a\" stroke-width=\".8\"/><path d=\"M.9 8 8 1.6 15.1 8l-1 .9L8 3.6 1.9 8.9z\" fill=\"url(#cxl-red)\" stroke=\"#8f2a1c\" stroke-width=\".7\" stroke-linejoin=\"round\"/><path d=\"M6.8 9.6h2.6v4.9H6.8z\" fill=\"url(#cxl-wood)\" stroke=\"#5b3a18\" stroke-width=\".6\"/><rect x=\"3.8\" y=\"9.1\" width=\"2.1\" height=\"2.1\" fill=\"url(#cxl-sky)\" stroke=\"#5f7c96\" stroke-width=\".5\"/><rect x=\"10.3\" y=\"9.1\" width=\"2.1\" height=\"2.1\" fill=\"url(#cxl-sky)\" stroke=\"#5f7c96\" stroke-width=\".5\"/></svg>",
  "video": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><rect x=\"1.5\" y=\"2.8\" width=\"13\" height=\"10.4\" rx=\"1.6\" fill=\"url(#cxl-screen)\" stroke=\"#163f7d\" stroke-width=\".85\"/><path d=\"M2.8 4.4h10.4\" stroke=\"#fff\" stroke-opacity=\".45\" stroke-width=\".7\" stroke-linecap=\"round\"/><path d=\"M6.5 5.7v4.6l3.9-2.3z\" fill=\"#fff\" stroke=\"#e8f2ff\" stroke-width=\".5\" stroke-linejoin=\"round\"/></svg>",
  "collection": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M5.3 1.3h6.6l2.4 2.4v8.6H5.3z\" fill=\"url(#cxl-paper)\" stroke=\"#868c93\" stroke-width=\".8\" stroke-linejoin=\"round\"/><path d=\"M6.699999999999999 5.3h5.4M6.699999999999999 7.1h5.4M6.699999999999999 8.9h3.6\" stroke=\"#a9afb6\" stroke-width=\".65\" stroke-linecap=\"round\"/><path d=\"M3.6 2.9h6.6l2.4 2.4v8.6H3.6z\" fill=\"url(#cxl-paper)\" stroke=\"#868c93\" stroke-width=\".8\" stroke-linejoin=\"round\"/><path d=\"M5.0 6.9h5.4M5.0 8.7h5.4M5.0 10.5h3.6\" stroke=\"#a9afb6\" stroke-width=\".65\" stroke-linecap=\"round\"/><path d=\"M1.9 4.5h6.6l2.4 2.4v8.6H1.9z\" fill=\"url(#cxl-paper)\" stroke=\"#868c93\" stroke-width=\".8\" stroke-linejoin=\"round\"/><path d=\"M3.3 8.5h5.4M3.3 10.3h5.4M3.3 12.1h3.6\" stroke=\"#a9afb6\" stroke-width=\".65\" stroke-linecap=\"round\"/></svg>",
  "graphics": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><rect x=\"1.5\" y=\"2.5\" width=\"13\" height=\"11\" rx=\".8\" fill=\"url(#cxl-sky)\" stroke=\"#6c747c\" stroke-width=\".9\"/><circle cx=\"5.1\" cy=\"5.9\" r=\"1.6\" fill=\"url(#cxl-gold)\" stroke=\"#c48a18\" stroke-width=\".5\"/><path d=\"M1.9 13.1 6.1 8.2l2.7 2.9 2.1-2 3.2 4z\" fill=\"url(#cxl-green)\" stroke=\"#2a7a29\" stroke-width=\".6\" stroke-linejoin=\"round\"/></svg>",
  "controller": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><rect x=\"3\" y=\"3\" width=\"10\" height=\"10\" rx=\"1\" fill=\"#d3d9c7\" stroke=\"#5b6751\"/><path d=\"M1 5h2M1 8h2M1 11h2M13 5h2M13 8h2M13 11h2M5 1v2M8 1v2M11 1v2M5 13v2M8 13v2M11 13v2\" stroke=\"#69745d\"/><path d=\"M5 5h6v6H5z\" fill=\"#788e6e\"/></svg>",
  "bas": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M2.2 14.5V3.2h8v11.3\" fill=\"url(#cxl-metal)\" stroke=\"#5b6f82\" stroke-width=\".85\" stroke-linejoin=\"round\"/><path d=\"M10.2 7.4h3.8v7.1h-3.8z\" fill=\"url(#cxl-steel)\" stroke=\"#5b6f82\" stroke-width=\".85\"/><rect x=\"3.4\" y=\"4.6\" width=\"1.3\" height=\"1.3\" fill=\"url(#cxl-sky)\" stroke=\"#4f6f8c\" stroke-width=\".35\"/><rect x=\"3.4\" y=\"7\" width=\"1.3\" height=\"1.3\" fill=\"url(#cxl-sky)\" stroke=\"#4f6f8c\" stroke-width=\".35\"/><rect x=\"3.4\" y=\"9.4\" width=\"1.3\" height=\"1.3\" fill=\"url(#cxl-sky)\" stroke=\"#4f6f8c\" stroke-width=\".35\"/><rect x=\"5.6\" y=\"4.6\" width=\"1.3\" height=\"1.3\" fill=\"url(#cxl-sky)\" stroke=\"#4f6f8c\" stroke-width=\".35\"/><rect x=\"5.6\" y=\"7\" width=\"1.3\" height=\"1.3\" fill=\"url(#cxl-sky)\" stroke=\"#4f6f8c\" stroke-width=\".35\"/><rect x=\"5.6\" y=\"9.4\" width=\"1.3\" height=\"1.3\" fill=\"url(#cxl-sky)\" stroke=\"#4f6f8c\" stroke-width=\".35\"/><rect x=\"7.8\" y=\"4.6\" width=\"1.3\" height=\"1.3\" fill=\"url(#cxl-sky)\" stroke=\"#4f6f8c\" stroke-width=\".35\"/><rect x=\"7.8\" y=\"7\" width=\"1.3\" height=\"1.3\" fill=\"url(#cxl-sky)\" stroke=\"#4f6f8c\" stroke-width=\".35\"/><rect x=\"7.8\" y=\"9.4\" width=\"1.3\" height=\"1.3\" fill=\"url(#cxl-sky)\" stroke=\"#4f6f8c\" stroke-width=\".35\"/><path d=\"M11.3 9.3h1.6M11.3 11.4h1.6\" stroke=\"#4f6f8c\" stroke-width=\".8\"/><path d=\"M5.4 14.5v-2.6h1.6v2.6\" fill=\"url(#cxl-wood)\" stroke=\"#5b3a18\" stroke-width=\".5\"/><path d=\"M1.2 14.5h13.6\" stroke=\"#5b6f82\" stroke-width=\".9\"/><path d=\"M10.8 3.4h2.2l.9-1.2.9 2\" stroke=\"#2c8a2b\" stroke-width=\"1\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>",
  "lineup": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><rect x=\"1.2\" y=\"5.5\" width=\"4\" height=\"8\" rx=\".5\" fill=\"#DAE4CE\" stroke=\"#768769\"/><rect x=\"5.9\" y=\"2.5\" width=\"4\" height=\"11\" rx=\".5\" fill=\"#D3DEE7\" stroke=\"#5F7D92\"/><rect x=\"10.7\" y=\"4\" width=\"4\" height=\"9.5\" rx=\".5\" fill=\"#E8D5CD\" stroke=\"#A27163\"/><path d=\"M2.2 8h2M2.2 11h2M6.9 5h2M6.9 8h2M6.9 11h2M11.7 7h2M11.7 10h2\" stroke=\"#65767D\"/></svg>",
  "optimizer": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><rect x=\"1.5\" y=\"4\" width=\"13\" height=\"8.5\" rx=\"1\" fill=\"#F3F3F2\" stroke=\"#747B80\"/><path d=\"M2.5 5.2h2v6h-2z\" fill=\"#D8473D\"/><rect x=\"6\" y=\"6\" width=\"6.5\" height=\"3\" rx=\".3\" fill=\"#D0DDE1\" stroke=\"#7B949C\"/><path d=\"M4 1.5v2M7 1.5v2M10 1.5v2M4 13v1.5M7 13v1.5M10 13v1.5\" stroke=\"#5E6B70\" stroke-width=\"1.3\"/><circle cx=\"12\" cy=\"10.7\" r=\".55\" fill=\"#56865B\"/><path d=\"M10 1h2v2h1V1h2v6h-2V5h-1v2h-2z\" fill=\"#e20100\"/></svg>",
  "ciper-30": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><rect x=\"1.5\" y=\"3.5\" width=\"13\" height=\"9\" rx=\".6\" fill=\"#EFEFED\" stroke=\"#747C7E\"/><path d=\"M2.5 4.5v7\" stroke=\"#D75143\" stroke-width=\"1.5\"/><path d=\"M4 1.5v2M7 1.5v2M10 1.5v2M4 12.5v2M7 12.5v2M10 12.5v2\" stroke=\"#6B7A7C\"/><path d=\"M5.5 6h2.6v2H6.5m1.6 0v2H5.5M10 6h2.2v4H10z\" stroke=\"#536B76\" stroke-width=\".9\" stroke-linejoin=\"round\"/><path d=\"M10 1h2v2h1V1h2v6h-2V5h-1v2h-2z\" fill=\"#e20100\"/></svg>",
  "ciper-50": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><rect x=\"1.5\" y=\"3.5\" width=\"13\" height=\"9\" rx=\".6\" fill=\"#D7DCDF\" stroke=\"#606D74\"/><path d=\"M2.5 4.5v7\" stroke=\"#D75143\" stroke-width=\"1.5\"/><path d=\"M4 1.5v2M7 1.5v2M10 1.5v2M4 12.5v2M7 12.5v2M10 12.5v2\" stroke=\"#6B7A7C\"/><path d=\"M8.1 6H5.5v2h2.6v2H5.5M10 6h2.2v4H10z\" stroke=\"#455D69\" stroke-width=\".9\" stroke-linejoin=\"round\"/><path d=\"M10 1h2v2h1V1h2v6h-2V5h-1v2h-2z\" fill=\"#e20100\"/></svg>",
  "cct": "<img class=\"logo-image\" src=\"icons/creator-johnson-controls.png\" alt=\"\" width=\"128\" height=\"128\" decoding=\"async\">",
  "engineering": "<img class=\"logo-image\" src=\"icons/creator-distech-controls.png\" alt=\"\" width=\"128\" height=\"128\" decoding=\"async\">",
  "eclypse": "<img class=\"logo-image\" src=\"icons/creator-distech-controls.png\" alt=\"\" width=\"128\" height=\"128\" decoding=\"async\">",
  "points": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><circle cx=\"3.6\" cy=\"3.4\" r=\"2\" fill=\"url(#cxl-green)\" stroke=\"#2a7a29\" stroke-width=\".7\"/><path d=\"M7 3.4h7\" stroke=\"#8c949c\" stroke-width=\"1\" stroke-linecap=\"round\"/><circle cx=\"3.6\" cy=\"8\" r=\"2\" fill=\"url(#cxl-purple)\" stroke=\"#5a3394\" stroke-width=\".7\"/><path d=\"M7 8h7\" stroke=\"#8c949c\" stroke-width=\"1\" stroke-linecap=\"round\"/><circle cx=\"3.6\" cy=\"12.6\" r=\"2\" fill=\"url(#cxl-green)\" stroke=\"#2a7a29\" stroke-width=\".7\"/><path d=\"M7 12.6h7\" stroke=\"#8c949c\" stroke-width=\"1\" stroke-linecap=\"round\"/></svg>",
  "honeywell": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><g transform=\"translate(-43.25 -.7) scale(.48)\"><path d=\"M92.249 35.144V4H101.911V17.0565H111.494V4H121.156V35.144H111.494V21.0489H101.911V35.144H92.249Z\" fill=\"#E20100\"/></g></svg>",
  "irm": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><rect x=\"3\" y=\"3\" width=\"10\" height=\"10\" rx=\"1\" fill=\"#d3d9c7\" stroke=\"#5b6751\"/><path d=\"M1 5h2M1 8h2M1 11h2M13 5h2M13 8h2M13 11h2M5 1v2M8 1v2M11 1v2M5 13v2M8 13v2M11 13v2\" stroke=\"#69745d\"/><path d=\"M5 5h6v6H5z\" fill=\"#afa6cf\" stroke=\"#77688f\"/><path d=\"M10 1h2v2h1V1h2v6h-2V5h-1v2h-2z\" fill=\"#e20100\"/></svg>",
  "spyder": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M5 5 2 2M5 7 1 5M5 9 1 11M5 11 2 14M11 5l3-3M11 7l4-2M11 9l4 2M11 11l3 3\" stroke=\"#463c37\" stroke-width=\"1.2\"/><ellipse cx=\"8\" cy=\"9\" rx=\"3.5\" ry=\"5\" fill=\"#c63f28\" stroke=\"#652f25\"/><circle cx=\"8\" cy=\"4\" r=\"2.2\" fill=\"#d65a33\" stroke=\"#652f25\"/><path d=\"M7 8h2M7 11h2\" stroke=\"#efc48b\"/></svg>",
  "niagara": "<span class=\"niagara-crop ng-core\"><img src=\"icons/niagara-generations.webp\" alt=\"\" width=\"763\" height=\"576\" decoding=\"async\"></span>",
  "niagara-ax": "<span class=\"niagara-crop ng-ax\"><img src=\"icons/niagara-generations.webp\" alt=\"\" width=\"763\" height=\"576\" decoding=\"async\"></span>",
  "niagara-n4": "<span class=\"niagara-crop ng-n4\"><img src=\"icons/niagara-generations.webp\" alt=\"\" width=\"763\" height=\"576\" decoding=\"async\"></span>",
  "niagara-n5": "<span class=\"niagara-crop ng-n5\"><img src=\"icons/niagara-generations.webp\" alt=\"\" width=\"763\" height=\"576\" decoding=\"async\"></span>",
  "fx": "<span class=\"vendor-crop fx-crop\"><img src=\"icons/facility-explorer.png\" alt=\"\" width=\"720\" height=\"320\" decoding=\"async\"></span>",
  "distech": "<span class=\"vendor-crop gfx-crop\"><img src=\"icons/ec-gfxprogram.png\" alt=\"\" width=\"600\" height=\"375\" decoding=\"async\"></span>",
  "creator-broudy-precision": "<img class=\"logo-image\" src=\"icons/creator-broudy-precision.png\" alt=\"\" width=\"128\" height=\"128\" decoding=\"async\">",
  "creator-smart-buildings-academy": "<img class=\"logo-image\" src=\"icons/creator-smart-buildings-academy.png\" alt=\"\" width=\"128\" height=\"128\" decoding=\"async\">",
  "creator-system-control-tech": "<img class=\"logo-image\" src=\"icons/creator-system-control-tech.png\" alt=\"\" width=\"128\" height=\"128\" decoding=\"async\">",
  "creator-fx-training-group": "<img class=\"logo-image\" src=\"icons/creator-fx-training-group.png\" alt=\"\" width=\"128\" height=\"128\" decoding=\"async\">",
  "creator-onesighttv": "<img class=\"logo-image\" src=\"icons/creator-onesighttv.png\" alt=\"\" width=\"128\" height=\"128\" decoding=\"async\">",
  "creator-tyrrell-products": "<img class=\"logo-image\" src=\"icons/creator-tyrrell-products.png\" alt=\"\" width=\"128\" height=\"128\" decoding=\"async\">",
  "creator-nordicity-training": "<img class=\"logo-image\" src=\"icons/creator-nordicity-training.png\" alt=\"\" width=\"128\" height=\"128\" decoding=\"async\">",
  "creator-tony-kelly": "<img class=\"logo-image\" src=\"icons/creator-tony-kelly.png\" alt=\"\" width=\"128\" height=\"128\" decoding=\"async\">",
  "creator-fms-integration": "<img class=\"logo-image\" src=\"icons/creator-fms-integration.png\" alt=\"\" width=\"128\" height=\"128\" decoding=\"async\">",
  "creator-insight-control-system": "<img class=\"logo-image\" src=\"icons/creator-insight-control-system.png\" alt=\"\" width=\"128\" height=\"128\" decoding=\"async\">",
  "creator-building-controls-solutions": "<img class=\"logo-image\" src=\"icons/creator-building-controls-solutions.png\" alt=\"\" width=\"128\" height=\"128\" decoding=\"async\">",
  "creator-temperature-control-systems": "<img class=\"logo-image\" src=\"icons/creator-temperature-control-systems.png\" alt=\"\" width=\"128\" height=\"128\" decoding=\"async\">",
  "creator-cochrane-tech-services": "<img class=\"logo-image\" src=\"icons/creator-cochrane-tech-services.png\" alt=\"\" width=\"128\" height=\"128\" decoding=\"async\">",
  "creator-cochrane-supply": "<img class=\"logo-image\" src=\"icons/creator-cochrane-supply.png\" alt=\"\" width=\"128\" height=\"128\" decoding=\"async\">",
  "creator-tridium": "<img class=\"logo-image\" src=\"icons/creator-tridium.png\" alt=\"\" width=\"128\" height=\"128\" decoding=\"async\">",
  "creator-johnson-controls": "<img class=\"logo-image\" src=\"icons/creator-johnson-controls.png\" alt=\"\" width=\"128\" height=\"128\" decoding=\"async\">",
  "creator-distech-controls": "<img class=\"logo-image\" src=\"icons/creator-distech-controls.png\" alt=\"\" width=\"128\" height=\"128\" decoding=\"async\">",
  "creator-stromquist-control-room": "<img class=\"logo-image\" src=\"icons/creator-stromquist-control-room.png\" alt=\"\" width=\"128\" height=\"128\" decoding=\"async\">",
  "creator-teddy-kenworthy": "<img class=\"logo-image\" src=\"icons/creator-teddy-kenworthy.png\" alt=\"\" width=\"128\" height=\"128\" decoding=\"async\">",
  "creator-honeywell": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><g transform=\"translate(-43.25 -.7) scale(.48)\"><path d=\"M92.249 35.144V4H101.911V17.0565H111.494V4H121.156V35.144H111.494V21.0489H101.911V35.144H92.249Z\" fill=\"#E20100\"/></g></svg>",
  "creator-alvasys-automation": "<img class=\"logo-image\" src=\"icons/creator-alvasys-automation.png\" alt=\"\" width=\"128\" height=\"128\" decoding=\"async\">",
  "creator-ohm-building-automation": "<img class=\"logo-image\" src=\"icons/creator-ohm-building-automation.png\" alt=\"\" width=\"128\" height=\"128\" decoding=\"async\">",
  "protocol-wireless": "<img class=\"logo-image\" src=\"icons/protocol-wireless.png\" alt=\"\" width=\"128\" height=\"128\" decoding=\"async\">",
  "protocol-bacnet": "<img class=\"logo-image\" src=\"icons/protocol-bacnet.png\" alt=\"\" width=\"128\" height=\"128\" decoding=\"async\">",
  "protocol-modbus": "<img class=\"logo-image\" src=\"icons/protocol-modbus.png\" alt=\"\" width=\"192\" height=\"72\" decoding=\"async\">",
  "protocol-lon": "<img class=\"logo-image\" src=\"icons/protocol-lon.png\" alt=\"\" width=\"64\" height=\"64\" decoding=\"async\">",
  "creator-the-things-industries": "<img class=\"logo-image\" src=\"icons/creator-the-things-industries.png\" alt=\"\" width=\"128\" height=\"128\" decoding=\"async\">",
  "creator-milesight-iot": "<img class=\"logo-image\" src=\"icons/creator-milesight-iot.png\" alt=\"\" width=\"128\" height=\"128\" decoding=\"async\">",
  "creator-enless-wireless": "<img class=\"logo-image\" src=\"icons/creator-enless-wireless.png\" alt=\"\" width=\"128\" height=\"128\" decoding=\"async\">",
  "creator-contemporary-controls": "<img class=\"logo-image\" src=\"icons/creator-contemporary-controls.png\" alt=\"\" width=\"128\" height=\"128\" decoding=\"async\">",
  "creator-realpars": "<img class=\"logo-image\" src=\"icons/creator-realpars.png\" alt=\"\" width=\"128\" height=\"128\" decoding=\"async\">",
  "creator-loytec": "<img class=\"logo-image\" src=\"icons/creator-loytec.png\" alt=\"\" width=\"192\" height=\"64\" decoding=\"async\">",
  "creator-lonmark": "<img class=\"logo-image\" src=\"icons/protocol-lon.png\" alt=\"\" width=\"64\" height=\"64\" decoding=\"async\">"
});
export const CREATOR_ICON_KEYS=Object.freeze({
  "LumenRadio": "creator-lumenradio",
  "Broudy Precision": "creator-broudy-precision",
  "Broudy / Johnson Controls": "creator-broudy-precision",
  "Smart Buildings Academy": "creator-smart-buildings-academy",
  "System Control Tech": "creator-system-control-tech",
  "FX Training Group": "creator-fx-training-group",
  "FX Training Group · Steven Hurst": "creator-fx-training-group",
  "OneSightTV": "creator-onesighttv",
  "Tyrrell Products": "creator-tyrrell-products",
  "Nordicity Training": "creator-nordicity-training",
  "Tony Kelly": "creator-tony-kelly",
  "FMS Integration LLC": "creator-fms-integration",
  "Insight Control System": "creator-insight-control-system",
  "Building Controls & Solutions": "creator-building-controls-solutions",
  "Temperature Control Systems": "creator-temperature-control-systems",
  "Cochrane Tech Services": "creator-cochrane-tech-services",
  "Cochrane Supply & Engineering": "creator-cochrane-supply",
  "Tridium": "creator-tridium",
  "Johnson Controls": "creator-johnson-controls",
  "Distech Controls": "creator-distech-controls",
  "The Control Room · Stromquist & Company": "creator-stromquist-control-room",
  "Stromquist": "creator-stromquist-control-room",
  "Teddy Kenworthy": "creator-teddy-kenworthy",
  "Honeywell": "creator-honeywell",
  "alvasys automation ag": "creator-alvasys-automation",
  "OHM - Building Automation System": "creator-ohm-building-automation",
  "The Things Industries": "creator-the-things-industries",
  "Milesight IoT": "creator-milesight-iot",
  "Enless Wireless": "creator-enless-wireless",
  "Contemporary Controls": "creator-contemporary-controls",
  "RealPars": "creator-realpars",
  "LOYTEC": "creator-loytec",
  "LonMarkVideos": "creator-lonmark"
});
export function resourceIconKey(resource={},creatorIcons={}){if(resource.format==='Reference'||resource.type==='Supporting documentation'||/\.pdf(?:$|[?#])/i.test(String(resource.url||'')))return 'document';return Object.hasOwn(creatorIcons,String(resource.provider||''))?creatorIcons[resource.provider]:'video';}
export function iconMarkup(name){const key=Object.hasOwn(ICON_ART,name)?name:'folder';return `<span class="wb-icon wb-icon-${key}" data-icon="${key}" aria-hidden="true">${ICON_ART[key]}</span>`;}
export const ICON_ASSETS=Object.freeze(Object.fromEntries(Object.entries({
  "icons/protocol-lorawan.png": {
    "width": 192,
    "height": 72,
    "sha256": "b1ec315ad39d55c3ccafb5f2827474197e29d3e5289fc9faf54c075d1590f3ab"
  },
  "icons/protocol-lora.png": {
    "width": 192,
    "height": 72,
    "sha256": "b684f9cc466fd8b26855f84b7d03a3f82feb12bb55414ddd4353e7fae0281535"
  },
  "icons/creator-lumenradio.png": {
    "width": 128,
    "height": 128,
    "sha256": "ba770849b594ef2e24a9f41e3a5a7c9af8abcdfc4690be4e628f83abf5cdb3f5"
  },
  "icons/facility-explorer.png": {
    "width": 720,
    "height": 320,
    "sha256": "08ac021beda41bca9b1a278a260a6debf7a14d34266a8b01434d5cbd53587709"
  },
  "icons/niagara-generations.webp": {
    "width": 763,
    "height": 576,
    "sha256": "fdfc556cfd0eb36cc7448dc83be69f898553be0b76aec762d20fd179126dbda3",
    "type": "webp"
  },
  "icons/ec-gfxprogram.png": {
    "width": 600,
    "height": 375,
    "sha256": "aa83f4461b3dfbebceb37f34c2f5f4ee69571dff3dd59d86d9eceedcfc59a67f"
  },
  "icons/creator-broudy-precision.png": {
    "width": 128,
    "height": 128,
    "sha256": "7dc1059d5ef81326a48dcc32a31ac1dea35792e6af660ca6be96f45f8b4f43db"
  },
  "icons/creator-smart-buildings-academy.png": {
    "width": 128,
    "height": 128,
    "sha256": "5a13d5bc399a59435896b2521d7b4049570f4ef77e75ee2fc82db39cd75ea0aa"
  },
  "icons/creator-system-control-tech.png": {
    "width": 128,
    "height": 128,
    "sha256": "d115585422c5ca69b503c77057283c233a7957d508a8e59a9cece3c885405ef3"
  },
  "icons/creator-fx-training-group.png": {
    "width": 128,
    "height": 128,
    "sha256": "f4d815dbad8d0999b4addbec89c8cff0b833bf20b00b5a4eb3d7a1d74a75aee3"
  },
  "icons/creator-onesighttv.png": {
    "width": 128,
    "height": 128,
    "sha256": "9ef0fa0f30a47ebb89c841a213e810d0812b18c089fd1ecf7192cb9eb63f716f"
  },
  "icons/creator-tyrrell-products.png": {
    "width": 128,
    "height": 128,
    "sha256": "2ca12f7fd8e0ddc58e579bdce91d9dbb4e83c5d5f3f4e35c071872684dd8b848"
  },
  "icons/creator-nordicity-training.png": {
    "width": 128,
    "height": 128,
    "sha256": "16891c16ee6b9ba2e2a75b5753a0d75bd4ca872d6a1d6c80299270c69affcf2c"
  },
  "icons/creator-tony-kelly.png": {
    "width": 128,
    "height": 128,
    "sha256": "a02394de838c1b16acf9019cb8940edcbf550d9b41fa1775d04ddeab92d131d8"
  },
  "icons/creator-fms-integration.png": {
    "width": 128,
    "height": 128,
    "sha256": "85f1117fff5bb9c679f7704c412d2aa36a620ded98ca3bdf4331e4de36a6c95a"
  },
  "icons/creator-insight-control-system.png": {
    "width": 128,
    "height": 128,
    "sha256": "e264d274e5b8bf598667c101fd8806c0424108af293620f5dae90031635435f2"
  },
  "icons/creator-building-controls-solutions.png": {
    "width": 128,
    "height": 128,
    "sha256": "271b9c82cf9b45991bb69a70ff419d3ce0a5e7c53634fc98ed185ab678f15d40"
  },
  "icons/creator-temperature-control-systems.png": {
    "width": 128,
    "height": 128,
    "sha256": "a23ca96bbc0310e2f5ebdeaa9b95654409e8fb94013658f911a66fc83e20dc18"
  },
  "icons/creator-cochrane-tech-services.png": {
    "width": 128,
    "height": 128,
    "sha256": "c2b4e4fa95da0a34550faab080fd015f4886bc2a6ed7b15557d4b7feec7d4bec"
  },
  "icons/creator-cochrane-supply.png": {
    "width": 128,
    "height": 128,
    "sha256": "2c68103e5009278b4f341155e8375d3efdbc92e5b62b6b346ae2d25a0115acfb"
  },
  "icons/creator-tridium.png": {
    "width": 128,
    "height": 128,
    "sha256": "8c7b901c63f904ce24fbe00e6965aadc153ef0cb3445548cc8f3d17dc88532b5"
  },
  "icons/creator-johnson-controls.png": {
    "width": 128,
    "height": 128,
    "sha256": "9fea4765d3a4d0de2887a62d6f236ad86ece4dad2a1fb7b77345b71d7fc36f6f"
  },
  "icons/creator-distech-controls.png": {
    "width": 128,
    "height": 128,
    "sha256": "134383b0776c5550bfac4df885184d5d9c4c966a5ccb8ca1fc8d27639bd7ce1f"
  },
  "icons/creator-stromquist-control-room.png": {
    "width": 128,
    "height": 128,
    "sha256": "780f55784849f6fea3d60fb385289d076bc8a96fd2a56d2a679851f1396f4f83"
  },
  "icons/creator-teddy-kenworthy.png": {
    "width": 128,
    "height": 128,
    "sha256": "64637290a337e8f137bc516493a822badad6d1c6b62c3e2471059ae55d89c077"
  },
  "icons/creator-alvasys-automation.png": {
    "width": 128,
    "height": 128,
    "sha256": "4c65f2f0b8f7dcf66815d5be4891f49c49c894f59884552d23ef57aace675c59"
  },
  "icons/creator-ohm-building-automation.png": {
    "width": 128,
    "height": 128,
    "sha256": "4cfa03e83ca8177ccdfd38ca93705d9095300b7a704e653c479fab114a16d220"
  },
  "icons/brand-vykon.png": {
    "width": 128,
    "height": 128,
    "sha256": "135357ac92a30b81e7b75ce90c7caf1a294ed2cd5e25cc0b6e221c2e10264828"
  },
  "icons/protocol-wireless.png": {
    "width": 128,
    "height": 128,
    "sha256": "5c609f254203521cc1fc65a7b9897688c4cff71141b09d0fd89664f4dd6d528c"
  },
  "icons/protocol-bacnet.png": {
    "width": 128,
    "height": 128,
    "sha256": "9fa6b0f20337f9e5d76a08b9e88773105b095c98d3ce7068d88ba97242921475"
  },
  "icons/protocol-lon.png": {
    "width": 64,
    "height": 64,
    "sha256": "57e52cd2089326ab97ab07f612970c42dfb2d677377848eeb6e0ccb14ad6f93f"
  },
  "icons/protocol-modbus.png": {
    "width": 192,
    "height": 72,
    "sha256": "6ac0a9b65c729d09ac378d86b0741627500954053fd1c5ee8287f43391c2dd05"
  },
  "icons/creator-the-things-industries.png": {
    "width": 128,
    "height": 128,
    "sha256": "07c88aa72b8771aa388edd9a2c598b44a775addcb648a4da37509795ed604a9f"
  },
  "icons/creator-milesight-iot.png": {
    "width": 128,
    "height": 128,
    "sha256": "cf39bbb7d178f703d0e4a1076dd3567fdb4bc880ffd89d620c47bab3becf2158"
  },
  "icons/creator-enless-wireless.png": {
    "width": 128,
    "height": 128,
    "sha256": "3c7b3c3f20881e099079f8097ddbffa584865b1f8be32e831753d6400b1c1e3e"
  },
  "icons/creator-contemporary-controls.png": {
    "width": 128,
    "height": 128,
    "sha256": "0b529dad5e4366188c82f7da4113680c8f14451afcb04b78a2991ef09fb90c7c"
  },
  "icons/creator-realpars.png": {
    "width": 128,
    "height": 128,
    "sha256": "b70b948b789903a8cb28d1bc21e04dc2a011cb2f02af996e5b7f3086952ae70b"
  },
  "icons/creator-loytec.png": {
    "width": 192,
    "height": 64,
    "sha256": "28ee679a9cf4b159792558e4f80a1faa241801d403b966fa108902d9755d165b"
  }
}).map(([file,metadata])=>[file,Object.freeze(metadata)])));
export function validateIconAsset(file,bytes){
 const approved=ICON_ASSETS[file];
 if(!approved||!Buffer.isBuffer(bytes)||bytes.length<33||bytes.length>150000)throw Error('Unapproved icon asset: '+file);
 const pinned=createHash('sha256').update(bytes).digest('hex')===approved.sha256;
 if(approved.type==='webp'){
  const width=bytes.readUInt16LE(26)&0x3fff,height=bytes.readUInt16LE(28)&0x3fff;
  if(!pinned||bytes.toString('ascii',0,4)!=='RIFF'||bytes.readUInt32LE(4)!==bytes.length-8||bytes.toString('ascii',8,16)!=='WEBPVP8 '||bytes.subarray(23,26).toString('hex')!=='9d012a'||width!==approved.width||height!==approved.height)throw Error('Icon asset differs from the inspected original: '+file);
  return bytes;
 }
 if(!pinned||bytes.subarray(0,8).toString('hex')!=='89504e470d0a1a0a'||bytes.toString('ascii',12,16)!=='IHDR'||bytes.readUInt32BE(16)!==approved.width||bytes.readUInt32BE(20)!==approved.height)throw Error('Icon asset differs from the inspected original: '+file);
 return bytes;
}
