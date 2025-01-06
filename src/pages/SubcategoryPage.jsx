import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsBySubcategory } from "../services/api";
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
      {loading && <div>Loading products...</div>}
      {error && <div>{error}</div>}
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="product-item" key={product.productId}>
              <div className="product-card">
                <img
                  src={product.imageUrls}
                  alt={product.name}
                  className="product-image"
                />
                <h3 className="product-name">{product.name}</h3>
              </div>
            </div>
          ))
        ) : (
          <p>No products found for this subcategory.</p>
        )}
      </div>
    </div>
  );
};

export default SubcategoryPage;
