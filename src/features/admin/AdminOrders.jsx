import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersAsync,
  selectAllOrdersStatus,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../orders/orderSlice";
import Pagination from "../common/Pagination";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";
import { MutatingDots } from "react-loader-spinner";

const AdminOrders = () => {
  const orders = useSelector(selectOrders);
  const [page, setPage] = useState(1);
  const [editOrderId, setEditOrderId] = useState(-1);
  const totalOrders = useSelector(selectTotalOrders);
  const [sort, setSort] = useState({});
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(true);
  const status = useSelector(selectAllOrdersStatus);

  const handlePage = (page) => {
    setPage(page);
  };

  const handleSort = (option) => {
    // console.log(option);
    const newSort = { _sort: option._sort, _order: option._order };
    setSort(newSort);
    setPage(1);
    // console.log(newSort);
  };

  const handleColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "recieved":
        return "bg-green-200 text-green-600";
      case "cancel":
        return "bg-red-200 text-red-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  };

  const handleEdit = (id) => {
    if(editOrderId === -1)
    {
      setEditOrderId(id);
    }
    else{
      setEditOrderId(-1);
    }
  };

  const handleOrderStatus = (e, order) => {
    const newOrder = { ...order, status: e.target.value };
    // console.log(newOrder);
    dispatch(updateOrderAsync(newOrder));
    setEditOrderId(-1);
    setUpdate(!update);
  };
  const handleOrderPaymentStatus = (e, order) => {
    const newOrder = { ...order, paymentStatus: e.target.value };
    // console.log(newOrder);
    dispatch(updateOrderAsync(newOrder));
    setEditOrderId(-1);
    setUpdate(!update);
  };

  useEffect(() => {
    dispatch(fetchAllOrdersAsync({ page, sort }));
  }, [dispatch, page, sort, update]);


  // TODO: payment method in final deploy and check signout and stripe loading



  return status === "loading" ? (
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
  ) : (totalOrders === 0 ? <div className="text-center mt-4"><h1 className=" text-2xl">NO ORDERS TO SHOW</h1></div>: (
    <>
      {/* component */}
      <div className="overflow-x-auto">
        <div className="flex w-full items-center justify-center bg-gray-100 font-sans">
          <div className="w-full p-4">
            <div className="bg-white overflow-x-auto shadow-md rounded my-6">
              <table className="table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th
                      onClick={() =>
                        handleSort({
                          _sort: "id",
                          _order: sort._order === "asc" ? "desc" : "asc",
                        })
                      }
                      className="py-3 px-2 cursor-pointer text-left"
                    >
                      Order Number{" "}
                      {sort._sort === "id" ? (
                        sort._order === "asc" ? (
                          <ArrowUpIcon className="h-4 w-4 inline" />
                        ) : (
                          <ArrowDownIcon className="h-4 w-4 inline" />
                        )
                      ) : (
                        <ArrowsUpDownIcon className="h-4 w-4 inline" />
                      )}
                    </th>
                    <th className="py-3 px-2 text-left">Items</th>
                    <th
                      onClick={() =>
                        handleSort({
                          _sort: "totalPrice",
                          _order: sort._order === "asc" ? "desc" : "asc",
                        })
                      }
                      className="py-3 px-2 cursor-pointer text-center"
                    >
                      Total Amount{" "}
                      {sort._sort === "totalPrice" ? (
                        sort._order === "asc" ? (
                          <ArrowUpIcon className="h-4 w-4 inline" />
                        ) : (
                          <ArrowDownIcon className="h-4 w-4 inline" />
                        )
                      ) : (
                        <ArrowsUpDownIcon className="h-4 w-4 inline" />
                      )}
                    </th>
                    <th className="py-3 px-2 text-center">Shipping Address</th>
                    <th className="py-3 px-2 text-center">Order Status</th>
                    <th className="py-3 px-2 text-center">Payment Method</th>
                    <th className="py-3 px-2 text-center">Payment Status</th>
                    <th
                      onClick={() =>
                        handleSort({
                          _sort: "createdAt",
                          _order: sort._order === "asc" ? "desc" : "asc",
                        })
                      }
                      className="py-3 px-2 cursor-pointer text-center"
                    >
                      Order Created At{" "}
                      {sort._sort === "createdAt" ? (
                        sort._order === "asc" ? (
                          <ArrowUpIcon className="h-4 w-4 inline" />
                        ) : (
                          <ArrowDownIcon className="h-4 w-4 inline" />
                        )
                      ) : (
                        <ArrowsUpDownIcon className="h-4 w-4 inline" />
                      )}
                    </th>
                    <th
                      onClick={() =>
                        handleSort({
                          _sort: "updatedAt",
                          _order: sort._order === "asc" ? "desc" : "asc",
                        })
                      }
                      className="py-3 px-2 cursor-pointer text-center"
                    >
                      Last Updated At{" "}
                      {sort._sort === "updatedAt" ? (
                        sort._order === "asc" ? (
                          <ArrowUpIcon className="h-4 w-4 inline" />
                        ) : (
                          <ArrowDownIcon className="h-4 w-4 inline" />
                        )
                      ) : (
                        <ArrowsUpDownIcon className="h-4 w-4 inline" />
                      )}
                    </th>
                    <th className="py-3 px-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {orders
                    ? orders.map((order) => (
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                          <td className="py-3 px-0 text-left whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="mr-2"></div>
                              <span className="font-medium text-sm">{order.id}</span>
                            </div>
                          </td>
                          <td className="py-3 px-2 text-left">
                            {order.items.map((item) => (
                              <div className="flex items-center">
                                <div className="ml-1">
                                  <img
                                    className="w-6 h-6 rounded-full"
                                    src={item.product.thumbnail}
                                  />
                                </div>
                                <span>
                                  {item.product.title} - #{item.quantity} - $
                                  {item.product.price}
                                </span>
                              </div>
                            ))}
                          </td>
                          <td className="py-3 px-0 text-center">
                            <div className="flex items-center justify-center">
                              ${order.totalPrice}
                            </div>
                          </td>
                          <td className="py-3 px-1 text-center">
                            <div className="">
                              <div>
                                <strong>{order.address?.name}</strong>
                              </div>
                              <div>{order.address?.address}</div>
                              <div>{order.address?.city}</div>
                              <div>{order.address?.state}</div>
                              <div>{order.address?.country}</div>
                              <div>{order.address?.pinCode}</div>
                            </div>
                          </td>
                          <td className="py-3 px-1 text-center">
                            {order.id !== editOrderId ? (
                              <span
                                className={`${handleColor(
                                  order.status
                                )} py-1 px-3 rounded-full text-xs`}
                              >
                                {order.status}
                              </span>
                            ) : (
                              <select
                                defaultValue={order.status}
                                onChange={(e) => handleOrderStatus(e, order)}
                              >
                                <option value="pending">Pending</option>
                                <option value="dispatched">Dispatched</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancel">Cancel</option>
                              </select>
                            )}
                          </td>
                          <td className="py-3 px-1 text-center">
                            <div className="flex items-center justify-center">
                              {order.paymentMethod}
                            </div>
                          </td>
                          <td className="py-3 px-1 text-center">
                            {order.id !== editOrderId ? (
                              <span
                                className={`${handleColor(
                                  order.paymentStatus
                                )} py-1 px-3 rounded-full text-xs`}
                              >
                                {order.paymentStatus}
                              </span>
                            ) : (
                              <select
                                defaultValue={order.paymentStatus}
                                onChange={(e) => handleOrderPaymentStatus(e, order)}
                              >
                                <option value="pending">Pending</option>
                                <option value="recieved">Recieved</option>
                              </select>
                            )}
                          </td>
                          <td className="py-3 px-2 text-center">
                            <div className="flex items-center justify-center">
                              {order.createdAt? new Date(order.createdAt).toLocaleString(): null}
                            </div>
                          </td>
                          <td className="py-3 px-2 text-center">
                            <div className="flex items-center justify-center">
                              {order.updatedAt? new Date(order.updatedAt).toLocaleString(): null}
                            </div>
                          </td>
                          <td className="py-3 px-2 text-center">
                            <div className="flex item-center justify-center">
                              <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                              </div>
                              <div
                                onClick={(e) => handleEdit(order.id)}
                                className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                  />
                                </svg>
                              </div>
                              
                            </div>
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Pagination
          totalItems={totalOrders}
          page={page}
          handlePage={handlePage}
        />
      </div>
    </>
  ));
};

export default AdminOrders;
