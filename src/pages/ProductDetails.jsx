import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllProducts } from "../services/api";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const products = await getAllProducts();
        const selectedProduct = products.find(
          (product) => product.productId.toString() === id
        );
        setProduct(selectedProduct);
      } catch (error) {
        console.log("Error fetching product details:", error);
        setError("Failed to fetch product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

  const getValidImageUrl = (url) => {
    if (!url) return "/placeholder.jpg";
    if (url.startsWith("/api/products")) {
      return url.replace("/api/products", "");
    }
  };

  if (loading) return <p>Loading....</p>;
  if (error) return <p className="error">{error}</p>;
  if (!product) return <p>Product not found</p>;
  return (
    <div className="Product-details">
      <h2>{product.name}</h2>
      <img
        src={getValidImageUrl(product.imageUrls[0])}
        alt={product.name || "Product Image"}
      />
      <div className="details">
        <p>
          <strong>Brand:</strong>
          {product.brand}
        </p>
        <p>
          <strong>Rent Type:</strong>
          {product.rentType}
        </p>
        <p>
          <strong>Rent Price:</strong>${product.rentBasedOnType} per{" "}
          {product.rentType}
        </p>
        <p>
          <strong>Location:</strong>
          {product.address}
        </p>
        <p>{product.message}</p>

        <p>
          <strong>Mobile Number:</strong>
          {product.mobileNumber}
        </p>
        <p>
          <strong>Condition:</strong>
          {product.dynamicAttributes?.condition || "N/A"}
        </p>
        <p>
          <strong>Number of Owners:</strong>{" "}
          {product.dynamicAttributes?.["number of owners"] || "N/A"}
        </p>
      </div>
    </div>
  );
};
export default ProductDetails;
