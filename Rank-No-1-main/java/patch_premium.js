const fs = require('fs');
let html = fs.readFileSync('frontend/app.html', 'utf8');

const oldStyle = `<style>

#infoglobal-container /* ── Reset & Base ─────────────────────────────────────────── */
        *, #infoglobal-container *::before, #infoglobal-container *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
            --bg:       transparent;
            --surface:  rgba(255, 255, 255, 0.65);
            --card:     rgba(255, 255, 255, 0.85);
            --border:   rgba(0, 0, 0, 0.08);
            --primary:  #3b82f6;
            --accent:   #10b981;
            --danger:   #ef4444;
            --text:     #1e293b;
            --muted:    #475569;
            --tag-bg:   rgba(59, 130, 246, 0.12);
        }`;

const newStyle = `<style>
/* ═══════════════════════════════════════════════════════════
   INFO GLOBAL — PREMIUM INVITATION-CARD REDESIGN
   ═══════════════════════════════════════════════════════════ */

#infoglobal-container *, #infoglobal-container *::before, #infoglobal-container *::after {
  box-sizing: border-box; margin: 0; padding: 0;
}

#infoglobal-container {
  /* CSS custom properties scoped to container */
  --ig-bg:         linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
  --ig-surface:    rgba(255,255,255,0.04);
  --ig-card:       rgba(255,255,255,0.07);
  --ig-card-hover: rgba(255,255,255,0.11);
  --ig-border:     rgba(255,255,255,0.12);
  --ig-gold:       #f5c842;
  --ig-gold2:      #e8a714;
  --ig-blue:       #6366f1;
  --ig-teal:       #2dd4bf;
  --ig-pink:       #ec4899;
  --ig-text:       #f1f5f9;
  --ig-muted:      #94a3b8;
  --ig-primary:    #818cf8;
  --ig-shadow:     0 8px 32px rgba(0,0,0,0.5);
  --ig-shadow-lg:  0 20px 60px rgba(0,0,0,0.7);
  --ig-radius:     20px;
  --ig-radius-lg:  28px;

  font-family: 'Inter', 'Outfit', sans-serif;
  color: var(--ig-text);
  min-height: 100vh;
  overflow-x: hidden;
  background: var(--ig-bg);
  border-radius: 16px;
  position: relative;
}

/* Ambient background orbs */
#infoglobal-container::before {
  content: '';
  position: absolute; inset: 0; border-radius: 16px;
  background:
    radial-gradient(ellipse 60% 50% at 15% 10%, rgba(99,102,241,0.18) 0%, transparent 70%),
    radial-gradient(ellipse 50% 40% at 85% 80%, rgba(45,212,191,0.12) 0%, transparent 70%),
    radial-gradient(ellipse 40% 30% at 50% 50%, rgba(245,200,66,0.04) 0%, transparent 70%);
  pointer-events: none; z-index: 0;
}

#infoglobal-container > * { position: relative; z-index: 1; }

/* ── Override :root vars to not leak out ── */
:root {
  --bg:       transparent;
  --surface:  rgba(255,255,255,0.65);
  --card:     rgba(255,255,255,0.85);
  --border:   rgba(0,0,0,0.08);
  --primary:  #3b82f6;
  --accent:   #10b981;
  --danger:   #ef4444;
  --text:     #1e293b;
  --muted:    #475569;
  --tag-bg:   rgba(59,130,246,0.12);
}`;

if (html.includes(oldStyle)) {
  html = html.replace(oldStyle, newStyle);
  console.log('Step 1 OK: :root section replaced');
} else {
  console.log('Step 1 FAIL: could not find old style block');
  process.exit(1);
}

// ── Now upgrade the individual CSS blocks ──

// Replace hero badge
html = html.replace(
  `#infoglobal-container .hero-badge {
            display: inline-flex; align-items: center; gap: 0.5rem;
            background: rgba(79,142,247,0.12);
            border: 1px solid rgba(79,142,247,0.3);
            color: #4f8ef7;
            padding: 0.35rem 1rem;
            border-radius: 9999px;
            font-size: 0.78rem;
            font-weight: 600;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            margin-bottom: 1.8rem;
        }`,
  `#infoglobal-container .hero-badge {
            display: inline-flex; align-items: center; gap: 0.5rem;
            background: linear-gradient(135deg, rgba(245,200,66,0.18), rgba(99,102,241,0.18));
            border: 1px solid rgba(245,200,66,0.4);
            color: var(--ig-gold);
            padding: 0.4rem 1.2rem;
            border-radius: 9999px;
            font-size: 0.78rem;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            margin-bottom: 1.8rem;
            box-shadow: 0 0 20px rgba(245,200,66,0.15);
        }`
);

// Replace hero h1
html = html.replace(
  `#infoglobal-container .hero h1 {
            font-family: 'Outfit', sans-serif;
            font-size: clamp(2.4rem, 6vw, 4rem);
            font-weight: 800;
            line-height: 1.15;
            background: linear-gradient(135deg, #1e293b 0%, #3b82f6 60%, #10b981 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 1rem;
        }`,
  `#infoglobal-container .hero h1 {
            font-family: 'Outfit', sans-serif;
            font-size: clamp(2.4rem, 6vw, 4rem);
            font-weight: 800;
            line-height: 1.15;
            background: linear-gradient(135deg, #f5c842 0%, #818cf8 50%, #2dd4bf 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 1rem;
        }`
);

// Replace hero p
html = html.replace(
  `#infoglobal-container .hero p {
            color: var(--muted);`,
  `#infoglobal-container .hero p {
            color: var(--ig-muted);`
);

// Replace search bar
html = html.replace(
  `#infoglobal-container .search-bar {
            display: flex;
            background: var(--card);
            border: 1px solid rgba(79,142,247,0.25);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 0 0 4px rgba(79,142,247,0.05), 0 20px 60px rgba(0,0,0,0.4);
            transition: border-color 0.3s, box-shadow 0.3s;
        }`,
  `#infoglobal-container .search-bar {
            display: flex;
            background: rgba(255,255,255,0.06);
            border: 1px solid rgba(245,200,66,0.3);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 0 0 4px rgba(245,200,66,0.05), 0 20px 60px rgba(0,0,0,0.6);
            transition: border-color 0.3s, box-shadow 0.3s;
            backdrop-filter: blur(20px);
        }`
);

html = html.replace(
  `#infoglobal-container .search-bar:focus-within {
            border-color: rgba(79,142,247,0.6);
            box-shadow: 0 0 0 4px rgba(79,142,247,0.12), 0 20px 60px rgba(0,0,0,0.5);
        }`,
  `#infoglobal-container .search-bar:focus-within {
            border-color: rgba(245,200,66,0.6);
            box-shadow: 0 0 0 4px rgba(245,200,66,0.12), 0 20px 60px rgba(0,0,0,0.7);
        }`
);

html = html.replace(
  `#infoglobal-container .search-bar input {
            flex: 1;
            background: transparent;
            border: none;
            padding: 1.1rem 1.5rem;
            font-size: 1rem;
            color: var(--text);
            font-family: 'Inter', sans-serif;
        }
#infoglobal-container .search-bar input::placeholder { color: var(--muted); }`,
  `#infoglobal-container .search-bar input {
            flex: 1;
            background: transparent;
            border: none;
            padding: 1.1rem 1.5rem;
            font-size: 1rem;
            color: #f1f5f9;
            font-family: 'Inter', sans-serif;
        }
#infoglobal-container .search-bar input::placeholder { color: rgba(148,163,184,0.7); }`
);

html = html.replace(
  `#infoglobal-container .search-bar button {
            margin: 0.45rem;
            background: linear-gradient(135deg, #4f8ef7 0%, #2563eb 100%);
            color: white;
            border: none;
            padding: 0.8rem 2rem;
            border-radius: 10px;
            font-size: 0.95rem;
            font-weight: 600;
            cursor: pointer;
            display: flex; align-items: center; gap: 0.5rem;
            transition: all 0.25s;
            white-space: nowrap;
        }
#infoglobal-container .search-bar button:hover {
            transform: translateY(-1px);
            box-shadow: 0 8px 25px rgba(79,142,247,0.4);
        }`,
  `#infoglobal-container .search-bar button {
            margin: 0.45rem;
            background: linear-gradient(135deg, #f5c842 0%, #e8a714 100%);
            color: #0f0c29;
            border: none;
            padding: 0.8rem 2rem;
            border-radius: 10px;
            font-size: 0.95rem;
            font-weight: 700;
            cursor: pointer;
            display: flex; align-items: center; gap: 0.5rem;
            transition: all 0.25s;
            white-space: nowrap;
            box-shadow: 0 4px 15px rgba(245,200,66,0.4);
        }
#infoglobal-container .search-bar button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 30px rgba(245,200,66,0.6);
        }`
);

// Loader
html = html.replace(
  `#infoglobal-container .pulse-ring {
            width: 56px; height: 56px;
            border-radius: 50%;
            border: 3px solid transparent;
            border-top-color: #4f8ef7;
            border-right-color: #00d4aa;
            animation: spin 1s linear infinite;
        }`,
  `#infoglobal-container .pulse-ring {
            width: 56px; height: 56px;
            border-radius: 50%;
            border: 3px solid transparent;
            border-top-color: #f5c842;
            border-right-color: #818cf8;
            animation: spin 1s linear infinite;
        }`
);

html = html.replace(
  `#infoglobal-container .step-chip {
            padding: 0.25rem 0.8rem;
            border-radius: 9999px;
            background: var(--card);
            border: 1px solid var(--border);
            font-size: 0.75rem;
            color: var(--muted);
            animation: fadeInOut 2s ease infinite;
        }`,
  `#infoglobal-container .step-chip {
            padding: 0.25rem 0.8rem;
            border-radius: 9999px;
            background: rgba(255,255,255,0.06);
            border: 1px solid rgba(245,200,66,0.2);
            font-size: 0.75rem;
            color: rgba(148,163,184,0.9);
            animation: fadeInOut 2s ease infinite;
        }`
);

html = html.replace(
  `@keyframes fadeInOut {
            0%, 100% { opacity: 0.3; }
50% { opacity: 1; color: #4f8ef7; }
}`,
  `@keyframes fadeInOut {
            0%, 100% { opacity: 0.3; }
50% { opacity: 1; color: #f5c842; }
}`
);

// Error
html = html.replace(
  `#infoglobal-container #errorMsg {
            display: none;
            max-width: 700px; margin: 2rem auto;
            background: rgba(239,68,68,0.1);
            border: 1px solid rgba(239,68,68,0.3);
            color: #fca5a5;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            text-align: center;
        }`,
  `#infoglobal-container #errorMsg {
            display: none;
            max-width: 700px; margin: 2rem auto;
            background: rgba(239,68,68,0.12);
            border: 1px solid rgba(239,68,68,0.4);
            color: #fca5a5;
            padding: 1.2rem 1.5rem;
            border-radius: 14px;
            text-align: center;
            backdrop-filter: blur(10px);
        }`
);

// Results
html = html.replace(
  `#infoglobal-container /* ── Results wrapper ──────────────────────────────────────── */
        #results {
            display: none;
            max-width: 1100px;
            margin: 0 auto;
            padding: 0 1.5rem 5rem;
            position: relative; z-index: 1;
            animation: fadeUp 0.6s ease forwards;
        }`,
  `#infoglobal-container /* ── Results wrapper ──────────────────────────────────────── */
        #results {
            display: none;
            max-width: 1100px;
            margin: 0 auto;
            padding: 0 1.5rem 5rem;
            position: relative; z-index: 1;
            animation: fadeUp 0.6s ease forwards;
        }
/* ── Invitation-card gold divider ── */
#infoglobal-container .ig-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(245,200,66,0.4), transparent);
  margin: 1.5rem 0;
}`
);

// College hero card
html = html.replace(
  `/* ── College Hero Card ─────────────────────────────────────── */
        #infoglobal-container .college-hero {
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 24px;
            padding: 2.5rem;
            display: flex;
            gap: 2rem;
            align-items: flex-start;
            margin-bottom: 1.5rem;
            position: relative;
            overflow: hidden;
        }
#infoglobal-container .college-hero::before {
            content: '';
            position: absolute; top: 0; left: 0; right: 0; height: 3px;
            background: linear-gradient(90deg, #4f8ef7, #00d4aa, #4f8ef7);
        }`,
  `/* ── College Hero Card (Invitation-Card Style) ─────────────── */
        #infoglobal-container .college-hero {
            background: linear-gradient(135deg, rgba(245,200,66,0.06) 0%, rgba(99,102,241,0.08) 50%, rgba(45,212,191,0.06) 100%);
            border: 1px solid rgba(245,200,66,0.25);
            border-radius: var(--ig-radius-lg);
            padding: 2.5rem;
            display: flex;
            gap: 2rem;
            align-items: flex-start;
            margin-bottom: 1.5rem;
            position: relative;
            overflow: hidden;
            backdrop-filter: blur(20px);
            box-shadow: 0 0 0 1px rgba(255,255,255,0.05) inset, var(--ig-shadow-lg);
        }
#infoglobal-container .college-hero::before {
            content: '';
            position: absolute; top: 0; left: 0; right: 0; height: 3px;
            background: linear-gradient(90deg, #f5c842, #818cf8, #2dd4bf, #f5c842);
            background-size: 200% 100%;
            animation: shimmer 3s linear infinite;
        }
#infoglobal-container .college-hero::after {
            content: '';
            position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
            background: linear-gradient(90deg, transparent, rgba(245,200,66,0.3), transparent);
        }
@keyframes shimmer { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }`
);

// Avatar
html = html.replace(
  `#infoglobal-container .college-avatar {
            width: 90px; height: 90px;
            border-radius: 18px;
            object-fit: cover;
            border: 2px solid var(--border);
            flex-shrink: 0;
            background: var(--surface);
        }
#infoglobal-container .college-avatar-placeholder {
            width: 90px; height: 90px;
            border-radius: 18px;
            background: linear-gradient(135deg, #4f8ef7, #00d4aa);
            display: flex; align-items: center; justify-content: center;
            font-size: 2.2rem; flex-shrink: 0;
        }`,
  `#infoglobal-container .college-avatar {
            width: 100px; height: 100px;
            border-radius: 20px;
            object-fit: cover;
            border: 2px solid rgba(245,200,66,0.4);
            flex-shrink: 0;
            background: rgba(255,255,255,0.05);
            box-shadow: 0 0 0 4px rgba(245,200,66,0.08), 0 8px 25px rgba(0,0,0,0.4);
        }
#infoglobal-container .college-avatar-placeholder {
            width: 100px; height: 100px;
            border-radius: 20px;
            background: linear-gradient(135deg, #f5c842, #818cf8);
            display: flex; align-items: center; justify-content: center;
            font-size: 2.5rem; flex-shrink: 0;
            box-shadow: 0 0 0 4px rgba(245,200,66,0.08), 0 8px 25px rgba(0,0,0,0.4);
        }`
);

// Hero meta
html = html.replace(
  `#infoglobal-container .college-meta h2 {
            font-family: 'Outfit', sans-serif;
            font-size: 1.8rem;
            font-weight: 700;
            margin-bottom: 0.6rem;
            line-height: 1.2;
        }
#infoglobal-container .college-meta p {
            color: var(--muted);`,
  `#infoglobal-container .college-meta h2 {
            font-family: 'Outfit', sans-serif;
            font-size: 1.8rem;
            font-weight: 800;
            margin-bottom: 0.6rem;
            line-height: 1.2;
            background: linear-gradient(135deg, #f1f5f9 0%, #f5c842 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
#infoglobal-container .college-meta p {
            color: var(--ig-muted);`
);

// Fact chips
html = html.replace(
  `#infoglobal-container .fact-chip {
            padding: 0.3rem 0.85rem;
            background: var(--tag-bg);
            border: 1px solid rgba(79,142,247,0.2);
            border-radius: 9999px;
            font-size: 0.78rem;
            font-weight: 500;
            color: var(--primary);
        }`,
  `#infoglobal-container .fact-chip {
            padding: 0.3rem 0.85rem;
            background: rgba(245,200,66,0.1);
            border: 1px solid rgba(245,200,66,0.3);
            border-radius: 9999px;
            font-size: 0.78rem;
            font-weight: 600;
            color: #f5c842;
        }`
);

// Card
html = html.replace(
  `/* ── Generic Card ─────────────────────────────────────────── */
        .card {
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 20px;
            padding: 1.5rem;
        }`,
  `/* ── Generic Card (Glassmorphism invitation style) ─────────── */
        .card {
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: var(--ig-radius);
            padding: 1.5rem;
            backdrop-filter: blur(16px);
            box-shadow: 0 0 0 1px rgba(255,255,255,0.03) inset, var(--ig-shadow);
            transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
        }
        .card:hover {
            border-color: rgba(245,200,66,0.25);
            box-shadow: 0 0 0 1px rgba(245,200,66,0.05) inset, 0 20px 50px rgba(0,0,0,0.6);
            transform: translateY(-2px);
        }`
);

html = html.replace(
  `#infoglobal-container .card-title {
            font-size: 0.8rem;
            font-weight: 600;
            letter-spacing: 0.07em;
            text-transform: uppercase;
            color: var(--muted);
        }`,
  `#infoglobal-container .card-title {
            font-size: 0.75rem;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: rgba(245,200,66,0.8);
        }`
);

// Social btn
html = html.replace(
  `#infoglobal-container .social-btn {
            display: flex; align-items: center; gap: 0.5rem;
            padding: 0.55rem 0.9rem;
            border-radius: 10px;
            background: var(--surface);
            border: 1px solid var(--border);
            color: var(--text);
            text-decoration: none;
            font-size: 0.82rem;
            font-weight: 500;
            transition: all 0.2s;
            overflow: hidden;
            white-space: nowrap;
        }`,
  `#infoglobal-container .social-btn {
            display: flex; align-items: center; gap: 0.5rem;
            padding: 0.6rem 0.9rem;
            border-radius: 10px;
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
            color: #e2e8f0;
            text-decoration: none;
            font-size: 0.82rem;
            font-weight: 500;
            transition: all 0.25s;
            overflow: hidden;
            white-space: nowrap;
        }`
);

// Location row
html = html.replace(
  `#infoglobal-container .location-row .row-item i {
            color: var(--muted); width: 16px; flex-shrink: 0;
        }
#infoglobal-container .location-row .row-item a {
            color: var(--primary); text-decoration: none;
        }`,
  `#infoglobal-container .location-row .row-item i {
            color: rgba(245,200,66,0.7); width: 16px; flex-shrink: 0;
        }
#infoglobal-container .location-row .row-item a {
            color: #818cf8; text-decoration: none;
        }`
);

// Section heading
html = html.replace(
  `#infoglobal-container .section-heading {
            font-family: 'Outfit', sans-serif;
            font-size: 1.15rem; font-weight: 700;
            margin-bottom: 1rem;
            display: flex; align-items: center; gap: 0.6rem;
        }
#infoglobal-container .section-heading span {
            width: 4px; height: 20px;
            background: linear-gradient(180deg, #4f8ef7, #00d4aa);
            border-radius: 2px; flex-shrink: 0;
        }`,
  `#infoglobal-container .section-heading {
            font-family: 'Outfit', sans-serif;
            font-size: 1.1rem; font-weight: 700;
            margin-bottom: 1rem;
            display: flex; align-items: center; gap: 0.75rem;
            color: #f1f5f9;
            padding: 0.75rem 1rem;
            background: linear-gradient(135deg, rgba(245,200,66,0.08), rgba(99,102,241,0.06));
            border: 1px solid rgba(245,200,66,0.15);
            border-radius: 12px;
            backdrop-filter: blur(8px);
        }
#infoglobal-container .section-heading span {
            width: 4px; height: 20px;
            background: linear-gradient(180deg, #f5c842, #818cf8);
            border-radius: 2px; flex-shrink: 0;
        }`
);

// Gallery item
html = html.replace(
  `#infoglobal-container .gallery-item {
            position: relative; overflow: hidden;
            border-radius: 12px;
            aspect-ratio: 4/3;
            cursor: pointer;
            background: var(--surface);
        }`,
  `#infoglobal-container .gallery-item {
            position: relative; overflow: hidden;
            border-radius: 14px;
            aspect-ratio: 4/3;
            cursor: pointer;
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(255,255,255,0.08);
            transition: border-color 0.3s, transform 0.3s;
        }
#infoglobal-container .gallery-item:hover {
            border-color: rgba(245,200,66,0.3);
            transform: scale(1.02);
        }`
);

// Video card
html = html.replace(
  `#infoglobal-container .video-card {
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 14px;
            overflow: hidden;
            transition: transform 0.25s, box-shadow 0.25s;
            text-decoration: none; color: inherit;
            display: flex; flex-direction: column;
        }
#infoglobal-container .video-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 16px 40px rgba(0,0,0,0.4);
        }`,
  `#infoglobal-container .video-card {
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 16px;
            overflow: hidden;
            transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
            text-decoration: none; color: inherit;
            display: flex; flex-direction: column;
            backdrop-filter: blur(10px);
        }
#infoglobal-container .video-card:hover {
            transform: translateY(-5px);
            border-color: rgba(245,200,66,0.3);
            box-shadow: 0 20px 50px rgba(0,0,0,0.6);
        }`
);

// Video thumb
html = html.replace(
  `#infoglobal-container .video-thumb {
            position: relative; aspect-ratio: 16/9;
            background: var(--surface); overflow: hidden;
        }`,
  `#infoglobal-container .video-thumb {
            position: relative; aspect-ratio: 16/9;
            background: rgba(255,255,255,0.03); overflow: hidden;
        }`
);

// Play btn
html = html.replace(
  `#infoglobal-container .play-btn i {
            font-size: 2.2rem; color: white;
            filter: drop-shadow(0 2px 8px rgba(0,0,0,0.6));
            transition: transform 0.2s;
        }`,
  `#infoglobal-container .play-btn i {
            font-size: 2.2rem; color: #f5c842;
            filter: drop-shadow(0 2px 12px rgba(245,200,66,0.6));
            transition: transform 0.2s;
        }`
);

// Info list (placements etc.)
html = html.replace(
  `#infoglobal-container .info-item {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 1rem;
            transition: border-color 0.2s;
        }
#infoglobal-container .info-item:hover { border-color: rgba(79,142,247,0.3); }
#infoglobal-container .info-item a { text-decoration: none; }
#infoglobal-container .info-item h4 {
            font-size: 0.88rem; font-weight: 600; margin-bottom: 0.35rem;
            color: var(--primary);
        }
#infoglobal-container .info-item p { font-size: 0.82rem; color: var(--muted); line-height: 1.55; }`,
  `#infoglobal-container .info-item {
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(255,255,255,0.08);
            border-left: 3px solid rgba(245,200,66,0.4);
            border-radius: 12px;
            padding: 1rem 1rem 1rem 1.2rem;
            transition: border-color 0.25s, background 0.25s, transform 0.25s;
        }
#infoglobal-container .info-item:hover {
            border-color: rgba(245,200,66,0.3);
            border-left-color: #f5c842;
            background: rgba(245,200,66,0.05);
            transform: translateX(3px);
        }
#infoglobal-container .info-item a { text-decoration: none; }
#infoglobal-container .info-item h4 {
            font-size: 0.88rem; font-weight: 600; margin-bottom: 0.35rem;
            color: #818cf8;
        }
#infoglobal-container .info-item h4:hover { color: #f5c842; }
#infoglobal-container .info-item p { font-size: 0.82rem; color: rgba(148,163,184,0.9); line-height: 1.6; }`
);

// Lightbox close btn
html = html.replace(
  `#infoglobal-container #lightbox .close-lb {
            position: fixed; top: 1.5rem; right: 1.5rem;
            background: rgba(255,255,255,0.1);
            border: none; color: white;
            width: 42px; height: 42px; border-radius: 50%;
            font-size: 1.2rem; cursor: pointer;
            display: flex; align-items: center; justify-content: center;
        }`,
  `#infoglobal-container #lightbox .close-lb {
            position: fixed; top: 1.5rem; right: 1.5rem;
            background: rgba(245,200,66,0.15);
            border: 1px solid rgba(245,200,66,0.4);
            color: #f5c842;
            width: 42px; height: 42px; border-radius: 50%;
            font-size: 1.2rem; cursor: pointer;
            display: flex; align-items: center; justify-content: center;
            transition: all 0.2s;
        }
#infoglobal-container #lightbox .close-lb:hover {
            background: rgba(245,200,66,0.3);
        }`
);

// Utility text colors
html = html.replace(
  `#infoglobal-container .text-muted { color: var(--muted); }`,
  `#infoglobal-container .text-muted { color: rgba(148,163,184,0.8); }`
);

fs.writeFileSync('frontend/app.html', html);
console.log('SUCCESS: Premium invitation-card redesign applied!');
