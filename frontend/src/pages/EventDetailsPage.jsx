import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const BUBBLE_COLORS = [
  "#FF3CAC","#784BA0","#2B86C5","#38EF7D","#F7971E",
  "#FC466B","#5D26C1","#11998E","#FF4E50","#4A00E0",
  "#8E2DE2","#00C9FF","#92FE9D","#f093fb","#43e97b","#3F5EFB",
];

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;700;800&display=swap');

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes bubblePop {
  from { opacity: 0; transform: scale(0); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes float {
  0%,100% { transform: translateY(0); }
  50%      { transform: translateY(-8px); }
}

.hed-page * { box-sizing: border-box; margin: 0; padding: 0; }
.hed-page {
  background: #070211;
  font-family: 'Syne', sans-serif;
  color: #fff;
  min-height: 100vh;
}

/* HERO */
.hed-hero {
  position: relative;
  background: linear-gradient(160deg, rgba(120,75,160,.25) 0%, rgba(255,60,172,.12) 40%, rgba(43,134,197,.08) 100%);
  border-bottom: 1px solid rgba(255,255,255,.07);
  overflow: hidden;
}
.hed-hero-mesh {
  position: absolute; inset: 0;
  background-image: radial-gradient(rgba(255,255,255,.03) 1px, transparent 1px);
  background-size: 28px 28px;
  pointer-events: none;
}
.hed-orb1 {
  position: absolute; top: -80px; right: -80px;
  width: 280px; height: 280px; border-radius: 50%;
  background: radial-gradient(circle, rgba(255,60,172,.18) 0%, transparent 70%);
  filter: blur(40px); pointer-events: none;
}
.hed-orb2 {
  position: absolute; bottom: -60px; left: 20%;
  width: 200px; height: 200px; border-radius: 50%;
  background: radial-gradient(circle, rgba(43,134,197,.15) 0%, transparent 70%);
  filter: blur(40px); pointer-events: none;
}
.hed-hero-inner {
  position: relative; z-index: 1;
  max-width: 1060px; margin: 0 auto;
  padding: 44px 28px 40px;
  display: flex; flex-direction: column; gap: 18px;
  animation: fadeUp .5s cubic-bezier(.22,1,.36,1) both;
}

.hed-back-pill {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 13px; border-radius: 20px;
  background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.12);
  color: rgba(255,255,255,.6); font-size: 11px; font-weight: 600;
  font-family: 'Syne', sans-serif; cursor: pointer;
  transition: background .15s; align-self: flex-start;
}
.hed-back-pill:hover { background: rgba(255,255,255,.15); }

.hed-hero-chips { display: flex; gap: 9px; align-items: center; flex-wrap: wrap; }

.hed-chip {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 4px 12px; border-radius: 20px;
  font-size: 11px; font-weight: 800; letter-spacing: .06em;
  text-transform: uppercase; border: 1px solid;
}
.hed-chip-open {
  background: rgba(56,239,125,.15); color: #38EF7D;
  border-color: rgba(56,239,125,.45); box-shadow: 0 0 14px rgba(56,239,125,.18);
}
.hed-chip-full {
  background: rgba(255,60,172,.2); color: #FF3CAC;
  border-color: rgba(255,60,172,.5); box-shadow: 0 0 14px rgba(255,60,172,.22);
}
.hed-hero-title {
  font-size: clamp(26px, 4.2vw, 48px); font-weight: 800;
  line-height: 1.1; letter-spacing: -1.5px;
}
.hed-hero-meta { display: flex; gap: 9px; flex-wrap: wrap; }
.hed-meta-tag {
  display: flex; align-items: center; gap: 6px;
  padding: 5px 11px; border-radius: 20px;
  background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.11);
  font-size: 11px; font-weight: 600; color: rgba(255,255,255,.65);
  backdrop-filter: blur(8px);
}

/* BODY GRID */
.hed-body {
  max-width: 1060px; margin: 0 auto;
  padding: 36px 28px 72px;
  display: grid; grid-template-columns: 1fr 360px; gap: 28px; align-items: start;
}
@media (max-width: 720px) {
  .hed-body { grid-template-columns: 1fr; }
  .hed-right { position: static !important; }
}

/* LEFT */
.hed-left {
  display: flex; flex-direction: column; gap: 32px;
  animation: fadeUp .5s .1s cubic-bezier(.22,1,.36,1) both;
}
.hed-section-label {
  font-size: 10px; font-weight: 800; letter-spacing: .1em;
  text-transform: uppercase; color: rgba(255,255,255,.28); margin-bottom: 13px;
}
.hed-desc {
  font-size: 14px; color: rgba(255,255,255,.52);
  font-weight: 500; line-height: 1.8;
}

/* Detail grid */
.hed-detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.hed-detail-card {
  padding: 15px; border-radius: 15px;
  background: rgba(255,255,255,.04); border: 1px solid;
  transition: filter .2s; display: flex; flex-direction: column; gap: 9px;
}
.hed-detail-card:hover { filter: brightness(1.08); }
.hed-d-icon {
  width: 33px; height: 33px; border-radius: 9px;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.hed-d-label {
  font-size: 10px; font-weight: 700; letter-spacing: .06em;
  text-transform: uppercase; color: rgba(255,255,255,.28); margin-bottom: 2px;
}
.hed-d-value { font-size: 13px; font-weight: 700; color: #fff; line-height: 1.3; }

/* Capacity */
.hed-cap-card {
  padding: 18px; border-radius: 15px;
  background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.07);
}
.hed-cap-row { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 10px; }
.hed-cap-text { font-size: 13px; font-weight: 600; }
.hed-cap-pct { font-size: 17px; font-weight: 800; }
.hed-bar-track { height: 6px; border-radius: 10px; background: rgba(255,255,255,.08); overflow: hidden; margin-bottom: 9px; }
.hed-bar-fill { height: 100%; border-radius: 10px; transition: width .8s cubic-bezier(.22,1,.36,1); }
.hed-cap-hint { font-size: 11px; color: rgba(255,255,255,.3); font-weight: 500; }

/* Actions */
.hed-action-row { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }
.hed-action-btn {
  display: flex; align-items: center; gap: 7px;
  padding: 11px 20px; border-radius: 11px;
  font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700;
  cursor: pointer; transition: all .18s; border: 1px solid;
}
.hed-btn-join {
  background: linear-gradient(135deg, #FF3CAC, #784BA0);
  color: #fff; border-color: transparent;
  box-shadow: 0 4px 18px rgba(255,60,172,.35);
}
.hed-btn-join:hover { box-shadow: 0 6px 26px rgba(255,60,172,.55); transform: translateY(-1px); }
.hed-btn-leave {
  background: rgba(247,151,30,.12); color: #F7971E;
  border-color: rgba(247,151,30,.38);
}
.hed-btn-leave:hover { background: rgba(247,151,30,.22); }
.hed-btn-ghost {
  background: transparent; color: rgba(255,255,255,.45);
  border-color: rgba(255,255,255,.12);
}
.hed-btn-ghost:hover { background: rgba(255,255,255,.07); color: rgba(255,255,255,.75); }
.hed-del-wrap { position: relative; display: inline-flex; }
.hed-del-btn {
  width: 44px; height: 44px; border-radius: 11px;
  border: 1px solid rgba(255,60,172,.28); background: rgba(255,60,172,.08);
  color: #FF3CAC; display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all .15s;
}
.hed-del-btn:hover { background: rgba(255,60,172,.22); border-color: rgba(255,60,172,.6); transform: scale(1.08); }
.hed-del-tip {
  position: absolute; bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%);
  background: rgba(12,4,28,.97); color: #FF3CAC; font-size: 11px; font-weight: 700;
  font-family: 'Syne', sans-serif; padding: 4px 10px; border-radius: 7px;
  white-space: nowrap; border: 1px solid rgba(255,60,172,.3);
  pointer-events: none; opacity: 0; transition: opacity .15s;
}
.hed-del-wrap:hover .hed-del-tip { opacity: 1; }

/* RIGHT */
.hed-right {
  display: flex; flex-direction: column; gap: 18px;
  position: sticky; top: 72px;
  animation: fadeUp .5s .2s cubic-bezier(.22,1,.36,1) both;
}

/* Map */
.hed-map-card {
  border-radius: 18px; overflow: hidden;
  background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.09);
  backdrop-filter: blur(16px); box-shadow: 0 12px 40px rgba(0,0,0,.4);
}
.hed-map-header {
  display: flex; align-items: flex-start; justify-content: space-between;
  padding: 14px 16px 11px; gap: 10px;
}
.hed-map-header-left { display: flex; align-items: center; gap: 10px; }
.hed-map-icon {
  width: 34px; height: 34px; border-radius: 9px; flex-shrink: 0;
  background: rgba(255,60,172,.15); border: 1px solid rgba(255,60,172,.3);
  color: #FF3CAC; display: flex; align-items: center; justify-content: center;
}
.hed-map-title {
  font-size: 11px; font-weight: 800; letter-spacing: .05em;
  text-transform: uppercase; color: rgba(255,255,255,.45);
}
.hed-map-addr { font-size: 12px; font-weight: 600; color: rgba(255,255,255,.7); margin-top: 3px; line-height: 1.35; }
.hed-maps-link {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 11px; font-weight: 700; color: rgba(255,255,255,.3);
  text-decoration: none; padding: 5px 9px; border-radius: 7px;
  background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.08);
  white-space: nowrap; flex-shrink: 0; transition: color .15s;
}
.hed-maps-link:hover { color: #FF3CAC; }
.hed-map-wrap {
  height: 270px; overflow: hidden;
  border-top: 1px solid rgba(255,255,255,.07);
  border-bottom: 1px solid rgba(255,255,255,.07);
}
.hed-map-footer {
  display: flex; align-items: center; gap: 7px; padding: 10px 16px;
  color: rgba(255,255,255,.3);
}
.hed-map-footer-text { font-size: 11px; font-weight: 500; color: rgba(255,255,255,.3); }

/* Attendees */
.hed-att-card {
  border-radius: 16px; padding: 16px;
  background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08);
  backdrop-filter: blur(16px);
}
.hed-att-header { display: flex; align-items: center; gap: 7px; margin-bottom: 12px; color: rgba(255,255,255,.4); }
.hed-att-title { font-size: 11px; font-weight: 800; letter-spacing: .05em; text-transform: uppercase; flex: 1; }
.hed-att-badge {
  font-size: 11px; font-weight: 800; padding: 2px 9px;
  border-radius: 20px; background: rgba(255,255,255,.08); color: #fff;
}
.hed-bubbles { display: flex; flex-wrap: wrap; gap: 5px; }
.hed-bubble {
  width: 26px; height: 26px; border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0,0,0,.4);
  animation: bubblePop .4s cubic-bezier(.22,1,.36,1) both;
}
.hed-bubble-extra {
  width: 26px; height: 26px; border-radius: 50%;
  background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.15);
  display: flex; align-items: center; justify-content: center;
  font-size: 9px; font-weight: 800; color: rgba(255,255,255,.5);
  font-family: 'Syne', sans-serif;
}
`;

function EventDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  const fetchEvent = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/events/${id}`);
      setEvent(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const joinEvent = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/events/join/${id}`,
        {},
        { headers: { Authorization: token } }
      );
      fetchEvent();
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  const leaveEvent = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/events/leave/${id}`,
        {},
        { headers: { Authorization: token } }
      );
      fetchEvent();
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  const deleteEvent = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/events/${id}`, {
        headers: { Authorization: token },
      });
      alert("Event deleted");
      navigate("/events");
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  if (!event) {
    return (
      <>
        <style>{styles}</style>
        <div className="hed-page">
          <Navbar />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh", color: "rgba(255,255,255,.4)", fontFamily: "'Syne',sans-serif", fontWeight: 700 }}>
            Loading…
          </div>
        </div>
      </>
    );
  }

  const userId = localStorage.getItem("userId");
  const isJoined = event.attendees.includes(userId);
  const isCreator = event.createdBy === userId;

  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(event.location)}&output=embed`;

  const total = event.attendees.length;
  // capacity — use event.capacity if available, otherwise leave undefined
  const capacity = event.capacity ?? null;
  const pct = capacity ? Math.round((total / capacity) * 100) : null;
  const isFull = capacity ? total >= capacity : false;

  // Bubbles: show up to 16 coloured bubbles + overflow count
  const bubbleCount = Math.min(total, BUBBLE_COLORS.length);
  const overflow = total > BUBBLE_COLORS.length ? total - BUBBLE_COLORS.length : 0;

  return (
    <>
      <style>{styles}</style>
      <div className="hed-page">
        <Navbar />

        {/* ── HERO ── */}
        <div className="hed-hero">
          <div className="hed-hero-mesh" />
          <div className="hed-orb1" />
          <div className="hed-orb2" />
          <div className="hed-hero-inner">
            {/* Back pill */}
            <button className="hed-back-pill" onClick={() => navigate("/events")}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              All Events
            </button>

            {/* Chips */}
            <div className="hed-hero-chips">
              <span className={`hed-chip ${isFull ? "hed-chip-full" : "hed-chip-open"}`}>
                ● {isFull ? "Full" : "Available"}
              </span>
            </div>

            {/* Title */}
            <h1 className="hed-hero-title">{event.title}</h1>

            {/* Meta tags */}
            <div className="hed-hero-meta">
              <div className="hed-meta-tag">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {event.location}
              </div>
              <div className="hed-meta-tag">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="3"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                {new Date(event.date).toDateString()}
              </div>
              <div className="hed-meta-tag">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                {total} attending
              </div>
            </div>
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="hed-body">

          {/* LEFT */}
          <div className="hed-left">

            {/* About */}
            <div>
              <p className="hed-section-label">About this event</p>
              <p className="hed-desc">{event.description}</p>
            </div>

            {/* Detail cards */}
            <div>
              <p className="hed-section-label">Event Details</p>
              <div className="hed-detail-grid">

                {/* Date */}
                <div className="hed-detail-card" style={{ borderColor: "rgba(43,134,197,.28)" }}>
                  <div className="hed-d-icon" style={{ background: "rgba(43,134,197,.15)", border: "1px solid rgba(43,134,197,.3)", color: "#2B86C5" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="3"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  </div>
                  <div>
                    <p className="hed-d-label">Date</p>
                    <p className="hed-d-value">{new Date(event.date).toDateString()}</p>
                  </div>
                </div>

                {/* Location */}
                <div className="hed-detail-card" style={{ borderColor: "rgba(255,60,172,.28)" }}>
                  <div className="hed-d-icon" style={{ background: "rgba(255,60,172,.15)", border: "1px solid rgba(255,60,172,.3)", color: "#FF3CAC" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div>
                    <p className="hed-d-label">Location</p>
                    <p className="hed-d-value">{event.location}</p>
                  </div>
                </div>

                {/* Attendees */}
                <div className="hed-detail-card" style={{ borderColor: "rgba(56,239,125,.28)" }}>
                  <div className="hed-d-icon" style={{ background: "rgba(56,239,125,.15)", border: "1px solid rgba(56,239,125,.3)", color: "#38EF7D" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  </div>
                  <div>
                    <p className="hed-d-label">Attendees</p>
                    <p className="hed-d-value" style={{ color: "#38EF7D" }}>
                      {capacity ? `${total} / ${capacity}` : total}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Capacity bar — only shown if capacity is set */}
            {capacity && (
              <div>
                <p className="hed-section-label">Capacity</p>
                <div className="hed-cap-card">
                  <div className="hed-cap-row">
                    <span className="hed-cap-text">
                      <span style={{ color: pct >= 90 ? "#FF3CAC" : "#38EF7D", fontWeight: 800 }}>{total}</span>
                      <span style={{ color: "rgba(255,255,255,.3)" }}> / {capacity} spots filled</span>
                    </span>
                    <span className="hed-cap-pct" style={{ color: pct >= 90 ? "#FF3CAC" : "#38EF7D" }}>{pct}%</span>
                  </div>
                  <div className="hed-bar-track">
                    <div
                      className="hed-bar-fill"
                      style={{
                        width: `${pct}%`,
                        background: pct >= 90
                          ? "linear-gradient(90deg,#FF3CAC,#FF3CACbb)"
                          : "linear-gradient(90deg,#38EF7D,#38EF7Dbb)",
                        boxShadow: pct >= 90 ? "0 0 12px #FF3CAC88" : "0 0 12px #38EF7D88",
                      }}
                    />
                  </div>
                  <p className="hed-cap-hint">
                    {capacity - total > 0 ? `${capacity - total} spots still open` : "No spots left"}
                  </p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div>
              <p className="hed-section-label">Actions</p>
              <div className="hed-action-row">
                {isJoined ? (
                  <button className="hed-action-btn hed-btn-leave" onClick={leaveEvent}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                    Leave Event
                  </button>
                ) : (
                  <button className="hed-action-btn hed-btn-join" onClick={joinEvent}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="16" y1="11" x2="22" y2="11"/></svg>
                    Join Event
                  </button>
                )}

                {isCreator && (
                  <div className="hed-del-wrap">
                    <button className="hed-del-btn" aria-label="Delete event" onClick={deleteEvent}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                    </button>
                    <span className="hed-del-tip">Delete event</span>
                  </div>
                )}

                <button className="hed-action-btn hed-btn-ghost" onClick={() => navigate("/events")}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                  Back
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="hed-right">

            {/* Map card */}
            <div className="hed-map-card">
              <div className="hed-map-header">
                <div className="hed-map-header-left">
                  <div className="hed-map-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div>
                    <p className="hed-map-title">Event Location</p>
                    <p className="hed-map-addr">{event.location}</p>
                  </div>
                </div>
                <a
                  className="hed-maps-link"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  Open
                </a>
              </div>

              <div className="hed-map-wrap">
                <iframe
                  title="map"
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: "block" }}
                  loading="lazy"
                />
              </div>

              <div className="hed-map-footer">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span className="hed-map-footer-text">{event.location}</span>
              </div>
            </div>

            {/* Attendees bubbles */}
            <div className="hed-att-card">
              <div className="hed-att-header">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                <span className="hed-att-title">Who's going</span>
                <span className="hed-att-badge">{total}</span>
              </div>
              <div className="hed-bubbles">
                {BUBBLE_COLORS.slice(0, bubbleCount).map((color, i) => (
                  <div
                    key={i}
                    className="hed-bubble"
                    style={{ background: color, animationDelay: `${i * 0.04}s` }}
                  />
                ))}
                {overflow > 0 && (
                  <div className="hed-bubble-extra">+{overflow}</div>
                )}
                {total === 0 && (
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,.25)", fontWeight: 600 }}>
                    No attendees yet — be the first!
                  </span>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default EventDetailsPage;
