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
    const response = await api.get("/addproduct", formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to add Product")
  }
};
export default api;
