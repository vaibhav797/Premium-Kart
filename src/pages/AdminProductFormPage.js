import React from "react";
import NavBar from "../features/NavBar/NavBar";
import AdminProductForm from "../features/admin/AdminProductForm";

const AdminProductFormPage = () => {
  return (
    <div>
      <NavBar>
        <AdminProductForm />
      </NavBar>
    </div>
  );
};

export default AdminProductFormPage;
