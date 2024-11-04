import Navbar from "../components/Navbar"
import './Login.css';

export default function Login() {
    return (
        <div>
            <Navbar/>
            <div className="login-container">
                <h2>Welcome Back!</h2>
                <p className="login-description">Log in to access your personalized dashboard, manage your clubs, and stay updated on events across campus.</p>
                <form className="login-form">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Enter your email" required />

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" placeholder="Enter your password" required />

                    {/* Error message (can be shown conditionally based on form validation) */}
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
