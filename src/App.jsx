import "./App.css";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import Favorites from "./pages/Favorites";
import { useState } from "react";

function App() {
  const [tab, setTab] = useState("movies");
  const [query, setQuery] = useState("");

  return (
    <div>
      <Navbar currentTab={tab} setTab={setTab} />
      <SearchBar query={query} setQuery={setQuery} />

      {/* Navegación */}
      {tab === "movies" && <Movies query={query} />}
      {tab === "series" && <Series query={query} />}
      {tab === "favorites" && <Favorites query={query} />}  {/* 👈 AQUI ESTÁ LA CORRECCIÓN */}
    </div>
  );
}

export default App;
