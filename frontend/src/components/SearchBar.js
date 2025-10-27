// /workspaces/sales-tracker/frontend/src/components/SearchBar.js
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

  const getWeightedAmount = (items) => {
    return items.reduce((total, proposal) => {
      const amount = parseFloat(proposal.proposal_amount) || 0;
      const rawProb = proposal.closing_probability;
      const prob = typeof rawProb === 'string' ? rawProb.toLowerCase() : rawProb;

      if (prob === 'low') return total + amount * 0.25;
      if (prob === 'medium') return total + amount * 0.5;
      if (prob === 'high') return total + amount * 0.75;

      // Fallback for old numeric values
      if (prob === 25) return total + amount * 0.25;
      if (prob === 50) return total + amount * 0.5;
      if (prob === 75) return total + amount * 0.75;

      return total;
    }, 0);
  };

  // Determine which proposals are currently shown (search or all)
  const totalResults = query ? results : proposals;

  // === Summary Calculations ===
  const weightedTotal = getWeightedAmount(totalResults);
  const proposalCount = totalResults.length;

  const getStatusCountAndAmount = (statusLabel) => {
    const filtered = totalResults.filter(
      (p) => p.status && p.status.toLowerCase() === statusLabel
    );
    const totalAmount = filtered.reduce(
      (sum, p) => sum + (parseFloat(p.proposal_amount) || 0),
      0
    );
    return { count: filtered.length, amount: totalAmount };
  };

  const won = getStatusCountAndAmount('won');
  const lost = getStatusCountAndAmount('lost');
  const sent = getStatusCountAndAmount('sent');

  // === Render ===
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

      {/* ✅ Mini Sales Summary */}
      <div
        style={{
          marginTop: '1rem',
          padding: '0.75rem',
          border: '1px solid #ccc',
          borderRadius: '6px',
          background: '#f9f9f9',
        }}
      >
        <strong>📊 Proposals Summary</strong>
        <p>🧮 Total Proposals: <strong>{proposalCount}</strong></p>
        <p>💰 Weighted Pipeline with Probability: <strong>€{weightedTotal.toFixed(2)}</strong></p>
        <p>🏆 Won Proposals: <strong>{won.count}</strong> ({won.amount ? `€${won.amount.toFixed(2)}` : '€0'})</p>
        <p>📉 Lost Proposals: <strong>{lost.count}</strong> ({lost.amount ? `€${lost.amount.toFixed(2)}` : '€0'})</p>
        <p>📤 Sent Proposals: <strong>{sent.count}</strong></p>
      </div>

      {/* 🔍 Search Results */}
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
