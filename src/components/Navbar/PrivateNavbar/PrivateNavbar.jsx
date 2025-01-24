import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./PrivateNavbar.css";
import api from "../../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../Redux/Slice/authSlice";

const PrivateNavbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for hamburger menu
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.auth.userInfo);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    setIsProfileDropdownOpen(false);
  }, [location]);

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
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          RentMitra
        </Link>

        {/* Hamburger Icon for Mobile */}
        <div className="hamburger-menu" onClick={toggleMenu}>
          <i className="fa fa-bars"></i>
        </div>

        {/* Navbar Links and Dropdowns (Only for Mobile if Menu is Open) */}
        <div className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
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

            <button className="search-btn" onClick={handleSearch}>
              <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
            </button>
          </div>

          {/* Language Dropdown */}
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

          {/* Profile Dropdown */}
          <div className="profile-container">
            <div className="profile-icon" onClick={toggleProfileDropdown}>
              <img
                src="https://via.placeholder.com/40"
                alt="Profile"
                className="profile-picture"
              />
              <i
                className={`dropdown-icon ${
                  isProfileDropdownOpen ? "rotate-180" : ""
                } fa fa-chevron-down`}
              ></i>
            </div>
            {isProfileDropdownOpen && (
              <div className="profile-dropdown">
                <div className="profile-info">
                  <img
                    src="https://via.placeholder.com/40"
                    alt="Profile"
                    className="profile-info-img"
                  />
                  <Link to="/profile">
                    <p className="profile-info-name">Profile Name</p>
                  </Link>
                </div>
                <Link to="/profile">
                  <button className="profile-btn">View & Edit Profile</button>
                </Link>

                <button className="profile-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Rent Button */}
          <Link to="/post-ad">
            <button className="sell-button">+ RENT</button>
          </Link>
        </div>
      </div>

      {/* Subcategories List */}
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

export default PrivateNavbar;
