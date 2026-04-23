"use client";

import { useEffect, useRef } from "react";
import { SITE } from "@/constants/site";
import { HERO_LINES, HERO_STATS, HERO_STACK_CARDS, HERO_COMMITS } from "@/lib/hero";

export default function Hero() {
  const heroWrapRef = useRef<HTMLElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);

  const scrollCueRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate star field
    const starsEl = starsRef.current;
    if (starsEl) {
      const frag = document.createDocumentFragment();
      for (let i = 0; i < 40; i++) {
        const s = document.createElement("div");
        s.className = "star";
        s.style.left = Math.random() * 100 + "%";
        s.style.top = Math.random() * 100 + "%";
        s.style.animationDelay = Math.random() * 3 + "s";
        s.style.opacity = String(0.3 + Math.random() * 0.5);
        if (Math.random() > 0.7) s.style.background = "var(--blue-2)";
        frag.appendChild(s);
      }
      starsEl.appendChild(frag);
    }

    // Morph animation on scroll
    const heroWrap = heroWrapRef.current;
    const laptop = laptopRef.current;
    const phone = phoneRef.current;
    const progressFill = progressFillRef.current;
    const scrollCue = scrollCueRef.current;

    function updateMorph() {
      if (!heroWrap || !laptop || !phone) return;
      const rect = heroWrap.getBoundingClientRect();
      const total = heroWrap.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / total));

      laptop.style.setProperty("--p", String(p));
      phone.style.setProperty("--p", String(p));

      if (progressFill) progressFill.style.height = p * 100 + "%";
      if (scrollCue) scrollCue.style.opacity = p > 0.05 ? "0" : "1";
    }

    let ticking = false;
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateMorph();
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    updateMorph();

    // Tech stack card parallax
    const stackCards = document.querySelectorAll<HTMLElement>(".stack-card");
    function onMouseMove(e: MouseEvent) {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      stackCards.forEach((card, i) => {
        const f = (i + 1) * 0.5;
        card.style.transform = `translate(${x * f}px, ${y * f}px)`;
      });
    }

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <section id="home" className="hero-wrap" data-section="" ref={heroWrapRef}>
      <div className="hero">
        <div className="hero-grid-bg" />
        <div className="stars" id="hero-stars" ref={starsRef} />

        {/* Floating commit tags */}
        <div className="commits">
          {HERO_COMMITS.map((c) => (
            <div
              key={c.hash}
              className="commit"
              style={{ ...c.pos, ...(c.delay ? { animationDelay: c.delay } : {}) } as React.CSSProperties}
            >
              <span className="hash">{c.hash}</span> {c.msg}{" "}
              <span className="plus">{c.plus}</span>
              {c.minus && <> <span className="minus">{c.minus}</span></>}
            </div>
          ))}
        </div>

        {/* Progress rail */}
        <div className="hero-progress">
          <div className="rail">
            <div
              className="fill"
              id="progress-fill"
              ref={progressFillRef}
              style={{ height: "0%" }}
            />
          </div>
        </div>

        <div className="hero-inner">
          {/* LEFT — copy */}
          <div className="hero-left">
            <div className="hero-status">
              <span className="dot" /> {SITE.status}
            </div>
            <h1 className="hero-title">
              {HERO_LINES.map((line) => (
                <span key={line} className="line">
                  <span className="grad-text">{line}</span>
                </span>
              ))}
            </h1>
            <p className="hero-sub">
              I&apos;m{" "}
              <strong style={{ color: "var(--text)" }}>{SITE.name}</strong>
              {" "}— I architect, build, and ship production web and mobile products.
              Frontend, backend, database, DevOps — one engineer, the whole pipeline.
            </p>
            <div className="hero-meta">
              {HERO_STATS.map((s) => (
                <div key={s.label} className="m">
                  <div className="n">{s.value}</div>
                  <div className="l">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="hero-actions">
              <a href="#work" className="btn btn-primary">
                See the work
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
              <a href="#contact" className="btn btn-ghost">
                Start a project
              </a>
            </div>
          </div>

          {/* CENTER — morph stage (absolute, behind left) */}
          <div className="morph-stage">
            <div className="morph-glow" />
            <div className="morph-rings">
              <div className="ring" />
              <div className="ring" />
              <div className="ring" />
            </div>

            <div className="device-wrap" id="device-wrap">
              {/* Laptop */}
              <div
                className="laptop"
                id="laptop"
                ref={laptopRef}
                style={{ "--p": 0 } as React.CSSProperties}
              >
                <div className="laptop-body">
                  <div className="laptop-screen" id="laptop-screen">
                    <div className="dc-code">
                      <div className="dc-code-sidebar">
                        <div className="dc-file-tree">
                          <div className="dcf active">
                            <span className="i">📁</span> src
                          </div>
                          <div className="dcf nested">
                            <span className="i">📄</span> App.tsx
                          </div>
                          <div className="dcf nested on">
                            <span className="i">📄</span> api.ts
                          </div>
                          <div className="dcf nested">
                            <span className="i">📄</span> db.ts
                          </div>
                          <div className="dcf nested">
                            <span className="i">📄</span> index.ts
                          </div>
                          <div className="dcf">
                            <span className="i">📁</span> infra
                          </div>
                          <div className="dcf nested">
                            <span className="i">📄</span> main.tf
                          </div>
                          <div className="dcf">
                            <span className="i">📄</span> docker-compose.yml
                          </div>
                          <div className="dcf">
                            <span className="i">📄</span> package.json
                          </div>
                        </div>
                      </div>
                      <div className="dc-code-main">
                        <div className="dc-tabs">
                          <div className="dc-tab on">
                            api.ts <span className="x">×</span>
                          </div>
                          <div className="dc-tab">
                            db.ts <span className="x">×</span>
                          </div>
                          <div className="dc-tab">
                            main.tf <span className="x">×</span>
                          </div>
                        </div>
                        <div className="dc-code-body">
                          <div className="dc-line">
                            <span className="ln">1</span>
                            <span className="kw">import</span> {"{ "}
                            <span className="v">Router</span>
                            {" }"} <span className="kw">from</span>{" "}
                            <span className="st">&apos;express&apos;</span>;
                          </div>
                          <div className="dc-line">
                            <span className="ln">2</span>
                            <span className="kw">import</span> {"{ "}
                            <span className="v">prisma</span>
                            {" }"} <span className="kw">from</span>{" "}
                            <span className="st">&apos;./db&apos;</span>;
                          </div>
                          <div className="dc-line">
                            <span className="ln">3</span>
                          </div>
                          <div className="dc-line">
                            <span className="ln">4</span>
                            <span className="cm">
                              // Auth + rate-limit ready
                            </span>
                          </div>
                          <div className="dc-line">
                            <span className="ln">5</span>
                            <span className="kw">export const</span>{" "}
                            <span className="fn">router</span> ={" "}
                            <span className="v">Router</span>();
                          </div>
                          <div className="dc-line">
                            <span className="ln">6</span>
                          </div>
                          <div className="dc-line">
                            <span className="ln">7</span>router.
                            <span className="fn">get</span>(
                            <span className="st">&apos;/users/:id&apos;</span>,{" "}
                            <span className="kw">async</span> (req, res) =&gt;{" "}
                            {"{"}
                          </div>
                          <div className="dc-line">
                            <span className="ln">8</span>
                            {"  "}
                            <span className="kw">const</span> user ={" "}
                            <span className="kw">await</span> prisma.user.
                            <span className="fn">findUnique</span>({"({"}
                          </div>
                          <div className="dc-line">
                            <span className="ln">9</span>
                            {"    "}where: {"{ "}id: req.params.id{" }"},
                          </div>
                          <div className="dc-line">
                            <span className="ln">10</span>
                            {"    "}include: {"{ "}projects:{" "}
                            <span className="bl">true</span>
                            {" }"}
                          </div>
                          <div className="dc-line">
                            <span className="ln">11</span>
                            {"  "}
                            {"})"};
                          </div>
                          <div className="dc-line">
                            <span className="ln">12</span>
                            {"  "}res.<span className="fn">json</span>(user);
                            <span className="cursor" />
                          </div>
                          <div className="dc-line">
                            <span className="ln">13</span>
                            {"}"});
                          </div>
                        </div>
                        <div className="dc-statusbar">
                          <span className="stg">● main</span>
                          <span>TypeScript</span>
                          <span>UTF-8</span>
                          <span className="sok">✓ 0 errors</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="laptop-base" />
                </div>
              </div>

              {/* Phone */}
              <div
                className="phone"
                id="phone"
                ref={phoneRef}
                style={{ "--p": 0 } as React.CSSProperties}
              >
                <div className="phone-body" id="phone-body">
                  <div className="dc-phone-app">
                    <div className="dc-phone-top">
                      <div className="dc-phone-time">9:41</div>
                      <div className="dc-phone-icons">
                        <span>●●●</span>
                        <span>📶</span>
                        <span>🔋</span>
                      </div>
                    </div>
                    <div className="dc-phone-header">
                      <div className="dc-phone-greet">
                        <div className="dc-phone-hello">Good morning,</div>
                        <div className="dc-phone-name">Rasel</div>
                      </div>
                      <div className="dc-phone-avatar">MR</div>
                    </div>
                    <div className="dc-phone-card">
                      <div className="dc-pc-label">ACTIVE DEPLOYS</div>
                      <div className="dc-pc-value">14</div>
                      <div className="dc-pc-chart">
                        <div className="dc-pc-bar" style={{ height: "30%" }} />
                        <div className="dc-pc-bar" style={{ height: "55%" }} />
                        <div className="dc-pc-bar" style={{ height: "40%" }} />
                        <div className="dc-pc-bar" style={{ height: "75%" }} />
                        <div className="dc-pc-bar" style={{ height: "60%" }} />
                        <div
                          className="dc-pc-bar on"
                          style={{ height: "90%" }}
                        />
                        <div className="dc-pc-bar" style={{ height: "45%" }} />
                      </div>
                    </div>
                    <div className="dc-phone-list">
                      <div className="dc-pl-item">
                        <div className="dc-pl-ic">✓</div>
                        <div className="dc-pl-txt">
                          <div className="dc-pl-t">api-gateway</div>
                          <div className="dc-pl-s">Deployed · us-east-1</div>
                        </div>
                        <div className="dc-pl-meta">2m</div>
                      </div>
                      <div className="dc-pl-item">
                        <div className="dc-pl-ic b">↻</div>
                        <div className="dc-pl-txt">
                          <div className="dc-pl-t">auth-service</div>
                          <div className="dc-pl-s">Building · 84%</div>
                        </div>
                        <div className="dc-pl-meta">now</div>
                      </div>
                      <div className="dc-pl-item">
                        <div className="dc-pl-ic">✓</div>
                        <div className="dc-pl-txt">
                          <div className="dc-pl-t">web-client</div>
                          <div className="dc-pl-s">Deployed · Vercel</div>
                        </div>
                        <div className="dc-pl-meta">15m</div>
                      </div>
                    </div>
                    <div className="dc-phone-nav">
                      <span className="on">⌂</span>
                      <span>◫</span>
                      <span>⊞</span>
                      <span>◉</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — tech stack cards */}
          <div className="hero-right">
            {HERO_STACK_CARDS.map((card) => (
              <div key={card.title} className="stack-card">
                <div className="stack-icon" style={{ color: card.color }}>{card.icon}</div>
                <div>
                  <div className="t">{card.title}</div>
                  <div className="s">{card.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="scroll-cue" id="scroll-cue" ref={scrollCueRef}>
          <span className="label">Scroll to morph</span>
          <div className="line" />
        </div>
      </div>
    </section>
  );
}
