import React from 'react';

const CompanyProposalsPreview = ({ company, proposals }) => {
  if (proposals.length === 0) return null;

  return (
    <div style={{ margin: '2rem 0' }}>
      <h3>Existing Proposals for <em>{company}</em></h3>
      <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>Event</th>
            <th>Owner</th>
            <th>Category</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {proposals.map((p) => (
            <tr key={p.id}>
              <td>{p.event_name}</td>
              <td>{p.proposal_owner}</td>
              <td>{p.category}</td>
              <td>{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyProposalsPreview;
