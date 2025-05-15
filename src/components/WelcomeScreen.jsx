import React, { useState, useEffect } from 'react';

function WelcomeScreen({ onSubmit }) {
  const [name, setName] = useState('');
  const [fadeIn, setFadeIn] = useState(false);
  const [slideOut, setSlideOut] = useState(false);

  useEffect(() => {
    // Trigger fade in after mount
    const timer = setTimeout(() => setFadeIn(true), 10);
    return () => clearTimeout(timer);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (name.trim()) {
      setSlideOut(true);
      // Wait for slide out animation to finish before calling onSubmit
      setTimeout(() => {
        onSubmit(name.trim());
      }, 600); // match animation duration below
    }
  }

  return (
    <div
      style={{
        opacity: fadeIn ? 1 : 0,
        transform: slideOut ? 'translateX(-100vw)' : 'translateX(0)',
        transition: 'opacity 1s ease-in-out, transform 0.6s ease-in-out',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1e293b',
        color: '#f8fafc',
        fontFamily: "'Poppins', sans-serif",
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <h1 style={{ marginBottom: '1rem', fontSize: '2.5rem' }}>
        Welcome! What's your name?
      </h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1.25rem',
            borderRadius: '6px',
            border: 'none',
            outline: 'none',
          }}
          required
          autoFocus
        />
        <button
          type="submit"
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1.25rem',
            borderRadius: '6px',
            backgroundColor: '#3b82f6',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#2563eb')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#3b82f6')}
          disabled={slideOut} // disable button while sliding out
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default WelcomeScreen;
