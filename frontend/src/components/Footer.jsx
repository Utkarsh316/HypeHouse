// src/components/Footer.jsx
import { useState } from "react";

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const MetaIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const PinIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

export default function Footer() {
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [emailHovered, setEmailHovered] = useState(false);

  const socials = [
    { id: "instagram", label: "Instagram", icon: <InstagramIcon />, href: "https://instagram.com" },
    { id: "meta",      label: "Meta",      icon: <MetaIcon />,      href: "https://facebook.com" },
    { id: "twitter",   label: "Twitter/X", icon: <TwitterIcon />,   href: "https://x.com" },
  ];

  const legalLinks = ["Privacy Policy", "Terms of Service", "Cookie Policy", "Refund Policy"];
  const quickLinks = ["Browse Events", "Create an Event", "My Events", "Help Center", "Community"];

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;700;800&display=swap"
        rel="stylesheet"
      />

      <footer style={S.wrapper}>
        <div style={S.card}>
          <div style={S.strip} />

          <div style={S.content}>
            {/* Top row */}
            <div style={S.topRow}>
              <div style={S.brand}>
                <div style={S.logoMark}>⚡</div>
                <div>
                  <div style={S.brandName}>HypeHouse</div>
                  <div style={S.tagline}>Built for people who actually show up.</div>
                </div>
              </div>

              <div style={S.socialGroup}>
                <p style={S.sectionLabel}>FOLLOW US</p>
                <div style={S.socialRow}>
                  {socials.map((s) => (
                    <a
                      key={s.id}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={s.label}
                      style={{
                        ...S.socialBtn,
                        ...(hoveredSocial === s.id ? S.socialBtnHover : {}),
                      }}
                      onMouseEnter={() => setHoveredSocial(s.id)}
                      onMouseLeave={() => setHoveredSocial(null)}
                    >
                      {s.icon}
                      <span>{s.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div style={S.divider} />

            {/* Mid row */}
            <div style={S.midRow}>
              <div style={S.col}>
                <p style={S.sectionLabel}>GET IN TOUCH</p>
                <a
                  href="mailto:support@hypehouse.com"
                  style={{ ...S.emailLink, ...(emailHovered ? S.emailHover : {}) }}
                  onMouseEnter={() => setEmailHovered(true)}
                  onMouseLeave={() => setEmailHovered(false)}
                >
                  <MailIcon />
                  support@hypehouse.com
                </a>
                <div style={S.locationTag}>
                  <PinIcon />
                  <span>Built in India 🇮🇳</span>
                </div>
                <p style={S.replyNote}>
                  We typically respond within{" "}
                  <strong style={{ color: "#FF3CAC" }}>24 hours</strong>.
                </p>
              </div>

              <div style={S.col}>
                <p style={S.sectionLabel}>LEGAL</p>
                {legalLinks.map((l) => (
                  <a key={l} href="#" style={S.navLink}
                    onMouseEnter={e => e.currentTarget.style.color = "#FF3CAC"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.48)"}
                  >{l}</a>
                ))}
              </div>

              <div style={S.col}>
                <p style={S.sectionLabel}>QUICK LINKS</p>
                {quickLinks.map((l) => (
                  <a key={l} href="#" style={S.navLink}
                    onMouseEnter={e => e.currentTarget.style.color = "#FF3CAC"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.48)"}
                  >{l}</a>
                ))}
              </div>
            </div>

            <div style={S.divider} />

            {/* Bottom bar */}
            <div style={S.bottomBar}>
              <span style={S.copyright}>
                © {new Date().getFullYear()} HypeHouse Technologies Pvt. Ltd. · All rights reserved.
              </span>
              <span style={S.madeWith}>Made with ❤️ in India</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

const S = {
  wrapper: {
    // NO background here — inherits dark background from Layout shell
    width: "100%",
    background: "#070211",
    padding: "0 20px 48px",
    display: "flex",
    justifyContent: "center",
    fontFamily: "'Syne', sans-serif",
  },
  card: {
    width: "100%",
   
    margin: "0 auto", 
    borderRadius: 24,
    overflow: "hidden",
    background: "rgba(255,255,255,0.035)",
    border: "1px solid rgba(255,255,255,0.08)",
    backdropFilter: "blur(28px)",
    WebkitBackdropFilter: "blur(28px)",
    boxShadow:
      "0 0 0 1px rgba(255,255,255,0.04) inset, 0 24px 80px rgba(0,0,0,0.45)",
  },
  strip: {
    height: 4,
    background: "linear-gradient(90deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)",
    boxShadow: "0 0 24px rgba(255,60,172,0.5)",
  },
  content: { padding: "36px 40px 28px" },

  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: 24,
  },
  brand: { display: "flex", alignItems: "center", gap: 14 },
  logoMark: {
    width: 48, height: 48,
    borderRadius: 14,
    background: "linear-gradient(135deg, rgba(255,60,172,0.35), rgba(120,75,160,0.35))",
    border: "1px solid rgba(255,60,172,0.25)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 22, flexShrink: 0,
    boxShadow: "0 0 20px rgba(255,60,172,0.25)",
  },
  brandName: {
    fontSize: 20, fontWeight: 900,
    background: "linear-gradient(90deg, #FF3CAC, #784BA0)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    letterSpacing: "-0.4px", lineHeight: 1.1,
  },
  tagline: {
    fontSize: 12, color: "rgba(255,255,255,0.4)",
    fontWeight: 500, marginTop: 3, fontStyle: "italic",
  },

  socialGroup: {
    display: "flex", flexDirection: "column",
    alignItems: "flex-end", gap: 10,
  },
  socialRow: {
    display: "flex", gap: 8,
    flexWrap: "wrap", justifyContent: "flex-end",
  },
  socialBtn: {
    display: "flex", alignItems: "center", gap: 7,
    padding: "8px 14px", borderRadius: 50,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "rgba(255,255,255,0.6)",
    textDecoration: "none", fontSize: 13, fontWeight: 600,
    fontFamily: "'Syne', sans-serif",
    transition: "all 0.2s ease", cursor: "pointer",
  },
  socialBtnHover: {
    background: "rgba(255,60,172,0.14)",
    border: "1px solid rgba(255,60,172,0.4)",
    color: "#fff",
    boxShadow: "0 0 18px rgba(255,60,172,0.2)",
    transform: "translateY(-1px)",
  },

  divider: {
    height: 1,
    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
    margin: "28px 0",
  },

  midRow: {
    display: "flex", gap: 48,
    flexWrap: "wrap", alignItems: "flex-start",
  },
  col: {
    flex: 1, minWidth: 160,
    display: "flex", flexDirection: "column", gap: 10,
  },
  sectionLabel: {
    fontSize: 10, fontWeight: 800,
    letterSpacing: "1.5px",
    color: "rgba(255,255,255,0.28)",
    margin: "0 0 4px",
  },
  emailLink: {
    display: "flex", alignItems: "center", gap: 7,
    color: "rgba(255,255,255,0.72)",
    textDecoration: "none", fontSize: 13, fontWeight: 600,
    transition: "color 0.18s",
  },
  emailHover: { color: "#FF3CAC" },
  locationTag: {
    display: "flex", alignItems: "center", gap: 6,
    color: "rgba(255,255,255,0.38)", fontSize: 12, fontWeight: 500,
  },
  replyNote: {
    fontSize: 12, color: "rgba(255,255,255,0.32)",
    margin: 0, lineHeight: 1.5,
  },
  navLink: {
    color: "rgba(255,255,255,0.48)",
    textDecoration: "none", fontSize: 13, fontWeight: 500,
    transition: "color 0.18s",
  },

  bottomBar: {
    display: "flex", justifyContent: "space-between",
    alignItems: "center", flexWrap: "wrap", gap: 8,
  },
  copyright: {
    fontSize: 11, color: "rgba(255,255,255,0.25)", fontWeight: 500,
  },
  madeWith: {
    fontSize: 11, color: "rgba(255,255,255,0.25)", fontWeight: 500,
  },
};
