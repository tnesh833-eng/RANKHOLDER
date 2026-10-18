const fs = require('fs');
let html = fs.readFileSync('frontend/app.html', 'utf8');

const premiumCSS = `
/* ===============================================================
   INFO GLOBAL - PREMIUM INVITATION-CARD DARK GLASSMORPHISM THEME
   =============================================================== */
#infoglobal-container {
  background: linear-gradient(135deg,#0f0c29 0%,#302b63 50%,#24243e 100%) !important;
  color: #f1f5f9 !important;
  border-radius: 16px; position: relative; overflow: hidden;
}
#infoglobal-container::before {
  content:''; position:absolute; inset:0; border-radius:16px; pointer-events:none; z-index:0;
  background:
    radial-gradient(ellipse 60% 50% at 15% 10%, rgba(99,102,241,0.18) 0%,transparent 70%),
    radial-gradient(ellipse 50% 40% at 85% 80%, rgba(45,212,191,0.12) 0%,transparent 70%);
}
#infoglobal-container > * { position: relative; z-index: 1; }

#infoglobal-container .hero-badge {
  background: linear-gradient(135deg,rgba(245,200,66,0.18),rgba(99,102,241,0.18)) !important;
  border-color: rgba(245,200,66,0.4) !important; color: #f5c842 !important;
}
#infoglobal-container .hero h1 {
  background: linear-gradient(135deg,#f5c842 0%,#818cf8 50%,#2dd4bf 100%) !important;
  -webkit-background-clip: text !important; -webkit-text-fill-color: transparent !important;
  background-clip: text !important;
}
#infoglobal-container .hero p { color: #94a3b8 !important; }

#infoglobal-container .search-bar {
  background: rgba(255,255,255,0.06) !important;
  border-color: rgba(245,200,66,0.3) !important;
  backdrop-filter: blur(20px);
  box-shadow: 0 0 0 4px rgba(245,200,66,0.05), 0 20px 60px rgba(0,0,0,0.6) !important;
}
#infoglobal-container .search-bar:focus-within {
  border-color: rgba(245,200,66,0.6) !important;
}
#infoglobal-container .search-bar input { color: #f1f5f9 !important; }
#infoglobal-container .search-bar input::placeholder { color: rgba(148,163,184,0.7) !important; }
#infoglobal-container .search-bar button {
  background: linear-gradient(135deg,#f5c842,#e8a714) !important;
  color: #0f0c29 !important; font-weight: 700 !important;
  box-shadow: 0 4px 15px rgba(245,200,66,0.4) !important;
}
#infoglobal-container .search-bar button:hover {
  box-shadow: 0 8px 30px rgba(245,200,66,0.6) !important; transform: translateY(-2px);
}
#infoglobal-container .pulse-ring {
  border-top-color: #f5c842 !important; border-right-color: #818cf8 !important;
}
#infoglobal-container .step-chip {
  background: rgba(255,255,255,0.06) !important;
  border-color: rgba(245,200,66,0.2) !important;
  color: rgba(148,163,184,0.9) !important;
}

#infoglobal-container .college-hero {
  background: linear-gradient(135deg,rgba(245,200,66,0.07),rgba(99,102,241,0.09),rgba(45,212,191,0.06)) !important;
  border-color: rgba(245,200,66,0.25) !important;
  backdrop-filter: blur(20px);
  box-shadow: 0 0 0 1px rgba(255,255,255,0.05) inset, 0 20px 60px rgba(0,0,0,0.7) !important;
}
#infoglobal-container .college-hero::before {
  background: linear-gradient(90deg,#f5c842,#818cf8,#2dd4bf,#f5c842) !important;
  background-size: 200% 100% !important;
  animation: igShimmer 3s linear infinite !important;
}
@keyframes igShimmer { 0%{background-position:0 50%} 100%{background-position:200% 50%} }

#infoglobal-container .college-avatar,
#infoglobal-container .college-avatar-placeholder {
  border: 2px solid rgba(245,200,66,0.45) !important;
  box-shadow: 0 0 0 5px rgba(245,200,66,0.08), 0 10px 30px rgba(0,0,0,0.5) !important;
  width: 100px !important; height: 100px !important; border-radius: 20px !important;
}
#infoglobal-container .college-avatar-placeholder {
  background: linear-gradient(135deg,#f5c842,#818cf8) !important; font-size: 2.5rem !important;
}
#infoglobal-container .college-meta h2 {
  background: linear-gradient(135deg,#f1f5f9,#f5c842) !important;
  -webkit-background-clip: text !important; -webkit-text-fill-color: transparent !important;
  background-clip: text !important;
}
#infoglobal-container .college-meta p { color: #94a3b8 !important; }
#infoglobal-container .fact-chip {
  background: rgba(245,200,66,0.1) !important; border-color: rgba(245,200,66,0.35) !important;
  color: #f5c842 !important; font-weight: 600 !important;
}

#infoglobal-container .card {
  background: rgba(255,255,255,0.05) !important; border-color: rgba(255,255,255,0.1) !important;
  backdrop-filter: blur(16px);
  box-shadow: 0 0 0 1px rgba(255,255,255,0.04) inset, 0 8px 32px rgba(0,0,0,0.5) !important;
  transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
}
#infoglobal-container .card:hover {
  border-color: rgba(245,200,66,0.28) !important; transform: translateY(-3px);
}
#infoglobal-container .card-title { color: rgba(245,200,66,0.85) !important; }
#infoglobal-container .icon-blue { background: rgba(99,102,241,0.18) !important; color: #818cf8 !important; }
#infoglobal-container .icon-green { background: rgba(45,212,191,0.15) !important; color: #2dd4bf !important; }
#infoglobal-container .icon-pink { background: rgba(236,72,153,0.15) !important; color: #ec4899 !important; }
#infoglobal-container .icon-amber { background: rgba(245,200,66,0.15) !important; color: #f5c842 !important; }
#infoglobal-container .icon-purple { background: rgba(168,85,247,0.15) !important; color: #a855f7 !important; }

#infoglobal-container .social-btn {
  background: rgba(255,255,255,0.05) !important; border-color: rgba(255,255,255,0.1) !important;
  color: #e2e8f0 !important;
}
#infoglobal-container .social-btn:hover { transform: translateY(-2px); }
#infoglobal-container .social-btn.ig:hover { background: rgba(225,48,108,0.15) !important; border-color: #e1306c !important; color: #e1306c !important; }
#infoglobal-container .social-btn.fb:hover { background: rgba(24,119,242,0.15) !important; border-color: #1877f2 !important; color: #1877f2 !important; }
#infoglobal-container .social-btn.tw:hover { background: rgba(29,155,240,0.15) !important; border-color: #1d9bf0 !important; color: #1d9bf0 !important; }
#infoglobal-container .social-btn.yt:hover { background: rgba(255,0,0,0.15) !important; border-color: #ff0000 !important; color: #ff0000 !important; }
#infoglobal-container .social-btn.li:hover { background: rgba(10,102,194,0.15) !important; border-color: #0a66c2 !important; color: #0a66c2 !important; }
#infoglobal-container .social-btn.web:hover { background: rgba(45,212,191,0.15) !important; border-color: #2dd4bf !important; color: #2dd4bf !important; }
#infoglobal-container .social-btn.maps:hover { background: rgba(245,200,66,0.15) !important; border-color: #f5c842 !important; color: #f5c842 !important; }

#infoglobal-container .location-row .row-item span { color: #e2e8f0 !important; }
#infoglobal-container .location-row .row-item i { color: rgba(245,200,66,0.7) !important; }
#infoglobal-container .location-row .row-item a { color: #818cf8 !important; }

#infoglobal-container .section-heading {
  color: #f1f5f9 !important;
  background: linear-gradient(135deg,rgba(245,200,66,0.08),rgba(99,102,241,0.06)) !important;
  border: 1px solid rgba(245,200,66,0.18) !important;
  border-radius: 12px !important; padding: 0.75rem 1rem !important;
  font-size: 1.05rem !important; font-weight: 700 !important;
}
#infoglobal-container .section-heading span {
  background: linear-gradient(180deg,#f5c842,#818cf8) !important;
}

#infoglobal-container .gallery-item {
  border: 1px solid rgba(255,255,255,0.08); border-radius: 14px;
  transition: border-color 0.3s, transform 0.3s;
}
#infoglobal-container .gallery-item:hover {
  border-color: rgba(245,200,66,0.35) !important; transform: scale(1.025);
}

#infoglobal-container .video-card {
  background: rgba(255,255,255,0.05) !important; border-color: rgba(255,255,255,0.1) !important;
  backdrop-filter: blur(10px); border-radius: 16px !important;
  transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
}
#infoglobal-container .video-card:hover {
  border-color: rgba(245,200,66,0.3) !important; transform: translateY(-5px);
  box-shadow: 0 20px 50px rgba(0,0,0,0.6) !important;
}
#infoglobal-container .play-btn i {
  color: #f5c842 !important; filter: drop-shadow(0 2px 12px rgba(245,200,66,0.6)) !important;
}
#infoglobal-container .video-title { color: #f1f5f9 !important; }
#infoglobal-container .video-meta { color: #94a3b8 !important; }
#infoglobal-container .video-duration {
  background: rgba(245,200,66,0.85) !important; color: #0f0c29 !important; font-weight: 600 !important;
}

#infoglobal-container .info-item {
  background: rgba(255,255,255,0.04) !important; border-color: rgba(255,255,255,0.08) !important;
  border-left: 3px solid rgba(245,200,66,0.5) !important; border-radius: 12px;
  padding: 1rem 1rem 1rem 1.2rem;
  transition: border-color 0.25s, background 0.25s, transform 0.25s;
}
#infoglobal-container .info-item:hover {
  border-color: rgba(245,200,66,0.3) !important; border-left-color: #f5c842 !important;
  background: rgba(245,200,66,0.05) !important; transform: translateX(3px);
}
#infoglobal-container .info-item h4 { color: #818cf8 !important; }
#infoglobal-container .info-item a:hover h4 { color: #f5c842 !important; }
#infoglobal-container .info-item p { color: rgba(148,163,184,0.9) !important; line-height: 1.6; }

#infoglobal-container .text-muted { color: rgba(148,163,184,0.8) !important; }
#infoglobal-container .rating-stars { color: #f5c842 !important; }
#infoglobal-container #errorMsg { backdrop-filter: blur(10px); }
#infoglobal-container #lightbox .close-lb {
  background: rgba(245,200,66,0.15) !important; border: 1px solid rgba(245,200,66,0.4) !important;
  color: #f5c842 !important;
}
`;

// Find the </style> inside the infoglobal section
const sectionStart = html.indexOf('<section id="infoglobal"');
if (sectionStart === -1) { console.log('FAIL: section not found'); process.exit(1); }

const styleClose = html.indexOf('</style>', sectionStart);
if (styleClose === -1) { console.log('FAIL: style close not found'); process.exit(1); }

html = html.substring(0, styleClose) + premiumCSS + '\r\n    ' + html.substring(styleClose);
fs.writeFileSync('frontend/app.html', html);
console.log('SUCCESS: Premium invitation-card theme applied!');
