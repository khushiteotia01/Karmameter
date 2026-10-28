
import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";

type RecordItem = {
  id: string;
  title: string;
  type: string;
  description: string;
  sourceName: string;
  sourceUrl: string | null;
  status: string;
};

function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<RecordItem[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch() {
    if (!search.trim()) {
      setResults([]);
      setSearched(false);
      setError("Enter a search term first.");
      return;
    }

    setLoading(true);
    setError("");
    setSearched(false);

    try {
      const response = await fetch(
        `http://localhost:5000/api/search?q=${encodeURIComponent(search)}`
      );

      if (!response.ok) {
        throw new Error("Search request failed.");
      }

      const data: { results: RecordItem[] } = await response.json();

      setResults(data.results);
      setSearched(true);
    } catch {
      setError("Could not connect to the backend. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <Header />

      <main>
        <section className="hero">
          <h2>Find public records.</h2>
          <p>
            Search government records, understand the information,
            and verify the original source.
          </p>

          <SearchBar
            value={search}
            onChange={setSearch}
            onSearch={handleSearch}
          />

          {loading && <p role="status">Searching...</p>}
          {error && <p role="alert">{error}</p>}
        </section>

        {searched && (
          <section className="results">
            <h2>Search results ({results.length})</h2>

            {results.length === 0 ? (
              <p>No matching records found. Try another search.</p>
            ) : (
              <div className="cards">
                {results.map((record) => (
                  <article className="card" key={record.id}>
                    <p>{record.type}</p>
                    <h3>{record.title}</h3>
                    <p>{record.description}</p>
                    <p><strong>Status:</strong> {record.status}</p>
                    <p><strong>Source:</strong> {record.sourceName}</p>

                    {record.sourceUrl && (
                      <a
                        href={record.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View official source
                      </a>
                    )}
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        <section className="browse">
          <h2>Browse records</h2>
          <div className="cards">
            <div className="card">
              <h3>Government</h3>
              <p>Government orders, notices and official records.</p>
            </div>
            <div className="card">
              <h3>Courts</h3>
              <p>Publicly available court-related records.</p>
            </div>
            <div className="card">
              <h3>Companies</h3>
              <p>Public corporate and regulatory information.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
