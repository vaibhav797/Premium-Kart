import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteItemAsync, selectCartLoaded, selectItems, updateCartAsync } from "./cartSlice";
import { PlusSmallIcon, MinusSmallIcon } from "@heroicons/react/24/outline";
import { Link, Navigate } from "react-router-dom";
import Modal from "../common/Modal";

export function Cart() {
  const count = useSelector(selectItems);
  const dispatch = useDispatch();
  const [openDeleteModal, setOpenDeleteModal] = useState(null);
  const items = useSelector(selectItems);
  const cartLoaded = useSelector(selectCartLoaded);

  const handleQuantity = (item, task) => {
    let qty = item.quantity;
    if (task === 1) {
      qty++;
      dispatch(updateCartAsync({ id:item.id, quantity: qty }));
    } else {
      if (qty > 1) {
        qty--;
        dispatch(updateCartAsync({ id:item.id, quantity: qty }));
      } else handleRemove(item.id);
    }
  };

  const handleRemove = (itemId) => {
    // console.log(itemId);
    dispatch(deleteItemAsync(itemId));
  };

  const totalPrice = items.reduce(
    (amount, i) => i.quantity * i.product?.price + amount,
    0
  );
  const totalItems = items.reduce((total, i) => i.quantity + total, 0);

  return (
    <>
      {!items.length && cartLoaded &&  <Navigate to={"/"} replace={true}></Navigate>}

      <div className="mx-auto mt-14 bg-white max-w-2xl px-4 py-0 sm:px-6 md:py-0 lg:px-8">
        <div className="mborder-t border-gray-200 px-4 py-6 sm:px-6">
          <h1 className="text-4xl mb-4 font-bold tracking-tight text-gray-900">
            Cart
          </h1>
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.product?.thumbnail}
                      alt={item.product?.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <p>{item.product?.title}</p>
                        </h3>
                        <p className="ml-4">${item.product?.price}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{item.product?.brand}</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="flex gap-5">
                        <MinusSmallIcon
                          onClick={() => handleQuantity(item, 0)}
                          className="h-6 border w-6 cursor-pointer"
                        />

                        <p className="text-gray-500">Qty: {item.quantity}</p>

                        <PlusSmallIcon
                          onClick={() => handleQuantity(item, 1)}
                          className="h-6 border w-6 cursor-pointer"
                        />
                      </div>
                      <Modal
                        title={`Delete ${item.product?.title}`}
                        message={"Are you sure you want to delete this item?"}
                        cancelOption={"Cancel"}
                        dangerOption={"Delete"}
                        dangerAction={() => handleRemove(item.id)}
                        cancelAction = {()=> setOpenDeleteModal(null)}
                        modalOpen={openDeleteModal === item.id}
                      />
                      <div className="flex">
                        <button
                          onClick={()=>setOpenDeleteModal(item.id)}
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
              {totalItems > 1 ? totalItems + " items" : totalItems + " item"}
            </p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <Link
              to={"/checkout"}
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or
              <Link to={"/"}>
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  &nbsp; Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
