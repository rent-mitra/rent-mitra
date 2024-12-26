import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/PublicNavbar.css";

const PublicNavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          RentMitra
        </Link>

        {/* Location Selector */}
        <div className="location-container">
          <select className="location-dropdown">
            <option>India</option>
            <option>USA</option>
            <option>Canada</option>
          </select>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Find cars, mobile phones, and more..."
          />
          <button className="search-button">
            <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        {/* Language Selector */}
        <div className="language-selector" onClick={toggleDropdown}>
          <span>ENGLISH</span>
          <i
            className={`dropdown-icon ${
              isDropdownOpen ? "rotate-180" : ""
            } fa fa-chevron-down`}
          ></i>
          {isDropdownOpen && (
            <ul className="language-dropdown">
              <li>English</li>
              <li>Hindi</li>
            </ul>
          )}
        </div>

        {/* Navigation Links */}
        <ul className="navbar-links">
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>

        {/* Sell Button */}

        <Link to="/login">
          <button className="sell-button">+ RENT</button>
        </Link>
      </div>
    </nav>
  );
};

export default PublicNavbar;
