import React from "react";
import "./styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <div>
            <h4>POPULAR LOCATIONS</h4>
            <p>Kolkata</p>
            <p>Mumbai</p>
            <p>Chennai</p>
            <p>Pune</p>
          </div>
          <div>
            <h4>TRENDING LOCATIONS</h4>
            <p>Bhubaneswar</p>
            <p>Hyderabad</p>
            <p>Chandigarh</p>
            <p>Nashik</p>
          </div>
          <div>
            <h4>ABOUT US</h4>
            <p>Tech@OLX</p>
          </div>
          <div>
            <h4>RentMitra</h4>
            <p>Blog</p>
            <p>Help</p>
            <p>Sitemap</p>
            <p>Legal & Privacy Information</p>
            <p>Vulnerability Disclosure Program</p>
          </div>
          <div>
            <h4>FOLLOW US</h4>
            <div className="social-icons">
              <i className="fab fa-facebook"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-twitter"></i>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-rights">
            <p>All rights reserved © 2024 RentMitra</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
