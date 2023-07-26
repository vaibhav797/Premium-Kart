import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectuserChecked } from "../auth/authSlice";
import { selectUserInfo } from "../User/userSlice";

const AdminProtected = ({ children }) => {
  const user = useSelector(selectUserInfo);
  const checkUser = useSelector(selectuserChecked);

  return (
    checkUser &&
    user &&
    (user ? (
      user.role !== "admin" ? (
        <Navigate to="/" replace={true}></Navigate>
      ) : (
        children
      )
    ) : (
      <Navigate to="/login" replace={true}></Navigate>
    ))
  );
};

export default AdminProtected;
