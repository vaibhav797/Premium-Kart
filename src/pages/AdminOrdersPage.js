import React from "react";
import NavBar from "../features/NavBar/NavBar";
import AdminOrders from "../features/admin/AdminOrders";

const AdminOrdersPage = () => {
  return (
    <div>
      <NavBar>
        <div className="flex justify-center items-center">
          <AdminOrders />
        </div>
      </NavBar>
    </div>
  );
};

export default AdminOrdersPage;
