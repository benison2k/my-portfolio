import React, { useEffect, useState } from 'react';

function LoadingScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [loadingText, setLoadingText] = useState('Loading');
  const [showHello, setShowHello] = useState(false);

  useEffect(() => {
    if (progress < 100) {
      const interval = setInterval(() => {
        setProgress((oldProgress) => {
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 100);
        });
      }, 200);
      return () => clearInterval(interval);
    } else {
      setLoadingText('');
      setShowHello(true);
      setDone(true);

      setTimeout(() => {
        setFadeOut(true);
      }, 1500);
    }
  }, [progress]);

  useEffect(() => {
    if (fadeOut) {
      const timer = setTimeout(() => {
        onFinish();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [fadeOut, onFinish]);

  return (
    <div
      style={{
        ...styles.container,
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 1s ease-in-out',
      }}
    >
      {/* Loading text with spinner icon */}
      <p
        style={{
          ...styles.loadingText,
          opacity: loadingText ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span
          className="material-icons"
          style={{
            animation: 'spin 2s linear infinite',
            fontSize: '2rem',
            color: '#3b82f6',
          }}
        >
          autorenew
        </span>
        {loadingText}
      </p>

      {/* Hello world text with check_circle icon */}
      <p
        style={{
          ...styles.helloText,
          opacity: showHello ? 1 : 0,
          transform: showHello ? 'scale(1)' : 'scale(0.8)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
          position: 'absolute',
          marginTop: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: '#3b82f6',
        }}
      >
        <span
          className="material-icons"
          style={{
            fontSize: '2rem',
            color: '#3b82f6',
            opacity: showHello ? 1 : 0,
            transition: 'opacity 0.8s ease',
          }}
        >
          check_circle
        </span>
        {'<hello world/>'}
      </p>

      {/* Progress bar */}
      <div style={styles.barContainer}>
        <div style={{ ...styles.bar, width: `${progress}%` }} />
      </div>

      <style>{`
        @keyframes loadingMove {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    color: '#f8fafc',
    fontFamily: "'Poppins', sans-serif",
    position: 'relative',
  },
  loadingText: {
    fontSize: '1.8rem',
    fontWeight: '600',
    marginBottom: '1.5rem',
  },
  helloText: {
    fontSize: '1.8rem',
    fontWeight: '600',
  },
  barContainer: {
    width: '40%',
    height: '8px',
    backgroundColor: '#334155',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '1.5rem',
  },
  bar: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: '4px 0 0 4px',
    transition: 'width 0.2s ease-in-out',
  },
};

export default LoadingScreen;
