import React from 'react';
import '../styles/Home.css';

function Home({ userName }) {
  return (
    <div className="container">
      <h1 className="title">
        {userName
          ? `Welcome ${userName}! This is my portfolio`
          : 'Welcome! This is my portfolio'}
      </h1>
      <p className="subtitle">
        I’m a React developer building awesome web apps.
      </p>
      <button className="button" onClick={() => alert('Button clicked!')}>
        Contact Me
      </button>
    </div>
  );
}

export default Home;
