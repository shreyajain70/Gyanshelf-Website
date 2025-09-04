import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* About Section */}
        <div className="footer-section about">
          <h3>About Us</h3>
          <p>
            A platform where students can connect to buy and sell second-hand
            books at the lowest prices, making knowledge affordable for all.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/Home">Home</Link>
            </li>
            <li>
              <Link to="/AboutUs">AboutUs</Link>
            </li>
            <li>
              <Link to="/ContactUs">ContactUs</Link>
            </li>
          </ul>
        </div>

        {/* Register Section */}
        <div className="footer-section social">
          <h3>Get Started</h3>
          <ul>
            <li>
              <Link to="/SignUp">SignUp</Link>
            </li>
            <li>
              <Link to="/Login">Login</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info Section */}
        <div className="footer-section-contact-info">
          <h3>Contact Info</h3>
          <ul>
            <li>
              <span className="footer-icon">📧</span> gyanshelf@gmail.com
            </li>
            <li>
              <span className="footer-icon">📞</span> +91-7591035124
            </li>
          </ul>
        </div>



      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} GyanShelf. All rights reserved.
      </div>
    </footer>
  );
};
