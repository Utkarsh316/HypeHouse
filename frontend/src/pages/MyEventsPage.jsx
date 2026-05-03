import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;700;800&display=swap');

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes shimmer {
  0%   { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}

.mep-page * { box-sizing: border-box; margin: 0; padding: 0; }
.mep-page {
  background: #070211;
  font-family: 'Syne', sans-serif;
  color: #fff;
  min-height: 100vh;
}

/* ── HERO ── */
.mep-hero {
  position: relative;
  background: linear-gradient(160deg, rgba(120,75,160,.25) 0%, rgba(255,60,172,.12) 40%, rgba(43,134,197,.08) 100%);
  border-bottom: 1px solid rgba(255,255,255,.07);
  overflow: hidden;
}
.mep-hero-mesh {
  position: absolute; inset: 0;
  background-image: radial-gradient(rgba(255,255,255,.03) 1px, transparent 1px);
  background-size: 28px 28px;
  pointer-events: none;
}
.mep-orb1 {
  position: absolute; top: -60px; right: -60px;
  width: 220px; height: 220px; border-radius: 50%;
  background: radial-gradient(circle, rgba(255,60,172,.18) 0%, transparent 70%);
  filter: blur(40px); pointer-events: none;
}
.mep-orb2 {
  position: absolute; bottom: -40px; left: 15%;
  width: 160px; height: 160px; border-radius: 50%;
  background: radial-gradient(circle, rgba(43,134,197,.15) 0%, transparent 70%);
  filter: blur(40px); pointer-events: none;
}
.mep-hero-inner {
  position: relative; z-index: 1;
  max-width: 1060px; margin: 0 auto;
  padding: 40px 28px 36px;
  display: flex; flex-direction: column; gap: 10px;
  animation: fadeUp .5s cubic-bezier(.22,1,.36,1) both;
}
.mep-hero-eyebrow {
  font-size: 10px; font-weight: 800; letter-spacing: .12em;
  text-transform: uppercase; color: rgba(255,255,255,.28);
}
.mep-hero-title {
  font-size: clamp(22px, 3.5vw, 38px); font-weight: 800;
  line-height: 1.1; letter-spacing: -1px;
}
.mep-hero-sub {
  font-size: 13px; color: rgba(255,255,255,.4); font-weight: 500; margin-top: 2px;
}
.mep-hero-count {
  display: inline-flex; align-items: center; gap: 6px;
  margin-top: 6px; padding: 5px 13px; border-radius: 20px;
  background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.11);
  font-size: 11px; font-weight: 700; color: rgba(255,255,255,.5);
  align-self: flex-start;
}
.mep-hero-count-num {
  font-size: 13px; font-weight: 800; color: #FF3CAC;
}

/* ── BODY ── */
.mep-body {
  max-width: 1060px; margin: 0 auto;
  padding: 36px 28px 72px;
}

/* ── EMPTY STATE ── */
.mep-empty {
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; gap: 14px;
  padding: 80px 20px; text-align: center;
  animation: fadeUp .5s cubic-bezier(.22,1,.36,1) both;
}
.mep-empty-icon {
  width: 64px; height: 64px; border-radius: 18px;
  background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.09);
  display: flex; align-items: center; justify-content: center;
  font-size: 28px;
}
.mep-empty-title {
  font-size: 17px; font-weight: 800; color: rgba(255,255,255,.6);
}
.mep-empty-sub {
  font-size: 13px; color: rgba(255,255,255,.25); font-weight: 500;
}

/* ── EVENT LIST ── */
.mep-list {
  display: flex; flex-direction: column; gap: 16px;
}

/* ── EVENT CARD ── */
.mep-card {
  border-radius: 18px;
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.08);
  backdrop-filter: blur(16px);
  padding: 22px 24px;
  display: flex; flex-direction: column; gap: 14px;
  cursor: pointer;
  transition: border-color .2s, background .2s, transform .18s, box-shadow .18s;
  animation: fadeUp .45s cubic-bezier(.22,1,.36,1) both;
}
.mep-card:hover {
  border-color: rgba(255,60,172,.35);
  background: rgba(255,255,255,.06);
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0,0,0,.35), 0 0 0 1px rgba(255,60,172,.12);
}

.mep-card-top {
  display: flex; justify-content: space-between; align-items: flex-start; gap: 12px;
}
.mep-card-title-group { display: flex; flex-direction: column; gap: 6px; flex: 1; }
.mep-card-title {
  font-size: 17px; font-weight: 800; line-height: 1.2;
  letter-spacing: -.3px; color: #fff;
  transition: color .15s;
}
.mep-card:hover .mep-card-title { color: #FF3CAC; }
.mep-card-desc {
  font-size: 13px; color: rgba(255,255,255,.42); font-weight: 500;
  line-height: 1.6;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}

/* Role badge */
.mep-role-badge {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 4px 11px; border-radius: 20px;
  font-size: 10px; font-weight: 800; letter-spacing: .07em;
  text-transform: uppercase; border: 1px solid; white-space: nowrap; flex-shrink: 0;
}
.mep-badge-creator {
  background: rgba(255,60,172,.15); color: #FF3CAC;
  border-color: rgba(255,60,172,.4);
}
.mep-badge-joined {
  background: rgba(56,239,125,.12); color: #38EF7D;
  border-color: rgba(56,239,125,.35);
}

/* Meta row */
.mep-card-meta {
  display: flex; gap: 8px; flex-wrap: wrap;
}
.mep-meta-tag {
  display: flex; align-items: center; gap: 5px;
  padding: 4px 10px; border-radius: 20px;
  background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.09);
  font-size: 11px; font-weight: 600; color: rgba(255,255,255,.5);
}

/* Divider + footer */
.mep-card-divider {
  height: 1px; background: rgba(255,255,255,.06); margin: 0 -24px;
}
.mep-card-footer {
  display: flex; align-items: center; justify-content: space-between;
}
.mep-attendee-bubbles { display: flex; align-items: center; gap: -4px; }
.mep-att-bubble {
  width: 22px; height: 22px; border-radius: 50%;
  border: 1.5px solid #070211;
  margin-left: -6px; first-child:margin-left:0;
}
.mep-att-bubble:first-child { margin-left: 0; }
.mep-att-count {
  font-size: 11px; font-weight: 700; color: rgba(255,255,255,.35);
  margin-left: 8px;
}
.mep-arrow {
  display: flex; align-items: center; justify-content: center;
  width: 30px; height: 30px; border-radius: 9px;
  background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.09);
  color: rgba(255,255,255,.3); transition: all .15s;
}
.mep-card:hover .mep-arrow {
  background: rgba(255,60,172,.12); border-color: rgba(255,60,172,.3); color: #FF3CAC;
}
`;

const BUBBLE_COLORS = [
  "#FF3CAC","#784BA0","#2B86C5","#38EF7D","#F7971E","#FC466B","#5D26C1","#11998E",
];

function EventCard({ event, index, navigate }) {
  const userId = localStorage.getItem("userId");
  const isCreator = event.createdBy === userId;
  const total = event.attendees.length;
  const bubbles = BUBBLE_COLORS.slice(0, Math.min(total, 5));
  const overflow = total > 5 ? total - 5 : 0;

  return (
    <div
      className="mep-card"
      style={{ animationDelay: `${index * 0.06}s` }}
      onClick={() => navigate(`/event/${event._id}`)}
    >
      {/* Top */}
      <div className="mep-card-top">
        <div className="mep-card-title-group">
          <span className="mep-card-title">{event.title}</span>
          {event.description && (
            <span className="mep-card-desc">{event.description}</span>
          )}
        </div>
        <span className={`mep-role-badge ${isCreator ? "mep-badge-creator" : "mep-badge-joined"}`}>
          {isCreator ? (
            <>
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              Created
            </>
          ) : (
            <>
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              Joined
            </>
          )}
        </span>
      </div>

      {/* Meta */}
      <div className="mep-card-meta">
        <div className="mep-meta-tag">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          {event.location}
        </div>
        <div className="mep-meta-tag">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="3"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          {new Date(event.date).toDateString()}
        </div>
      </div>

      {/* Divider */}
      <div className="mep-card-divider" />

      {/* Footer */}
      <div className="mep-card-footer">
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="mep-attendee-bubbles">
            {bubbles.map((color, i) => (
              <div
                key={i}
                className="mep-att-bubble"
                style={{ background: color, zIndex: bubbles.length - i }}
              />
            ))}
          </div>
          <span className="mep-att-count">
            {total === 0
              ? "No attendees yet"
              : overflow > 0
              ? `${bubbles.length}+${overflow} attending`
              : `${total} attending`}
          </span>
        </div>
        <div className="mep-arrow">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
      </div>
    </div>
  );
}

function MyEventsPage() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/events`);
      const userId = localStorage.getItem("userId");
      const myEvents = res.data.filter(
        (event) => event.createdBy === userId || event.attendees.includes(userId)
      );
      setEvents(myEvents);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div className="mep-page">
        <Navbar />

        {/* Hero */}
        <div className="mep-hero">
          <div className="mep-hero-mesh" />
          <div className="mep-orb1" />
          <div className="mep-orb2" />
          <div className="mep-hero-inner">
            <p className="mep-hero-eyebrow">Dashboard</p>
            <h1 className="mep-hero-title">My Events</h1>
            <p className="mep-hero-sub">Events you've created or joined.</p>
            {events.length > 0 && (
              <div className="mep-hero-count">
                <span className="mep-hero-count-num">{events.length}</span>
                {events.length === 1 ? "event" : "events"} in your list
              </div>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="mep-body">
          {events.length === 0 ? (
            <div className="mep-empty">
              <div className="mep-empty-icon">🎪</div>
              <p className="mep-empty-title">Nothing here yet</p>
              <p className="mep-empty-sub">Events you create or join will show up here.</p>
            </div>
          ) : (
            <div className="mep-list">
              {events.map((event, i) => (
                <EventCard key={event._id} event={event} index={i} navigate={navigate} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MyEventsPage;
