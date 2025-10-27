import React, { useState, useEffect } from 'react';
import API from './api';
import ProposalForm from './components/ProposalForm';
import ProposalList from './components/ProposalList';
import CompanyProposalsPreview from './components/CompanyProposalsPreview';
import SearchBar from './components/SearchBar'; // ✅ Search bar component
import './styles.css'; // ✅ Stylesheet for layout & visuals

function App() {
  const [proposals, setProposals] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');

  // Fetch proposals from backend
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

  // Refresh list after adding new proposal
  const handleNewProposal = () => {
    fetchProposals();
  };

  // Track company name from form input
  const handleCompanyChange = (company) => {
    setSelectedCompany(company);
  };

  // Filter proposals when typing a company name
  const filteredByCompany = proposals.filter(
    (p) =>
      selectedCompany &&
      p.company_name.toLowerCase().includes(selectedCompany.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1 className="app-title">Sales & Sponsorship Tracker</h1>

      {/* 🔍 Global Search Section */}
      <section className="search-section">
        <SearchBar proposals={proposals} />
      </section>

      {/* 📝 Form Section */}
      <section className="form-section">
        <ProposalForm
          onNewProposal={handleNewProposal}
          onCompanyChange={handleCompanyChange}
          proposals={proposals} // ✅ FIX: pass proposals to avoid "undefined.find"
        />
      </section>

      {/* 🏢 Company Preview Section */}
      {selectedCompany && (
        <section className="preview-section">
          <CompanyProposalsPreview
            company={selectedCompany}
            proposals={filteredByCompany}
          />
        </section>
      )}

      {/* 📊 Table List Section */}
      <section className="list-section">
        <ProposalList proposals={proposals} />
      </section>
    </div>
  );
}

export default App;
