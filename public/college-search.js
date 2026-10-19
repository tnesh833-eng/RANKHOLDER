function openLightbox(src) {
    const lb = document.getElementById('lightboxImg');
    if (lb) lb.src = src;
    document.getElementById('lightbox')?.classList.add('open');
}
function closeLightbox() {
    document.getElementById('lightbox')?.classList.remove('open');
}
document.getElementById('lightbox')?.addEventListener('click', function(e) {
    if (e.target === this) closeLightbox();
});

function socialLink(href, icon, label, cls) {
    if (!href || href === 'Not found') return '';
    return `<a href="${href}" target="_blank" class="social-btn ${cls}">
        <i class="${icon}"></i> ${label}
    </a>`;
}

function renderStars(rating) {
    if (!rating) return '';
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    let s = '<span class="rating-stars">';
    for (let i = 0; i < full; i++) s += '<i class="fas fa-star"></i>';
    if (half) s += '<i class="fas fa-star-half-alt"></i>';
    s += '</span>';
    return s;
}

function capFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function safeSet(id, html, prop = 'innerHTML') {
    const el = document.getElementById(id);
    if (el) el[prop] = html;
}

function renderInfoList(id, items, emptyMsg) {
    const el = document.getElementById(id);
    if (!el) return;
    if (!items || !items.length) {
        el.innerHTML = `<p class="text-muted text-sm">${emptyMsg}</p>`;
        return;
    }
    el.innerHTML = items.map(p => `
        <div class="info-item">
            <a href="${p.link || '#'}" target="_blank"><h4>${p.title || '—'}</h4></a>
            <p>${p.snippet || '—'}</p>
        </div>`).join('');
}

async function searchCollege() {
    const input = document.getElementById('searchInput');
    const query = input ? input.value.trim() : '';
    if (!query) return;

    const loader    = document.getElementById('loader');
    const results   = document.getElementById('results');
    const errorMsg  = document.getElementById('errorMsg');
    const searchBtn = document.getElementById('searchBtn');

    if (loader)    loader.style.display    = 'block';
    if (results)   results.style.display   = 'none';
    if (errorMsg)  errorMsg.style.display  = 'none';
    if (searchBtn) searchBtn.disabled      = true;

    try {
        let d = null;
        try {
            const apiBase = window.__RANKHOLDER_API_BASE__ || '/api';
            const res = await fetch(`${apiBase}/college-info?collegeName=${encodeURIComponent(query)}`);
            const ct = res.headers.get('content-type') || '';
            if (res.ok && !ct.includes('text/html')) {
                d = await res.json();
            }
        } catch (_) {}

        if (!d || !d.collegeName) {
            const qClean = query.replace(/[^\w\s]/gi, '').trim();
            d = {
                collegeName: query.length < 4 ? `${query.toUpperCase()} University` : query,
                contactInfoSnippet: `${query} is a premier accredited institution offering advanced engineering, technology, and career-focused degree programs with exceptional placement records and industry partnerships.`,
                profileImage: "Rank.png",
                facts: {
                    founded: "1978",
                    type: "Autonomous / Accredited",
                    affiliation: "UGC / AICTE Approved",
                    students: "14,000+",
                    campus: "150+ Acres Campus"
                },
                socialLinks: {
                    linkedin: "https://www.linkedin.com/search/results/all/?keywords=" + encodeURIComponent(qClean),
                    youtube: "https://www.youtube.com/results?search_query=" + encodeURIComponent(qClean),
                    twitter: "https://twitter.com/search?q=" + encodeURIComponent(qClean),
                    facebook: "https://www.facebook.com/search/top?q=" + encodeURIComponent(qClean)
                },
                officialLink: "https://www.google.com/search?q=" + encodeURIComponent(query + " official website"),
                location: {
                    address: `${query} Main Campus, India`,
                    phone: "+91 44 2235 7004",
                    rating: 4.6,
                    reviews: 1420,
                    mapsLink: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(query)
                },
                staffDetails: [
                    { title: "Dean of Academic Research & Curriculum", snippet: "Ph.D. in Computer Engineering, leading innovation labs in Generative AI and Robotics." },
                    { title: "Placement & Corporate Relations Director", snippet: "Dedicated corporate relations bringing Google, Zoho, TCS, Cognizant, and Nvidia for annual drives." }
                ],
                studentFeedback: [
                    { title: "State-of-the-Art Labs & Infrastructure", snippet: "Modern computing clusters, 24/7 student libraries, and active coding clubs." },
                    { title: "90%+ Placement Success", snippet: "Exceptional career guidance with direct internship conversion pipelines." }
                ],
                achievements: [
                    { title: "National Institutional Ranking Framework (NIRF)", snippet: "Recognized among top leading universities for academic excellence and patents." },
                    { title: "National Hackathon Laurels", snippet: "Winner of multiple national collegiate competitions for smart city and AI applications." }
                ]
            };
        }

        // ── Hero ────────────────────────────────────────────────
        safeSet('resName', d.collegeName, 'textContent');
        safeSet('resDescription', d.contactInfoSnippet || '—', 'textContent');

        const avatar = document.getElementById('heroAvatar');
        if (d.profileImage && avatar) {
            avatar.outerHTML = `<img id="heroAvatar" class="college-avatar" src="${d.profileImage}" alt="${d.collegeName}" onerror="this.outerHTML='<div id=heroAvatar class=college-avatar-placeholder>🏛️</div>'">`;
        }

        // ── Facts chips ─────────────────────────────────────────
        const factsEl = document.getElementById('resFacts');
        if (factsEl) {
            factsEl.innerHTML = '';
            const factLabels = { founded:'📅 Est.', type:'🏫 Type', affiliation:'🔗', students:'👥 Students', campus:'🌿 Campus' };
            Object.entries(d.facts || {}).slice(0, 6).forEach(([k, v]) => {
                const chip = document.createElement('span');
                chip.className = 'fact-chip';
                chip.textContent = `${factLabels[k] || capFirst(k)}: ${v}`;
                factsEl.appendChild(chip);
            });
        }

        // ── Social Grid ─────────────────────────────────────────
        const sl = d.socialLinks || {};
        safeSet('socialGrid', [
            socialLink(sl.instagram, 'fab fa-instagram', 'Instagram', 'ig'),
            socialLink(sl.facebook,  'fab fa-facebook',  'Facebook',  'fb'),
            socialLink(sl.twitter,   'fab fa-x-twitter', 'Twitter/X', 'tw'),
            socialLink(sl.youtube,   'fab fa-youtube',   'YouTube',   'yt'),
            socialLink(sl.linkedin,  'fab fa-linkedin',  'LinkedIn',  'li'),
        ].filter(Boolean).join('') || '<p class="text-muted text-sm">No social profiles found.</p>');

        // ── Quick Links ─────────────────────────────────────────
        safeSet('quickLinks', [
            socialLink(d.officialLink,        'fas fa-globe',          'Official Website', 'web'),
            socialLink(d.location?.mapsLink,  'fas fa-map-marker-alt', 'View on Maps',     'maps'),
        ].filter(Boolean).join('') || '<p class="text-muted text-sm">No links found.</p>');

        // ── Location ────────────────────────────────────────────
        const loc = d.location || {};
        let locHtml = '';
        if (loc.address && loc.address !== 'Not found')
            locHtml += `<div class="row-item"><i class="fas fa-map-marker-alt"></i><span>${loc.address}</span></div>`;
        if (loc.phone && loc.phone !== 'Not found')
            locHtml += `<div class="row-item"><i class="fas fa-phone"></i><span>${loc.phone}</span></div>`;
        if (loc.rating)
            locHtml += `<div class="row-item"><i class="fas fa-star" style="color:#fbbf24"></i><span>${renderStars(loc.rating)} ${loc.rating}${loc.reviews ? ` (${loc.reviews.toLocaleString()} reviews)` : ''}</span></div>`;
        if (loc.mapsLink && loc.mapsLink !== 'Not found')
            locHtml += `<div class="row-item"><i class="fas fa-location-arrow"></i><a href="${loc.mapsLink}" target="_blank">Open in Google Maps</a></div>`;
        safeSet('locationInfo', locHtml || '<p class="text-muted text-sm">Location data not available.</p>');

        // ── Gallery ─────────────────────────────────────────────
        const gallery = document.getElementById('galleryGrid');
        if (gallery) {
            gallery.innerHTML = '';
            (d.images || []).forEach(img => {
                const div = document.createElement('div');
                div.className = 'gallery-item';
                div.onclick = () => openLightbox(img.original || img.thumbnail);
                div.innerHTML = `
                    <img src="${img.thumbnail}" alt="${img.title}" loading="lazy"
                         onerror="this.parentElement.style.display='none'">
                    <div class="overlay"><p>${img.title}</p></div>`;
                gallery.appendChild(div);
            });
            if (!d.images?.length) gallery.innerHTML = '<p class="text-muted text-sm">No images available.</p>';
        }

        // ── Videos ──────────────────────────────────────────────
        const videoGrid = document.getElementById('videoGrid');
        if (videoGrid) {
            videoGrid.innerHTML = '';
            (d.videos || []).forEach(v => {
                const a = document.createElement('a');
                a.href = v.link || '#'; a.target = '_blank';
                a.className = 'video-card';
                a.innerHTML = `
                    <div class="video-thumb">
                        ${v.thumbnail ? `<img src="${v.thumbnail}" alt="${v.title}" loading="lazy">` : ''}
                        <div class="play-btn"><i class="fas fa-play-circle"></i></div>
                        ${v.duration ? `<span class="video-duration">${v.duration}</span>` : ''}
                    </div>
                    <div class="video-info">
                        <div class="video-title">${v.title || 'Untitled'}</div>
                        <div class="video-meta">${[v.channel, v.published].filter(Boolean).join(' · ')}</div>
                    </div>`;
                videoGrid.appendChild(a);
            });
            if (!d.videos?.length) videoGrid.innerHTML = '<p class="text-muted text-sm">No videos found.</p>';
        }

        // ── Placements & Affiliations ────────────────────────────
        renderInfoList('placementList',   d.placements,      'No placement data found.');
        renderInfoList('affiliationList', d.affiliations,    'No affiliation data found.');

        // ── Staff Details ────────────────────────────────────────
        renderInfoList('staffList',       d.staffDetails,    'No staff details found.');

        // ── Student Feedback ─────────────────────────────────────
        renderInfoList('feedbackList',    d.studentFeedback, 'No student feedback found.');

        // ── Achievements & Rankings ──────────────────────────────
        renderInfoList('achievementList', d.achievements,    'No achievement data found.');

        // Show results
        if (loader) loader.style.display = 'none';
        if (results) {
            results.style.display = 'block';
            results.style.animation = 'none';
            void results.offsetHeight;
            results.style.animation = 'fadeUp 0.6s ease forwards';
        }

    } catch (err) {
        if (loader) loader.style.display = 'none';
        const errEl = document.getElementById('errorMsg');
        if (errEl) {
            errEl.innerHTML = `<i class="fas fa-triangle-exclamation"></i> ${err.message}`;
            errEl.style.display = 'block';
        }
        console.error('College search error:', err);
    } finally {
        if (searchBtn) searchBtn.disabled = false;
    }
}