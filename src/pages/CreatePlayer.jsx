import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPlayer } from '../services/client';

function CreatePlayer() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    jerseyNumber: '',
    gamesPlayed: '',
    goalsScored: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Convert string values to numbers for numeric fields
      const playerData = {
        name: formData.name,
        position: formData.position,
        jerseyNumber: parseInt(formData.jerseyNumber) || null,
        gamesPlayed: parseInt(formData.gamesPlayed) || 0,
        goalsScored: parseInt(formData.goalsScored) || 0,
      };

      const { data, error } = await createPlayer(playerData);

      if (error) {
        setError(error.message);
        return;
      }

      alert('Player created successfully!');
      navigate('/player-gallery');
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Error creating player:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-player-container">
      <div className="form-header">
        <h1>Create New Player</h1>
        <p>Add a new player to your roster</p>
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="player-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="position">Position *</label>
            <select
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
            >
              <option value="">Select Position</option>
              <option value="Forward">Forward</option>
              <option value="Midfielder">Midfielder</option>
              <option value="Defender">Defender</option>
              <option value="Goalkeeper">Goalkeeper</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="jerseyNumber">Jersey Number</label>
            <input
              type="number"
              id="jerseyNumber"
              name="jerseyNumber"
              value={formData.jerseyNumber}
              onChange={handleChange}
              min="1"
              max="99"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="gamesPlayed">Games Played</label>
            <input
              type="number"
              id="gamesPlayed"
              name="gamesPlayed"
              value={formData.gamesPlayed}
              onChange={handleChange}
              min="0"
              max="100"
            />
          </div>

          <div className="form-group">
            <label htmlFor="goalsScored">Goals Scored</label>
            <input
              type="number"
              id="goalsScored"
              name="goalsScored"
              value={formData.goalsScored}
              onChange={handleChange}
              min="0"
              max="100"
            />
          </div>
        </div>
        <div className="form-actions">
          <button type="button" onClick={() => navigate('/')} className="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Creating...' : 'Create Player'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePlayer; 