// frontend/src/components/ProposalList.js
import React, { useEffect, useState } from 'react';
import API from '../api';

const ProposalList = () => {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    try {
      const response = await API.get('/proposals/');
      setProposals(response.data);
    } catch (error) {
      console.error('Error fetching proposals:', error);
    }
  };

  return (
    <div>
      <h2>All Proposals</h2>
      {proposals.length === 0 ? (
        <p>No proposals yet.</p>
      ) : (
        <table border="1" cellPadding="6" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Company</th>
              <th>Event</th>
              <th>Category</th>
              <th>Owner</th>
              <th>Amount (€)</th>
              <th>Probability (%)</th>
              <th>What's Included</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {proposals.map((p) => (
              <tr key={p.id}>
                <td>{p.company_name}</td>
                <td>{p.event_name}</td>
                <td>{p.category}</td>
                <td>{p.proposal_owner}</td>
                <td>{p.proposal_amount ?? '-'}</td>
                <td>{p.closing_probability ?? '-'}</td>
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
