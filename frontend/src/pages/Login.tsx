import Navbar from "../components/Navbar"
import { useNavigate } from "react-router-dom"; 
import React from "react";
import './Login.css';

export default function Login() {
    const navigate = useNavigate(); 

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        
        navigate("/profile");
    };

    return (
        <div>
            <Navbar/>
            <div className="login-container">
                <h2>Welcome Back!</h2>
                <p className="login-description">Log in to access your personalized dashboard, manage your clubs, and stay updated on events across campus.</p>
                <form className="login-form" onSubmit={handleLogin}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Enter your email" required />

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" placeholder="Enter your password" required />

                    <p className="error-message">Incorrect email or password. Please try again.</p>

                    <button type="submit">Login</button>
                </form>

                <div className="additional-links">
                    <p><a href="/forgot-password">Forgot Password?</a></p>
                    <p>Don’t have an account? <a href="/signup">Sign up here</a></p>
                </div>
            </div>
        </div>
    )
}
