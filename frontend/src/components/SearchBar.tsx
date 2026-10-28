
type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
};

function SearchBar({ value, onChange, onSearch }: SearchBarProps) {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search public records..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") onSearch();
        }}
      />

      <button onClick={onSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
