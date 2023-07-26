import React from "react";
import NavBar from "../features/NavBar/NavBar";
import AdminProductDetail from "../features/admin/AdminProductDetail";

const AdminProductDetailPage = () => {
  return (
    <div>
      <NavBar>
        <div className="flex justify-center items-center">
          <AdminProductDetail />
        </div>
      </NavBar>
    </div>
  );
};

export default AdminProductDetailPage;
