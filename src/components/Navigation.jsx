import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/" className="brand-link">
            <h2>Player Manager</h2>
          </Link>
        </div>
        
        <div className="nav-links">
         
          <Link 
            to="/create-player" 
            className={`nav-link ${isActive('/create-player') ? 'active' : ''}`}
          >
            Create Player
          </Link>
          <Link 
            to="/player-gallery" 
            className={`nav-link ${isActive('/player-gallery') ? 'active' : ''}`}
          >
            Gallery
          </Link>
          <Link
            to="/update-player"
            className={`nav-link ${isActive('/update-player') ? 'active' : ''}`}
          >
            Update Player
          </Link>
          <Link
            to="/player-detail"
            className={`nav-link ${isActive('/player-detail') ? 'active' : ''}`}
          >
            Player Details
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation; 