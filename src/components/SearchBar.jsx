import "./SearchBar.css";

export default function SearchBar({ query, setQuery }) {
  return (
    <div className="search-container">
      <input 
        type="text"
        placeholder="Buscar películas o series..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
