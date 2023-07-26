import React from "react";
import UserProfile from "../features/User/UserProfile";
import NavBar from "../features/NavBar/NavBar";

const UserProfilePage = () => {
  return (
    <div>
      <NavBar>
        <h2 className="mx-auto text-2xl">My Profile</h2>
        <UserProfile/>
      </NavBar>
    </div>
  );
};

export default UserProfilePage;
