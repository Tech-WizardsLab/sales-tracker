// frontend/src/components/SearchBar.js
import React, { useState } from 'react';

const SearchBar = ({ proposals }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    const searchTerms = value.toLowerCase().split(/\s+/).filter(Boolean);

    const filtered = proposals.filter((p) =>
      searchTerms.every((term) =>
        p.company_name.toLowerCase().includes(term) ||
        p.event_name.toLowerCase().includes(term) ||
        p.proposal_owner.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
      )
    );

    setResults(filtered);
  };

  return (
    <div className="form-section">
      <label><strong>🔎 General Search</strong></label>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search company, event, owner, category..."
        style={{ width: '100%', padding: '8px', marginTop: '0.5rem' }}
      />

      {query && (
        <div style={{ marginTop: '1rem' }}>
          <h4>Search Results ({results.length})</h4>
          {results.length === 0 ? (
            <p>No results found.</p>
          ) : (
            <ul>
              {results.map((r) => (
                <li key={r.id}>
                  <strong>{r.company_name}</strong> | {r.event_name} | {r.proposal_owner} | {r.category}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
