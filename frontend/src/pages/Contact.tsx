import Navbar from "../components/Navbar"
import './Contact.css';

export default function Contact() {
    return (
        <div>
            <Navbar/>
            <div className="contact-container">
                <h2>Contact Us</h2>
                <p>We’d love to hear from you! Please fill out the form below and we’ll get back to you as soon as possible.</p>
                <form className="contact-form">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" required />

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />

                    <label htmlFor="message">Message:</label>
                    <textarea id="message" name="message" rows={5} required></textarea>

                    <button type="submit">Send Message</button>
                </form>
            </div>
        </div>
    )
}
