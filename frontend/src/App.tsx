import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const clubs = [
    { name: 'Club 1', category: 'Academic', meetTime: 'Tuesday 6:00 PM' },
    { name: 'Club 2', category: 'Social', meetTime: 'Thursday 7:00 PM' },
  ];
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit
          {' '}
          <code>src/App.tsx</code>
          {' '}
          and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <div className="header-section">
          {/* <button className="join-button">JOIN HERE</button> */}
          <button type="button">JOIN HERE</button>
          <div className="location-info">
            <p>Location: CIF Room 3014</p>
            <p>Time: 6-7 PM Thursdays</p>
          </div>
        </div>
      </header>

      <section className="clubs-section">
        <h1>Discover New Clubs on Campus</h1>
        <div className="clubs-container">
          {clubs.map((club: any, index: any) => (
            <div key={index} className="club-card">
              <h3>{club.name}</h3>
              <p>
                Category:
                {club.category}
              </p>
              <p>
                Meeting Time:
                {club.meetTime}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="featured-section">
        <h2>Featured</h2>
        <div className="featured-container">
          <div className="featured-card">
            About Us - Learn more about what exactly we do here.
          </div>
          <div className="featured-card">
            The Team - See who is behind the scenes of this.
          </div>
          <div className="featured-card">
            Why Should You Join? - Why would this club be the right fit for you?
          </div>
          <div className="featured-card">
            Resources - Join our email list to get updates about important
            events!
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
