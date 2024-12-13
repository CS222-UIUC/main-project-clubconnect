import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch("http://localhost:2000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                  firstName: fullName.split(" ")[0],
                  lastName: fullName.split(" ")[1],
                  email,
                  password 
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to create account.");
            }

            const data = await response.json();

            const token = data.token;

            if (token) {
                localStorage.setItem("authToken", token);
            }

            // alert("Account created successfully!");
            navigate("/login");
        } catch (err: any) {
            console.error(err);
            setError(err.message || "An error occurred. Please try again.");
        }
    };

    // Simulate successful signup
    //alert("Account created successfully!");
    navigate("/login"); // Navigate back to login after signup
  // };

  return (
    <div>
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
    </div>
  );
}
