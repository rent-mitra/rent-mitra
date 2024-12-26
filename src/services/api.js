import axios from "axios";
const BASE_URL = "http://localhost:8081/api/products";

//axios instance
const api = axios.create({
  baseURL: BASE_URL,
});

//API functions
export const getCategories = async () => {
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
  return response.data;
};

export const getProductsBySubcategory = async (subcategory) => {
  const response = await api.get(`/productsbysubcategory/${subcategory}`);
  return response.data;
};
