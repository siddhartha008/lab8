import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Soccer Players</h1>
        <p>Manage the roster of your favorite football team</p>
      </div>
      
      <div className="features-grid">
        <div className="feature-card">
          <h3>Create New Player</h3>
          <p>Add new players to your roster</p>
          <Link to="/create-player" className="btn btn-primary">
            Create Player
          </Link>
        </div>
        
        <div className="feature-card">
          <h3>Player Gallery</h3>
          <p>View all your players in one place</p>
          <Link to="/player-gallery" className="btn btn-secondary">
            View Gallery
          </Link>
        </div>
        
        <div className="feature-card">
          <h3>Update Players</h3>
          <p>Edit player information and details</p>
          <Link to="/update-player" className="btn btn-tertiary">
            Update Players
          </Link>
        </div>
        
        <div className="feature-card">
          <h3>Player Details</h3>
          <p>View detailed information about players</p>
          <Link to="/player-detail" className="btn btn-quaternary">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home; 