import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";



const EVENT_TYPES = [
  { value: "free",  label: "Free Entry",        emoji: "🎉" },
  { value: "paid",  label: "Paid (Contribution)", emoji: "💸" },
];

const FIELD_ICONS = {
  title:       "✏️",
  description: "📝",
  date:        "📅",
  location:    "📍",
  capacity:    "👥",
  price:       "₹",
};

export default function CreateEventPage() {
  const [title,       setTitle]       = useState("");
  const [description, setDescription] = useState("");
  const [date,        setDate]        = useState("");
  const [location,    setLocation]    = useState("");
  const [capacity,    setCapacity]    = useState("");
  const [price,       setPrice]       = useState(0);
  const [type,        setType]        = useState("free");
  const [loading,     setLoading]     = useState(false);
  const [focused,     setFocused]     = useState(null);
  const navigate = useNavigate();

  const createEvent = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/events/create`,
        {
          title,
          description,
          date,
          location,
          capacity: Number(capacity),
          price: Number(price),
        },
        { headers: { Authorization: token } }
      );
      alert("Event created successfully!");
      navigate("/events");
    } catch (error) {
      alert(error.response?.data?.message || "Error creating event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Google Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;700;800&display=swap"
        rel="stylesheet"
      />

      <Navbar />

      {/* ── Page shell ── */}
      <div style={S.page}>
        {/* Ambient blobs */}
        <div style={S.blob1} aria-hidden />
        <div style={S.blob2} aria-hidden />

        {/* ── Floating card ── */}
        <div style={S.card}>

          {/* Header */}
          <div style={S.cardHeader}>
            <div style={S.headerIconWrap}>
              <span style={S.headerIcon}>🎊</span>
            </div>
            <div>
              <h1 style={S.pageTitle}>Create an Event</h1>
              <p style={S.pageSubtitle}>Set the scene. Drop the details. Let the hype begin.</p>
            </div>
          </div>

          {/* Divider */}
          <div style={S.divider} />

          {/* ── Form ── */}
          <form onSubmit={createEvent} style={S.form} noValidate>

            {/* Title */}
            <Field
              label="Event Title"
              icon={FIELD_ICONS.title}
              focused={focused === "title"}
            >
              <input
                type="text"
                style={inputStyle(focused === "title")}
                placeholder="e.g. Rooftop Jam"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onFocus={() => setFocused("title")}
                onBlur={() => setFocused(null)}
                required
              />
            </Field>

            {/* Description */}
            <Field
              label="Description"
              icon={FIELD_ICONS.description}
              focused={focused === "description"}
            >
              <textarea
                rows={4}
                style={{ ...inputStyle(focused === "description"), resize: "vertical", lineHeight: "1.6" }}
                placeholder="What's the vibe? Dress code? Tell 'em everything…"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onFocus={() => setFocused("description")}
                onBlur={() => setFocused(null)}
              />
            </Field>

            {/* Date + Location row */}
            <div style={S.twoCol}>
              <Field
                label="Date"
                icon={FIELD_ICONS.date}
                focused={focused === "date"}
              >
                <input
                  type="date"
                  style={inputStyle(focused === "date")}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  onFocus={() => setFocused("date")}
                  onBlur={() => setFocused(null)}
                  required
                />
              </Field>

              <Field
                label="Location"
                icon={FIELD_ICONS.location}
                focused={focused === "location"}
              >
                <input
                  type="text"
                  style={inputStyle(focused === "location")}
                  placeholder="Address or venue name"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onFocus={() => setFocused("location")}
                  onBlur={() => setFocused(null)}
                  required
                />
              </Field>
            </div>

            {/* Capacity */}
            <Field
              label="Capacity"
              icon={FIELD_ICONS.capacity}
              focused={focused === "capacity"}
              hint="How many people can join?"
            >
              <input
                type="number"
                min={1}
                style={inputStyle(focused === "capacity")}
                placeholder="e.g. 50"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                onFocus={() => setFocused("capacity")}
                onBlur={() => setFocused(null)}
                required
              />
            </Field>

            {/* Event Type toggle */}
            <div style={S.fieldGroup}>
              <label style={S.label}>
                <span style={S.labelIcon}>🎟️</span>
                Event Type
              </label>
              <div style={S.typeRow}>
                {EVENT_TYPES.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    style={typeBtn(type === t.value)}
                    onClick={() => {
                      setType(t.value);
                      if (t.value === "free") setPrice(0);
                    }}
                  >
                    <span>{t.emoji}</span>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price (paid only) */}
            {type === "paid" && (
              <Field
                label="Price"
                icon={FIELD_ICONS.price}
                focused={focused === "price"}
                hint="Contribution amount per person"
              >
                <input
                  type="number"
                  min={0}
                  style={inputStyle(focused === "price")}
                  placeholder="e.g. 299"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  onFocus={() => setFocused("price")}
                  onBlur={() => setFocused(null)}
                  required
                />
              </Field>
            )}

            {/* Divider */}
            <div style={{ ...S.divider, margin: "8px 0 20px" }} />

            {/* Actions */}
            <div style={S.actions}>
              <button
                type="button"
                style={S.cancelBtn}
                onClick={() => navigate("/events")}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
              >
                Cancel
              </button>

              <button
                type="submit"
                style={loading ? { ...S.submitBtn, opacity: 0.7, cursor: "not-allowed" } : S.submitBtn}
                disabled={loading}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.boxShadow = "0 8px 32px rgba(60, 255, 109, 0.6)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 4px 22px rgba(255,60,172,0.38)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {loading ? (
                  <>
                    <Spinner />
                    Creating…
                  </>
                ) : (
                  <>
                    🚀 Launch Event
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ── Page-level CSS ── */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(0.6);
          cursor: pointer;
        }
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button { opacity: 0.4; }

        /* stagger the card in */
        .hh-create-card { animation: fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both; }

        /* scrollbar for textarea */
        textarea::-webkit-scrollbar { width: 4px; }
        textarea::-webkit-scrollbar-track { background: transparent; }
        textarea::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius:4px; }
      `}</style>
    </>
  );
}

/* ── Sub-components ── */

function Field({ label, icon, focused, hint, children }) {
  return (
    <div style={S.fieldGroup}>
      <label style={S.label}>
        <span style={S.labelIcon}>{icon}</span>
        {label}
        {hint && <span style={S.hint}> · {hint}</span>}
      </label>
      <div style={focused ? { ...S.inputWrap, ...S.inputWrapFocused } : S.inputWrap}>
        {children}
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <span
      style={{
        display: "inline-block",
        width: 15, height: 15,
        border: "2px solid rgba(255,255,255,0.3)",
        borderTopColor: "#fff",
        borderRadius: "50%",
        animation: "spin 0.7s linear infinite",
        marginRight: 8,
        verticalAlign: "middle",
      }}
    />
  );
}

/* ── Style helpers ── */

function inputStyle(focused) {
  return {
    width: "100%",
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#fff",
    fontSize: "15px",
    fontFamily: "'Syne', sans-serif",
    fontWeight: 500,
    padding: "12px 16px",
    caretColor: "#FF3CAC",
    boxSizing: "border-box",
  };
}

function typeBtn(active) {
  return {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "12px 16px",
    borderRadius: "12px",
    border: active ? "1.5px solid rgba(255,60,172,0.7)" : "1px solid rgba(255,255,255,0.1)",
    background: active
      ? "linear-gradient(135deg, rgba(255,60,172,0.18) 0%, rgba(120,75,160,0.18) 100%)"
      : "rgba(255,255,255,0.04)",
    color: active ? "#FF3CAC" : "rgba(255,255,255,0.45)",
    fontSize: "14px",
    fontWeight: active ? 700 : 500,
    fontFamily: "'Syne', sans-serif",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: active ? "0 0 18px rgba(255,60,172,0.15)" : "none",
  };
}

/* ── Static style object ── */
const S = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(ellipse at 15% 40%, rgba(120,75,160,0.18) 0%, transparent 55%)," +
      "radial-gradient(ellipse at 85% 15%, rgba(255,60,172,0.13) 0%, transparent 45%)," +
      "radial-gradient(ellipse at 60% 90%, rgba(43,134,197,0.1) 0%, transparent 50%)," +
      "#080412",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "48px 16px 80px",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Syne', sans-serif",
  },

  blob1: {
    position: "absolute",
    top: "-120px",
    right: "-80px",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(255,60,172,0.12) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  blob2: {
    position: "absolute",
    bottom: "-100px",
    left: "-60px",
    width: "350px",
    height: "350px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(43,134,197,0.1) 0%, transparent 70%)",
    pointerEvents: "none",
  },

  card: {
    position: "relative",
    zIndex: 1,
    width: "100%",
    maxWidth: "660px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: "24px",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    padding: "36px 40px 32px",
    boxShadow:
      "0 0 0 1px rgba(255,255,255,0.04) inset," +
      "0 32px 80px rgba(0,0,0,0.5)",
    animation: "fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both",
  },

  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    marginBottom: "24px",
  },
  headerIconWrap: {
    width: "56px",
    height: "56px",
    borderRadius: "16px",
    background:
      "linear-gradient(135deg, rgba(255,60,172,0.3) 0%, rgba(120,75,160,0.3) 100%)",
    border: "1px solid rgba(255,60,172,0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "26px",
    flexShrink: 0,
    boxShadow: "0 0 24px rgba(255,60,172,0.2)",
  },
  headerIcon: { lineHeight: 1 },

  pageTitle: {
    fontSize: "26px",
    fontWeight: 800,
    color: "#fff",
    margin: 0,
    lineHeight: 1.2,
    letterSpacing: "-0.5px",
  },
  pageSubtitle: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.4)",
    margin: "4px 0 0",
    fontWeight: 500,
  },

  divider: {
    height: "1px",
    background:
      "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
    margin: "0 0 28px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  twoCol: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },

  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  label: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
    fontSize: "13px",
    fontWeight: 700,
    color: "rgba(255,255,255,0.55)",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
  },
  labelIcon: { fontSize: "14px" },
  hint: {
    fontWeight: 500,
    letterSpacing: 0,
    textTransform: "none",
    color: "rgba(255,255,255,0.28)",
    fontSize: "12px",
  },

  inputWrap: {
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.04)",
    transition: "border-color 0.18s, box-shadow 0.18s",
    overflow: "hidden",
  },
  inputWrapFocused: {
    borderColor: "rgba(255,60,172,0.55)",
    boxShadow: "0 0 0 3px rgba(255,60,172,0.1)",
    background: "rgba(255,60,172,0.04)",
  },

  typeRow: {
    display: "flex",
    gap: "12px",
  },

  actions: {
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: "4px",
  },

  cancelBtn: {
    padding: "11px 22px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "transparent",
    color: "rgba(255,255,255,0.45)",
    fontSize: "14px",
    fontWeight: 600,
    fontFamily: "'Syne', sans-serif",
    cursor: "pointer",
    transition: "all 0.18s ease",
  },

  submitBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 28px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #FF3CAC 0%, #784BA0 100%)",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: 800,
    fontFamily: "'Syne', sans-serif",
    cursor: "pointer",
    transition: "all 0.18s ease",
    boxShadow: "0 4px 22px rgba(255,60,172,0.38)",
    letterSpacing: "0.01em",
  },
};
