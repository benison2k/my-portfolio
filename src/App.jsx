import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import WelcomeScreen from './components/WelcomeScreen';

import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

function App() {
  const [loadingDone, setLoadingDone] = useState(false);
  const [userName, setUserName] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);

  // Theme state for light/dark mode
  const [theme, setTheme] = useState('light');

  // Called when loading finishes
  function handleLoadingFinish() {
    setLoadingDone(true);
    setShowWelcome(true);
  }

  // Called when WelcomeScreen submits username
  function handleWelcomeSubmit(name) {
    setUserName(name);
    setShowWelcome(false);
  }

  // Load saved theme & apply to document root on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // Toggle theme function
  function toggleTheme() {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  }

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />

      <style>{`
        /* Animated gradient background for body */
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        body, #root {
          min-height: 100vh;
          margin: 0;
          background: linear-gradient(-45deg, #3b82f6, #60a5fa, #2563eb, #1e40af);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
          transition: background-color 0.5s ease;
          font-family: 'Poppins', sans-serif;
        }

        /* CSS variables for light/dark mode */
        :root {
          --bg-color: #f7f7f7;
          --text-color: #1f2937;
          --primary-color: #3b82f6;
          --button-bg: #3b82f6;
          --button-hover-bg: #2563eb;
        }
        [data-theme="dark"] {
          --bg-color: #1e293b;
          --text-color: #f8fafc;
          --primary-color: #60a5fa;
          --button-bg: #2563eb;
          --button-hover-bg: #3b82f6;
        }

        main {
          background-color: var(--bg-color);
          color: var(--text-color);
          transition: background-color 0.5s ease, color 0.5s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {!loadingDone ? (
        <LoadingScreen onFinish={handleLoadingFinish} />
      ) : showWelcome ? (
        <WelcomeScreen onSubmit={handleWelcomeSubmit} />
      ) : (
        <>
          {/* Pass theme and toggleTheme to Navbar */}
          <Navbar userName={userName} theme={theme} toggleTheme={toggleTheme} />
          <main
            style={{
              padding: '2rem',
              animation: 'fadeIn 1s ease-in-out',
              minHeight: '80vh',
            }}
          >
            <Routes>
              <Route path="/" element={<Home userName={userName} />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
