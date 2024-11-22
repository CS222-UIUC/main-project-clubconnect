import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Signup.css';

export default function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Simple validation for example purposes
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Simulate successful signup
        alert("Account created successfully!");
        navigate("/login"); // Navigate back to login after signup
    };

    return (
        <div className="signup-container">
            <h2>Create an Account</h2>
            <form className="signup-form" onSubmit={handleSignup}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}