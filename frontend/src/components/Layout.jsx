import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div style={S.page}>
      <Navbar />

      <main style={S.content}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

const S = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#070211",   // 👈 your theme color
  },

  content: {
    flex: 1,   // 👈 THIS IS THE KEY
  },
};