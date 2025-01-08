import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles/header.css";
import {
  getCategoryNames,
  getCategoriesWithSubcategories,
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
        const categoryData = await getCategoriesWithSubcategories();
        setCategories(categoryData);
        const subcategoryData = {};
        categoryData.forEach((category) => {
          subcategoryData[category.name] = category.subcategories;
        });
        setSubcategories(subcategoryData);
      } catch (error) {
        console.error("Error fetching categories or subcategories:", error);
      }
    };

    fetchCategoriesAndSubcategories();
  }, []);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location]);
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
        {isDropdownOpen && (
          <div className="dropdown-menu" ref={dropdownRef}>
            {categories.map((category, index) => (
              <div className="dropdown-column" key={index}>
                <h4>
                  {/* Render category name */}
                  <Link to={`/categories/${category.name}`}>
                    {category.name}
                  </Link>
                </h4>
                {subcategories[category.name] &&
                  subcategories[category.name].length > 0 && (
                    <div className="subcategories">
                      {subcategories[category.name].map(
                        (subcategory, subIndex) => (
                          <Link
                            key={subIndex}
                            to={`/categories/${category.name}/${subcategory.name}`}
                          >
                            {subcategory.name}{" "}
                          </Link>
                        )
                      )}
                    </div>
                  )}
              </div>
            ))}
          </div>
        )}

        <nav className="header-links">
          {categories.map((category, index) => (
            <div key={index}>
              <Link to={`/categories/${category.name}`}>{category.name}</Link>
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
