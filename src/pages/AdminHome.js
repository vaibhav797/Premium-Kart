import React from 'react'
import NavBar from '../features/NavBar/NavBar';
import AdminProductList from '../features/admin/AdminProductList';

const AdminHome = () => {
  return (
    <div>
      <NavBar>
        <AdminProductList></AdminProductList>
      </NavBar>
    </div>
  )
}

export default AdminHome
