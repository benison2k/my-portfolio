// src/main.jsx or src/index.jsx
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import LoadingScreen from './components/LoadingScreen';
import './styles/tailwind.css'; // or your global CSS

function Root() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
    }, 1500); // Simulate loading delay (1.5s)

    return () => clearTimeout(delay);
  }, []);

  return (
    <React.StrictMode>
      {loading ? (
        <LoadingScreen />
      ) : (
        <BrowserRouter>
          <App />
        </BrowserRouter>
      )}
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
