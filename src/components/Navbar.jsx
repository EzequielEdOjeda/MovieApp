import { useState } from "react";
import "./Navbar.css";

export default function Navbar({ currentTab, setTab }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav">
      <h1 className="nav-logo">🎬 MovieApp</h1>

      <div className={`nav-links ${open ? "open" : ""}`}>
        <button
          className={currentTab === "movies" ? "active" : ""}
          onClick={() => { setTab("movies"); setOpen(false); }}
        >
          Películas
        </button>
        <button
          className={currentTab === "series" ? "active" : ""}
          onClick={() => { setTab("series"); setOpen(false); }}
        >
          Series
        </button>
        <button
          className={currentTab === "favorites" ? "active" : ""}
          onClick={() => { setTab("favorites"); setOpen(false); }}
        >
          Favoritos
        </button>
      </div>

      <div className="hamburger" onClick={() => setOpen(!open)}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
}
