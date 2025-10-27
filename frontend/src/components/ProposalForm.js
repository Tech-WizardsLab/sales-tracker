// src/components/ProposalForm.js
import React, { useState } from 'react';
import API from '../api';

const eventOptions = [
  "Almacenamiento España", "Invest", "Biometano España", "Storage Polska",
  "Storage Italia", "Datacenters Italia", "Datacenters España", "Storage Chile",
  "H2 España", "Storage México"
];

const owners = [
  "Iker", "Tomás", "Sheetal", "Álvaro", "Cintia", "Ían",
  "Jesús R.", "Elena", "Ewa", "Andrea", "Belén", "Carlos"
];

const probabilityOptions = ["Low", "Medium", "High"];
const statusOptions = ["New", "Sent", "Follow-Up", "Won", "Lost"];

const ProposalForm = ({ onNewProposal, onCompanyChange, proposals }) => {
  const [formData, setFormData] = useState({
    company_name: '',
    event_name: eventOptions[0],
    category: 'Sponsorship',
    proposal_owner: owners[0],
    proposal_amount: '',
    closing_probability: '',
    whats_included: '',
    status: statusOptions[0],
  });

  const isSpeaker = formData.category === 'Speaker';

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'company_name') {
      setFormData((prev) => ({ ...prev, company_name: value }));
      onCompanyChange(value);
      return;
    }

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

    const duplicate = proposals.find(
      (p) =>
        p.company_name.toLowerCase() === formData.company_name.toLowerCase() &&
        p.event_name === formData.event_name &&
        p.proposal_owner === formData.proposal_owner
    );

    if (duplicate) {
      alert('⚠️ Duplicate proposal: this company already has a proposal for this event with the same owner.');
      return;
    }

    const fullData = {
      ...formData,
      date: new Date().toISOString().split('T')[0],
    };

    try {
      await API.post('/proposals/', fullData);
      onNewProposal();
      setFormData({
        company_name: '',
        event_name: eventOptions[0],
        category: 'Sponsorship',
        proposal_owner: owners[0],
        proposal_amount: '',
        closing_probability: '',
        whats_included: '',
        status: statusOptions[0],
      });
    } catch (error) {
      console.error('Error adding proposal:', error);
      alert('Something went wrong. Check the console.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="proposal-form" style={{ marginBottom: '2rem' }}>
      <h2>Add New Proposal</h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Company Name</label>
          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Event</label>
          <select name="event_name" value={formData.event_name} onChange={handleChange} required>
            {eventOptions.map((event) => (
              <option key={event} value={event}>{event}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleChange} required>
            <option value="Sponsorship">Sponsorship</option>
            <option value="Tickets">Tickets</option>
            <option value="Speaker">Speaker</option>
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Proposal Owner</label>
          <select name="proposal_owner" value={formData.proposal_owner} onChange={handleChange} required>
            {owners.map((owner) => (
              <option key={owner} value={owner}>{owner}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Proposal Amount (€)</label>
          <input
            name="proposal_amount"
            type="number"
            step="0.01"
            value={formData.proposal_amount}
            onChange={handleChange}
            disabled={isSpeaker}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Closing Probability</label>
          <select
            name="closing_probability"
            value={formData.closing_probability}
            onChange={handleChange}
            disabled={isSpeaker}
            required={!isSpeaker}
          >
            <option value="">Select</option>
            {probabilityOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', minWidth: '300px' }}>
          <label>What's Included</label>
          <textarea
            name="whats_included"
            value={formData.whats_included}
            onChange={handleChange}
            required
            rows="3"
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            {statusOptions.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      <br />
      <button type="submit">Add Proposal</button>
    </form>
  );
};

export default ProposalForm;
