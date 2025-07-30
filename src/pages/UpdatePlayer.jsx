import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllPlayers, updatePlayer, deletePlayer } from '../services/client';

function UpdatePlayer() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get player ID from URL
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    jerseyNumber: '',
    gamesPlayed: '',
    goalsScored: ''
  });

  // Fetch players from Supabase
  useEffect(() => {
    fetchPlayers();
  }, []);

  // Auto-select player if ID is provided in URL
  useEffect(() => {
    if (id && players.length > 0) {
      const player = players.find(p => p.id === parseInt(id));
      if (player) {
        setSelectedPlayer(id);
        setFormData({
          name: player.playerName,
          position: player.position,
          jerseyNumber: player.jerseyNumber?.toString() || '',
          gamesPlayed: player.gamesPlayed?.toString() || '',
          goalsScored: player.goalsScored?.toString() || '',
        });
      }
    }
  }, [id, players]);

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const { data, error } = await getAllPlayers();

      if (error) {
        setError(error.message);
        return;
      }

      setPlayers(data || []);
    } catch (err) {
      setError('Failed to fetch players');
      console.error('Error fetching players:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayerSelect = (e) => {
    const playerId = e.target.value;
    setSelectedPlayer(playerId);

    if (playerId) {
      const player = players.find(p => p.id === parseInt(playerId));
      if (player) {
        setFormData({
          name: player.playerName,
          position: player.position,
          jerseyNumber: player.jerseyNumber?.toString() || '',
          gamesPlayed: player.gamesPlayed?.toString() || '',
          goalsScored: player.goalsScored?.toString() || '',
        });
      }
    } else {
      setFormData({
        name: '',
        position: '',
        jerseyNumber: '',
        gamesPlayed: '',
        goalsScored: '',
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError(null);

    try {
      const playerData = {
        name: formData.name,
        position: formData.position,
        jerseyNumber: parseInt(formData.jerseyNumber) || null,
        gamesPlayed: parseInt(formData.gamesPlayed) || 0,
        goalsScored: parseInt(formData.goalsScored) || 0,
      };

      const { data, error } = await updatePlayer(selectedPlayer, playerData);

      if (error) {
        setError(error.message);
        return;
      }

      alert('Player updated successfully!');
      navigate('/player-gallery');
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Error updating player:', err);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedPlayer) return;

    const selectedPlayerData = players.find(p => p.id === parseInt(selectedPlayer));
    const confirmDelete = window.confirm(`Are you sure you want to delete ${selectedPlayerData?.playerName}? This action cannot be undone.`);

    if (!confirmDelete) return;

    try {
      setUpdating(true);
      setError(null);

      const { error } = await deletePlayer(selectedPlayer);

      if (error) {
        setError(error.message);
        return;
      }

      alert('Player deleted successfully!');
      // Reset form and refresh players list
      setSelectedPlayer('');
      setFormData({
        name: '',
        position: '',
        jerseyNumber: '',
        gamesPlayed: '',
        goalsScored: ''
      });
      fetchPlayers(); // Refresh the players list
    } catch (err) {
      setError('An unexpected error occurred while deleting');
      console.error('Error deleting player:', err);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="update-player-container">
      <div className="form-header">
        <h1>Update Player</h1>
        <p>Select a player and update their information</p>
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading players...</p>
        </div>
      ) : (
        <div className="player-selector">
          <label htmlFor="player-select">Select Player to Update:</label>
          <select
            id="player-select"
            value={selectedPlayer}
            onChange={handlePlayerSelect}
            className="player-select"
          >
            <option value="">Choose a player...</option>
            {players.map(player => (
              <option key={player.id} value={player.id}>
                {player.playerName} - {player.position} (#{player.jerseyNumber || 'N/A'})
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedPlayer && (
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
            <button type="submit" className="btn btn-primary" disabled={updating}>
              {updating ? 'Updating...' : 'Update Player'}
            </button>
            <button type="button" onClick={handleDelete} className="btn btn-danger" disabled={updating}>
              {updating ? 'Deleting...' : 'Delete Player'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default UpdatePlayer; 