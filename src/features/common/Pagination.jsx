import { PRODUCTS_PER_PAGE } from "../../app/constants";
import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const Pagination = ({ page, handlePage, totalItems }) => {
  const totalPages = Math.ceil(totalItems / PRODUCTS_PER_PAGE);
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <div
          onClick={() => {
            if (page > 1) {
              handlePage(page - 1);
            }
          }}
          className="relative inline-flex cursor-pointer items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </div>
        <div
          onClick={() => {
            if (page < totalPages) {
              handlePage(page + 1);
            }
          }}
          className="relative cursor-pointer ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(page - 1) * PRODUCTS_PER_PAGE + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {page === totalPages ? totalItems : page * PRODUCTS_PER_PAGE}
            </span>{" "}
            of <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <div
              onClick={() => {
                if (page > 1) {
                  handlePage(page - 1);
                }
              }}
              className={`relative cursor-pointer inline-flex items-center rounded-l-md px-2 py-2 ${
                page === 1 ? "text-gray-400" : "text-gray-900"
              }  ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {Array.from({ length: totalPages }).map((pg, i) => (
              <div
                key={i}
                onClick={(e) => handlePage(i + 1)}
                aria-current="page"
                className={`relative cursor-pointer z-10 inline-flex items-center ${
                  page === i + 1
                    ? "bg-indigo-600 text-white"
                    : "ring-1 ring-inset ring-gray-300 hover:bg-gray-50 text-gray-900"
                }  px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                {i + 1}
              </div>
            ))}

            <div
              onClick={() => {
                if (page < totalPages) {
                  handlePage(page + 1);
                }
              }}
              className={`relative cursor-pointer inline-flex items-center px-4 py-2 text-sm font-semibold ${
                page === totalPages ? "text-gray-400" : "text-gray-900"
              } rounded-r-md ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
