import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function IntroPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/events");
  }, []);

  return (
    <div style={S.page}>
      <div style={S.orb1}></div>
      <div style={S.orb2}></div>

      {/* NAV */}
      <div style={S.nav}>
        <div style={S.logo} onClick={() => navigate("/")}>
          <div style={S.logoIcon}>⚡</div>
          <span style={S.logoText}>HypeHouse</span>
        </div>

        <div style={S.navBtns}>
          <button style={S.navLogin} onClick={() => navigate("/login")}>
            Login
          </button>
          <button style={S.navSignup} onClick={() => navigate("/register")}>
            Get Started
          </button>
        </div>
      </div>

      {/* HERO */}
      <motion.div
        style={S.hero}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 style={S.title}>
          Every vibe.<br />
          <span style={S.gradient}>One place.</span>
        </h1>

        <p style={S.subtitle}>
          HypeHouse brings together concerts, meetups, workshops, jam sessions,
          and social hangouts — all in one platform. Discover events, host your
          own, and connect with people who share your vibe.
        </p>

        <div style={S.ctaRow}>
          <button style={S.primaryBtn} onClick={() => navigate("/events")}>
            Explore events →
          </button>

          <button style={S.secondaryBtn} onClick={() => navigate("/login")}>
            Login
          </button>
        </div>

        <div style={S.cards}>
          <FloatCard title="Weekend Jam Session" color="#FF3CAC" />
          <FloatCard title="Indie Dev Meetup" color="#2B86C5" />
          <FloatCard title="Sketch & Chill Evening" color="#38EF7D" />
        </div>
      </motion.div>

      {/* ABOUT */}
      <section style={S.section}>
        <h2 style={S.sectionTitle}>
          Built for people who <span style={S.gradient}>actually show up.</span>
        </h2>

        <p style={S.sectionText}>
          Whether you're hosting a small jam session or a large meetup,
          HypeHouse helps you create, discover, and connect effortlessly.
        </p>
      </section>

      {/* FEATURES */}
      <section style={S.features}>
        <Feature title="Discover Events" desc="Browse events happening near you." />
        <Feature title="Host Anything" desc="Create events in seconds." />
        <Feature title="Join Community" desc="Meet people with same vibe." />
      </section>

      {/* CTA */}
      <div style={S.ctaBox}>
        <h2 style={S.ctaTitle}>Ready to find your vibe?</h2>
        <p style={S.ctaText}>
          Join HypeHouse and start exploring events today.
        </p>

        <div style={S.ctaRow}>
          <button style={S.primaryBtn} onClick={() => navigate("/login")}>
            Let me in →
          </button>
          <button style={S.secondaryBtn} onClick={() => navigate("/register")}>
            Create account
          </button>
        </div>
      </div>
    </div>
  );
}

/* Components */
function FloatCard({ title, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      style={{
        ...S.card,
        border: `1px solid ${color}33`,
        boxShadow: `0 0 20px ${color}22`,
      }}
    >
      <span>{title}</span>
      <div style={{ ...S.dot, background: color }} />
    </motion.div>
  );
}

function Feature({ title, desc }) {
  return (
    <div style={S.featureCard}>
      <h3 style={S.featureTitle}>{title}</h3>
      <p style={S.featureText}>{desc}</p>
    </div>
  );
}

/* STYLES */
const S = {
  page: {
    minHeight: "100vh",
    background: "#070211",
    color: "white",
    fontFamily: "Syne, sans-serif",
  },

  orb1: {
    position: "fixed",
    top: "-100px",
    left: "-100px",
    width: 350,
    height: 350,
    background: "rgba(255,60,172,0.2)",
    filter: "blur(120px)",
  },

  orb2: {
    position: "fixed",
    bottom: "-100px",
    right: "-100px",
    width: 350,
    height: 350,
    background: "rgba(43,134,197,0.2)",
    filter: "blur(120px)",
  },

  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 40px",
  },

  logo: { display: "flex", gap: 10, cursor: "pointer" },

  logoIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    background: "linear-gradient(135deg,#FF3CAC,#784BA0,#2B86C5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  logoText: {
    fontWeight: 800,
    background: "linear-gradient(90deg,#FF3CAC,#784BA0,#2B86C5)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  navBtns: { display: "flex", gap: 10 },

  navLogin: {
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "white",
    padding: "8px 16px",
    borderRadius: 10,
  },

  navSignup: {
    background: "linear-gradient(135deg,#FF3CAC,#784BA0)",
    border: "none",
    padding: "8px 16px",
    borderRadius: 10,
    color: "white",
  },

  hero: {
    maxWidth: 900,
    margin: "80px auto",
    textAlign: "center",
    padding: "0 20px",
  },

  title: {
    fontSize: 60,
    fontWeight: 800,
  },

  gradient: {
    background: "linear-gradient(135deg,#FF3CAC,#784BA0,#2B86C5)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  subtitle: {
    marginTop: 20,
    color: "rgba(255,255,255,0.6)",
  },

  ctaRow: {
    marginTop: 30,
    display: "flex",
    justifyContent: "center",
    gap: 15,
  },

  primaryBtn: {
    background: "linear-gradient(135deg,#FF3CAC,#784BA0)",
    border: "none",
    padding: "12px 24px",
    borderRadius: 12,
    color: "white",
    cursor: "pointer",
  },

  secondaryBtn: {
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.2)",
    padding: "12px 24px",
    borderRadius: 12,
    color: "white",
  },

  cards: {
    marginTop: 40,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  card: {
    display: "flex",
    justifyContent: "space-between",
    padding: 14,
    borderRadius: 12,
    background: "rgba(255,255,255,0.05)",
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
  },

  section: {
    textAlign: "center",
    padding: "60px 20px",
  },

  sectionTitle: { fontSize: 32, fontWeight: 800 },

  sectionText: {
    marginTop: 10,
    color: "rgba(255,255,255,0.6)",
  },

  features: {
    display: "flex",
    justifyContent: "center",
    gap: 20,
    padding: 40,
    flexWrap: "wrap",
  },

  featureCard: {
    width: 250,
    padding: 20,
    borderRadius: 16,
    background: "rgba(255,255,255,0.05)",
  },

  featureTitle: { fontWeight: 700 },

  featureText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
  },

  ctaBox: {
    textAlign: "center",
    padding: "60px 20px",
  },

  ctaTitle: { fontSize: 28, fontWeight: 800 },

  ctaText: {
    marginTop: 10,
    color: "rgba(255,255,255,0.6)",
  },
};