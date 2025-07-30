import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllPlayers } from '../services/client';

function PlayerGallery() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPosition, setFilterPosition] = useState('');
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

  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.playerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = filterPosition === '' || player.position === filterPosition;
    return matchesSearch && matchesPosition;
  });

  const getPositionColor = (position) => {
    switch (position) {
      case 'Forward': return '#ff6b6b';
      case 'Midfielder': return '#4ecdc4';
      case 'Defender': return '#45b7d1';
      case 'Goalkeeper': return '#96ceb4';
      default: return '#95a5a6';
    }
  };

  return (
    <div className="player-gallery-container">
      <div className="gallery-header">
        <h1>Player Gallery</h1>
        <p>Browse and manage your team roster</p>
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
      </div>

      <div className="gallery-controls">
        <div className="search-section">
          <input
            type="text"
            placeholder="Search players by name or team..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-section">
          <select
            value={filterPosition}
            onChange={(e) => setFilterPosition(e.target.value)}
            className="filter-select"
          >
            <option value="">All Positions</option>
            <option value="Forward">Forward</option>
            <option value="Midfielder">Midfielder</option>
            <option value="Defender">Defender</option>
            <option value="Goalkeeper">Goalkeeper</option>
          </select>
        </div>

        <div className="add-player-section">
          <Link to="/create-player" className="btn btn-primary">
            + Add New Player
          </Link>
        </div>
      </div>

      <div className="players-grid">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading players...</p>
          </div>
        ) : filteredPlayers.length === 0 ? (
          <div className="no-players">
            <h3>No players added</h3>
            <p>Start by adding your first player to the roster</p>
          </div>
        ) : (
          filteredPlayers.map(player => (
            <div key={player.id} className="player-card">
              <div className="player-card-header">
                <div className="player-number">#{player.jerseyNumber || 'N/A'}</div>
              </div>

              <div className="player-card-body">
                <h3 className="player-name">{player.playerName}</h3>
                <p className="player-position">{player.position}</p>

                <div className="player-card-actions">
                  <Link to={`/player-stats/${player.id}`} className="btn btn-primary">
                    View Stats
                  </Link>
                  <Link to={`/update-player/${player.id}`} className="btn btn-secondary">
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="gallery-summary">
        <p>Showing {filteredPlayers.length} of {players.length} players</p>
      </div>
    </div>
  );
}

export default PlayerGallery; 