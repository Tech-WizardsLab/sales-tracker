// frontend/src/App.js
import React from 'react';
import ProposalForm from './components/ProposalForm';
import ProposalList from './components/ProposalList';

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Sales & Sponsorship Tracker</h1>
      <ProposalForm />
      <ProposalList />
    </div>
  );
}

export default App;
