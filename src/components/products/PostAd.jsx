import React, { useState, useEffect } from "react";

import "./postAd.css";
import { addProduct, getCategoriesWithSubcategories } from "../../services/api";
import AlertMessage from "../users/AlertMessage";

const PostAd = () => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    subcategory: "",
    rentType: "",
    rentBasedOnType: "",
    address: "",
    navigation: "",
    description: "",
    mobileNumber: "",
    attribute: "",
    value: "",
    images: Array(12).fill(null),
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingSubcategories, setLoadingSubcategories] = useState(false);
  const [error, setError] = useState(null);
  const [extraFields, setExtraFields] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      setError(null);
      try {
        const fetchedCategories = await getCategoriesWithSubcategories();
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

  const fetchSubcategories = (categoryName) => {
    setLoadingSubcategories(true);
    setError(null);
    try {
      const selectedCategory = categories.find(
        (cat) => cat.name === categoryName
      );
      setSubcategories(selectedCategory ? selectedCategory.subcategories : []);
    } catch (error) {
      setError("Failed to load subcategories.");
      console.log(error);
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
        subcategory: "",
      }));
      fetchSubcategories(value);
    }
  };
  const handleExtraFieldChange = (index, field, value) => {
    setExtraFields((prevFields) => {
      const updateFields = [...prevFields];
      updateFields[index] = { ...updateFields[index], [field]: value };
      return updateFields;
    });
  };

  const handleAddExtraField = () => {
    setExtraFields((prevFields) => [
      ...prevFields,
      { attribute: "", value: "" },
    ]);
  };

  const handleRemoveExtraField = (index) => {
    setExtraFields((prevFields) => {
      const updatedFields = prevFields.filter((_, i) => i !== index);
      return updatedFields;
    });
  };

  const handleImageUpload = (index, file) => {
    setFormData((prevData) => {
      const updatedImages = [...prevData.images];
      updatedImages[index] = file;
      return { ...prevData, images: updatedImages };
    });
  };

  const handleRemoveImage = (index) => {
    setFormData((prevData) => {
      const updatedImages = [...prevData.images];
      updatedImages[index] = null;
      return { ...prevData, images: updatedImages };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Ad submitted:", formData);
    const formPayload = new formData();
    for (let key in formData) {
      if (key === "images") {
        formData.images.forEach((image, index) => {
          if (image) formPayload.append(`images[${index}]`, image);
        });
      } else {
        formPayload.append(key, formData[key]);
      }
    }
    try {
      const response = await addProduct(formPayload);
      console.log("Product added successfully", response);
      setAlert({
        type: "success",
        message: "Product posted successfully!",
      });
    } catch (error) {
      setAlert({
        type: "error",
        message: "Failed to post the product.",
      });
    }
  };

  return (
    <div className="post-ad-page">
      {alert && <AlertMessage type={alert.type} message={alert.message} />}
      <h1 className="post-ad-title">Post Your Ad</h1>
      <div className="post-ad-options">
        <form className="post-ad-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={formData.brand}
            onChange={handleChange}
            required
          />

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
                <option key={category.categoryId} value={category.name}>
                  {category.name}
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
                <option
                  key={subcategory.subcategoryId}
                  value={subcategory.name}
                >
                  {subcategory.name}
                </option>
              ))}
          </select>

          <div className="rent-type-container">
            <label>Rent Type:</label>

            <label>
              <input
                type="radio"
                name="rentType"
                value="Daily"
                checked={formData.rentType === "Daily"}
                onChange={handleChange}
              />
              Daily
            </label>
            <label>
              <input
                type="radio"
                name="rentType"
                value="Weekly"
                checked={formData.rentType === "Weekly"}
                onChange={handleChange}
              />
              Weekly
            </label>
            <label>
              <input
                type="radio"
                name="rentType"
                value="Monthly"
                checked={formData.rentType === "Monthly"}
                onChange={handleChange}
              />
              Monthly
            </label>
          </div>
          <div className="price-input-container">
            <span className="rupee-symbol">₹</span>
            <input
              type="number"
              name="rentBasedOnType"
              placeholder="Enter Price"
              value={formData.rentBasedOnType}
              onChange={handleChange}
              required
            />
          </div>
          <textarea
            name="address"
            placeholder="Enter Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="navigation"
            placeholder="Landmark"
            value={formData.navigation}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Message"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>

          <input
            type="tel"
            name="mobileNumber"
            placeholder="Mobile no."
            value={formData.mobileNumber}
            onChange={handleChange}
            pattern="[0-9]{10}"
            required
          />

          <button
            type="button"
            onClick={handleAddExtraField}
            style={{ marginLeft: "10px", backgroundColor: "#444" }}
          >
            Add Attribute
          </button>

          {extraFields.map((field, index) => (
            <div key={index} className="extra-fields">
              <input
                type="text"
                placeholder="Attribute"
                value={field.attribute}
                onChange={(e) =>
                  handleExtraFieldChange(index, "attribute", e.target.value)
                }
                required
              />
              <input
                type="text"
                placeholder="Value"
                value={field.value}
                onChange={(e) =>
                  handleExtraFieldChange(index, "value", e.target.value)
                }
                required
              />
              <button
                type="button"
                onClick={() => handleRemoveExtraField(index)}
                title="Remove"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          ))}
          <h2>Upload Images</h2>
          <div className="image-upload-grid">
            {formData.images.map((image, index) => (
              <div key={index} className="image-upload-slot">
                {image ? (
                  <div className="uploaded-image-preview">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Uploaded ${index + 1}`}
                      className="uploaded-image"
                    />

                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="remove-image-btn"
                      style={{
                        backgroundColor: "#555",
                        padding: "5px",
                      }}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor={`upload-image-${index}`}
                    className="add-photo-label"
                  >
                    <input
                      type="file"
                      id={`upload-image-${index}`}
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) =>
                        handleImageUpload(index, e.target.files[0])
                      }
                    />
                    <div className="add-photo-icon">
                      <i className="fa-thin fa-plus"></i>
                    </div>
                  </label>
                )}
              </div>
            ))}
          </div>

          <button type="submit">Post</button>
        </form>
      </div>
    </div>
  );
};

export default PostAd;
