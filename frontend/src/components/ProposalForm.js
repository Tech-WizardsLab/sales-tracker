import React, { useState } from 'react';
import API from '../api';

const ProposalForm = () => {
  const [formData, setFormData] = useState({
    company_name: '',
    event_name: '',
    category: 'Sponsorship',
    proposal_owner: '',
    proposal_amount: '',
    closing_probability: '',
    whats_included: '',
    status: 'New',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Reset fields if category is changed to Speaker
    if (name === 'category' && value === 'Speaker') {
      setFormData((prev) => ({
        ...prev,
        category: value,
        proposal_amount: '',
        closing_probability: '',
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/proposals/', formData);
      alert(response.data.message);
      setFormData({
        company_name: '',
        event_name: '',
        category: 'Sponsorship',
        proposal_owner: '',
        proposal_amount: '',
        closing_probability: '',
        whats_included: '',
        status: 'New',
      });
    } catch (error) {
      console.error('Error adding proposal:', error);
      alert('Something went wrong. Check the console.');
    }
  };

  const isSpeaker = formData.category === 'Speaker';

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <h2>Add New Proposal</h2>

      <input
        name="company_name"
        placeholder="Company Name"
        value={formData.company_name}
        onChange={handleChange}
        required
      />

      <input
        name="event_name"
        placeholder="Event Name"
        value={formData.event_name}
        onChange={handleChange}
        required
      />

      <select name="category" value={formData.category} onChange={handleChange} required>
        <option value="Sponsorship">Sponsorship</option>
        <option value="Tickets">Tickets</option>
        <option value="Speaker">Speaker</option>
      </select>

      <input
        name="proposal_owner"
        placeholder="Proposal Owner"
        value={formData.proposal_owner}
        onChange={handleChange}
        required
      />

      <input
        name="proposal_amount"
        type="number"
        step="0.01"
        placeholder="Proposal Amount (€)"
        value={formData.proposal_amount}
        onChange={handleChange}
        disabled={isSpeaker}
      />

      <input
        name="closing_probability"
        type="number"
        min="0"
        max="100"
        placeholder="Closing Probability (%)"
        value={formData.closing_probability}
        onChange={handleChange}
        disabled={isSpeaker}
      />

      <textarea
        name="whats_included"
        placeholder="What's included in the package?"
        value={formData.whats_included}
        onChange={handleChange}
        required
      />

      <select name="status" value={formData.status} onChange={handleChange}>
        <option value="New">New</option>
        <option value="Sent">Sent</option>
        <option value="Follow-Up">Follow-Up</option>
        <option value="Won">Won</option>
        <option value="Lost">Lost</option>
      </select>

      <br />
      <button type="submit">Add Proposal</button>
    </form>
  );
};

export default ProposalForm;
