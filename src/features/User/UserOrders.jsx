import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserOrdersAsync, selectOrdersStatus, selectUserOrders } from "./userSlice";
import { MutatingDots } from "react-loader-spinner";

export function UserOrders() {
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrders);
  const status = useSelector(selectOrdersStatus);

  useEffect(() => {
    dispatch(fetchUserOrdersAsync());
  }, [dispatch]);

  return status === "loading" ? (
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
  ) : ( orders.length === 0 ? <div className="text-center mt-4"><h1 className=" text-2xl">YOU HAVE NO ORDER HISTORY</h1></div> : (
    <div className="w-full">
      {orders.map((order) => (
        <div>
          <div className="mx-auto mt-14 bg-white max-w-full px-4 py-0 sm:px-6 md:py-0 lg:px-8">
            <div className="mborder-t border-gray-200 px-4 py-6 sm:px-6">
              <h1 className="text-4xl mb-4 font-bold tracking-tight text-gray-900">
                Order # {order.id}
              </h1>
              <div className="flex justify-between my-4">
              <h3 className="text-lg mb-4 font-bold tracking-tight text-red-600">
                Order status: {order.status}
              </h3>
              <h3 className="text-lg mb-4 font-bold tracking-tight text-red-600">
                Payment status: {order.paymentStatus}
              </h3>
              <h3 className="text-lg mb-4 font-bold tracking-tight text-red-600">
                Payment method: {order.paymentMethod}
              </h3>
              </div>
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <li key={item.product.id} className="flex py-6">
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
                              <p>{item.product.title}</p>
                            </h3>
                            <p className="ml-4">${item.product.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.product.brand}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="flex gap-5">
                            <p className="text-gray-500">
                              Qty: {item.quantity}
                            </p>
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
                <p>${order.totalPrice}</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total Items</p>
                <p>
                  {order.totalItems > 1
                    ? order.totalItems + " items"
                    : order.totalItems + " item"}
                </p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="flex justify-between gap-x-6 px-3 my-4 py-5 border-2 border-solid border-gray-200">
                <div className="flex gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {order.address?.name}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {order.address?.address}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {order.address?.pinCode}
                    </p>
                  </div>
                </div>
                <div className="sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-950">
                    Phone: {order.address?.phone}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    {order.address?.city}, {order.address?.country}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  ));
}
