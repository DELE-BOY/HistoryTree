import React, { useState } from 'react';
import './SubmissionForm.css';

const SubmissionForm = ({ selectedDate, country, onClose }) => {
  const [formData, setFormData] = useState({
    topic: '',
    description: '',
    significance: '',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.topic || !formData.description || !formData.significance) {
      setMessage('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/submit-entry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          date: selectedDate,
          country: country,
          topic: formData.topic,
          description: formData.description,
          significance: formData.significance,
          imageUrl: formData.imageUrl
        })
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('✓ Submission sent successfully! Thank you for your contribution.');
        setFormData({
          topic: '',
          description: '',
          significance: '',
          imageUrl: ''
        });
        setTimeout(() => onClose(), 2000);
      } else {
        setMessage(`Error: ${result.message || 'Failed to submit entry'}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const dateObj = new Date(selectedDate);
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="submission-modal-overlay" onClick={onClose}>
      <div className="submission-form-container" onClick={(e) => e.stopPropagation()}>
        <div className="form-header">
          <h2>Submit New Entry</h2>
          <button className="form-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="form-date-display">
          <p><strong>Date:</strong> {formattedDate}</p>
          <p><strong>Country:</strong> {country}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="topic">Topic/Title *</label>
            <input
              type="text"
              id="topic"
              name="topic"
              value={formData.topic}
              onChange={handleInputChange}
              placeholder="e.g., Independence Declaration"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Detailed description of the event..."
              rows="5"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="significance">Historical Significance *</label>
            <textarea
              id="significance"
              name="significance"
              value={formData.significance}
              onChange={handleInputChange}
              placeholder="Why is this event historically important?"
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl">Photo URL (credible source)</label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg - Provide a credible source link (non-AI)"
            />
            <small className="form-hint">
              Please provide links to historically accurate images from credible sources only. 
              AI-generated images cannot be used.
            </small>
          </div>

          {message && (
            <div className={`form-message ${message.includes('Error') ? 'error' : 'success'}`}>
              {message}
            </div>
          )}

          <div className="form-actions">
            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Entry'}
            </button>
            <button 
              type="button" 
              className="cancel-btn"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmissionForm;
