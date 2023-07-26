import { useDispatch, useSelector } from "react-redux";
import {
  addProductAsync,
  clearSelectedProduct,
  fetchProductByIdAsync,
  selectAllBrands,
  selectAllCategories,
  selectedProduct,
  updateProductAsync,
} from "../ProductList/ProductSlice";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "../common/Modal";
import { useAlert } from "react-alert";

export default function AdminProductForm() {
  const { register, reset, handleSubmit, setValue } = useForm();
  const brands = useSelector(selectAllBrands);
  const categories = useSelector(selectAllCategories);
  const dispatch = useDispatch();
  const params = useParams();
  const selProduct = useSelector(selectedProduct);
  const [openDeleteModal, setOpenDeleteModal] = useState(null);
  const navigate = useNavigate();
  const alert = useAlert();

  const handleDelete = () => {
    const product = { ...selProduct };
    product.deleted = true;
    dispatch(updateProductAsync(product));
    alert.success("Product Deleted");
    navigate("/admin");
  };
  const handleRestore = () => {
    const product = { ...selProduct };
    product.deleted = false;
    dispatch(updateProductAsync(product));
    alert.success("Product Restored");
    navigate("/admin");
  };

  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductByIdAsync(params.id));
    } else {
      dispatch(clearSelectedProduct());
    }
  }, [dispatch, params.id]);

  useEffect(() => {
    if (selProduct && params.id) {
      setValue("title", selProduct?.title);
      setValue("description", selProduct?.description);
      setValue("brand", selProduct?.brand);
      setValue("category", selProduct?.category);
      setValue("price", selProduct?.price);
      setValue("discountPercentage", selProduct?.discountPercentage);
      setValue("stock", selProduct?.stock);
      setValue("thumbnail", selProduct?.thumbnail);
      setValue("image1", selProduct?.images[0]);
      setValue("image2", selProduct?.images[1]);
      setValue("image3", selProduct?.images[2]);
    }
  }, [selProduct, setValue, dispatch]);

  return (
    <>
      <form
        noValidate
        className="p-5"
        onSubmit={handleSubmit((data) => {
          const product = {
            ...data,
            images: [data.image1, data.image2, data.image3],
          };
          product.price = +product.price;
          delete product["image1"];
          delete product["image2"];
          delete product["image3"];
          // console.log(product);
          if (params.id) {
            product.id = params.id;
            product.rating = selProduct.rating;
            dispatch(updateProductAsync(product));
            alert.success("Product Updated");
            navigate("/admin");
          } else {
            dispatch(addProductAsync(product));
            alert.success("Product Created");

            reset();
          }
        })}
      >
        <div className="space-y-12 bg-white p-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Add Product
            </h2>
            {selProduct?.deleted && (
              <div>
                <p className="text-red-600">product deleted</p>
              </div>
            )}
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      {...register("title", {
                        require: "name is required",
                      })}
                      id="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    {...register("description", {
                      require: "description is required",
                    })}
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a description about the product.
                </p>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Brand
                </label>
                <div className="mt-2">
                  <select
                    {...register("brand", {
                      require: "brand is required",
                    })}
                  >
                    <option value="">--choose brand--</option>
                    {brands.map((brand) => (
                      <option key={brand.value} value={brand.value}>
                        {brand.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Category
                </label>
                <div className="mt-2">
                  <select
                    {...register("category", {
                      require: "category is required",
                    })}
                  >
                    <option value="">--choose category--</option>
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="number"
                      {...register("price", {
                        require: "price is required",
                        min: 1,
                        max: 100000,
                      })}
                      id="price"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="discountPercentage"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Discount Percentage
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="number"
                      {...register("discountPercentage", {
                        require: "Discount Percentage is required",
                        min: 0,
                        max: 100,
                      })}
                      id="discountPercentage"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Stock
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="number"
                      {...register("stock", {
                        require: "stock is required",
                        min: 0,
                      })}
                      id="stock"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Thumbnail
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      {...register("thumbnail", {
                        require: "thumbnail is required",
                      })}
                      id="thumbnail"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-6">
                <label
                  htmlFor="image1"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 1
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      {...register("image1", {
                        require: "image 1 is required",
                      })}
                      id="image1"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-6">
                <label
                  htmlFor="image2"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 2
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      {...register("image2", {
                        require: "image 2 is required",
                      })}
                      id="image2"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-6">
                <label
                  htmlFor="image3"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 3
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      {...register("image3", {
                        require: "image 3 is required",
                      })}
                      id="image3"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Notifications
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              We'll always let you know about important changes, but you pick
              what else you want to hear about.
            </p>

            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">
                  By Email
                </legend>
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="comments"
                        className="font-medium text-gray-900"
                      >
                        Comments
                      </label>
                      <p className="text-gray-500">
                        Get notified when someones posts a comment on a posting.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="candidates"
                        name="candidates"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="candidates"
                        className="font-medium text-gray-900"
                      >
                        Candidates
                      </label>
                      <p className="text-gray-500">
                        Get notified when a candidate applies for a job.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="offers"
                        name="offers"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="offers"
                        className="font-medium text-gray-900"
                      >
                        Offers
                      </label>
                      <p className="text-gray-500">
                        Get notified when a candidate accepts or rejects an
                        offer.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link to={"/admin"}>
            <button
              type="button"
              className="text-sm font-semibold mx-3 leading-6 text-gray-900"
            >
              Cancel
            </button>
          </Link>
          {selProduct &&
            (!selProduct?.deleted ? (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenDeleteModal(true);
                }}
                className="rounded-md bg-red-600 mx-3 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Delete
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleRestore()}
                className="text-sm font-semibold mx-3 leading-6 text-gray-900"
              >
                Restore Product
              </button>
            ))}
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 mx-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
      <Modal
        title={`Delete ${selProduct?.title}`}
        message={"Are you sure you want to delete this product?"}
        cancelOption={"Cancel"}
        dangerOption={"Delete"}
        dangerAction={handleDelete}
        cancelAction={() => setOpenDeleteModal(null)}
        modalOpen={openDeleteModal}
      />
    </>
  );
}
