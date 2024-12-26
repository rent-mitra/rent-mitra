import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getSubcategoriesByCategories } from "../services/api";
import "./categoryPage.css";

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
      {loading && <div>Loading subcategories...</div>}
      {error && <div>{error}</div>}
      <div className="subcategory-list">
        {subcategories.length > 0 ? (
          subcategories.map((sub) => (
            <div className="subcategory-item" key={sub}>
              <Link
                to={`/categories/${category}/${sub.toLowerCase()}`}
                className="subcategory-link"
              >
                <div className="subcategory-card">
                  <img
                    src={`/images/${sub.toLowerCase()}.jpg`}
                    alt={sub}
                    className="subcategory-image"
                  />
                  <h3 className="subcategory-name">{sub}</h3>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p>No subcategories found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
