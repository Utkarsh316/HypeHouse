import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";
import IntroPage from "./pages/IntroPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EventsPage from "./pages/EventsPage";
import CreateEventPage from "./pages/CreateEventPage";
import MyEventsPage from "./pages/MyEventsPage";
import EventDetailsPage from "./pages/EventDetailsPage";



function App() {
  return (
    <Router>
      {/* 🔥 ADD THIS BLOCK */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
          style: {
            background: "#0b0618",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px",
            padding: "12px 16px",
            boxShadow: "0 0 25px rgba(255,60,172,0.35)",
          },
          success: {
            iconTheme: {
              primary: "#FF3CAC",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ff4d4f",
              secondary: "#fff",
            },
          },
        }}
      />

       
        <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
      <Route element={<Layout />}>
        <Route path="/events" element={<EventsPage />} />
        <Route path="/create-event" element={<CreateEventPage />} />
        <Route path="/my-events" element={<MyEventsPage />} />
        <Route path="/event/:id" element={<EventDetailsPage />} />
       </Route>
      </Routes>
    </Router>
  );
}

export default App;