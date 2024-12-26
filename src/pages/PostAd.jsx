import React, { useState, useEffect } from "react";
import {
  getCategoryNames,
  getSubcategoriesByCategories,
} from "../services/api";
import "./postAd.css";

const PostAd = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    subcategory: "",
    price: "",
    image: null,
  });
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingSubcategories, setLoadingSubcategories] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      setError(null);
      try {
        const fetchedCategories = await getCategoryNames();
        setCategories(fetchedCategories);
      } catch (err) {
        setError("Failed to load categories.");
        console.error(err);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const fetchSubcategories = async (categoryName) => {
    setLoadingSubcategories(true);
    setError(null);
    try {
      const fetchedSubcategories = await getSubcategoriesByCategories(
        categoryName
      );
      setSubcategories(fetchedSubcategories);
    } catch (err) {
      setError("Failed to load subcategories.");
      console.error(err);
    } finally {
      setLoadingSubcategories(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));

    if (name === "category") {
      setFormData((prevData) => ({
        ...prevData,
        subcategory: "", // Reset subcategory when category changes
      }));
      fetchSubcategories(value); // Fetch subcategories for the selected category
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Ad submitted:", formData);
    // Add functionality to submit data to backend
  };

  return (
    <div className="post-ad-page">
      <h1 className="post-ad-title">Post Your Ad</h1>
      <div className="post-ad-options">
        <form className="post-ad-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Ad Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            disabled={loadingCategories || error}
          >
            <option value="">Select Category</option>
            {loadingCategories && <option>Loading categories...</option>}
            {error && <option disabled>{error}</option>}
            {!loadingCategories &&
              !error &&
              categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
          </select>

          <select
            name="subcategory"
            value={formData.subcategory}
            onChange={handleChange}
            required
            disabled={loadingSubcategories || !formData.category || error}
          >
            <option value="">Select Subcategory</option>
            {loadingSubcategories && <option>Loading subcategories...</option>}
            {error && <option disabled>{error}</option>}
            {!loadingSubcategories &&
              !error &&
              subcategories.map((subcategory) => (
                <option key={subcategory} value={subcategory}>
                  {subcategory}
                </option>
              ))}
          </select>

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
          <button type="submit">Post</button>
        </form>
      </div>
    </div>
  );
};

export default PostAd;
