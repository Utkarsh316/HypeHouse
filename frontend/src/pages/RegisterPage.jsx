import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────────
   HypeHouse · Register Page
   Design: Mirror of LoginPage split layout —
   left brand panel with "what you get" perks,
   right glassmorphism register card.
   Syne font, gradient orbs, SVG icons,
   show/hide password, loading state.
   Zero logic changes from original.
───────────────────────────────────────────── */

export default function RegisterPage() {
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [focused,  setFocused]  = useState(null);
  const [loading,  setLoading]  = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        name,
        email,
        password,
      });
      alert("Registered successfully!");
      navigate("/events");
    } catch (error) {
      alert(error.response?.data?.message || "Error");
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
        {/* Ambient orbs */}
        <div style={S.orb1} aria-hidden />
        <div style={S.orb2} aria-hidden />
        <div style={S.orb3} aria-hidden />

        {/* ══════════════════════════
            LEFT — brand panel
        ══════════════════════════ */}
        <div style={S.left}>
          <div style={S.leftMesh} aria-hidden />

          <div style={S.leftInner}>
            {/* Logo */}
            <div style={S.logoRow}>
              <div style={S.logoIcon}>⚡</div>
              <span style={S.logoText}>HypeHouse</span>
            </div>

            {/* Hero copy */}
            <div style={S.heroCopy}>
              <h1 style={S.heroTitle}>Join the<br />community.</h1>
              <p style={S.heroSub}>
                Create your free account and start discovering events, hosting your own, and connecting with people who share your interests.
              </p>
            </div>

            {/* Perks list */}
            <div style={S.perks}>
              {PERKS.map((p, i) => (
                <PerkRow key={i} {...p} delay={`${0.1 + i * 0.1}s`} />
              ))}
            </div>

            {/* Bottom tagline */}
            <p style={S.tagline}>Free forever. No credit card needed.</p>
          </div>
        </div>

        {/* ══════════════════════════
            RIGHT — register card
        ══════════════════════════ */}
        <div style={S.right}>
          <div style={S.card}>
            {/* Card top strip */}
            <div style={S.cardStrip} />

            <div style={S.cardBody}>
              {/* Header */}
              <div style={S.cardHeader}>
                <div style={S.cardIconWrap}>
                  <IcUserPlus />
                </div>
                <div>
                  <h2 style={S.cardTitle}>Create account</h2>
                  <p style={S.cardSub}>Start your HypeHouse journey today.</p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={registerUser} style={S.form} noValidate>

                {/* Name */}
                <div style={S.fieldGroup}>
                  <label style={S.label}><IcUser /> Name</label>
                  <div style={focused === "name" ? { ...S.inputWrap, ...S.inputWrapFocused } : S.inputWrap}>
                    <input
                      type="text"
                      style={S.input}
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      required
                      autoComplete="name"
                    />
                  </div>
                </div>

                {/* Email */}
                <div style={S.fieldGroup}>
                  <label style={S.label}><IcMail /> Email</label>
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
                  <label style={S.label}><IcLock /> Password</label>
                  <div style={focused === "password" ? { ...S.inputWrap, ...S.inputWrapFocused } : S.inputWrap}>
                    <input
                      type={showPass ? "text" : "password"}
                      style={{ ...S.input, paddingRight: 44 }}
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocused("password")}
                      onBlur={() => setFocused(null)}
                      required
                      autoComplete="new-password"
                    />
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

                  {/* Password strength hint */}
                  {password.length > 0 && (
                    <div style={S.strengthRow}>
                      {[1, 2, 3, 4].map((n) => (
                        <div
                          key={n}
                          style={{
                            ...S.strengthBar,
                            background: strengthColor(password, n),
                          }}
                        />
                      ))}
                      <span style={{ ...S.strengthLabel, color: strengthColor(password, 1) }}>
                        {strengthText(password)}
                      </span>
                    </div>
                  )}
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
                  {loading ? <><Spinner /> Creating account…</> : <>Create account <IcArrow /></>}
                </button>
              </form>

              {/* Divider */}
              <div style={S.divider}>
                <div style={S.dividerLine} />
                <span style={S.dividerText}>Have an account?</span>
                <div style={S.dividerLine} />
              </div>

              {/* Login link */}
              <button
                style={S.loginBtn}
                onClick={() => navigate("/")}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,60,172,.55)"; e.currentTarget.style.color = "#FF3CAC"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,.1)"; e.currentTarget.style.color = "rgba(255,255,255,.55)"; }}
              >
                Log in instead
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp   { from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);} }
        @keyframes fadeLeft { from{opacity:0;transform:translateX(-16px);}to{opacity:1;transform:translateX(0);} }
        @keyframes cardIn   { from{opacity:0;transform:translateY(26px) scale(.97);}to{opacity:1;transform:translateY(0) scale(1);} }
        @keyframes spin     { to{transform:rotate(360deg);} }
        @keyframes perkIn   { from{opacity:0;transform:translateX(-12px);}to{opacity:1;transform:translateX(0);} }
        @media(max-width:768px){
          .hh-reg-left  { display: none !important; }
          .hh-reg-right { width: 100% !important; min-height: 100vh; padding: 24px 16px !important; }
        }
      `}</style>
    </>
  );
}

/* ── Password strength helpers ── */
function strengthScore(pw) {
  let s = 0;
  if (pw.length >= 8)            s++;
  if (/[A-Z]/.test(pw))          s++;
  if (/[0-9]/.test(pw))          s++;
  if (/[^A-Za-z0-9]/.test(pw))  s++;
  return s;
}
function strengthColor(pw, bar) {
  const s = strengthScore(pw);
  if (s < bar) return "rgba(255,255,255,.1)";
  if (s <= 1)  return "#FC466B";
  if (s === 2) return "#F7971E";
  if (s === 3) return "#2B86C5";
  return "#38EF7D";
}
function strengthText(pw) {
  const s = strengthScore(pw);
  return ["", "Weak", "Fair", "Good", "Strong"][s] || "";
}

/* ── Perk row component ── */
function PerkRow({ icon, text, delay }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: "11px 14px", borderRadius: 12,
      background: "rgba(255,255,255,.05)",
      border: "1px solid rgba(255,255,255,.08)",
      animation: `perkIn .5s ${delay} cubic-bezier(.22,1,.36,1) both`,
    }}>
      <span style={{
        fontSize: 18, width: 32, height: 32, borderRadius: 9,
        background: "rgba(255,60,172,.12)", border: "1px solid rgba(255,60,172,.22)",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>{icon}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,.65)", lineHeight: 1.4 }}>{text}</span>
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
const IcUserPlus = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <line x1="19" y1="8" x2="19" y2="14"/>
    <line x1="16" y1="11" x2="22" y2="11"/>
  </svg>
);
const IcUser = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
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
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

/* ── Perks data ── */
const PERKS = [
  { icon: "🔍", text: "Browse and join events across every category" },
  { icon: "🚀", text: "Host your own events — free or paid, any size" },
  { icon: "👥", text: "Connect with people who share your interests" },
  { icon: "📍", text: "See exactly where every event is happening" },
];

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

  orb1: {
    position: "fixed", top: "-80px", right: "-80px",
    width: 360, height: 360, borderRadius: "50%",
    background: "radial-gradient(circle, rgba(43,134,197,.15) 0%, transparent 70%)",
    pointerEvents: "none", zIndex: 0,
  },
  orb2: {
    position: "fixed", bottom: "-60px", left: "-60px",
    width: 300, height: 300, borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255,60,172,.12) 0%, transparent 70%)",
    pointerEvents: "none", zIndex: 0,
  },
  orb3: {
    position: "fixed", top: "50%", left: "50%",
    transform: "translate(-50%,-50%)",
    width: 500, height: 500, borderRadius: "50%",
    background: "radial-gradient(circle, rgba(56,239,125,.05) 0%, transparent 65%)",
    pointerEvents: "none", zIndex: 0,
  },

  /* ── Left panel ── */
  left: {
    flex: 1,
    position: "relative",
    background:
      "linear-gradient(135deg, rgba(43,134,197,.1) 0%, rgba(120,75,160,.15) 40%, rgba(255,60,172,.08) 100%)",
    borderRight: "1px solid rgba(255,255,255,.07)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    overflow: "hidden",
  },
  leftMesh: {
    position: "absolute", inset: 0,
    backgroundImage: "radial-gradient(rgba(255,255,255,.04) 1px, transparent 1px)",
    backgroundSize: "28px 28px",
    pointerEvents: "none",
  },
  leftInner: {
    position: "relative", zIndex: 1,
    padding: "48px 52px",
    display: "flex", flexDirection: "column",
    gap: 36, maxWidth: 440,
    animation: "fadeLeft .6s cubic-bezier(.22,1,.36,1) both",
  },

  logoRow: { display: "flex", alignItems: "center", gap: 12 },
  logoIcon: {
    width: 42, height: 42, borderRadius: 13,
    background: "linear-gradient(135deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 20, boxShadow: "0 0 22px rgba(255,60,172,.5)", flexShrink: 0,
  },
  logoText: {
    fontSize: 22, fontWeight: 800, letterSpacing: "-.5px",
    background: "linear-gradient(90deg, #FF3CAC, #784BA0, #2B86C5)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },

  heroCopy: { display: "flex", flexDirection: "column", gap: 14 },
  heroTitle: {
    fontSize: "clamp(34px, 4vw, 50px)", fontWeight: 800,
    color: "#fff", margin: 0, lineHeight: 1.1, letterSpacing: "-1.5px",
    background: "linear-gradient(135deg, #fff 40%, rgba(255,255,255,.5))",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  heroSub: {
    fontSize: 15, color: "rgba(255,255,255,.42)",
    fontWeight: 500, lineHeight: 1.7, margin: 0, maxWidth: 360,
  },

  perks: { display: "flex", flexDirection: "column", gap: 10 },

  tagline: {
    fontSize: 12, fontWeight: 700,
    color: "rgba(255,255,255,.25)",
    letterSpacing: ".04em", margin: 0,
    textTransform: "uppercase",
  },

  /* ── Right panel ── */
  right: {
    width: 500,
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
    background: "linear-gradient(90deg, #2B86C5, #784BA0, #FF3CAC)",
    boxShadow: "0 0 24px rgba(43,134,197,.45)",
  },
  cardBody: { padding: "32px 32px 28px" },

  cardHeader: {
    display: "flex", alignItems: "center", gap: 16, marginBottom: 28,
  },
  cardIconWrap: {
    width: 50, height: 50, borderRadius: 14, flexShrink: 0,
    background: "linear-gradient(135deg, rgba(43,134,197,.25), rgba(120,75,160,.25))",
    border: "1px solid rgba(43,134,197,.35)",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#2B86C5", boxShadow: "0 0 22px rgba(43,134,197,.2)",
  },
  cardTitle: {
    fontSize: 22, fontWeight: 800, color: "#fff",
    margin: "0 0 4px", letterSpacing: "-.4px",
  },
  cardSub: {
    fontSize: 13, color: "rgba(255,255,255,.38)", fontWeight: 500, margin: 0,
  },

  form: { display: "flex", flexDirection: "column", gap: 16 },

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
    position: "relative", overflow: "hidden",
  },
  inputWrapFocused: {
    borderColor: "rgba(43,134,197,.6)",
    boxShadow: "0 0 0 3px rgba(43,134,197,.12)",
    background: "rgba(43,134,197,.04)",
  },
  input: {
    width: "100%", padding: "13px 16px",
    background: "transparent", border: "none", outline: "none",
    color: "#fff", fontSize: 15, fontWeight: 500,
    fontFamily: "'Syne', sans-serif",
    caretColor: "#2B86C5", boxSizing: "border-box",
  },
  eyeBtn: {
    position: "absolute", right: 12, top: "50%",
    transform: "translateY(-50%)",
    background: "none", border: "none",
    color: "rgba(255,255,255,.35)", cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: 4, borderRadius: 6, transition: "color .15s",
  },

  /* Password strength */
  strengthRow: {
    display: "flex", alignItems: "center", gap: 5, marginTop: 8,
  },
  strengthBar: {
    flex: 1, height: 3, borderRadius: 10,
    transition: "background .25s ease",
  },
  strengthLabel: {
    fontSize: 11, fontWeight: 700,
    letterSpacing: ".04em", marginLeft: 4,
    transition: "color .25s",
    minWidth: 40,
  },

  submitBtn: {
    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
    padding: "14px 24px", borderRadius: 13, border: "none",
    background: "linear-gradient(135deg, #2B86C5 0%, #784BA0 100%)",
    color: "#fff", fontSize: 15, fontWeight: 800,
    fontFamily: "'Syne', sans-serif",
    cursor: "pointer", transition: "all .18s ease",
    boxShadow: "0 4px 22px rgba(43,134,197,.38)",
    width: "100%", marginTop: 4,
  },

  divider: {
    display: "flex", alignItems: "center", gap: 12,
    margin: "22px 0 16px",
  },
  dividerLine:  { flex: 1, height: 1, background: "rgba(255,255,255,.08)" },
  dividerText: {
    fontSize: 12, fontWeight: 700, letterSpacing: ".04em",
    color: "rgba(255,255,255,.25)", whiteSpace: "nowrap",
    textTransform: "uppercase",
  },

  loginBtn: {
    width: "100%", padding: "12px 24px", borderRadius: 13,
    border: "1px solid rgba(255,255,255,.1)",
    background: "transparent",
    color: "rgba(255,255,255,.55)",
    fontSize: 14, fontWeight: 700,
    fontFamily: "'Syne', sans-serif",
    cursor: "pointer", transition: "all .18s ease",
  },
};
