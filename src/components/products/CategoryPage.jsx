import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import "./categoryPage.css";
import { getSubcategoriesByCategories } from "../../services/api";

const CategoryPage = () => {
  const { category } = useParams();
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getSubcategoriesByCategories(category);
        setSubcategories(data);
      } catch (err) {
        setError("Error fetching subcategories.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchSubcategories();
    }
  }, [category]);

  return (
    <div className="category-page">
      <h1 className="category-title">
        {category ? category.toUpperCase() : "Category Not Found"}
      </h1>
      {loading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {error && <div>{error}</div>}
      <div className="subcategory-list">
        {subcategories.length > 0 ? (
          subcategories.map((sub) => (
            <div className="subcategory-item" key={sub.name}>
              <Link
                to={`/categories/${category}/${sub.name.toLowerCase()}`}
                className="subcategory-link"
              >
                <div className="subcategory-card">
                  <img
                    src={sub.imageUrl || "/images/placeholder.jpg"}
                    alt={sub.name}
                    className="subcategory-image"
                  />
                  <h3 className="subcategory-name">{sub.name}</h3>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p>fetching....</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;