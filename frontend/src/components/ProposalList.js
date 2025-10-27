// frontend/src/components/ProposalList.js
import React from 'react';

const ProposalList = ({ proposals }) => {
  return (
    <div>
      <h2>All Proposals</h2>

      {proposals.length === 0 ? (
        <p>No proposals yet.</p>
      ) : (
        <table border="1" cellPadding="6" style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th>Date</th> {/* ✅ NEW COLUMN */}
              <th>Company</th>
              <th>Event</th>
              <th>Category</th>
              <th>Owner</th>
              <th>Amount (€)</th>
              <th>Probability</th>
              <th>What's Included</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {proposals.map((p) => (
              <tr key={p.id}>
                <td>{p.date || '-'}</td> {/* ✅ DISPLAY DATE */}
                <td>{p.company_name}</td>
                <td>{p.event_name}</td>
                <td>{p.category}</td>
                <td>{p.proposal_owner}</td>
                <td>{p.proposal_amount || '-'}</td>
                <td>{p.closing_probability || '-'}</td>
                <td>{p.whats_included}</td>
                <td>{p.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProposalList;
