import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ─────────────────────────────────────────────
   HypeHouse · Intro / Landing Page
   Design: Full editorial landing — sticky nav,
   cinematic hero, feature grid, "how it works"
   timeline, event showcase strip, bold CTA footer.
   Framer Motion throughout. Zero logic changes.
───────────────────────────────────────────── */

export default function IntroPage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/events");
  }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <div style={S.page}>
        {/* ── Fixed ambient layer ── */}
        <div style={S.orb1} aria-hidden />
        <div style={S.orb2} aria-hidden />
        <div style={S.orb3} aria-hidden />
        <div style={S.gridOverlay} aria-hidden />

        {/* ════════════════════════
            STICKY NAV
        ════════════════════════ */}
        <motion.nav
          style={{
            ...S.nav,
            background: scrolled ? "rgba(7,2,17,.85)" : "transparent",
            borderBottom: scrolled ? "1px solid rgba(255,255,255,.07)" : "1px solid transparent",
            backdropFilter: scrolled ? "blur(20px)" : "none",
          }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div style={S.logo}>
            <div style={S.logoIcon}>⚡</div>
            <span style={S.logoText}>HypeHouse</span>
          </div>

          <div style={S.navBtns}>
            <button
              style={S.navLogin}
              onClick={() => navigate("/login")}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,.45)"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,.2)"; e.currentTarget.style.color = "rgba(255,255,255,.8)"; }}
            >
              Login
            </button>
            <button
              style={S.navSignup}
              onClick={() => navigate("/register")}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 6px 24px rgba(255,60,172,.55)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(255,60,172,.35)"; e.currentTarget.style.transform = "none"; }}
            >
              Get Started
            </button>
          </div>
        </motion.nav>

        {/* ════════════════════════
            HERO
        ════════════════════════ */}
        <section style={S.hero}>
          {/* Eyebrow badge */}
          <motion.div
            style={S.eyebrow}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <span style={S.eyebrowDot} />
            Your community event platform
          </motion.div>

          {/* Main headline */}
          <motion.h1
            style={S.heroTitle}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Every vibe.
            <br />
            <span style={S.heroTitleGrad}>One place.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            style={S.heroSub}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.55 }}
          >
            HypeHouse brings together concerts, jam sessions, dev meetups,
            workshops, art nights, and social hangouts — all on one platform.
            Discover experiences, host your own, and find people who get it.
          </motion.p>

          {/* CTA row */}
          <motion.div
            style={S.ctaRow}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.48, duration: 0.5 }}
          >
            <button
              style={S.primaryBtn}
              onClick={() => navigate("/events")}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 10px 36px rgba(255,60,172,.6)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 4px 22px rgba(255,60,172,.38)"; e.currentTarget.style.transform = "none"; }}
            >
              Explore events →
            </button>
            <button
              style={S.secondaryBtn}
              onClick={() => navigate("/login")}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,.12)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,.07)"; }}
            >
              Login
            </button>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            style={S.statsRow}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.6 }}
          >
            {STATS.map((s, i) => (
              <div key={i} style={S.statItem}>
                <span style={S.statNum}>{s.num}</span>
                <span style={S.statLabel}>{s.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Floating event cards */}
          <motion.div
            style={S.floatCards}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
          >
            {EVENT_CARDS.map((c, i) => (
              <FloatCard key={i} {...c} delay={0.6 + i * 0.1} />
            ))}
          </motion.div>
        </section>

        {/* ════════════════════════
            ABOUT / DESCRIPTION
        ════════════════════════ */}
        <section style={S.aboutSection}>
          <motion.div
            style={S.aboutInner}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div style={S.sectionBadge}>About HypeHouse</div>
            <h2 style={S.sectionTitle}>
              Built for people who<br />
              <span style={S.gradText}>actually show up.</span>
            </h2>
            <p style={S.aboutText}>
              HypeHouse started with a simple idea: finding good events shouldn't
              be hard, and hosting them shouldn't be complicated. Whether you're
              organizing a 10-person jam session in your garage, a 200-person
              tech conference, or a neighbourhood movie night — HypeHouse gives
              you the tools to make it happen and the audience to fill it.
            </p>
            <p style={S.aboutText}>
              We believe experiences are better when shared. So we built a space
              where hosts and attendees meet halfway — no algorithms hiding your
              event, no ticket markup nonsense, just real people connecting over
              things they care about.
            </p>
          </motion.div>
        </section>

        {/* ════════════════════════
            FEATURES GRID
        ════════════════════════ */}
        <section style={S.featSection}>
          <div style={S.sectionHead}>
            <motion.div
              style={S.sectionBadge}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              What you get
            </motion.div>
            <motion.h2
              style={S.sectionTitle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Everything you need.<br />
              <span style={S.gradText}>Nothing you don't.</span>
            </motion.h2>
          </div>

          <div style={S.featGrid}>
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                style={S.featCard}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -4, boxShadow: `0 16px 48px rgba(0,0,0,.4), 0 0 0 1px ${f.color}33` }}
              >
                <div style={{ ...S.featIcon, background: `${f.color}18`, border: `1px solid ${f.color}33`, color: f.color }}>
                  {f.icon}
                </div>
                <h3 style={S.featTitle}>{f.title}</h3>
                <p style={S.featDesc}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ════════════════════════
            HOW IT WORKS
        ════════════════════════ */}
        <section style={S.howSection}>
          <div style={S.sectionHead}>
            <motion.div
              style={S.sectionBadge}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              How it works
            </motion.div>
            <motion.h2
              style={S.sectionTitle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Up and running<br />
              <span style={S.gradText}>in three steps.</span>
            </motion.h2>
          </div>

          <div style={S.stepsRow}>
            {STEPS.map((step, i) => (
              <motion.div
                key={i}
                style={S.stepItem}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.55 }}
              >
                <div style={S.stepNumWrap}>
                  <div style={{ ...S.stepNum, background: `linear-gradient(135deg, ${step.color}, ${step.color2})`, boxShadow: `0 0 24px ${step.color}55` }}>
                    {step.num}
                  </div>
                  {i < STEPS.length - 1 && <div style={S.stepLine} />}
                </div>
                <div style={S.stepContent}>
                  <div style={S.stepIcon}>{step.icon}</div>
                  <h3 style={S.stepTitle}>{step.title}</h3>
                  <p style={S.stepDesc}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ════════════════════════
            EVENT TYPE SHOWCASE
        ════════════════════════ */}
        <section style={S.showcaseSection}>
          <div style={S.sectionHead}>
            <motion.div
              style={S.sectionBadge}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              For every occasion
            </motion.div>
            <motion.h2
              style={S.sectionTitle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Whatever your scene,<br />
              <span style={S.gradText}>we've got you.</span>
            </motion.h2>
          </div>

          <div style={S.showcaseGrid}>
            {SHOWCASE.map((item, i) => (
              <motion.div
                key={i}
                style={{ ...S.showcaseCard, borderColor: `${item.color}33` }}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.45 }}
                whileHover={{ scale: 1.03, borderColor: `${item.color}66`, boxShadow: `0 12px 40px rgba(0,0,0,.4), 0 0 0 1px ${item.color}33` }}
              >
                <div style={{ ...S.showcaseEmoji, background: `${item.color}15` }}>{item.emoji}</div>
                <div>
                  <p style={S.showcaseName}>{item.name}</p>
                  <p style={S.showcaseSub}>{item.sub}</p>
                </div>
                <div style={{ ...S.showcaseDot, background: item.color, boxShadow: `0 0 8px ${item.color}` }} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* ════════════════════════
            CTA FOOTER BANNER
        ════════════════════════ */}
        <section style={S.ctaBanner}>
          <div style={S.ctaBannerGlow} aria-hidden />
          <motion.div
            style={S.ctaBannerInner}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div style={S.ctaBannerCard}>
              <div style={S.ctaCardStrip} />
              <div style={S.ctaCardBody}>
                <h2 style={S.ctaTitle}>Ready to find your vibe?</h2>
                <p style={S.ctaSub}>
                  Join thousands of people discovering and hosting events on HypeHouse.
                  It takes 30 seconds to sign up.
                </p>
                <div style={S.ctaBtnRow}>
                  <button
                    style={S.cardPrimary}
                    onClick={() => navigate("/login")}
                    onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 10px 36px rgba(255,60,172,.6)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 4px 22px rgba(255,60,172,.38)"; e.currentTarget.style.transform = "none"; }}
                  >
                    Let me in →
                  </button>
                  <button
                    style={S.cardSecondary}
                    onClick={() => navigate("/register")}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,.3)"; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,.15)"; e.currentTarget.style.color = "rgba(255,255,255,.65)"; }}
                  >
                    Create an account
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer style={S.footer}>
          <div style={S.footerLogo}>
            <div style={{ ...S.logoIcon, width: 28, height: 28, borderRadius: 8, fontSize: 13 }}>⚡</div>
            <span style={{ ...S.logoText, fontSize: 16 }}>HypeHouse</span>
          </div>
          <p style={S.footerText}>© 2025 HypeHouse. Bring people together.</p>
        </footer>
      </div>

      <style>{`
        @keyframes float  { 0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);} }
        @keyframes pulse  { 0%,100%{opacity:1;}50%{opacity:.45;} }
        @keyframes shimmer{ 0%{background-position:-600px 0;}100%{background-position:600px 0;} }
        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; }
      `}</style>
    </>
  );
}

/* ── Float Card ── */
function FloatCard({ title, color, delay, emoji, meta }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.03, x: 4 }}
      style={{
        display: "flex", alignItems: "center", gap: 14,
        padding: "13px 16px", borderRadius: 14,
        background: "rgba(255,255,255,.05)",
        border: `1px solid ${color}33`,
        backdropFilter: "blur(10px)",
        boxShadow: `0 4px 20px rgba(0,0,0,.25), 0 0 0 1px ${color}18 inset`,
        cursor: "default",
      }}
    >
      <div style={{
        width: 36, height: 36, borderRadius: 10, flexShrink: 0,
        background: `${color}18`, border: `1px solid ${color}33`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 17, boxShadow: `0 0 12px ${color}44`,
      }}>
        {emoji}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", margin: 0, lineHeight: 1.2 }}>{title}</p>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,.38)", fontWeight: 500, margin: "3px 0 0" }}>{meta}</p>
      </div>
      <div style={{
        width: 7, height: 7, borderRadius: "50%", flexShrink: 0,
        background: color, boxShadow: `0 0 8px ${color}`,
        animation: "pulse 2s ease-in-out infinite",
      }} />
    </motion.div>
  );
}

/* ── Data ── */
const STATS = [
  { num: "500+", label: "Events hosted" },
  { num: "8k+",  label: "People joined" },
  { num: "40+",  label: "Event types" },
  { num: "Free", label: "To get started" },
];

const EVENT_CARDS = [
  { emoji: "🎸", title: "Weekend Jam Session",    meta: "Sat · 24 going",  color: "#FF3CAC" },
  { emoji: "💻", title: "Indie Dev Meetup",       meta: "Wed · 61 going",  color: "#2B86C5" },
  { emoji: "🎨", title: "Sketch & Chill Evening", meta: "Sun · 18 going",  color: "#38EF7D" },
];

const FEATURES = [
  {
    icon: "🔍", color: "#FF3CAC",
    title: "Discover Events",
    desc: "Browse a live feed of events happening around you — from open mics to office meetups.",
  },
  {
    icon: "🚀", color: "#2B86C5",
    title: "Host Anything",
    desc: "Create free or paid events in seconds. Set capacity, add details, and you're live.",
  },
  {
    icon: "👥", color: "#38EF7D",
    title: "Join the Crew",
    desc: "RSVP instantly, track your upcoming events, and see who else is going.",
  },
  {
    icon: "📍", color: "#F7971E",
    title: "Location-Aware",
    desc: "Every event is pinned to a map. Never show up at the wrong place again.",
  },
  {
    icon: "🎟️", color: "#8E2DE2",
    title: "Free & Paid",
    desc: "Collect contributions or keep it free. Full control over how you monetize your event.",
  },
  {
    icon: "⚡", color: "#FC466B",
    title: "Real-Time Updates",
    desc: "Attendee count updates live. Know exactly how full your event is at any moment.",
  },
];

const STEPS = [
  {
    num: "01", icon: "✍️", color: "#FF3CAC", color2: "#784BA0",
    title: "Create an account",
    desc: "Sign up in 30 seconds. No credit card, no fuss.",
  },
  {
    num: "02", icon: "🔎", color: "#2B86C5", color2: "#5D26C1",
    title: "Find or host an event",
    desc: "Browse what's happening or drop your own event on the platform.",
  },
  {
    num: "03", icon: "🤝", color: "#38EF7D", color2: "#11998E",
    title: "Show up & connect",
    desc: "Join the RSVP list, get the details, and meet your people.",
  },
];

const SHOWCASE = [
  { emoji: "🎸", name: "Jam Sessions",      sub: "Musicians & producers",   color: "#FF3CAC" },
  { emoji: "💻", name: "Dev Meetups",        sub: "Coders & builders",       color: "#2B86C5" },
  { emoji: "🎨", name: "Art & Design",       sub: "Creatives & illustrators", color: "#38EF7D" },
  { emoji: "🎤", name: "Open Mics",          sub: "Performers & poets",      color: "#F7971E" },
  { emoji: "📚", name: "Study Groups",       sub: "Learners & academics",    color: "#8E2DE2" },
  { emoji: "🎬", name: "Film Screenings",    sub: "Cinema lovers",           color: "#FC466B" },
  { emoji: "🏃", name: "Fitness Runs",       sub: "Athletes & wellness",     color: "#11998E" },
  { emoji: "🎲", name: "Game Nights",        sub: "Board games & esports",   color: "#784BA0" },
];

/* ── Styles ── */
const S = {
  page: {
    minHeight: "100vh",
    background: "#070211",
    color: "#fff",
    fontFamily: "'Syne', sans-serif",
    position: "relative",
    overflowX: "hidden",
  },

  /* Background layers */
  orb1: {
    position: "fixed", top: -100, left: -100,
    width: 500, height: 500, borderRadius: "50%",
    background: "rgba(255,60,172,.15)", filter: "blur(120px)",
    pointerEvents: "none", zIndex: 0,
  },
  orb2: {
    position: "fixed", bottom: -100, right: -100,
    width: 500, height: 500, borderRadius: "50%",
    background: "rgba(43,134,197,.15)", filter: "blur(120px)",
    pointerEvents: "none", zIndex: 0,
  },
  orb3: {
    position: "fixed", top: "50%", left: "30%",
    width: 300, height: 300, borderRadius: "50%",
    background: "rgba(120,75,160,.08)", filter: "blur(80px)",
    pointerEvents: "none", zIndex: 0,
  },
  gridOverlay: {
    position: "fixed", inset: 0,
    backgroundImage: "radial-gradient(rgba(255,255,255,.025) 1px, transparent 1px)",
    backgroundSize: "32px 32px",
    pointerEvents: "none", zIndex: 0,
  },

  /* Nav */
  nav: {
    position: "fixed", top: 0, left: 0, right: 0,
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "16px 40px",
    zIndex: 100,
    transition: "background .3s, border-color .3s, backdrop-filter .3s",
  },
  logo: { display: "flex", gap: 10, alignItems: "center" },
  logoIcon: {
    width: 38, height: 38, borderRadius: 11,
    background: "linear-gradient(135deg,#FF3CAC,#784BA0,#2B86C5)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 18, boxShadow: "0 0 18px rgba(255,60,172,.45)",
  },
  logoText: {
    fontWeight: 800, fontSize: 19,
    background: "linear-gradient(90deg,#FF3CAC,#784BA0,#2B86C5)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
    backgroundClip: "text", letterSpacing: "-.3px",
  },
  navBtns: { display: "flex", gap: 10, alignItems: "center" },
  navLogin: {
    background: "transparent",
    border: "1px solid rgba(255,255,255,.2)",
    color: "rgba(255,255,255,.8)",
    padding: "8px 18px", borderRadius: 10,
    fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 13,
    cursor: "pointer", transition: "all .15s",
  },
  navSignup: {
    background: "linear-gradient(135deg,#FF3CAC,#784BA0)",
    border: "none", padding: "9px 18px", borderRadius: 10,
    color: "#fff", fontFamily: "'Syne', sans-serif",
    fontWeight: 700, fontSize: 13, cursor: "pointer",
    transition: "all .18s",
    boxShadow: "0 4px 16px rgba(255,60,172,.35)",
  },

  /* Hero */
  hero: {
    position: "relative", zIndex: 1,
    maxWidth: 860, margin: "0 auto",
    padding: "160px 24px 100px",
    display: "flex", flexDirection: "column", alignItems: "center",
    textAlign: "center", gap: 0,
  },
  eyebrow: {
    display: "inline-flex", alignItems: "center", gap: 8,
    padding: "6px 16px", borderRadius: 20,
    background: "rgba(255,60,172,.1)",
    border: "1px solid rgba(255,60,172,.28)",
    color: "#FF3CAC", fontSize: 12, fontWeight: 700,
    letterSpacing: ".07em", textTransform: "uppercase",
    marginBottom: 28,
  },
  eyebrowDot: {
    width: 6, height: 6, borderRadius: "50%",
    background: "#FF3CAC", boxShadow: "0 0 8px #FF3CAC",
    animation: "pulse 2s ease-in-out infinite",
    flexShrink: 0,
  },
  heroTitle: {
    fontSize: "clamp(48px, 8vw, 80px)", fontWeight: 800,
    lineHeight: 1.05, letterSpacing: "-2.5px",
    color: "#fff", margin: "0 0 24px",
  },
  heroTitleGrad: {
    background: "linear-gradient(135deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  heroSub: {
    fontSize: "clamp(15px, 2vw, 18px)", color: "rgba(255,255,255,.48)",
    fontWeight: 500, lineHeight: 1.75, maxWidth: 580,
    margin: "0 0 36px",
  },
  ctaRow: {
    display: "flex", gap: 14, justifyContent: "center",
    flexWrap: "wrap", marginBottom: 56,
  },
  primaryBtn: {
    background: "linear-gradient(135deg,#FF3CAC,#784BA0)",
    border: "none", padding: "14px 30px", borderRadius: 13,
    color: "#fff", fontFamily: "'Syne', sans-serif",
    fontWeight: 800, fontSize: 15, cursor: "pointer",
    transition: "all .18s",
    boxShadow: "0 4px 22px rgba(255,60,172,.38)",
  },
  secondaryBtn: {
    background: "rgba(255,255,255,.07)",
    border: "1px solid rgba(255,255,255,.15)",
    padding: "14px 30px", borderRadius: 13,
    color: "rgba(255,255,255,.8)",
    fontFamily: "'Syne', sans-serif", fontWeight: 700,
    fontSize: 15, cursor: "pointer", transition: "all .15s",
  },

  /* Stats */
  statsRow: {
    display: "flex", gap: 0, justifyContent: "center",
    borderRadius: 16,
    background: "rgba(255,255,255,.04)",
    border: "1px solid rgba(255,255,255,.08)",
    overflow: "hidden", marginBottom: 52,
    flexWrap: "wrap",
  },
  statItem: {
    display: "flex", flexDirection: "column", alignItems: "center",
    padding: "18px 36px", gap: 4,
    borderRight: "1px solid rgba(255,255,255,.07)",
  },
  statNum:   { fontSize: 22, fontWeight: 800, color: "#fff", lineHeight: 1 },
  statLabel: { fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,.35)", letterSpacing: ".04em", textTransform: "uppercase" },

  /* Float cards strip */
  floatCards: {
    display: "flex", flexDirection: "column", gap: 10,
    width: "100%", maxWidth: 420, alignSelf: "center",
  },

  /* About */
  aboutSection: {
    position: "relative", zIndex: 1,
    maxWidth: 720, margin: "0 auto",
    padding: "80px 24px",
    textAlign: "center",
  },
  aboutInner: { display: "flex", flexDirection: "column", alignItems: "center", gap: 20 },
  aboutText: {
    fontSize: 16, color: "rgba(255,255,255,.5)",
    lineHeight: 1.85, fontWeight: 500, margin: 0,
    maxWidth: 620,
  },

  /* Shared section header */
  sectionHead: {
    textAlign: "center", marginBottom: 52,
    display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
  },
  sectionBadge: {
    display: "inline-flex", padding: "5px 14px", borderRadius: 20,
    background: "rgba(255,255,255,.06)",
    border: "1px solid rgba(255,255,255,.1)",
    color: "rgba(255,255,255,.45)", fontSize: 11, fontWeight: 700,
    letterSpacing: ".08em", textTransform: "uppercase",
  },
  sectionTitle: {
    fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800,
    color: "#fff", margin: 0, lineHeight: 1.15, letterSpacing: "-1px",
  },
  gradText: {
    background: "linear-gradient(135deg, #FF3CAC, #784BA0, #2B86C5)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
  },

  /* Features */
  featSection: {
    position: "relative", zIndex: 1,
    maxWidth: 1100, margin: "0 auto", padding: "60px 24px 80px",
  },
  featGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: 20,
  },
  featCard: {
    background: "rgba(255,255,255,.04)",
    border: "1px solid rgba(255,255,255,.08)",
    borderRadius: 20, padding: "24px",
    backdropFilter: "blur(12px)",
    transition: "all .22s cubic-bezier(.22,1,.36,1)",
    cursor: "default",
  },
  featIcon: {
    width: 48, height: 48, borderRadius: 13, fontSize: 22,
    display: "flex", alignItems: "center", justifyContent: "center",
    marginBottom: 16, flexShrink: 0,
  },
  featTitle: { fontSize: 17, fontWeight: 800, color: "#fff", margin: "0 0 8px", letterSpacing: "-.3px" },
  featDesc:  { fontSize: 14, color: "rgba(255,255,255,.42)", fontWeight: 500, lineHeight: 1.65, margin: 0 },

  /* How it works */
  howSection: {
    position: "relative", zIndex: 1,
    maxWidth: 1000, margin: "0 auto", padding: "60px 24px 80px",
  },
  stepsRow: {
    display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
    gap: 24,
  },
  stepItem: { display: "flex", flexDirection: "column", alignItems: "center", gap: 0 },
  stepNumWrap: {
    display: "flex", alignItems: "center", width: "100%",
    marginBottom: 20, position: "relative",
  },
  stepNum: {
    width: 48, height: 48, borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 13, fontWeight: 800, color: "#fff",
    flexShrink: 0, letterSpacing: "-.5px",
    fontFamily: "'Syne', sans-serif",
  },
  stepLine: {
    flex: 1, height: 1,
    background: "linear-gradient(90deg, rgba(255,255,255,.15), rgba(255,255,255,.04))",
    marginLeft: 12,
  },
  stepContent: {
    background: "rgba(255,255,255,.04)",
    border: "1px solid rgba(255,255,255,.07)",
    borderRadius: 18, padding: "22px 20px",
    width: "100%", backdropFilter: "blur(12px)",
    display: "flex", flexDirection: "column", gap: 8,
  },
  stepIcon: { fontSize: 26, lineHeight: 1 },
  stepTitle: { fontSize: 16, fontWeight: 800, color: "#fff", margin: 0, letterSpacing: "-.3px" },
  stepDesc:  { fontSize: 13, color: "rgba(255,255,255,.42)", fontWeight: 500, lineHeight: 1.6, margin: 0 },

  /* Showcase */
  showcaseSection: {
    position: "relative", zIndex: 1,
    maxWidth: 1100, margin: "0 auto", padding: "60px 24px 80px",
  },
  showcaseGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: 14,
  },
  showcaseCard: {
    display: "flex", alignItems: "center", gap: 12,
    padding: "14px 16px", borderRadius: 14,
    background: "rgba(255,255,255,.04)",
    border: "1px solid", backdropFilter: "blur(10px)",
    transition: "all .2s cubic-bezier(.22,1,.36,1)",
    cursor: "default",
  },
  showcaseEmoji: {
    width: 40, height: 40, borderRadius: 11, fontSize: 19,
    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
  },
  showcaseName: { fontSize: 13, fontWeight: 700, color: "#fff", margin: 0, lineHeight: 1.2 },
  showcaseSub:  { fontSize: 11, color: "rgba(255,255,255,.35)", fontWeight: 500, margin: "3px 0 0" },
  showcaseDot:  { width: 7, height: 7, borderRadius: "50%", marginLeft: "auto", flexShrink: 0 },

  /* CTA Banner */
  ctaBanner: {
    position: "relative", zIndex: 1,
    padding: "40px 24px 80px",
  },
  ctaBannerGlow: {
    position: "absolute", top: "50%", left: "50%",
    transform: "translate(-50%,-50%)",
    width: 600, height: 300, borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255,60,172,.12) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  ctaBannerInner: {
    maxWidth: 620, margin: "0 auto",
  },
  ctaBannerCard: {
    background: "rgba(255,255,255,.04)",
    border: "1px solid rgba(255,255,255,.09)",
    borderRadius: 24, overflow: "hidden",
    backdropFilter: "blur(24px)",
    boxShadow: "0 32px 80px rgba(0,0,0,.5), 0 0 0 1px rgba(255,255,255,.04) inset",
  },
  ctaCardStrip: {
    height: 4,
    background: "linear-gradient(90deg, #FF3CAC, #784BA0, #2B86C5)",
    boxShadow: "0 0 24px rgba(255,60,172,.45)",
  },
  ctaCardBody: {
    padding: "36px 40px 32px",
    display: "flex", flexDirection: "column", alignItems: "center",
    textAlign: "center", gap: 14,
  },
  ctaTitle: {
    fontSize: "clamp(22px, 3.5vw, 30px)", fontWeight: 800,
    color: "#fff", margin: 0, letterSpacing: "-.6px",
  },
  ctaSub: {
    fontSize: 15, color: "rgba(255,255,255,.45)",
    fontWeight: 500, lineHeight: 1.7, margin: 0, maxWidth: 440,
  },
  ctaBtnRow: { display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 6 },
  cardPrimary: {
    padding: "13px 28px", borderRadius: 13, border: "none",
    background: "linear-gradient(135deg,#FF3CAC,#784BA0)",
    color: "#fff", fontFamily: "'Syne', sans-serif",
    fontWeight: 800, fontSize: 14, cursor: "pointer",
    transition: "all .18s",
    boxShadow: "0 4px 22px rgba(255,60,172,.38)",
  },
  cardSecondary: {
    padding: "13px 28px", borderRadius: 13,
    border: "1px solid rgba(255,255,255,.15)",
    background: "transparent",
    color: "rgba(255,255,255,.65)",
    fontFamily: "'Syne', sans-serif", fontWeight: 700,
    fontSize: 14, cursor: "pointer", transition: "all .15s",
  },

  /* Footer */
  footer: {
    position: "relative", zIndex: 1,
    borderTop: "1px solid rgba(255,255,255,.07)",
    padding: "28px 40px",
    display: "flex", alignItems: "center",
    justifyContent: "space-between", flexWrap: "wrap", gap: 12,
  },
  footerLogo: { display: "flex", alignItems: "center", gap: 8 },
  footerText: { fontSize: 12, color: "rgba(255,255,255,.25)", fontWeight: 500, margin: 0 },
};
