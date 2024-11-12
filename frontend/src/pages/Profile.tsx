import Header from "../components/Header";
import React from "react";
import "./Profile.css";

export default function Profile() {
    return (
        <div className="profile-container">
          <Header />
    
          {/* Profile Header Section */}
          <div className="profile-header">
            <div className="profile-info">
              <div className="profile-picture"></div>
              <div>
                <h2>Example User</h2>
                <p>Major: Computer Science<br />Year: Sophomore</p>
              </div>
            </div>
            <button className="edit-button">Edit</button>
          </div>
    
          {/* About Section */}
          <div className="about-section">
            <h3>About</h3>
          </div>
    
          {/* Interests Section */}
          <div className="interests-section">
            <h3>Interests</h3>
            <div className="interests-list">
              <span className="interest">Community Service</span>
              <span className="interest">Technology</span>
              <span className="interest">Social & Leisure</span>
              <button className="add-interest-button">+</button>
            </div>
          </div>
    
          {/* Saved Clubs Section */}
          <div className="saved-clubs-section">
            <h3>Saved Clubs</h3>
            <p>No saved clubs yet.</p>
          </div>
    
          {/* Resume Section */}
          <div className="resume-section">
            <h3>Resume</h3>
            <button className="upload-button">Upload File</button>
          </div>
        </div>
      );
}
