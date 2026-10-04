import { useState } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");

  return (
    <div className="app">
      <header>
        <h1>Karmameter</h1>
        <p>Public records, made easier to find.</p>
      </header>

      <main>
        <section className="hero">
          <h2>Find public records.</h2>

          <p>
            Search government records, understand the information,
            and verify the original source.
          </p>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search public records..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button onClick={() => console.log("Searching:", search)}>
              Search
            </button>
          </div>
        </section>

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