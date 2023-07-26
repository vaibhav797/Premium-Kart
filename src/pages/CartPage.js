import React from "react";
import { Cart } from "../features/cart/Cart";
import NavBar from "../features/NavBar/NavBar";

const CartPage = () => {
  return (
    <div>
      <NavBar>
        <Cart />
      </NavBar>
    </div>
  );
};

export default CartPage;
