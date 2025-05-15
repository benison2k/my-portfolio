import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar({ userName, theme, toggleTheme }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <nav className={`navbar ${theme}`}>
        <div className="logo">
          <span className="material-icons logo-icon">code</span> MyPortfolio
          {userName ? ` - ${userName}` : ''}
        </div>
        <div className="nav-links">
          <Link to="/">
            <span className="material-icons nav-icon">home</span> Home
          </Link>
          <Link to="/about">
            <span className="material-icons nav-icon">info</span> About
          </Link>
          <Link to="/projects">
            <span className="material-icons nav-icon">folder</span> Projects
          </Link>
          <Link to="/contact">
            <span className="material-icons nav-icon">email</span> Contact
          </Link>
        </div>

        <button
          className="settings-button"
          onClick={() => setModalOpen(true)}
          aria-label="Open settings"
        >
          <span className="material-icons">settings</span>
        </button>
      </nav>

      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="settings-title"
          >
            <h2 id="settings-title">Settings</h2>

            <div className="toggle-container">
              <label htmlFor="dark-mode-toggle">Dark Mode</label>
              <input
                type="checkbox"
                id="dark-mode-toggle"
                checked={theme === 'dark'}
                onChange={toggleTheme}
              />
            </div>

            <button className="close-button" onClick={() => setModalOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
