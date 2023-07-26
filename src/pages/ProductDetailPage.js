import React from "react";
import ProductDetail from "../features/ProductList/ProductDetail";
import NavBar from "../features/NavBar/NavBar";
import Footer from "../features/common/Footer";

const ProductDetailPage = () => {
  return (
    <div>
      <NavBar>
        <div className="flex justify-center items-center">
        <ProductDetail />
        </div>
      </NavBar>
      <Footer/>
    </div>
  );
};

export default ProductDetailPage;
