import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./PublicNavbar.css";
import api from "../../../services/api";

const PublicNavbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const fetchSubcategories = async (categoryName) => {
    try {
      const response = await api.get("/subcategories", {
        params: { categoryName },
      });
      if (response.status === 200) {
        setSubcategories(response.data.subcategories || []);
      } else {
        console.error(
          "Failed to fetch subcategories, status:",
          response.status
        );
        setSubcategories([]);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      setSubcategories([]);
    }
  };

  const handleSearch = () => {
    const category = searchQuery.trim();
    if (category) {
      fetchSubcategories(category);
      navigate(`/categories/${category}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          RentMitra
        </Link>

        <div className="location-container">
          <select className="location-dropdown">
            <option>India</option>
            <option>USA</option>
            <option>Canada</option>
          </select>
        </div>

        <div className="search-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Find cars, mobile phones, and more..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="search-button" onClick={handleSearch}>
            <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

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

        <ul className="navbar-links">
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>

        <Link to="/login">
          <button className="sell-button">+ RENT</button>
        </Link>
      </div>

      {subcategories.length > 0 && (
        <div className="subcategory-list">
          <h4>Subcategories:</h4>
          <ul>
            {subcategories.map((sub, index) => (
              <li key={index}>{sub.name}</li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default PublicNavbar;
