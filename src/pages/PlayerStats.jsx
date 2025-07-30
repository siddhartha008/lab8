import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPlayerById } from '../services/client';

function PlayerStats() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPlayer();
  }, [id]);

  const fetchPlayer = async () => {
    try {
      setLoading(true);
      const { data, error } = await getPlayerById(id);

      if (error) {
        setError(error.message);
        return;
      }

      setPlayer(data);
    } catch (err) {
      setError('Failed to fetch player data');
      console.error('Error fetching player:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading player stats...</p>
      </div>
    );
  }

  if (error || !player) {
    return (
      <div className="error-container">
        <h2>Player not found</h2>
        <p>{error || "The player you're looking for doesn't exist."}</p>
        <Link to="/player-gallery" className="btn btn-primary">
          Back to Gallery
        </Link>
      </div>
    );
  }

  return (
    <div className="player-stats-container">
      <div className="stats-header">
        <button onClick={() => navigate('/player-gallery')} className="back-btn">
          ← Back to Gallery
        </button>
        <h1>{player.playerName} - Statistics</h1>
        <div className="player-info">
          <span className="position-badge">{player.position}</span>
          <span className="jersey-number">#{player.jerseyNumber || 'N/A'}</span>
        </div>
      </div>

      <div className="stats-content">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{player.gamesPlayed || 0}</div>
            <div className="stat-label">Games Played</div>
          </div>

          <div className="stat-card">
            <div className="stat-value">{player.goalsScored || 0}</div>
            <div className="stat-label">Goals Scored</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerStats;
