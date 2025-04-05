import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="dashboard-footer">
      <p className="footer-title">Bullseye</p>
      <p className="footer-subtitle">Subscribe to our Newsletter</p>
      <input type="email" placeholder="Enter your email here" className="newsletter-input" />
    </footer>
  );
}

export default Footer;