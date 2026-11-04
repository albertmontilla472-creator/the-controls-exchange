import {createHash} from 'node:crypto';
// Fixed local artwork: original interface symbols and reviewed identifying logos.
// Manufacturer and creator marks identify subjects/publishers, not endorsement.
export const ICON_ART=Object.freeze({
  "vykon-pro": "<img class=\"logo-image\" src=\"icons/brand-vykon.png\" alt=\"\" width=\"128\" height=\"128\" decoding=\"async\">",
  "folder": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M1.5 5V3h5l1.5 2h6.5v9h-13z\" fill=\"#dfdba4\" stroke=\"#565b38\"/><path d=\"M2 6h12\" stroke=\"#ffffdf\"/></svg>",
  "folder-up": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M1.2 5V2.8h5.2l1.4 1.8h6.8v8.9H1.2Z\" fill=\"#E7BC50\" stroke=\"#9B7831\" stroke-linejoin=\"round\"/><path d=\"M1.2 6h13.4l-1.4 7.5H1.2Z\" fill=\"#F9DA85\" stroke=\"#9B7831\" stroke-linejoin=\"round\"/><path d=\"M8 12V6.3m-2.5 2.5L8 6.3l2.5 2.5\" stroke=\"#276D49\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>",
  "folder-back": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M1.2 5V2.8h5.2l1.4 1.8h6.8v8.9H1.2Z\" fill=\"#E7BC50\" stroke=\"#9B7831\" stroke-linejoin=\"round\"/><path d=\"M1.2 6h13.4l-1.4 7.5H1.2Z\" fill=\"#F9DA85\" stroke=\"#9B7831\" stroke-linejoin=\"round\"/><path d=\"M11 9.6H4.5m2.4-2.4L4.5 9.6 6.9 12\" stroke=\"#276D49\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>",
  "folder-forward": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M1.2 5V2.8h5.2l1.4 1.8h6.8v8.9H1.2Z\" fill=\"#E7BC50\" stroke=\"#9B7831\" stroke-linejoin=\"round\"/><path d=\"M1.2 6h13.4l-1.4 7.5H1.2Z\" fill=\"#F9DA85\" stroke=\"#9B7831\" stroke-linejoin=\"round\"/><path d=\"M4.5 9.6H11m-2.4-2.4L11 9.6 8.6 12\" stroke=\"#276D49\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>",
  "host": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><rect x=\"2\" y=\"1.5\" width=\"12\" height=\"9\" rx=\".7\" fill=\"#a8c9d5\" stroke=\"#59686c\"/><path d=\"M3.5 3h9v6h-9z\" fill=\"#e3f1f4\"/><path d=\"M6 11v2H3v1h10v-1h-3v-2\" fill=\"#919d9d\" stroke=\"#59686c\"/></svg>",
  "platform": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M2 1.5h12v13H2z\" fill=\"#354f66\" stroke=\"#253845\"/><path d=\"M3 3h10v2H3zM3 7h10v2H3zM3 11h10v2H3z\" fill=\"#a6c9db\" stroke=\"#6a96ab\"/><path d=\"M4 4h1M4 8h1M4 12h1\" stroke=\"#e7f5b3\"/><path d=\"M7 4h5M7 8h5M7 12h5\" stroke=\"#466779\"/></svg>",
  "station": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M2 1.5 6 4h4l4-2.5-.5 6L12 11l-4 3.5L4 11 2.5 7.5z\" fill=\"#efb93e\" stroke=\"#403e27\" stroke-linejoin=\"round\"/><path d=\"m3.5 3 2 2-2 .5m9-2.5-2 2 2 .5\" fill=\"#8d6431\"/><path d=\"m3.8 8 4.2 2 4.2-2-2 4L8 14l-2.2-2z\" fill=\"#fff4ce\"/><path d=\"m4.5 6.5 2 1m5-1-2 1\" stroke=\"#3c3b2b\"/><path d=\"m6.5 10 1.5 2 1.5-2z\" fill=\"#3b3b32\"/></svg>",
  "config": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18 18\" fill=\"none\"><path d=\"M12.8 1.8 10.2 4.4 10.8 6.7 13.1 7.3 15.7 4.7C16.4 8 13.2 10.9 10.2 9.6L5.3 14.8a2 2 0 0 1-2.9-2.8l5.1-5C6.2 3.8 9.4.8 12.8 1.8Z\" fill=\"#a6b3bd\" stroke=\"#50616c\" stroke-width=\".9\" stroke-linejoin=\"round\"/><circle cx=\"3.9\" cy=\"13.3\" r=\".7\" fill=\"#f5f6ed\"/></svg>",
  "services": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" fill=\"none\"><path d=\"M6.50,2.00L7.61,0.91L8.68,1.23L9.00,2.76L9.68,3.32L11.24,3.33L11.77,4.32L10.91,5.62L11.00,6.50L12.09,7.61L11.77,8.68L10.24,9.00L9.68,9.68L9.67,11.24L8.68,11.77L7.38,10.91L6.50,11.00L5.39,12.09L4.32,11.77L4.00,10.24L3.32,9.68L1.76,9.67L1.23,8.68L2.09,7.38L2.00,6.50L0.91,5.39L1.23,4.32L2.76,4.00L3.32,3.32L3.33,1.76L4.32,1.23L5.62,2.09Z\" fill=\"#6F9FB7\" stroke=\"#365A70\" stroke-width=\".85\" stroke-linejoin=\"round\"/><circle cx=\"6.5\" cy=\"6.5\" r=\"2.1\" fill=\"#F8FCFE\" stroke=\"#365A70\" stroke-width=\".85\"/><path d=\"M13.80,10.10L14.87,9.12L15.88,9.48L16.11,10.91L16.69,11.49L18.12,11.72L18.48,12.73L17.50,13.80L17.41,14.62L18.12,15.88L17.55,16.79L16.11,16.69L15.41,17.13L14.87,18.48L13.80,18.60L12.98,17.41L12.19,17.13L10.81,17.55L10.05,16.79L10.47,15.41L10.19,14.62L9.00,13.80L9.12,12.73L10.47,12.19L10.91,11.49L10.81,10.05L11.72,9.48L12.98,10.19Z\" fill=\"#BACDA0\" stroke=\"#5D7644\" stroke-width=\".85\" stroke-linejoin=\"round\"/><circle cx=\"13.8\" cy=\"13.8\" r=\"1.65\" fill=\"#FBFDF8\" stroke=\"#5D7644\" stroke-width=\".85\"/></svg>",
  "drivers": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><rect x=\"1\" y=\"10\" width=\"4\" height=\"4\" fill=\"#a7c2d4\" stroke=\"#4e6c83\"/><rect x=\"11\" y=\"10\" width=\"4\" height=\"4\" fill=\"#a7c2d4\" stroke=\"#4e6c83\"/><rect x=\"6\" y=\"1\" width=\"4\" height=\"4\" fill=\"#d9e6b9\" stroke=\"#6a7b4b\"/><path d=\"M8 5v3H3v2m5-2h5v2\" stroke=\"#596f83\"/></svg>",
  "files": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M2 3.5h12v11H2z\" fill=\"#D3DDE2\" stroke=\"#647C89\"/><path d=\"M3 1.5h4l1.5 2H13v3H3z\" fill=\"#EAD48A\" stroke=\"#A18B4E\" stroke-linejoin=\"round\"/><path d=\"M2 7h12v7.5H2z\" fill=\"#B6C8D2\" stroke=\"#647C89\"/><path d=\"M6 9.5h4v2H6z\" fill=\"#F5F8FA\" stroke=\"#647C89\"/></svg>",
  "backup": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M2 8.5h12v6H2z\" fill=\"#C3D3DF\" stroke=\"#587589\" stroke-linejoin=\"round\"/><path d=\"M2 8.5 4 6h8l2 2.5\" fill=\"#EAF0F4\" stroke=\"#587589\" stroke-linejoin=\"round\"/><path d=\"M4 12h5\" stroke=\"#587589\"/><circle cx=\"12\" cy=\"12\" r=\".7\" fill=\"#4D8B5A\"/><path d=\"M4 4.5A4.3 4.3 0 0 1 12 3M12 1v2.5H9.5\" stroke=\"#4D8B5A\" stroke-width=\"1.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>",
  "document": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M3 1.5h7l3 3v10H3z\" fill=\"#fff\" stroke=\"#939b9d\"/><path d=\"M10 2v3h3M5 8h6M5 10h6M5 12h4\" stroke=\"#98a8ad\"/></svg>",
  "history": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M2 2v12h13\" stroke=\"#71827b\"/><path d=\"m3 11 3-4 3 2 2-6 3 2\" stroke=\"#3f8b58\" stroke-width=\"1.5\"/><path d=\"M4 4h10M4 8h10M6 2v11M10 2v11\" stroke=\"#aebcaf\" stroke-opacity=\".4\"/></svg>",
  "alarm": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M3 11c2-2 1-3 2-6 1-3 5-3 6 0 1 3 0 4 2 6z\" fill=\"#edca50\" stroke=\"#8c6c29\"/><path d=\"M6 13h4M7 1h2\" stroke=\"#806526\"/></svg>",
  "schedule": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><rect x=\"2\" y=\"3\" width=\"12\" height=\"11\" fill=\"#fff\" stroke=\"#7f8a84\"/><path d=\"M2 3h12v3H2z\" fill=\"#839dbd\"/><path d=\"M5 1v3M11 1v3M5 8h2m2 0h2m-6 3h2m2 0h2\" stroke=\"#57666e\"/></svg>",
  "security": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><rect x=\"3\" y=\"7\" width=\"10\" height=\"7\" rx=\"1\" fill=\"#e0c05d\" stroke=\"#8a7134\"/><path d=\"M5 7V4a3 3 0 0 1 6 0v3\" stroke=\"#7c8b8d\" stroke-width=\"2\"/><path d=\"M8 10v2\" stroke=\"#665225\"/></svg>",
  "query": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><circle cx=\"6.5\" cy=\"6\" r=\"4.5\" fill=\"#dff3fa\" stroke=\"#83afc4\"/><path d=\"m10 10 4 4\" stroke=\"#687e89\" stroke-width=\"2\"/></svg>",
  "program": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" fill=\"none\"><path d=\"M1 5h4M1 12h4M13 8.5h3v5h2\" stroke=\"#526C79\" stroke-width=\"1.1\" stroke-linejoin=\"round\"/><circle cx=\"1.4\" cy=\"5\" r=\"1\" fill=\"#B9C8D0\" stroke=\"#526C79\" stroke-width=\".6\"/><circle cx=\"1.4\" cy=\"12\" r=\"1\" fill=\"#B9C8D0\" stroke=\"#526C79\" stroke-width=\".6\"/><rect x=\"5\" y=\"1.5\" width=\"8\" height=\"14\" rx=\".6\" fill=\"#DDD8F0\" stroke=\"#655C87\"/><path d=\"M5.5 4h7\" stroke=\"#655C87\"/><path d=\"M8 6v5.5h2.5V6M7 8h5\" stroke=\"#655C87\" stroke-width=\"1.1\"/><rect x=\"15.5\" y=\"12\" width=\"4\" height=\"6\" rx=\".4\" fill=\"#CEE0BA\" stroke=\"#647A4B\"/><path d=\"M16.2 14h2.6M16.2 16h2.6\" stroke=\"#647A4B\"/></svg>",
  "route": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M5 3h7v5H5v5h7\" stroke=\"#6f8c68\" stroke-width=\"1.5\"/><path d=\"m10 11 3 2-3 2\" stroke=\"#6f8c68\"/><circle cx=\"4\" cy=\"3\" r=\"2\" fill=\"#b9d1ac\" stroke=\"#69815a\"/><circle cx=\"4\" cy=\"8\" r=\"2\" fill=\"#c0d4df\" stroke=\"#68869c\"/></svg>",
  "news": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><rect x=\"1.5\" y=\"2\" width=\"13\" height=\"12\" fill=\"#fff\" stroke=\"#87918e\"/><path d=\"M4 5h8M9 8h3M9 10h3M4 12h8\" stroke=\"#6e8589\"/><path d=\"M4 8h3v2H4z\" fill=\"#b5c8ba\"/></svg>",
  "release": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><circle cx=\"8\" cy=\"8\" r=\"6\" fill=\"#eff2e5\" stroke=\"#829080\"/><path d=\"M8 3v5l3 2\" stroke=\"#637d6b\" stroke-width=\"1.5\"/></svg>",
  "info": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><circle cx=\"8\" cy=\"8\" r=\"6\" fill=\"#b8d9e9\" stroke=\"#7aa6bc\"/><path d=\"M8 7v5M8 4v1\" stroke=\"#fff\" stroke-width=\"2\"/></svg>",
  "bookmark": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"m8 1.5 2 4.2 4.5.7-3.2 3.1.8 4.5L8 11.9 3.9 14l.8-4.5-3.2-3.1 4.5-.7z\" fill=\"#ead166\" stroke=\"#a58b35\"/></svg>",
  "notes": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M2 2h10v12H2z\" fill=\"#fff4b9\" stroke=\"#aa9b59\"/><path d=\"M4 5h6M4 8h4M4 11h3\" stroke=\"#b6aa73\"/><path d=\"m10 11 3-8 2 1-3 8-2 1z\" fill=\"#d7ae48\" stroke=\"#8f793d\"/></svg>",
  "software": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M2 10h12v4H2z\" fill=\"#c3cace\" stroke=\"#727f86\"/><path d=\"M8 1v8m-3-3 3 3 3-3\" stroke=\"#4b8756\" stroke-width=\"2\"/><path d=\"M11 12h1\" stroke=\"#67936d\"/></svg>",
  "home": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M3 6.5h10V14H3z\" fill=\"#d85242\" stroke=\"#8a3b31\"/><path d=\"m1.5 7 6.5-5.5L14.5 7Z\" fill=\"#bd3228\" stroke=\"#84372d\" stroke-linejoin=\"round\"/><path d=\"M7 14V9h3v5\" fill=\"#fff1ce\" stroke=\"#8a3b31\"/><path d=\"M4.5 9h1v2h-1z\" fill=\"#ffe3aa\"/></svg>",
  "video": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><rect x=\"1\" y=\"2\" width=\"14\" height=\"12\" rx=\"1\" fill=\"#dae7ef\" stroke=\"#6d8ca4\"/><path d=\"m6 5 5 3-5 3z\" fill=\"#467798\"/></svg>",
  "collection": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M3 1h11v12H3z\" fill=\"#eff2e6\" stroke=\"#9ca58e\"/><path d=\"M1 3h11v12H1z\" fill=\"#fff\" stroke=\"#7f9184\"/><path d=\"M3 6h7M3 9h7M3 12h5\" stroke=\"#8b9f90\"/></svg>",
  "graphics": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><rect x=\"1\" y=\"2\" width=\"14\" height=\"12\" fill=\"#fff\" stroke=\"#7c8690\"/><circle cx=\"5\" cy=\"6\" r=\"2\" fill=\"#e7cd76\"/><path d=\"m2 13 4-4 3 2 3-4 2 6\" fill=\"#a7c2a3\" stroke=\"#6a9273\"/></svg>",
  "controller": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><rect x=\"3\" y=\"3\" width=\"10\" height=\"10\" rx=\"1\" fill=\"#d3d9c7\" stroke=\"#5b6751\"/><path d=\"M1 5h2M1 8h2M1 11h2M13 5h2M13 8h2M13 11h2M5 1v2M8 1v2M11 1v2M5 13v2M8 13v2M11 13v2\" stroke=\"#69745d\"/><path d=\"M5 5h6v6H5z\" fill=\"#788e6e\"/></svg>",
  "bas": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M2 14V3h7v11M9 7h5v7H1\" fill=\"#E6EDF0\" stroke=\"#5C7581\" stroke-linejoin=\"round\"/><path d=\"M4 5h1M6 5h1M4 8h1M6 8h1M4 11h1M6 11h1M11 9h1M11 12h1\" stroke=\"#608BA0\"/><path d=\"M10 3h2l1-1 1 2\" stroke=\"#5B956C\" stroke-width=\"1.2\" stroke-linejoin=\"round\"/></svg>",
  "lineup": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><rect x=\"1.2\" y=\"5.5\" width=\"4\" height=\"8\" rx=\".5\" fill=\"#DAE4CE\" stroke=\"#768769\"/><rect x=\"5.9\" y=\"2.5\" width=\"4\" height=\"11\" rx=\".5\" fill=\"#D3DEE7\" stroke=\"#5F7D92\"/><rect x=\"10.7\" y=\"4\" width=\"4\" height=\"9.5\" rx=\".5\" fill=\"#E8D5CD\" stroke=\"#A27163\"/><path d=\"M2.2 8h2M2.2 11h2M6.9 5h2M6.9 8h2M6.9 11h2M11.7 7h2M11.7 10h2\" stroke=\"#65767D\"/></svg>",
  "optimizer": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><rect x=\"1.5\" y=\"4\" width=\"13\" height=\"8.5\" rx=\"1\" fill=\"#F3F3F2\" stroke=\"#747B80\"/><path d=\"M2.5 5.2h2v6h-2z\" fill=\"#D8473D\"/><rect x=\"6\" y=\"6\" width=\"6.5\" height=\"3\" rx=\".3\" fill=\"#D0DDE1\" stroke=\"#7B949C\"/><path d=\"M4 1.5v2M7 1.5v2M10 1.5v2M4 13v1.5M7 13v1.5M10 13v1.5\" stroke=\"#5E6B70\" stroke-width=\"1.3\"/><circle cx=\"12\" cy=\"10.7\" r=\".55\" fill=\"#56865B\"/><path d=\"M10 1h2v2h1V1h2v6h-2V5h-1v2h-2z\" fill=\"#e20100\"/></svg>",
  "ciper-30": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><rect x=\"1.5\" y=\"3.5\" width=\"13\" height=\"9\" rx=\".6\" fill=\"#EFEFED\" stroke=\"#747C7E\"/><path d=\"M2.5 4.5v7\" stroke=\"#D75143\" stroke-width=\"1.5\"/><path d=\"M4 1.5v2M7 1.5v2M10 1.5v2M4 12.5v2M7 12.5v2M10 12.5v2\" stroke=\"#6B7A7C\"/><path d=\"M5.5 6h2.6v2H6.5m1.6 0v2H5.5M10 6h2.2v4H10z\" stroke=\"#536B76\" stroke-width=\".9\" stroke-linejoin=\"round\"/><path d=\"M10 1h2v2h1V1h2v6h-2V5h-1v2h-2z\" fill=\"#e20100\"/></svg>",
  "ciper-50": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><rect x=\"1.5\" y=\"3.5\" width=\"13\" height=\"9\" rx=\".6\" fill=\"#D7DCDF\" stroke=\"#606D74\"/><path d=\"M2.5 4.5v7\" stroke=\"#D75143\" stroke-width=\"1.5\"/><path d=\"M4 1.5v2M7 1.5v2M10 1.5v2M4 12.5v2M7 12.5v2M10 12.5v2\" stroke=\"#6B7A7C\"/><path d=\"M8.1 6H5.5v2h2.6v2H5.5M10 6h2.2v4H10z\" stroke=\"#455D69\" stroke-width=\".9\" stroke-linejoin=\"round\"/><path d=\"M10 1h2v2h1V1h2v6h-2V5h-1v2h-2z\" fill=\"#e20100\"/></svg>",
  "cct": "<img class=\"logo-image\" src=\"icons/creator-johnson-controls.png\" alt=\"\" width=\"128\" height=\"128\" decoding=\"async\">",
  "engineering": "<img class=\"logo-image\" src=\"icons/creator-distech-controls.png\" alt=\"\" width=\"128\" height=\"128\" decoding=\"async\">",
  "eclypse": "<img class=\"logo-image\" src=\"icons/creator-distech-controls.png\" alt=\"\" width=\"128\" height=\"128\" decoding=\"async\">",
  "points": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M5 2h9v12H5z\" fill=\"#F3F7ED\" stroke=\"#7D9270\"/><path d=\"M1 4h4M1 8h4M1 12h4\" stroke=\"#69875F\"/><circle cx=\"1.6\" cy=\"4\" r=\"1\" fill=\"#A8C592\" stroke=\"#69875F\" stroke-width=\".6\"/><circle cx=\"1.6\" cy=\"8\" r=\"1\" fill=\"#A4BDCF\" stroke=\"#587F99\" stroke-width=\".6\"/><circle cx=\"1.6\" cy=\"12\" r=\"1\" fill=\"#D5C38D\" stroke=\"#9C8652\" stroke-width=\".6\"/><path d=\"M7 4h5M7 8h5M7 12h5\" stroke=\"#829175\"/></svg>",
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
