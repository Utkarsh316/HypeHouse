import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────────
   HypeHouse · Events Page
   Design: dark maximalist party grid —
   holographic card shimmer, staggered entrance,
   animated capacity bar, vibrant status chips,
   hero banner with floating orbs.
   Zero logic changes from original.
───────────────────────────────────────────── */

export default function EventsPage() {
  const [events,  setEvents]  = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  /* ── API calls (unchanged logic) ── */
  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/events`);
      setEvents(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const joinEvent = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/events/join/${id}`,
        {},
        { headers: { Authorization: token } }
      );
      alert("Joined successfully!");
      fetchEvents();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const deleteEvent = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/events/${id}`, {
        headers: { Authorization: token },
      });
      alert("Event deleted");
      fetchEvents();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const leaveEvent = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/events/leave/${id}`,
        {},
        { headers: { Authorization: token } }
      );
      alert("Left event");
      fetchEvents();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
    else fetchEvents();
  }, []);

  /* ── Derived ── */
  const isFull    = (e) => e.attendees.length >= e.capacity;
  const hasJoined = (e) => e.attendees.some((u) => u.toString() === userId);
  const isOwner   = (e) => e.createdBy === userId;

  /* ── Card accent colour per index (cycles) ── */
  const ACCENTS = [
    { from: "#FF3CAC", to: "#784BA0" },
    { from: "#2B86C5", to: "#5D26C1" },
    { from: "#F7971E", to: "#FF4E50" },
    { from: "#11998E", to: "#38EF7D" },
    { from: "#8E2DE2", to: "#4A00E0" },
    { from: "#FC466B", to: "#3F5EFB" },
  ];
  const accent = (i) => ACCENTS[i % ACCENTS.length];

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;700;800&display=swap"
        rel="stylesheet"
      />

      <Navbar />

      <div style={S.page}>
        {/* ── Ambient orbs ── */}
        <div style={S.orb1} aria-hidden />
        <div style={S.orb2} aria-hidden />
        <div style={S.orb3} aria-hidden />

        {/* ── Hero banner ── */}
        <div style={S.hero}>
          <div style={S.heroInner}>
            <div style={S.heroBadge}>🔥 Live & Upcoming</div>
            <h1 style={S.heroTitle}>What's Popping?</h1>
            <p style={S.heroSub}>
              Find your next vibe — parties, raves, chill sessions &amp; more.
            </p>
          </div>
          <button
            style={S.heroCreateBtn}
            onClick={() => navigate("/create-event")}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(255,60,172,.65)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 22px rgba(255,60,172,.4)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            + Drop an Event
          </button>
        </div>

        {/* ── Count chip ── */}
        {!loading && events.length > 0 && (
          <div style={S.countRow}>
            <span style={S.countChip}>{events.length} events happening</span>
            <div style={S.countLine} />
          </div>
        )}

        {/* ── Loading skeletons ── */}
        {loading && (
          <div style={S.grid}>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} style={{ ...S.skeleton, animationDelay: `${i * 0.08}s` }} />
            ))}
          </div>
        )}

        {/* ── Empty state ── */}
        {!loading && events.length === 0 && (
          <div style={S.emptyState}>
            <div style={S.emptyIcon}>🎈</div>
            <h2 style={S.emptyTitle}>No events yet</h2>
            <p style={S.emptySub}>Be the first to drop one. The party starts with you.</p>
            <button
              style={S.emptyBtn}
              onClick={() => navigate("/create-event")}
            >
              🚀 Create the First Event
            </button>
          </div>
        )}

        {/* ── Event grid ── */}
        {!loading && events.length > 0 && (
          <div style={S.grid}>
            {events.map((event, i) => (
              <EventCard
                key={event._id}
                event={event}
                index={i}
                accent={accent(i)}
                isFull={isFull(event)}
                hasJoined={hasJoined(event)}
                isOwner={isOwner(event)}
                onView={() => navigate(`/event/${event._id}`)}
                onJoin={() => joinEvent(event._id)}
                onLeave={() => leaveEvent(event._id)}
                onDelete={() => deleteEvent(event._id)}
              />
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.5; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }
      `}</style>
    </>
  );
}

/* ─────────────────────────────────────────────
   EventCard sub-component
───────────────────────────────────────────── */
function EventCard({
  event, index, accent, isFull, hasJoined, isOwner,
  onView, onJoin, onLeave, onDelete,
}) {
  const [hovered, setHovered] = useState(false);
  const pct = Math.min((event.attendees.length / event.capacity) * 100, 100);
  const barColor = pct >= 90 ? "#FF3CAC" : pct >= 60 ? "#F7971E" : "#38EF7D";

  const cardStyle = {
    ...S.card,
    animationDelay: `${index * 0.07}s`,
    transform: hovered ? "translateY(-6px) scale(1.01)" : "translateY(0) scale(1)",
    boxShadow: hovered
      ? `0 24px 60px rgba(0,0,0,.55), 0 0 0 1px ${accent.from}44`
      : "0 8px 32px rgba(0,0,0,.4), 0 0 0 1px rgba(255,255,255,.07)",
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Gradient top strip */}
      <div
        style={{
          ...S.cardStrip,
          background: `linear-gradient(90deg, ${accent.from}, ${accent.to})`,
          boxShadow: `0 0 24px ${accent.from}66`,
        }}
      />

      {/* Status + price chips */}
      <div style={S.chipRow}>
        <span
          style={{
            ...S.statusChip,
            background: isFull ? "rgba(255,60,172,.15)" : "rgba(56,239,125,.12)",
            color: isFull ? "#FF3CAC" : "#38EF7D",
            borderColor: isFull ? "rgba(255,60,172,.4)" : "rgba(56,239,125,.35)",
          }}
        >
          {isFull ? "🔴 Full" : "🟢 Open"}
        </span>
        <span style={S.priceChip}>
          {event.price === 0 ? "🎉 Free" : `₹${event.price}`}
        </span>
      </div>

      {/* Title */}
      <h3
        style={{ ...S.cardTitle, color: hovered ? accent.from : "#fff" }}
        onClick={onView}
      >
        {event.title}
      </h3>

      {/* Description */}
      <p style={S.cardDesc}>{event.description}</p>

      {/* Meta pills */}
      <div style={S.metaGrid}>
        <MetaPill icon="📍" text={event.location} />
        <MetaPill icon="📅" text={new Date(event.date).toDateString()} />
      </div>

      {/* Capacity bar */}
      <div style={S.capWrap}>
        <div style={S.capLabelRow}>
          <span style={S.capLabel}>👥 Attendees</span>
          <span style={S.capCount}>
            {event.attendees.length} / {event.capacity}
          </span>
        </div>
        <div style={S.barTrack}>
          <div
            style={{
              ...S.barFill,
              width: `${pct}%`,
              background: `linear-gradient(90deg, ${barColor}, ${barColor}aa)`,
              boxShadow: `0 0 8px ${barColor}88`,
            }}
          />
        </div>
      </div>

      {/* Divider */}
      <div style={S.cardDivider} />

      {/* Action buttons */}
      <div style={S.actions}>
        {/* View — arrow-right icon */}
        <button
          style={S.viewBtn}
          onClick={onView}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,.1)"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,.05)"; e.currentTarget.style.color = "rgba(255,255,255,.55)"; }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            View details
            <IcArrowRight />
          </span>
        </button>

        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {hasJoined ? (
            /* Leave — log-out icon */
            <ActionBtn
              icon={<IcLogOut />}
              label="Leave"
              bg="rgba(247,151,30,.12)"
              color="#F7971E"
              border="rgba(247,151,30,.35)"
              hoverBg="rgba(247,151,30,.22)"
              onClick={onLeave}
            />
          ) : (
            /* Join — user-plus icon */
            <ActionBtn
              icon={isFull ? <IcLock /> : <IcUserPlus />}
              label={isFull ? "Full" : "Join"}
              bg={isFull ? "rgba(255,255,255,.05)" : `${accent.from}22`}
              color={isFull ? "rgba(255,255,255,.3)" : accent.from}
              border={isFull ? "rgba(255,255,255,.08)" : `${accent.from}55`}
              hoverBg={isFull ? "rgba(255,255,255,.05)" : `${accent.from}33`}
              disabled={isFull}
              onClick={onJoin}
            />
          )}

          {isOwner && (
            /* Delete — icon-only trash button */
            <DeleteBtn onClick={onDelete} />
          )}
        </div>
      </div>
    </div>
  );
}

/* ── SVG Icons (no external lib) ── */
const IcArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const IcLogOut = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);
const IcUserPlus = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <line x1="19" y1="8" x2="19" y2="14"/>
    <line x1="16" y1="11" x2="22" y2="11"/>
  </svg>
);
const IcLock = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const IcTrash = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6"/>
    <path d="M14 11v6"/>
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
);

/* ── Tiny reusable pieces ── */

function MetaPill({ icon, text }) {
  return (
    <div style={S.metaPill}>
      <span style={{ fontSize: "13px" }}>{icon}</span>
      <span style={S.metaText}>{text}</span>
    </div>
  );
}

function ActionBtn({ icon, label, bg, color, border, hoverBg, disabled, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      style={{
        ...S.actionBtn,
        background: hov && !disabled ? hoverBg : bg,
        color,
        borderColor: border,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        transform: hov && !disabled ? "scale(1.04)" : "scale(1)",
        display: "flex", alignItems: "center", gap: 6,
      }}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {icon}
      {label}
    </button>
  );
}

/* Icon-only delete button with tooltip */
function DeleteBtn({ onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ position: "relative", display: "inline-flex" }}>
      <button
        style={{
          width: 36, height: 36, borderRadius: 10,
          border: `1px solid ${hov ? "rgba(255,60,172,.55)" : "rgba(255,60,172,.25)"}`,
          background: hov ? "rgba(255,60,172,.22)" : "rgba(255,60,172,.08)",
          color: "#FF3CAC",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer",
          transition: "all .15s",
          transform: hov ? "scale(1.1)" : "scale(1)",
          flexShrink: 0,
        }}
        onClick={onClick}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        title="Delete event"
        aria-label="Delete event"
      >
        <IcTrash />
      </button>
      {hov && (
        <span style={{
          position: "absolute", bottom: "calc(100% + 7px)", left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(20,10,35,.95)", color: "#FF3CAC",
          fontSize: 11, fontWeight: 700, fontFamily: "'Syne', sans-serif",
          padding: "4px 10px", borderRadius: 8, whiteSpace: "nowrap",
          border: "1px solid rgba(255,60,172,.25)",
          pointerEvents: "none",
        }}>
          Delete event
        </span>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Styles
───────────────────────────────────────────── */
const S = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(ellipse at 0% 30%, rgba(120,75,160,.2) 0%, transparent 50%)," +
      "radial-gradient(ellipse at 100% 10%, rgba(255,60,172,.15) 0%, transparent 45%)," +
      "radial-gradient(ellipse at 50% 100%, rgba(43,134,197,.12) 0%, transparent 50%)," +
      "#060310",
    padding: "0 24px 80px",
    fontFamily: "'Syne', sans-serif",
    position: "relative",
    overflow: "hidden",
  },
  orb1: {
    position: "absolute", top: "10%", left: "-80px",
    width: 320, height: 320, borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255,60,172,.1) 0%, transparent 70%)",
    pointerEvents: "none",
    animation: "float 7s ease-in-out infinite",
  },
  orb2: {
    position: "absolute", top: "40%", right: "-60px",
    width: 280, height: 280, borderRadius: "50%",
    background: "radial-gradient(circle, rgba(43,134,197,.1) 0%, transparent 70%)",
    pointerEvents: "none",
    animation: "float 9s ease-in-out infinite reverse",
  },
  orb3: {
    position: "absolute", bottom: "10%", left: "40%",
    width: 200, height: 200, borderRadius: "50%",
    background: "radial-gradient(circle, rgba(120,75,160,.08) 0%, transparent 70%)",
    pointerEvents: "none",
    animation: "float 11s ease-in-out infinite",
  },

  /* Hero */
  hero: {
    maxWidth: 1200, margin: "0 auto",
    padding: "52px 0 36px",
    display: "flex", alignItems: "flex-end",
    justifyContent: "space-between", gap: 24,
    flexWrap: "wrap",
    position: "relative", zIndex: 1,
  },
  heroInner: { flex: 1 },
  heroBadge: {
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: "5px 14px", borderRadius: 20,
    background: "rgba(255,60,172,.12)",
    border: "1px solid rgba(255,60,172,.3)",
    color: "#FF3CAC", fontSize: 12, fontWeight: 700,
    letterSpacing: ".05em", textTransform: "uppercase",
    marginBottom: 14,
  },
  heroTitle: {
    fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800,
    color: "#fff", margin: "0 0 10px",
    letterSpacing: "-1.5px", lineHeight: 1.1,
    background: "linear-gradient(135deg, #fff 30%, rgba(255,255,255,.55))",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  heroSub: {
    fontSize: 16, color: "rgba(255,255,255,.4)",
    fontWeight: 500, margin: 0, maxWidth: 420,
  },
  heroCreateBtn: {
    padding: "13px 28px", borderRadius: 14, border: "none",
    background: "linear-gradient(135deg, #FF3CAC 0%, #784BA0 100%)",
    color: "#fff", fontSize: 15, fontWeight: 800,
    fontFamily: "'Syne', sans-serif", cursor: "pointer",
    transition: "all .18s ease",
    boxShadow: "0 4px 22px rgba(255,60,172,.4)",
    whiteSpace: "nowrap", flexShrink: 0,
  },

  /* Count row */
  countRow: {
    maxWidth: 1200, margin: "0 auto 32px",
    display: "flex", alignItems: "center", gap: 16,
    position: "relative", zIndex: 1,
  },
  countChip: {
    fontSize: 12, fontWeight: 700, letterSpacing: ".06em",
    textTransform: "uppercase", color: "rgba(255,255,255,.35)",
    whiteSpace: "nowrap",
  },
  countLine: {
    flex: 1, height: 1,
    background: "linear-gradient(90deg, rgba(255,255,255,.08), transparent)",
  },

  /* Grid */
  grid: {
    maxWidth: 1200, margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: 24,
    position: "relative", zIndex: 1,
  },

  /* Skeleton */
  skeleton: {
    height: 340, borderRadius: 20,
    background:
      "linear-gradient(90deg, rgba(255,255,255,.04) 25%, rgba(255,255,255,.08) 50%, rgba(255,255,255,.04) 75%)",
    backgroundSize: "800px 100%",
    animation: "shimmer 1.4s infinite linear, fadeUp .4s ease both",
    border: "1px solid rgba(255,255,255,.06)",
  },

  /* Event card */
  card: {
    background: "rgba(255,255,255,.04)",
    border: "1px solid rgba(255,255,255,.08)",
    borderRadius: 20,
    padding: "0 0 20px",
    overflow: "hidden",
    display: "flex", flexDirection: "column",
    transition: "transform .22s cubic-bezier(.22,1,.36,1), box-shadow .22s ease",
    animation: "fadeUp .5s cubic-bezier(.22,1,.36,1) both",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    cursor: "default",
  },
  cardStrip: {
    height: 4, width: "100%", flexShrink: 0,
    transition: "box-shadow .22s",
  },

  chipRow: {
    display: "flex", justifyContent: "space-between",
    alignItems: "center", padding: "14px 20px 0",
  },
  statusChip: {
    fontSize: 11, fontWeight: 800, letterSpacing: ".05em",
    padding: "4px 11px", borderRadius: 20, border: "1px solid",
    textTransform: "uppercase",
  },
  priceChip: {
    fontSize: 13, fontWeight: 700,
    color: "rgba(255,255,255,.5)",
    background: "rgba(255,255,255,.06)",
    border: "1px solid rgba(255,255,255,.08)",
    padding: "4px 12px", borderRadius: 20,
  },

  cardTitle: {
    fontSize: 20, fontWeight: 800, lineHeight: 1.25,
    margin: "12px 20px 6px",
    cursor: "pointer",
    transition: "color .18s ease",
    letterSpacing: "-.3px",
  },
  cardDesc: {
    fontSize: 13, color: "rgba(255,255,255,.38)",
    fontWeight: 500, lineHeight: 1.6,
    margin: "0 20px 14px",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },

  metaGrid: {
    display: "flex", flexDirection: "column", gap: 6,
    padding: "0 20px 14px",
  },
  metaPill: {
    display: "flex", alignItems: "center", gap: 8,
  },
  metaText: {
    fontSize: 13, fontWeight: 500,
    color: "rgba(255,255,255,.5)",
  },

  /* Capacity bar */
  capWrap: { padding: "0 20px 14px" },
  capLabelRow: {
    display: "flex", justifyContent: "space-between",
    marginBottom: 7,
  },
  capLabel: { fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.4)", letterSpacing: ".02em" },
  capCount: { fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.5)" },
  barTrack: {
    height: 5, borderRadius: 10,
    background: "rgba(255,255,255,.08)",
    overflow: "hidden",
  },
  barFill: {
    height: "100%", borderRadius: 10,
    transition: "width .6s cubic-bezier(.22,1,.36,1)",
  },

  cardDivider: {
    height: 1, margin: "0 20px 16px",
    background: "rgba(255,255,255,.06)",
  },

  /* Buttons */
  actions: {
    display: "flex", alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
    gap: 8,
  },
  viewBtn: {
    padding: "8px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,.1)",
    background: "rgba(255,255,255,.05)", color: "rgba(255,255,255,.55)",
    fontSize: 13, fontWeight: 700, fontFamily: "'Syne', sans-serif",
    cursor: "pointer", transition: "all .15s",
  },
  actionBtn: {
    padding: "8px 16px", borderRadius: 10,
    border: "1px solid",
    fontSize: 13, fontWeight: 700,
    fontFamily: "'Syne', sans-serif",
    transition: "all .15s",
    whiteSpace: "nowrap",
  },

  /* Empty state */
  emptyState: {
    maxWidth: 460, margin: "80px auto 0",
    display: "flex", flexDirection: "column",
    alignItems: "center", textAlign: "center",
    padding: "48px 32px",
    background: "rgba(255,255,255,.03)",
    border: "1px solid rgba(255,255,255,.07)",
    borderRadius: 24, position: "relative", zIndex: 1,
    animation: "fadeUp .5s ease both",
  },
  emptyIcon: {
    fontSize: 56, marginBottom: 20,
    animation: "float 3s ease-in-out infinite",
  },
  emptyTitle: {
    fontSize: 26, fontWeight: 800, color: "#fff",
    margin: "0 0 10px", letterSpacing: "-.5px",
  },
  emptySub: {
    fontSize: 14, color: "rgba(255,255,255,.38)",
    fontWeight: 500, lineHeight: 1.6, margin: "0 0 28px",
  },
  emptyBtn: {
    padding: "13px 28px", borderRadius: 14, border: "none",
    background: "linear-gradient(135deg, #FF3CAC 0%, #784BA0 100%)",
    color: "#fff", fontSize: 15, fontWeight: 800,
    fontFamily: "'Syne', sans-serif", cursor: "pointer",
    boxShadow: "0 4px 22px rgba(255,60,172,.4)",
    transition: "all .18s",
  },
};
