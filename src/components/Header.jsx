import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles/header.css";
import {
  getCategoryNames,
  getSubcategoriesByCategories,
} from "../services/api";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchCategoriesAndSubcategories = async () => {
      try {
        const categoryData = await getCategoryNames();
        setCategories(categoryData);

        const subcategoryData = {};
        for (const category of categoryData) {
          const subcategoryResponse = await getSubcategoriesByCategories(
            category
          );
          subcategoryData[category] = subcategoryResponse;
        }
        setSubcategories(subcategoryData);
      } catch (error) {
        console.error("Error fetching categories or subcategories:", error);
      }
    };

    fetchCategoriesAndSubcategories();
  }, []);

  // Toggle dropdown state
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close the dropdown when route changes
  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location]);

  // Close the dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="header-container">
        <div className="category-selector" onClick={toggleDropdown}>
          <span>ALL CATEGORIES</span>
          <i
            className={`dropdown-icon ${
              isDropdownOpen ? "rotate-180" : ""
            } fa fa-chevron-down`}
          ></i>
        </div>

        {/* Dropdown Content */}
        {isDropdownOpen && (
          <div className="dropdown-menu" ref={dropdownRef}>
            {categories.map((category, index) => (
              <div className="dropdown-column" key={index}>
                <h4>
                  <Link to={`/categories/${category}`}>{category}</Link>
                </h4>

                {subcategories[category] &&
                  subcategories[category].length > 0 && (
                    <div className="subcategories">
                      {subcategories[category].map((subcategory, subIndex) => (
                        <Link
                          key={subIndex}
                          to={`/categories/${category}/${subcategory}`}
                        >
                          {subcategory}
                        </Link>
                      ))}
                    </div>
                  )}
              </div>
            ))}
          </div>
        )}

        <nav className="header-links">
          {categories.map((category, index) => (
            <div key={index}>
              <Link to={`/categories/${category}`}>{category}</Link>
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
