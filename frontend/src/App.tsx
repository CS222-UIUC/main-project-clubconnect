import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Clubs from "./pages/Clubs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NoPage from "./pages/NoPage";
import Contact from "./pages/Contact";
import ClubInfo from "./pages/ClubInfo";
import logo from "./logo.svg";
import Navbar from "./components/Navbar";
import AddClubForm from "./pages/AddClub";
import "./App.css";

function App() {
  const [token, setToken] = useState<string | null>(null);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };
  
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    } else {
      setToken(null); 
    }
  }, []);

  useEffect(() => {
    if (token) {
        localStorage.setItem("token", token); 
    }
}, [token]);

  return (
      <div>
          <Navbar handleLogout={handleLogout} token={token} /> {/* Pass logout function */}
          <Routes>
          <Route path="/" element={token === null ? <Navigate to="/login" replace /> : <Navigate to="/home" replace />}/>
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protect authenticated routes */}
            <Route path="/home" element={token ? <Home /> : <Navigate to="/login" />} />
            <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/clubs" element={token ? <Clubs /> : <Navigate to="/login" />} />
            <Route path="/contact" element={token ? <Contact /> : <Navigate to="/login" />} />
            <Route path="/clubs/:id" element={token ? <ClubInfo /> : <Navigate to="/login" />} />

            <Route path="*" element={<Navigate to={token ? "/home" : "/login"} replace />} />
          </Routes>
      </div>
  );
}
/*

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
    </div>
  );
}*/

export default App;
