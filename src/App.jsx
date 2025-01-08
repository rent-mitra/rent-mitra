import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PostAd from "./pages/PostAd";
import Login from "./pages/Login";
import PublicNavbar from "./components/PublicNavbar";
import Footer from "./components/Footer";
import CategoryPage from "./pages/CategoryPage";
import Header from "./components/Header";
import SubcategoryPage from "./pages/SubcategoryPage";
import PrivateNavbar from "./components/PrivateNavbar";
import ProductDetails from "./pages/ProductDetails";

const App = () => {
  return (
    <BrowserRouter>
      <PublicNavbar />

      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/categories/:category" element={<CategoryPage />} />
          <Route
            path="/categories/:category/:subcategory"
            element={<SubcategoryPage />}
          ></Route>
          <Route path="/product/:id" element={<ProductDetails />}></Route>

          <Route path="/post-ad" element={<PostAd />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
