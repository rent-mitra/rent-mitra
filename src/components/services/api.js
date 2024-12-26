import axios from "axios";

const API = axios.create({
  baseURL: "https://api.rentmitra.com", // Replace with actual URL
});

export default API;
