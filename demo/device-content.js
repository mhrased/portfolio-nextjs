// Device screen content — laptop shows WEB DEV work, phone shows MOBILE DEV work
// Three story variants toggleable via Tweaks

window.DeviceContent = {
  // ─────────── CODE: web IDE → React Native app UI ───────────
  code: {
    laptop: `
      <div class="dc-code">
        <div class="dc-code-sidebar">
          <div class="dc-file-tree">
            <div class="dcf active"><span class="i">📁</span> web-app</div>
            <div class="dcf nested"><span class="i">📄</span> App.tsx</div>
            <div class="dcf nested on"><span class="i">📄</span> api.ts</div>
            <div class="dcf nested"><span class="i">📄</span> db.ts</div>
            <div class="dcf nested"><span class="i">📄</span> Dashboard.tsx</div>
            <div class="dcf"><span class="i">📁</span> components</div>
            <div class="dcf nested"><span class="i">📄</span> Chart.tsx</div>
            <div class="dcf"><span class="i">📄</span> next.config.js</div>
            <div class="dcf"><span class="i">📄</span> package.json</div>
          </div>
        </div>
        <div class="dc-code-main">
          <div class="dc-tabs">
            <div class="dc-tab on">api.ts <span class="x">×</span></div>
            <div class="dc-tab">Dashboard.tsx <span class="x">×</span></div>
            <div class="dc-tab">db.ts <span class="x">×</span></div>
          </div>
          <div class="dc-code-body">
            <div class="dc-line"><span class="ln">1</span><span class="kw">import</span> { <span class="v">Router</span> } <span class="kw">from</span> <span class="st">'express'</span>;</div>
            <div class="dc-line"><span class="ln">2</span><span class="kw">import</span> { <span class="v">prisma</span> } <span class="kw">from</span> <span class="st">'./db'</span>;</div>
            <div class="dc-line"><span class="ln">3</span></div>
            <div class="dc-line"><span class="ln">4</span><span class="cm">// Full-stack API endpoint</span></div>
            <div class="dc-line"><span class="ln">5</span><span class="kw">export const</span> <span class="fn">router</span> = <span class="v">Router</span>();</div>
            <div class="dc-line"><span class="ln">6</span></div>
            <div class="dc-line"><span class="ln">7</span>router.<span class="fn">get</span>(<span class="st">'/users/:id'</span>, <span class="kw">async</span> (req, res) =&gt; {</div>
            <div class="dc-line"><span class="ln">8</span>  <span class="kw">const</span> user = <span class="kw">await</span> prisma.user.<span class="fn">findUnique</span>({</div>
            <div class="dc-line"><span class="ln">9</span>    where: { id: req.params.id },</div>
            <div class="dc-line"><span class="ln">10</span>    include: { projects: <span class="bl">true</span> }</div>
            <div class="dc-line"><span class="ln">11</span>  });</div>
            <div class="dc-line"><span class="ln">12</span>  res.<span class="fn">json</span>(user);<span class="cursor"></span></div>
            <div class="dc-line"><span class="ln">13</span>});</div>
          </div>
          <div class="dc-statusbar">
            <span class="stg">● main</span>
            <span>TypeScript · Next.js</span>
            <span class="sok">✓ 0 errors</span>
          </div>
        </div>
      </div>`,
    phone: `
      <div class="dc-phone-app">
        <div class="dc-phone-top">
          <div class="dc-phone-time">9:41</div>
          <div class="dc-phone-icons"><span>●●●</span><span>📶</span><span>🔋</span></div>
        </div>
        <div class="dc-phone-header">
          <div class="dc-phone-greet">
            <div class="dc-phone-hello">Welcome back,</div>
            <div class="dc-phone-name">Rasel</div>
          </div>
          <div class="dc-phone-avatar">MR</div>
        </div>
        <div class="dc-phone-card">
          <div class="dc-pc-label">YOUR BALANCE</div>
          <div class="dc-pc-value">$12,489</div>
          <div style="font-size:10px;color:var(--green-2);margin-top:4px">↑ +$842 this week</div>
          <div class="dc-pc-chart">
            <div class="dc-pc-bar" style="height:30%"></div>
            <div class="dc-pc-bar" style="height:55%"></div>
            <div class="dc-pc-bar" style="height:40%"></div>
            <div class="dc-pc-bar" style="height:75%"></div>
            <div class="dc-pc-bar" style="height:60%"></div>
            <div class="dc-pc-bar on" style="height:90%"></div>
            <div class="dc-pc-bar" style="height:70%"></div>
          </div>
        </div>
        <div style="display:flex;gap:6px;margin:2px 0">
          <div style="flex:1;background:rgba(115,89,255,0.12);border:1px solid rgba(115,89,255,0.3);border-radius:10px;padding:8px;text-align:center"><div style="font-size:14px;color:var(--purple-3)">↑</div><div style="font-size:8px;color:var(--text-2);margin-top:2px">Send</div></div>
          <div style="flex:1;background:rgba(51,153,255,0.12);border:1px solid rgba(51,153,255,0.3);border-radius:10px;padding:8px;text-align:center"><div style="font-size:14px;color:var(--blue-2)">↓</div><div style="font-size:8px;color:var(--text-2);margin-top:2px">Request</div></div>
          <div style="flex:1;background:rgba(51,217,128,0.12);border:1px solid rgba(51,217,128,0.3);border-radius:10px;padding:8px;text-align:center"><div style="font-size:14px;color:var(--green-2)">+</div><div style="font-size:8px;color:var(--text-2);margin-top:2px">Top up</div></div>
        </div>
        <div class="dc-phone-list">
          <div class="dc-pl-item">
            <div class="dc-pl-ic">☕</div>
            <div class="dc-pl-txt">
              <div class="dc-pl-t">Starbucks</div>
              <div class="dc-pl-s">Today · 9:12 AM</div>
            </div>
            <div class="dc-pl-meta">-$6.40</div>
          </div>
          <div class="dc-pl-item">
            <div class="dc-pl-ic b">◉</div>
            <div class="dc-pl-txt">
              <div class="dc-pl-t">Salary · Acme Co</div>
              <div class="dc-pl-s">Yesterday</div>
            </div>
            <div class="dc-pl-meta" style="color:var(--green-2)">+$4,200</div>
          </div>
        </div>
        <div class="dc-phone-nav">
          <span class="on">⌂</span><span>◫</span><span>⊕</span><span>◉</span>
        </div>
      </div>`
  },

  // ─────────── DASHBOARD: web admin → mobile commerce app ───────────
  dashboard: {
    laptop: `
      <div class="dc-dash">
        <div class="dc-dash-side">
          <div class="dc-dash-logo">◆ Admin</div>
          <div class="dc-dash-item on">⌂ Overview</div>
          <div class="dc-dash-item">⊞ Orders</div>
          <div class="dc-dash-item">◉ Customers</div>
          <div class="dc-dash-item">☰ Products</div>
          <div class="dc-dash-item">⚙ Settings</div>
        </div>
        <div class="dc-dash-main">
          <div class="dc-dash-hd">
            <div>
              <div class="dc-dash-title">Store overview</div>
              <div class="dc-dash-sub">Last 30 days · All channels</div>
            </div>
            <div class="dc-dash-pills">
              <span>Today</span><span>7d</span><span class="on">30d</span><span>90d</span>
            </div>
          </div>
          <div class="dc-dash-kpis">
            <div class="dc-kpi"><div class="dc-kpi-l">Revenue</div><div class="dc-kpi-v">$48.2k</div><div class="dc-kpi-d up">+12.4%</div></div>
            <div class="dc-kpi"><div class="dc-kpi-l">Orders</div><div class="dc-kpi-v">1,284</div><div class="dc-kpi-d up">+8.1%</div></div>
            <div class="dc-kpi"><div class="dc-kpi-l">AOV</div><div class="dc-kpi-v">$37.50</div><div class="dc-kpi-d up">+$2</div></div>
            <div class="dc-kpi"><div class="dc-kpi-l">Refund</div><div class="dc-kpi-v">0.8%</div><div class="dc-kpi-d">SLA</div></div>
          </div>
          <div class="dc-dash-chart">
            <svg viewBox="0 0 300 80" preserveAspectRatio="none" style="width:100%;height:100%">
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#7359FF" stop-opacity="0.5"/>
                  <stop offset="100%" stop-color="#7359FF" stop-opacity="0"/>
                </linearGradient>
              </defs>
              <path d="M0,60 L20,55 L40,58 L60,45 L80,50 L100,35 L120,40 L140,28 L160,32 L180,20 L200,25 L220,18 L240,22 L260,12 L280,18 L300,8 L300,80 L0,80 Z" fill="url(#g1)"/>
              <path d="M0,60 L20,55 L40,58 L60,45 L80,50 L100,35 L120,40 L140,28 L160,32 L180,20 L200,25 L220,18 L240,22 L260,12 L280,18 L300,8" fill="none" stroke="#7359FF" stroke-width="1.5"/>
            </svg>
          </div>
        </div>
      </div>`,
    phone: `
      <div class="dc-phone-app">
        <div class="dc-phone-top">
          <div class="dc-phone-time">9:41</div>
          <div class="dc-phone-icons"><span>●●●</span><span>📶</span><span>🔋</span></div>
        </div>
        <div style="display:flex;align-items:center;gap:6px;background:rgba(20,15,36,0.6);border:1px solid var(--border-2);border-radius:10px;padding:6px 10px;margin-top:8px">
          <span style="font-size:10px;color:var(--text-3)">⌕</span>
          <span style="font-size:9px;color:var(--text-3);flex:1">Search products…</span>
          <span style="font-size:10px;color:var(--purple-3)">⊞</span>
        </div>
        <div style="display:flex;gap:4px;overflow:hidden;margin-top:2px">
          <span style="padding:4px 8px;background:var(--grad-primary);border-radius:999px;font-size:8px;color:#fff;font-weight:600">All</span>
          <span style="padding:4px 8px;background:rgba(20,15,36,0.6);border:1px solid var(--border-2);border-radius:999px;font-size:8px;color:var(--text-3)">New</span>
          <span style="padding:4px 8px;background:rgba(20,15,36,0.6);border:1px solid var(--border-2);border-radius:999px;font-size:8px;color:var(--text-3)">Sale</span>
          <span style="padding:4px 8px;background:rgba(20,15,36,0.6);border:1px solid var(--border-2);border-radius:999px;font-size:8px;color:var(--text-3)">Gear</span>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:4px">
          <div style="background:linear-gradient(135deg,rgba(115,89,255,0.2),rgba(51,153,255,0.05));border:1px solid var(--border-2);border-radius:10px;padding:8px;aspect-ratio:1;display:flex;flex-direction:column;justify-content:flex-end"><div style="font-size:8px;color:var(--text-3)">Sneakers</div><div style="font-size:10px;color:#fff;font-weight:700">Air Runner</div><div style="font-size:9px;color:var(--purple-3);margin-top:2px">$129</div></div>
          <div style="background:linear-gradient(135deg,rgba(51,217,128,0.15),rgba(115,89,255,0.05));border:1px solid var(--border-2);border-radius:10px;padding:8px;aspect-ratio:1;display:flex;flex-direction:column;justify-content:flex-end"><div style="font-size:8px;color:var(--text-3)">Apparel</div><div style="font-size:10px;color:#fff;font-weight:700">Tech Tee</div><div style="font-size:9px;color:var(--purple-3);margin-top:2px">$45</div></div>
          <div style="background:linear-gradient(135deg,rgba(255,217,51,0.15),rgba(255,92,138,0.05));border:1px solid var(--border-2);border-radius:10px;padding:8px;aspect-ratio:1;display:flex;flex-direction:column;justify-content:flex-end"><div style="font-size:8px;color:var(--text-3)">Watch</div><div style="font-size:10px;color:#fff;font-weight:700">Pulse X</div><div style="font-size:9px;color:var(--purple-3);margin-top:2px">$289</div></div>
          <div style="background:linear-gradient(135deg,rgba(51,153,255,0.15),rgba(115,89,255,0.05));border:1px solid var(--border-2);border-radius:10px;padding:8px;aspect-ratio:1;display:flex;flex-direction:column;justify-content:flex-end"><div style="font-size:8px;color:var(--text-3)">Bag</div><div style="font-size:10px;color:#fff;font-weight:700">Voyager</div><div style="font-size:9px;color:var(--purple-3);margin-top:2px">$78</div></div>
        </div>
        <div class="dc-phone-nav">
          <span class="on">⌂</span><span>⌕</span><span>♡</span><span>⊚</span>
        </div>
      </div>`
  },

  // ─────────── TERMINAL: CI/CD logs → mobile delivery app ───────────
  terminal: {
    laptop: `
      <div class="dc-term">
        <div class="dc-term-body">
          <div class="tl"><span class="prm">rasel@main</span>:<span class="pth">~/kriyakarak</span>$ git push origin main</div>
          <div class="tl dim">Enumerating objects: 47, done.</div>
          <div class="tl dim">Counting objects: 100% (47/47), done.</div>
          <div class="tl dim">Writing objects: 100% (25/25), 4.82 KiB/s, done.</div>
          <div class="tl"><span class="ok">✓</span> Pushed to origin/main</div>
          <div class="tl"></div>
          <div class="tl"><span class="prm">rasel@main</span>:<span class="pth">~/kriyakarak</span>$ gh run watch</div>
          <div class="tl info">▸ CI/CD Pipeline · run #1247</div>
          <div class="tl"><span class="ok">✓</span> <span class="dim">lint       </span> 12s</div>
          <div class="tl"><span class="ok">✓</span> <span class="dim">test       </span> 1m 04s</div>
          <div class="tl"><span class="ok">✓</span> <span class="dim">build      </span> 48s</div>
          <div class="tl"><span class="ok">✓</span> <span class="dim">docker push</span> 22s</div>
          <div class="tl"><span class="info">◐</span> <span class="dim">deploy aws </span> running<span class="cursor"></span></div>
        </div>
      </div>`,
    phone: `
      <div class="dc-phone-app">
        <div class="dc-phone-top">
          <div class="dc-phone-time">9:41</div>
          <div class="dc-phone-icons"><span>●●●</span><span>📶</span><span>🔋</span></div>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-top:8px">
          <div>
            <div style="font-size:8px;color:var(--text-3)">DELIVER TO</div>
            <div style="font-size:11px;color:#fff;font-weight:700">Home · 221B Baker ▼</div>
          </div>
          <div class="dc-phone-avatar" style="background:rgba(51,217,128,0.15);color:var(--green-2);border-color:rgba(51,217,128,0.3)">🛵</div>
        </div>
        <div style="background:linear-gradient(135deg,rgba(51,217,128,0.15),rgba(51,153,255,0.05));border:1px solid rgba(51,217,128,0.3);border-radius:12px;padding:10px">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <div>
              <div style="font-size:8px;color:var(--green-2);font-weight:600;letter-spacing:0.1em">● ON THE WAY</div>
              <div style="font-size:12px;color:#fff;font-weight:700;margin-top:2px">Arriving in 8 min</div>
            </div>
            <div style="font-size:16px">🛵</div>
          </div>
          <div style="height:3px;background:rgba(255,255,255,0.1);border-radius:2px;margin-top:8px;overflow:hidden">
            <div style="width:72%;height:100%;background:var(--green-2);border-radius:2px"></div>
          </div>
        </div>
        <div style="font-size:9px;color:var(--text-3);font-weight:600;margin:2px 0 -2px;letter-spacing:0.05em">POPULAR NEAR YOU</div>
        <div class="dc-phone-list">
          <div class="dc-pl-item">
            <div class="dc-pl-ic" style="background:rgba(255,92,138,0.15);color:var(--pink);font-size:12px">🍔</div>
            <div class="dc-pl-txt">
              <div class="dc-pl-t">Burger Bros</div>
              <div class="dc-pl-s">★ 4.8 · 15-20 min · $</div>
            </div>
            <div class="dc-pl-meta" style="color:var(--purple-3)">↗</div>
          </div>
          <div class="dc-pl-item">
            <div class="dc-pl-ic b" style="font-size:12px">🍜</div>
            <div class="dc-pl-txt">
              <div class="dc-pl-t">Ramen House</div>
              <div class="dc-pl-s">★ 4.9 · 20-25 min · $$</div>
            </div>
            <div class="dc-pl-meta" style="color:var(--purple-3)">↗</div>
          </div>
        </div>
        <div class="dc-phone-nav">
          <span class="on">⌂</span><span>⌕</span><span>🛒</span><span>◉</span>
        </div>
      </div>`
  }
};
