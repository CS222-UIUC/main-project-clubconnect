import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>

    <section className = "clubs-section">
      <h1>Discover New Clubs on Campus</h1>
      <div className="clubs-container">
        {clubs.map((club, index) => ( 
          <div key={index} className = "club-card">
            <h3>{club.name}</h3>
            <p>Category: {club.category}</p>
            <p>Meeting Time: {club.meetTime}</p>
          </div>
          ))}
      </div>
    </section>
  );
}

export default App;
