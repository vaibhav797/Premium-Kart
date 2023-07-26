import React, { useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import Protected from "./features/auth/components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthAsync, selectLoggedInUser, selectuserChecked } from "./features/auth/authSlice";
import { fetchCartByUserAsync, selectItems } from "./features/cart/cartSlice";
import PageNotFound from "./pages/PageNotFound";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrdersPage from "./pages/UserOrdersPage";
import UserProfilePage from "./pages/UserProfilePage";
import { fetchUserAsync } from "./features/User/userSlice";
import Logout from "./features/auth/components/Logout";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AdminProtected from "./features/admin/AdminProtected";
import AdminHome from "./pages/AdminHome";
import AdminProductDetail from "./features/admin/AdminProductDetail";
import AdminProductFormPage from "./pages/AdminProductFormPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import StripeCheckout from "./pages/StripeCheckout";
import AdminProductDetailPage from "./pages/AdminProductDetailPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_LEFT
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: "/admin",
    element: (
      <AdminProtected>
        <AdminHome />
      </AdminProtected>
    ),
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/my-cart",
    element: (
      <Protected>
        <CartPage />
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <CheckoutPage />
      </Protected>
    ),
  },
  {
    path: "/product-detail/:id",
    element: (
      <Protected>
        <ProductDetailPage />
      </Protected>
    ),
  },
  {
    path: "/admin/product-detail/:id",
    element: (
      <AdminProtected>
        <AdminProductDetailPage />
      </AdminProtected>
    ),
  },
  {
    path: "/admin/product-form/edit/:id",
    element: (
      <AdminProtected>
        <AdminProductFormPage />
      </AdminProtected>
    ),
  },
  {
    path: "/admin/product-form",
    element: (
      <AdminProtected>
        <AdminProductFormPage />
      </AdminProtected>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <AdminProtected>
        <AdminOrdersPage />
      </AdminProtected>
    ),
  },
  {
    path: "/order-succ/:id",
    element: <OrderSuccessPage />,
  },
  {
    path: "/my-orders",
    element: (
      <Protected>
        <UserOrdersPage />
      </Protected>
    ),
  },
  {
    path: "/profile",
    element: (
      <Protected>
        <UserProfilePage />
      </Protected>
    ),
  },
  {
    path: "/stripe-checkout",
    element: (
      <Protected>
        <StripeCheckout />
      </Protected>
    ),
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage/>,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const checkUser = useSelector(selectuserChecked);
  // console.log(process.env.REACT_APP_STRIPE_KEY);

  useEffect(()=>{
    dispatch(checkAuthAsync());
  },[dispatch]);

  useEffect(() => {
    if (user) {
      // console.log("cart called");
      dispatch(fetchCartByUserAsync());
      dispatch(fetchUserAsync());
    }
  }, [dispatch, user]);

  return (
    <div>
      {checkUser && <Provider template={AlertTemplate} {...options}>
        <RouterProvider router={router} />
      </Provider>}
    </div>
  );
}

export default App;
