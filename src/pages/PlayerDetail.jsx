import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPlayers } from '../services/client';

function PlayerDetail() {
  const navigate = useNavigate();
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [playerData, setPlayerData] = useState(null);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch players from Supabase
  useEffect(() => {
    fetchPlayers();
  }, []);

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
      setPlayerData(player);
    } else {
      setPlayerData(null);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading players...</p>
      </div>
    );
  }

  if (error || players.length === 0) {
    return (
      <div className="error-container">
        <h2>No players</h2>
        <p>{error || "No players have been added yet. Start by creating your first player."}</p>
        <div className="button-group">
          <button onClick={() => navigate('/create-player')} className="btn btn-primary">
            Create Player
          </button>
          <button onClick={() => navigate('/')} className="btn btn-secondary">
          Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="player-detail-container">
      <div className="form-header">
        <h1>Player Details</h1>
        <p>Select a player to view their information</p>
      </div>

      <div className="player-selector">
        <label htmlFor="player-select">Select Player to View:</label>
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

      {playerData && (
        <div className="player-detail-content">
          <div className="player-header">
            <h2>{playerData.playerName}</h2>
            <div className="player-basic-info">
              <span className="position-badge">{playerData.position}</span>
              <span className="jersey-number">#{playerData.jerseyNumber || 'N/A'}</span>
            </div>
          </div>

          <div className="player-info-section">
            <h3>Basic Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Position:</label>
                <span>{playerData.position}</span>
              </div>
              <div className="info-item">
                <label>Jersey Number:</label>
                <span>#{playerData.jerseyNumber || 'N/A'}</span>
              </div>
              <div className="info-item">
                <label>Games Played:</label>
                <span>{playerData.gamesPlayed || 0}</span>
              </div>
              <div className="info-item">
                <label>Goals Scored:</label>
                <span>{playerData.goalsScored || 0}</span>
              </div>
            </div>
          </div>

          <div className="player-actions">
            <button onClick={() => navigate('/')} className="btn btn-secondary">
              Go Home
            </button>
            <button onClick={() => navigate(`/update-player?playerId=${playerData.id}`)} className="btn btn-primary">
              Edit Player
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlayerDetail; 