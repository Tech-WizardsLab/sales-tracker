// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import API from './api';
import ProposalForm from './components/ProposalForm';
import ProposalList from './components/ProposalList';
import CompanyProposalsPreview from './components/CompanyProposalsPreview';

function App() {
  const [proposals, setProposals] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');

  const fetchProposals = async () => {
    try {
      const res = await API.get('/proposals/');
      setProposals(res.data);
    } catch (err) {
      console.error('Error fetching proposals:', err);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  const handleNewProposal = () => {
    fetchProposals();
  };

  const handleCompanyChange = (company) => {
    setSelectedCompany(company);
  };

  const filteredByCompany = proposals.filter(
    (p) => selectedCompany && p.company_name.toLowerCase().includes(selectedCompany.toLowerCase())
  );

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Sales & Sponsorship Tracker</h1>

      <ProposalForm onNewProposal={handleNewProposal} onCompanyChange={handleCompanyChange} />

      {selectedCompany && (
        <CompanyProposalsPreview company={selectedCompany} proposals={filteredByCompany} />
      )}

      <ProposalList proposals={proposals} />
    </div>
  );
}

export default App;
