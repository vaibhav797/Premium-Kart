import React from "react";
import { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteItemAsync,
  updateCartAsync,
  selectItems,
} from "../features/cart/cartSlice";
import { PlusSmallIcon, MinusSmallIcon } from "@heroicons/react/24/outline";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  createOrderAsync,
  selectAllOrdersStatus,
  selectCurrentOrder,
} from "../features/orders/orderSlice";
import { selectUserInfo, updateUserAsync } from "../features/User/userSlice";
import { MutatingDots } from "react-loader-spinner";
import { selectuserChecked } from "../features/auth/authSlice";

const CheckoutPage = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const items = useSelector(selectItems);
  const user = useSelector(selectUserInfo);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [add, setAdd] = useState(0);
  const status = useSelector(selectAllOrdersStatus);
  const userChecked = useSelector(selectuserChecked);

  console.log(errors);

  const handleQuantity = (item, task) => {
    let qty = item.quantity;
    if (task === 1) {
      qty++;
    } else {
      if (qty > 1) {
        qty--;
      } else handleRemove(item.id);
    }
    dispatch(updateCartAsync({ id: item.id, quantity: qty }));
  };

  const handleRemove = (itemId) => {
    dispatch(deleteItemAsync(itemId));
  };

  const totalPrice = items.reduce(
    (amount, i) => i.quantity * i.product.price + amount,
    0
  );
  const totalItems = items.reduce((total, i) => i.quantity + total, 0);

  const handleAddress = (index) => {
    setAdd(index);
  };

  const handlePayment = (method) => {
    setPaymentMethod(method);
  };

  const handleOrder = () => {
    if (user.addresses[add]) {
      dispatch(
        createOrderAsync({
          user: user.id,
          totalItems,
          totalPrice,
          items,
          paymentMethod,
          address: user.addresses[add],
          status: "pending",
        })
      );
    } else {
      alert("Select Address");
    }
  };

  const curOrder = useSelector(selectCurrentOrder);

  return  user && (
   (
      <>
        {!items.length && userChecked  && <Navigate to={"/"} replace={true}></Navigate>}
        {curOrder && curOrder.paymentMethod === "cash" && (
          <Navigate to={`/order-succ/${curOrder.id}`} replace={true}></Navigate>
        )}
        {curOrder && curOrder.paymentMethod === "card" && (
          <Navigate to={`/stripe-checkout/`} replace={true}></Navigate>
        )}

      {status === "loading" ? (
    <div className="flex justify-center items-center">
      <MutatingDots
        height="100"
        width="100"
        color="rgb(79, 70, 229)"
        secondaryColor="rgb(79, 70, 229)"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  ) : 
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
            <div className="lg:col-span-3 bg-white mt-10">
              <form
                noValidate
                className="p-5"
                onSubmit={handleSubmit((data) => {
                  const updatedUser = {
                    ...user,
                    addresses: [...user.addresses, data],
                  };
                  console.log(updatedUser);
                  dispatch(updateUserAsync(updatedUser));
                  reset();
                })}
              >
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className=" text-3xl font-semibold leading-7 text-gray-900">
                      Personal Information
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Use a permanent address where you can receive mail.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Full name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("name", {
                              require: "name is required",
                            })}
                            id="name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            {...register("email", {
                              required: "email is required",
                              pattern: {
                                value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                                message: "email is not valid",
                              },
                            })}
                            type="email"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-2 sm:col-start-1">
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Phone
                        </label>
                        <div className="mt-2">
                          <input
                            type="tel"
                            {...register("phone", {
                              require: "phone is required",
                            })}
                            id="phone"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Country
                        </label>
                        <div className="mt-2">
                          <select
                            id="country"
                            {...register("country", {
                              require: "country is required",
                            })}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          >
                            <option>India</option>
                            <option>United States</option>
                            <option>Canada</option>
                            <option>Mexico</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Address
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("address", {
                              require: "address is required",
                            })}
                            id="address"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2 sm:col-start-1">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          City
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("city", {
                              require: "city is required",
                            })}
                            id="city"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="state"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          State
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("state", {
                              require: "state is required",
                            })}
                            id="state"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="pinCode"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Pin code
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("pinCode", {
                              require: "pinCode is required",
                            })}
                            id="pinCode"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      type="button"
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Add Address
                    </button>
                  </div>

                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                      Address
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Choose from existing addresses.
                    </p>
                    <ul role="list">
                      {user.addresses.map((address, i) => (
                        <li
                          key={i}
                          className="flex justify-between gap-x-6 px-3 my-4 py-5 border-2 border-solid border-gray-200"
                        >
                          <div className="flex gap-x-4">
                            <input
                              type="radio"
                              name="address"
                              id="address"
                              checked={add === i}
                              onClick={() => handleAddress(i)}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <div className="min-w-0 flex-auto">
                              <p className="text-sm font-semibold leading-6 text-gray-900">
                                {address.name}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                {address.address}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                {address.pinCode}
                              </p>
                            </div>
                          </div>
                          <div className="sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-950">
                              Phone: {address.phone}
                            </p>
                            <p className="mt-1 text-xs leading-5 text-gray-500">
                              {address.city},{address.country}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <fieldset>
                      <legend className="text-sm font-semibold leading-6 text-gray-900">
                        Payment Methods
                      </legend>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Choose One
                      </p>
                      <div className="mt-6 space-y-6">
                        <div className="flex items-center gap-x-3">
                          <input
                            name="payments"
                            type="radio"
                            value={"card"}
                            checked={paymentMethod === "card"}
                            onClick={() => handlePayment("card")}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="push-email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Card
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            name="payments"
                            type="radio"
                            value={"cash"}
                            onClick={() => handlePayment("cash")}
                            checked={paymentMethod === "cash"}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="push-nothing"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Cash
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </form>
            </div>
            <div className="lg:col-span-2">
              <div className="mx-auto mt-14 bg-white max-w-2xl px-0 py-0 sm:px-6 md:py-0 lg:px-0">
                <div className="mborder-t border-gray-200 px-4 py-6 sm:px-6">
                  <h1 className="text-4xl mb-4x font-bold tracking-tight text-gray-900">
                    Cart
                  </h1>
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {items.map((item) => (
                        <li key={item.product?.id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={item.product.thumbnail}
                              alt={item.product.title}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <a href={item.product.href}>
                                    {item.product.title}
                                  </a>
                                </h3>
                                <p className="ml-4">${item.product?.price}</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                {item.product.brand}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="flex gap-5">
                                <MinusSmallIcon
                                  onClick={() => handleQuantity(item, 0)}
                                  className="h-6 border w-6 cursor-pointer"
                                />

                                <p className="text-gray-500">
                                  Qty: {item.quantity}
                                </p>

                                <PlusSmallIcon
                                  onClick={() => handleQuantity(item, 1)}
                                  className="h-6 border w-6 cursor-pointer"
                                />
                              </div>

                              <div className="flex">
                                <button
                                  onClick={() => handleRemove(item.product?.id)}
                                  type="button"
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${totalPrice}</p>
                  </div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Total Items</p>
                    <p>
                      {totalItems > 1
                        ? totalItems + " items"
                        : totalItems + " item"}
                    </p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <div
                      onClick={() => handleOrder()}
                      className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Order Now
                    </div>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or
                      <Link to={"/"}>
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={() => setOpen(false)}
                        >
                          &nbsp; Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>}
      </>
    )
  );
};

export default CheckoutPage;
