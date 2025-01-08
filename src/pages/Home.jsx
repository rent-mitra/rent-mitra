import React, { useEffect, useState } from "react";
import "./home.css";
import { getAllProducts } from "../services/api";
import { Link } from "react-router-dom";

const Home = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const products = await getAllProducts();
        setRecommendations(products);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        setError("Failed to fetch recommendations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, []);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  const getValidImageUrl = (url) => {
    if (!url) return "/placeholder.jpg";
    if (url.startsWith("/api/products")) {
      return url.replace("/api/products", "");
    }
  };

  return (
    <div>
      <div className="recommendations-section">
        <h2>Fresh Recommendations</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && recommendations.length === 0 && (
          <p>No recommendations available at the moment.</p>
        )}
        {!loading && !error && recommendations.length > 0 && (
          <div className="recommendations-container">
            {recommendations.slice(0, visibleCount).map((item, index) => (
              <div
                className="recommendation-card"
                key={item.productId || index}
              >
                <Link to={`/product/${item.productId}`}>
                  <img
                    src={getValidImageUrl(item.imageUrls[0])}
                    alt={item.name || "Product Image"}
                  />
                  <div className="card-details">
                    <h3>${item.rentBasedOnType}</h3>
                    <p>{item.name}</p>
                    <span>{item.address}</span>
                    <span>{item.date}</span>
                  </div>
                </Link>
                <button className="favorite-button">❤️</button>
              </div>
            ))}
          </div>
        )}

        {!loading && visibleCount < recommendations.length && (
          <button className="load-more-button" onClick={loadMore}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
