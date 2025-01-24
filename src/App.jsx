import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/users/Login";
import Footer from "./components/Footer/Footer";
import CategoryPage from "./components/products/CategoryPage";
import SubcategoryPage from "./components/products/SubcategoryPage";
import PostAd from "./components/products/PostAd";
import ProductDetails from "./components/products/ProductDetails";
import PublicNavbar from "./components/Navbar/PublicNavbar/PublicNavbar";
import PrivateNavbar from "./components/Navbar/PrivateNavbar/PrivateNavbar";
import Header from "./components/Header/Header";
import UserProfile from "./components/users/UserProfile";
import { useSelector } from "react-redux";

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <BrowserRouter future={{ v7_startTransition: true }}>
      {isAuthenticated ? <PrivateNavbar /> : <PublicNavbar />}

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

          <Route path="/profile" element={<UserProfile />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
