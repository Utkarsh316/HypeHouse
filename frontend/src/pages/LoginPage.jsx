import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
/* ─────────────────────────────────────────────
   HypeHouse · Login Page
   Design: Full-screen split — left animated
   brand panel, right floating glass card.
   Syne font, gradient orbs, SVG icons,
   smooth focus states. Zero logic changes.
───────────────────────────────────────────── */

export default function LoginPage() {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [focused,  setFocused]  = useState(null);
  const [loading,  setLoading]  = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        { email, password }
      );
      localStorage.setItem("token",  res.data.token);
      localStorage.setItem("userId", res.data.user.id);
      toast.success("Welcome back 👋");
        setTimeout(() => {
          navigate("/events");
        }, 800);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;700;800&display=swap"
        rel="stylesheet"
      />

      <div style={S.page}>
        {/* ── Global ambient orbs ── */}
        <div style={S.orb1} aria-hidden />
        <div style={S.orb2} aria-hidden />
        <div style={S.orb3} aria-hidden />

        {/* ══════════════════════════
            LEFT — brand panel
        ══════════════════════════ */}
        <div style={S.left}>
          {/* Noise mesh overlay */}
          <div style={S.leftMesh} aria-hidden />

          <div style={S.leftInner}>
            {/* Logo */}
            <div style={S.logoRow}>
              <div style={S.logoIcon}>⚡</div>
              <span style={S.logoText}>HypeHouse</span>
            </div>

            {/* Hero copy */}
            <div style={S.heroCopy}>
              <h1 style={S.heroTitle}>Every vibe.<br />One place.</h1>
              <p style={S.heroSub}>
                Concerts, jam sessions, meetups, workshops — find your people and show up.
              </p>
            </div>

            {/* Floating event cards (decorative) */}
            <div style={S.floatCards}>
              <FloatCard delay="0s"   emoji="🎸" title="Weekend Jam Session"    meta="Sat · 24 going"   color="#FF3CAC" />
              <FloatCard delay=".18s" emoji="💻" title="Indie Dev Meetup"       meta="Wed · 61 going"   color="#2B86C5" />
              <FloatCard delay=".32s" emoji="🎨" title="Sketch & Chill Evening" meta="Sun · 18 going"   color="#38EF7D" />
            </div>
          </div>
        </div>

        {/* ══════════════════════════
            RIGHT — login card
        ══════════════════════════ */}
        <div style={S.right}>
          <div style={S.card}>

            {/* Card top strip */}
            <div style={S.cardStrip} />

            <div style={S.cardBody}>
              {/* Header */}
              <div style={S.cardHeader}>
                <div style={S.cardIconWrap}>
                  <IcFlash />
                </div>
                <div>
                  <h2 style={S.cardTitle}>Welcome back</h2>
                  <p style={S.cardSub}>Log in to discover and join events near you.</p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={loginUser} style={S.form} noValidate>

                {/* Email */}
                <div style={S.fieldGroup}>
                  <label style={S.label}>
                    <IcMail /> Email
                  </label>
                  <div style={focused === "email" ? { ...S.inputWrap, ...S.inputWrapFocused } : S.inputWrap}>
                    <input
                      type="email"
                      style={S.input}
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>

                {/* Password */}
                <div style={S.fieldGroup}>
                  <label style={S.label}>
                    <IcLock /> Password
                  </label>
                  <div style={focused === "password" ? { ...S.inputWrap, ...S.inputWrapFocused } : S.inputWrap}>
                    <input
                      type={showPass ? "text" : "password"}
                      style={{ ...S.input, paddingRight: 44 }}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocused("password")}
                      onBlur={() => setFocused(null)}
                      required
                      autoComplete="current-password"
                    />
                    {/* Show/hide toggle */}
                    <button
                      type="button"
                      style={S.eyeBtn}
                      onClick={() => setShowPass((v) => !v)}
                      tabIndex={-1}
                      aria-label={showPass ? "Hide password" : "Show password"}
                    >
                      {showPass ? <IcEyeOff /> : <IcEye />}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  style={loading ? { ...S.submitBtn, opacity: 0.72, cursor: "not-allowed" } : S.submitBtn}
                  disabled={loading}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.currentTarget.style.boxShadow = "0 8px 32px rgba(255,60,172,.6)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 4px 22px rgba(255,60,172,.38)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {loading ? (
                    <><Spinner /> Logging in…</>
                  ) : (
                    <>Let me in <IcArrow /></>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div style={S.divider}>
                <div style={S.dividerLine} />
                <span style={S.dividerText}>New here?</span>
                <div style={S.dividerLine} />
              </div>

              {/* Register link */}
              <button
                style={S.registerBtn}
                onClick={() => navigate("/register")}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,60,172,.55)"; e.currentTarget.style.color = "#FF3CAC"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,.1)"; e.currentTarget.style.color = "rgba(255,255,255,.55)"; }}
              >
                Create an account
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp   { from{opacity:0;transform:translateY(22px);}to{opacity:1;transform:translateY(0);} }
        @keyframes fadeLeft { from{opacity:0;transform:translateX(-18px);}to{opacity:1;transform:translateX(0);} }
        @keyframes float    { 0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);} }
        @keyframes spin     { to{transform:rotate(360deg);} }
        @keyframes cardIn   { from{opacity:0;transform:translateY(28px) scale(.97);}to{opacity:1;transform:translateY(0) scale(1);} }

        /* Mobile: stack vertically */
        @media(max-width:768px){
          .hh-login-page  { flex-direction: column !important; }
          .hh-login-left  { display: none !important; }
          .hh-login-right { width: 100% !important; min-height: 100vh; padding: 24px 16px !important; }
        }
      `}</style>
    </>
  );
}

/* ── Decorative floating event card ── */
function FloatCard({ delay, emoji, title, meta, color }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: "12px 16px", borderRadius: 14,
      background: "rgba(255,255,255,.06)",
      border: `1px solid ${color}33`,
      backdropFilter: "blur(10px)",
      animation: `fadeLeft .5s ${delay} cubic-bezier(.22,1,.36,1) both`,
      boxShadow: `0 4px 20px rgba(0,0,0,.3), 0 0 0 1px ${color}22 inset`,
    }}>
      <div style={{
        width: 38, height: 38, borderRadius: 10, flexShrink: 0,
        background: `linear-gradient(135deg, ${color}33, ${color}11)`,
        border: `1px solid ${color}44`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 18,
        boxShadow: `0 0 14px ${color}44`,
      }}>
        {emoji}
      </div>
      <div>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", margin: 0, lineHeight: 1.2 }}>{title}</p>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,.4)", fontWeight: 600, margin: "3px 0 0" }}>{meta}</p>
      </div>
      <div style={{
        marginLeft: "auto", width: 8, height: 8, borderRadius: "50%",
        background: color, boxShadow: `0 0 8px ${color}`,
        flexShrink: 0,
      }} />
    </div>
  );
}

/* ── Spinner ── */
function Spinner() {
  return (
    <span style={{
      display: "inline-block", width: 15, height: 15,
      border: "2px solid rgba(255,255,255,.3)",
      borderTopColor: "#fff", borderRadius: "50%",
      animation: "spin .7s linear infinite",
      marginRight: 8, verticalAlign: "middle",
    }} />
  );
}

/* ── SVG Icons ── */
const IcFlash = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);
const IcMail = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const IcLock = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const IcEye = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);
const IcEyeOff = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);
const IcArrow = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

/* ── Styles ── */
const S = {
  page: {
    display: "flex",
    minHeight: "100vh",
    background: "#070211",
    fontFamily: "'Syne', sans-serif",
    position: "relative",
    overflow: "hidden",
  },

  /* Ambient orbs behind everything */
  orb1: {
    position: "fixed", top: "-80px", left: "-80px",
    width: 360, height: 360, borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255,60,172,.14) 0%, transparent 70%)",
    pointerEvents: "none", zIndex: 0,
  },
  orb2: {
    position: "fixed", bottom: "-60px", right: "-60px",
    width: 300, height: 300, borderRadius: "50%",
    background: "radial-gradient(circle, rgba(43,134,197,.12) 0%, transparent 70%)",
    pointerEvents: "none", zIndex: 0,
  },
  orb3: {
    position: "fixed", top: "50%", left: "50%",
    transform: "translate(-50%,-50%)",
    width: 500, height: 500, borderRadius: "50%",
    background: "radial-gradient(circle, rgba(120,75,160,.07) 0%, transparent 65%)",
    pointerEvents: "none", zIndex: 0,
  },

  /* ── Left panel ── */
  left: {
    flex: 1,
    position: "relative",
    background:
      "linear-gradient(135deg, rgba(255,60,172,.12) 0%, rgba(120,75,160,.18) 40%, rgba(43,134,197,.1) 100%)",
    borderRight: "1px solid rgba(255,255,255,.07)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    overflow: "hidden",
  },
  leftMesh: {
    position: "absolute", inset: 0,
    backgroundImage:
      "radial-gradient(rgba(255,255,255,.04) 1px, transparent 1px)",
    backgroundSize: "28px 28px",
    pointerEvents: "none",
  },
  leftInner: {
    position: "relative", zIndex: 1,
    padding: "48px 52px",
    display: "flex", flexDirection: "column",
    gap: 48, maxWidth: 440,
    animation: "fadeLeft .6s cubic-bezier(.22,1,.36,1) both",
  },

  logoRow: {
    display: "flex", alignItems: "center", gap: 12,
  },
  logoIcon: {
    width: 42, height: 42, borderRadius: 13,
    background: "linear-gradient(135deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 20, boxShadow: "0 0 22px rgba(255,60,172,.5)",
    flexShrink: 0,
  },
  logoText: {
    fontSize: 22, fontWeight: 800, letterSpacing: "-.5px",
    background: "linear-gradient(90deg, #FF3CAC, #784BA0, #2B86C5)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },

  heroCopy: { display: "flex", flexDirection: "column", gap: 14 },
  heroTitle: {
    fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 800,
    color: "#fff", margin: 0, lineHeight: 1.1,
    letterSpacing: "-1.5px",
    background: "linear-gradient(135deg, #fff 40%, rgba(255,255,255,.5))",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  heroSub: {
    fontSize: 16, color: "rgba(255,255,255,.42)",
    fontWeight: 500, lineHeight: 1.65, margin: 0, maxWidth: 340,
  },

  floatCards: { display: "flex", flexDirection: "column", gap: 10 },

  /* ── Right panel ── */
  right: {
    width: 480,
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "32px 40px",
    zIndex: 1,
    position: "relative",
  },

  card: {
    width: "100%",
    background: "rgba(255,255,255,.04)",
    border: "1px solid rgba(255,255,255,.09)",
    borderRadius: 24,
    overflow: "hidden",
    backdropFilter: "blur(28px)",
    WebkitBackdropFilter: "blur(28px)",
    boxShadow:
      "0 0 0 1px rgba(255,255,255,.04) inset," +
      "0 32px 80px rgba(0,0,0,.55)",
    animation: "cardIn .55s cubic-bezier(.22,1,.36,1) both",
  },
  cardStrip: {
    height: 4,
    background: "linear-gradient(90deg, #FF3CAC, #784BA0, #2B86C5)",
    boxShadow: "0 0 24px rgba(255,60,172,.45)",
  },
  cardBody: { padding: "32px 32px 28px" },

  cardHeader: {
    display: "flex", alignItems: "center", gap: 16,
    marginBottom: 28,
  },
  cardIconWrap: {
    width: 50, height: 50, borderRadius: 14, flexShrink: 0,
    background: "linear-gradient(135deg, rgba(255,60,172,.25), rgba(120,75,160,.25))",
    border: "1px solid rgba(255,60,172,.3)",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#FF3CAC", fontSize: 20,
    boxShadow: "0 0 22px rgba(255,60,172,.2)",
  },
  cardTitle: {
    fontSize: 22, fontWeight: 800, color: "#fff",
    margin: "0 0 4px", letterSpacing: "-.4px",
  },
  cardSub: {
    fontSize: 13, color: "rgba(255,255,255,.38)",
    fontWeight: 500, margin: 0,
  },

  form: { display: "flex", flexDirection: "column", gap: 18 },

  fieldGroup: { display: "flex", flexDirection: "column", gap: 8 },
  label: {
    display: "flex", alignItems: "center", gap: 7,
    fontSize: 12, fontWeight: 700, letterSpacing: ".04em",
    color: "rgba(255,255,255,.5)", textTransform: "uppercase",
  },
  inputWrap: {
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,.1)",
    background: "rgba(255,255,255,.04)",
    transition: "border-color .18s, box-shadow .18s",
    position: "relative",
    overflow: "hidden",
  },
  inputWrapFocused: {
    borderColor: "rgba(255,60,172,.55)",
    boxShadow: "0 0 0 3px rgba(255,60,172,.1)",
    background: "rgba(255,60,172,.04)",
  },
  input: {
    width: "100%", padding: "13px 16px",
    background: "transparent", border: "none", outline: "none",
    color: "#fff", fontSize: 15, fontWeight: 500,
    fontFamily: "'Syne', sans-serif",
    caretColor: "#FF3CAC",
    boxSizing: "border-box",
  },
  eyeBtn: {
    position: "absolute", right: 12, top: "50%",
    transform: "translateY(-50%)",
    background: "none", border: "none",
    color: "rgba(255,255,255,.35)", cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: 4, borderRadius: 6,
    transition: "color .15s",
  },

  submitBtn: {
    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
    padding: "14px 24px", borderRadius: 13, border: "none",
    background: "linear-gradient(135deg, #FF3CAC 0%, #784BA0 100%)",
    color: "#fff", fontSize: 15, fontWeight: 800,
    fontFamily: "'Syne', sans-serif",
    cursor: "pointer", transition: "all .18s ease",
    boxShadow: "0 4px 22px rgba(255,60,172,.38)",
    width: "100%", marginTop: 4,
  },

  divider: {
    display: "flex", alignItems: "center", gap: 12,
    margin: "24px 0 18px",
  },
  dividerLine: {
    flex: 1, height: 1,
    background: "rgba(255,255,255,.08)",
  },
  dividerText: {
    fontSize: 12, fontWeight: 700, letterSpacing: ".04em",
    color: "rgba(255,255,255,.25)", whiteSpace: "nowrap",
    textTransform: "uppercase",
  },

  registerBtn: {
    width: "100%", padding: "12px 24px", borderRadius: 13,
    border: "1px solid rgba(255,255,255,.1)",
    background: "transparent",
    color: "rgba(255,255,255,.55)",
    fontSize: 14, fontWeight: 700,
    fontFamily: "'Syne', sans-serif",
    cursor: "pointer", transition: "all .18s ease",
    letterSpacing: ".01em",
  },
};
