import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Inline styles as a style object — no Tailwind/Bootstrap dependency needed.
// Drop-in replacement for the old Navbar.jsx.

const styles = {
  // ---------- nav shell ----------
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    width: "100%",
    background: "rgba(8, 4, 18, 0.72)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
    fontFamily: "'Syne', 'Clash Display', sans-serif",
  },
  inner: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 24px",
    height: "64px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
  },

  // ---------- logo ----------
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    textDecoration: "none",
    border: "none",
    background: "none",
    padding: 0,
    flexShrink: 0,
  },
  logoIcon: {
    width: "34px",
    height: "34px",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    boxShadow: "0 0 18px rgba(255,60,172,0.45)",
    flexShrink: 0,
  },
  logoText: {
    fontSize: "20px",
    fontWeight: 800,
    letterSpacing: "-0.5px",
    background: "linear-gradient(90deg, #FF3CAC, #784BA0, #2B86C5)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    lineHeight: 1,
  },

  // ---------- nav links ----------
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    flex: 1,
    justifyContent: "center",
  },
  navBtn: (active) => ({
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 14px",
    borderRadius: "10px",
    border: "none",
    background: active ? "rgba(255,255,255,0.1)" : "transparent",
    color: active ? "#fff" : "rgba(255,255,255,0.55)",
    fontSize: "14px",
    fontWeight: active ? 700 : 500,
    fontFamily: "inherit",
    cursor: "pointer",
    transition: "all 0.18s ease",
    letterSpacing: "0.01em",
    whiteSpace: "nowrap",
  }),

  // ---------- right side ----------
  right: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexShrink: 0,
  },
  createBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "9px 18px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #FF3CAC 0%, #784BA0 100%)",
    color: "#fff",
    fontSize: "14px",
    fontWeight: 700,
    fontFamily: "inherit",
    cursor: "pointer",
    transition: "all 0.18s ease",
    boxShadow: "0 4px 20px rgba(255,60,172,0.35)",
    whiteSpace: "nowrap",
  },
  logoutBtn: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    padding: "8px 14px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "transparent",
    color: "rgba(255,255,255,0.45)",
    fontSize: "13px",
    fontWeight: 600,
    fontFamily: "inherit",
    cursor: "pointer",
    transition: "all 0.18s ease",
    letterSpacing: "0.01em",
  },

  // ---------- mobile hamburger ----------
  hamburger: {
    display: "none",
    flexDirection: "column",
    gap: "5px",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px",
  },
  bar: (open, i) => ({
    width: "22px",
    height: "2px",
    borderRadius: "2px",
    background: "#fff",
    transition: "all 0.22s ease",
    transform:
      open && i === 0
        ? "rotate(45deg) translate(5px, 5px)"
        : open && i === 2
        ? "rotate(-45deg) translate(5px, -5px)"
        : open && i === 1
        ? "scaleX(0)"
        : "none",
  }),

  // ---------- mobile drawer ----------
  drawer: (open) => ({
    overflow: "hidden",
    maxHeight: open ? "320px" : "0",
    transition: "max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    borderTop: open ? "1px solid rgba(255,255,255,0.07)" : "none",
    background: "rgba(8, 4, 18, 0.92)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
  }),
  drawerInner: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    padding: "12px 16px 16px",
  },
  drawerBtn: (active) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 14px",
    borderRadius: "12px",
    border: "none",
    background: active ? "rgba(255,255,255,0.08)" : "transparent",
    color: active ? "#fff" : "rgba(255,255,255,0.6)",
    fontSize: "15px",
    fontWeight: active ? 700 : 500,
    fontFamily: "inherit",
    cursor: "pointer",
    textAlign: "left",
    transition: "background 0.15s",
  }),
  drawerLogout: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid rgba(255, 60, 172, 0.25)",
    background: "rgba(255,60,172,0.06)",
    color: "#FF3CAC",
    fontSize: "15px",
    fontWeight: 700,
    fontFamily: "inherit",
    cursor: "pointer",
    marginTop: "4px",
    transition: "background 0.15s",
  },
};

// Tiny SVG icons (no external dependency)
const IconFlash = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const IconCalendar = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="3" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const IconStar = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const IconPlus = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const IconLogout = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(null);

  // Close drawer on route change
  useEffect(() => setMenuOpen(false), [location.pathname]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { label: "Events", path: "/events", icon: <IconCalendar /> },
    { label: "My Events", path: "/my-events", icon: <IconStar /> },
  ];

  // Hover style merge helpers
  const hoverNavBtn = (id, active) => ({
    ...styles.navBtn(active),
    ...(hovered === id && !active
      ? { background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.9)" }
      : {}),
  });

  const hoverCreateBtn = {
    ...styles.createBtn,
    ...(hovered === "create"
      ? { boxShadow: "0 6px 28px rgba(255,60,172,0.55)", transform: "translateY(-1px)" }
      : {}),
  };

  const hoverLogoutBtn = {
    ...styles.logoutBtn,
    ...(hovered === "logout"
      ? { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)" }
      : {}),
  };

  return (
    <>
      {/* Load Syne font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Syne:wght@500;700;800&display=swap"
        rel="stylesheet"
      />

      <nav style={styles.nav} role="navigation" aria-label="Main navigation">
        <div style={styles.inner}>
          {/* ── Logo ── */}
          <button
            style={styles.logo}
            onClick={() => navigate("/")}
            aria-label="HypeHouse home"
          >
            <div style={styles.logoIcon}>⚡</div>
            <span style={styles.logoText}>HypeHouse</span>
          </button>

          {/* ── Desktop nav links ── */}
          <div style={styles.navLinks} className="hh-desktop-nav">
            {navItems.map((item) => (
              <button
                key={item.path}
                style={hoverNavBtn(item.path, isActive(item.path))}
                onClick={() => navigate(item.path)}
                onMouseEnter={() => setHovered(item.path)}
                onMouseLeave={() => setHovered(null)}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>

          {/* ── Desktop right actions ── */}
          <div style={styles.right} className="hh-desktop-nav">
            <button
              style={hoverCreateBtn}
              onClick={() => navigate("/create-event")}
              onMouseEnter={() => setHovered("create")}
              onMouseLeave={() => setHovered(null)}
            >
              <IconPlus />
              Create Event
            </button>
            <button
              style={hoverLogoutBtn}
              onClick={logout}
              onMouseEnter={() => setHovered("logout")}
              onMouseLeave={() => setHovered(null)}
            >
              <IconLogout />
              Logout
            </button>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            style={{ ...styles.hamburger, display: "none" }}
            className="hh-hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {[0, 1, 2].map((i) => (
              <span key={i} style={styles.bar(menuOpen, i)} />
            ))}
          </button>
        </div>

        {/* ── Mobile drawer ── */}
        <div style={styles.drawer(menuOpen)} className="hh-drawer" aria-hidden={!menuOpen}>
          <div style={styles.drawerInner}>
            {navItems.map((item) => (
              <button
                key={item.path}
                style={styles.drawerBtn(isActive(item.path))}
                onClick={() => navigate(item.path)}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
            <button
              style={{
                ...styles.drawerBtn(isActive("/create-event")),
                background: isActive("/create-event")
                  ? "rgba(255,60,172,0.15)"
                  : "rgba(255,60,172,0.08)",
                color: "#FF3CAC",
                fontWeight: 700,
                border: "1px solid rgba(255,60,172,0.2)",
              }}
              onClick={() => navigate("/create-event")}
            >
              <IconPlus />
              Create Event
            </button>
            <button style={styles.drawerLogout} onClick={logout}>
              <IconLogout />
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* ── Responsive CSS ── */}
      <style>{`
        @media (max-width: 640px) {
          .hh-desktop-nav { display: none !important; }
          .hh-hamburger   { display: flex !important; }
        }
        .hh-drawer button:hover { opacity: 0.85; }
      `}</style>
    </>
  );
}
