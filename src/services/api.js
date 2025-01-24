import axios from "axios";
const BASE_URL = "http://localhost:8081/api/products";

const api = axios.create({
  baseURL: BASE_URL,
});

export const getCategoriesWithSubcategories = async () => {
  const response = await api.get("/categories");
  return response.data;
};
export const getCategoryNames = async () => {
  const response = await api.get("/category-names");
  return response.data;
};

export const getSubcategoriesByCategories = async (categoryName) => {
  const response = await api.get("/subcategories", {
    params: { categoryName },
  });
  return response.data.data;
};

export const getProductsBySubcategory = async (subcategory) => {
  const response = await api.get(`/productsbysubcategory/${subcategory}`);
  return response.data.data;
};
export const getAllProducts = async () => {
  const response = await api.get("/getAllProducts");
  return response.data;
};

export const addProduct = async (formData) => {
  try {
    const response = await api.post("/addproduct", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error while adding product:",
      error.response?.data || error.message
    );
    throw error.response?.data || new Error("Failed to add product");
  }
};

export default api;
