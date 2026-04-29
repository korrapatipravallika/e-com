import "./SearchBar.css";

function SearchBar({ value, onChange }) {
  return (
    <label className="search-inline">
      <span>Search:</span>
      <input
        type="search"
        placeholder=""
        value={value}
        onChange={onChange}
      />
    </label>
  );
}

export default SearchBar;
