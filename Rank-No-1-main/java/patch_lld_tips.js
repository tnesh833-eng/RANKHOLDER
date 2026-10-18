const fs = require('fs');
let html = fs.readFileSync('frontend/app.html', 'utf8');

// 1. Expand the Steps in LLD hero banner
const oldTips = `<div class="lld-tips">
    <div class="lld-tip-card">💡 <strong>Step 1:</strong> Clarify scope &amp; gather requirements first — ask boundary questions</div>
    <div class="lld-tip-card">🧱 <strong>Step 2:</strong> Define Core Entities &amp; identify relationships (HAS-A / IS-A)</div>
    <div class="lld-tip-card">📐 <strong>Step 3:</strong> Apply SOLID Principles &amp; pick the right Design Pattern</div>
  </div>`;

const newTips = `<div class="lld-tips" style="display:flex; flex-direction:column; gap:16px;">
    <!-- Step 1 -->
    <div class="lld-tip-card" style="display:flex; flex-direction:column; gap:10px; text-align:left; background:rgba(99,102,241,0.1); border:1px solid rgba(99,102,241,0.3); padding:16px; border-radius:12px;">
      <h4 style="margin:0; color:#fff; font-size:1.05rem;">💡 Step 1: Clarify Scope & Gather Requirements</h4>
      <p style="margin:0; font-size:0.85rem; color:#94a3b8; line-height:1.5;">Start by defining the boundaries. Ask clarifying questions (e.g. "How many users?", "Read-heavy or write-heavy?"). Clearly separate the <strong>must-haves</strong> from the <strong>nice-to-haves</strong>.</p>
      <a href="https://github.com/donnemartin/system-design-primer" target="_blank" style="font-size:0.8rem; color:#818cf8; text-decoration:none; font-weight:700;">🔗 Learn System Requirements &rarr;</a>
    </div>
    
    <!-- Step 2 -->
    <div class="lld-tip-card" style="display:flex; flex-direction:column; gap:10px; text-align:left; background:rgba(139,92,246,0.1); border:1px solid rgba(139,92,246,0.3); padding:16px; border-radius:12px;">
      <h4 style="margin:0; color:#fff; font-size:1.05rem;">🧱 Step 2: Define Core Entities & Relationships</h4>
      <p style="margin:0; font-size:0.85rem; color:#94a3b8; line-height:1.5;">Identify the main actors (User, Admin) and entities (Book, Vehicle, Ticket). Define their properties and establish relationships like <strong>HAS-A</strong> (Composition) or <strong>IS-A</strong> (Inheritance).</p>
      <a href="https://refactoring.guru/design-patterns" target="_blank" style="font-size:0.8rem; color:#a78bfa; text-decoration:none; font-weight:700;">🔗 Learn Object-Oriented Design &rarr;</a>
    </div>

    <!-- Step 3 -->
    <div class="lld-tip-card" style="display:flex; flex-direction:column; gap:10px; text-align:left; background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.3); padding:16px; border-radius:12px;">
      <h4 style="margin:0; color:#fff; font-size:1.05rem;">📐 Step 3: Apply SOLID Principles & Design Patterns</h4>
      <p style="margin:0; font-size:0.85rem; color:#94a3b8; line-height:1.5;">Structure your classes using SOLID principles (Single Responsibility, Open-Closed, etc.). Apply patterns like <strong>Factory, Strategy, or Observer</strong> to make the system scalable and extensible.</p>
      <a href="https://www.freecodecamp.org/news/solid-principles-explained-in-plain-english/" target="_blank" style="font-size:0.8rem; color:#34d399; text-decoration:none; font-weight:700;">🔗 Master SOLID Principles &rarr;</a>
    </div>
    
    <!-- Daily LLD Questions Feed -->
    <div class="lld-tip-card" style="display:flex; flex-direction:column; gap:10px; text-align:left; background:linear-gradient(135deg, rgba(245,158,11,0.1), rgba(239,68,68,0.1)); border:1px solid rgba(245,158,11,0.3); padding:16px; border-radius:12px; margin-top:8px;">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <h4 style="margin:0; color:#fcd34d; font-size:1.05rem;"><i class="fas fa-fire"></i> Daily Live LLD Questions</h4>
        <span style="background:rgba(245,158,11,0.2); color:#fbbf24; font-size:0.7rem; padding:2px 8px; border-radius:20px; font-weight:bold;">Powered by SerpApi</span>
      </div>
      <p style="margin:0; font-size:0.85rem; color:#fde68a; line-height:1.4;">Real-time low-level design questions recently asked by top tech companies (Google, Amazon, Meta, etc.).</p>
      <div id="lldDailyQuestionsFeed" style="display:flex; flex-direction:column; gap:8px; margin-top:8px;">
         <span style="color:#fcd34d; font-size:0.8rem; text-align:center;"><i class="fas fa-spinner fa-spin"></i> Fetching today's questions...</span>
      </div>
    </div>
  </div>`;

if (html.includes(oldTips)) {
    html = html.replace(oldTips, newTips);
    fs.writeFileSync('frontend/app.html', html);
    console.log('✅ HTML Updated');
} else {
    // Try regex replace if spacing differs
    const fallbackRegex = /<div class="lld-tips">[\s\S]*?<\/div>\s*<\/div>/;
    if(fallbackRegex.test(html)) {
        html = html.replace(fallbackRegex, newTips + '\n</div>');
        fs.writeFileSync('frontend/app.html', html);
        console.log('✅ HTML Updated (fallback regex)');
    } else {
        console.log('⚠️ Could not find tips div in app.html');
    }
}
