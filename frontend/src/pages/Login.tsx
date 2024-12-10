//import Navbar from "../components/Navbar"
import { useNavigate } from "react-router-dom"; 
import React, { useState } from "react";
import './Login.css';


interface LoginProps {
    setToken: (token: string | null) => void;
  }
  export default function Login({ setToken }: LoginProps) {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null); 
    const [authToken, setAuthToken] = useState<string | null>(null); 

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 

        const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value;
        const password = (e.currentTarget.elements.namedItem("password") as HTMLInputElement).value;
        
        try {
            const response = await fetch("/user/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
            });
      
            if (!response.ok) {
              throw new Error("Invalid email or password.");
            }
      
            const data = await response.json();
      
            setToken(data.token);
      
            navigate("/home");
          } catch (error: any) {
            console.error(error);
            setError("Invalid email or password. Please try again."); 
        }
    };

    
    const handleCreateAccount = () => {
        navigate("/signup"); 
    };

    return (
        <div>
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
                    <p>Don’t have an account? <button className="create-account-link" onClick={handleCreateAccount}>Create an account</button></p>
                </div>
            </div>
        </div>
    )
}
