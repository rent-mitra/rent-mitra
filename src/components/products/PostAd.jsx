import React, { useState, useEffect } from "react";
import "./postAd.css";
import { addProduct, getCategoriesWithSubcategories } from "../../services/api";
import AlertMessage from "../users/AlertMessage";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addPost } from "../../Redux/Slice/authSlice";

const PostAd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    categoryId: "",
    subcategoryId: "",
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

  const fetchSubcategories = (categoryId) => {
    setLoadingSubcategories(true);
    setError(null);
    try {
      const selectedCategory = categories.find(
        (cat) => cat.categoryId === categoryId
      );
      setSubcategories(selectedCategory ? selectedCategory.subcategories : []);
    } catch (error) {
      setError("Failed to load subcategories.");
      console.error(error);
    } finally {
      setLoadingSubcategories(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: files
        ? files[0]
        : value === ""
        ? ""
        : isNaN(value)
        ? value
        : parseInt(value, 10),
    }));

    if (name === "category") {
      const selectedCategoryId = parseInt(value, 10) || "";
      setFormData((prevData) => ({
        ...prevData,
        categoryId: selectedCategoryId,
        subcategoryId: "",
      }));
      fetchSubcategories(selectedCategoryId);
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

    const dynamicAttributes = extraFields.reduce((acc, field) => {
      if (field.attribute && field.value) {
        acc[field.attribute] = field.value;
      }
      return acc;
    }, {});

    const productData = {
      name: formData.name,
      brand: formData.brand,
      categoryId: formData.categoryId,
      subcategoryId: formData.subcategoryId,
      rentType: formData.rentType,
      rentBasedOnType: formData.rentBasedOnType,
      address: formData.address,
      navigation: formData.navigation,
      message: formData.description,
      mobileNumber: formData.mobileNumber,
      dynamicAttributes,
    };

    const blob = new Blob([JSON.stringify(productData)], {
      type: "application/json",
    });

    const formPayload = new FormData();
    formPayload.append("data", blob);

    console.log("Images:", formData.images);

    formData.images.forEach((image) => {
      if (image instanceof File) {
        formPayload.append("files", image);
      }
    });

    for (let pair of formPayload.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      const response = await addProduct(formPayload);
      console.log("Product added successfully", response);

      const newPost = {
        name: formData.name,
        brand: formData.brand,
        category: categories.find(
          (cat) => cat.categoryId === formData.categoryId
        )?.name,
        subcategory: subcategories.find(
          (sub) => sub.subcategoryId === formData.subcategoryId
        )?.name,
        rentType: formData.rentType,
        rentBasedOnType: formData.rentBasedOnType,
        address: formData.address,
        navigation: formData.navigation,
        description: formData.description,
        mobileNumber: formData.mobileNumber,
        images: formData.images,
      };
      console.log("New Post Data:", newPost);
      dispatch(addPost(newPost));

      setAlert({ type: "success", message: "Product posted successfully!" });
      setTimeout(() => navigate("/profile"), 1000);
    } catch (error) {
      console.error(
        "Failed to post the product:",
        error.response?.data || error.message
      );
      setAlert({
        type: "error",
        message:
          error.response?.data ||
          "Failed to post the product. Please try again.",
      });
    }
  };

  return (
    <div className="post-ad-page">
      {alert && <AlertMessage type={alert.type} message={alert.message} />}
      <h1 className="post-ad-title">Post Your Ad</h1>

      <div className="post-ad-options">
        {alert && <AlertMessage type={alert.type} message={alert.message} />}
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
            value={formData.categoryId}
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
                <option key={category.categoryId} value={category.categoryId}>
                  {category.name}
                </option>
              ))}
          </select>

          <select
            name="subcategory"
            value={formData.subcategoryId}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                subcategoryId: parseInt(e.target.value, 10),
              }))
            }
            required
            disabled={loadingSubcategories || !formData.categoryId || error}
          >
            <option value="">Select Subcategory</option>
            {loadingSubcategories && <option>Loading subcategories...</option>}
            {error && <option disabled>{error}</option>}
            {!loadingSubcategories &&
              !error &&
              subcategories.map((subcategory) => (
                <option
                  key={subcategory.subcategoryId}
                  value={subcategory.subcategoryId}
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
