import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsBySubcategory } from "../../services/api";
import "./subcategoryPage.css";

const SubcategoryPage = () => {
  const { subcategory } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProductsBySubcategory(subcategory);
        setProducts(data);
      } catch (err) {
        setError("Error fetching products.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (subcategory) {
      fetchProducts();
    }
  }, [subcategory]);

  return (
    <div className="subcategory-page">
      <h1 className="subcategory-title">
        {subcategory ? subcategory.toUpperCase() : "Subcategory Not Found"}
      </h1>
      {loading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {error && <div>{error}</div>}
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product, index) => (
            <div className="product-item" key={index}>
              <div className="product-card">
                <img
                  src={product.imageUrls[0] || "/images/placeholder.jpg"}
                  alt={product.name}
                  className="product-image"
                />
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.message}</p>
                <p className="product-rent">
                  Rent: {product.rentType} - ₹{product.rentBasedOnType}
                </p>
                <p className="product-brand">Brand: {product.brand}</p>
                <p className="product-condition">
                  Condition: {product.dynamicAttributes?.condition || "N/A"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>Fetching...</p>
        )}
      </div>
    </div>
  );
};

export default SubcategoryPage;
