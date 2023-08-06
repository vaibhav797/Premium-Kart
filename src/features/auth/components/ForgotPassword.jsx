import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordRequestAsync, selectLoginStatus, selectMailSent } from "../authSlice";
import { Oval } from "react-loader-spinner";

export function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const err = errors;
  const dispatch = useDispatch();
  const mailSent = useSelector(selectMailSent);
  const status = useSelector(selectLoginStatus);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-35"
            src="/logo.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Enter your email to reset password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            noValidate
            className="space-y-6"
            onSubmit={handleSubmit(({email}) => {
              // console.log(email);
              dispatch(resetPasswordRequestAsync(email));
            })}
          >
            <div>
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
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {err.email && (
                  <p className="text-red-500">{err.email.message}</p>
                )}
                {mailSent && (
                  <p className="text-green-500">Mail Sent</p>
                )}
              </div>
            </div>

     

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {status === "loading" ? (
                  <Oval
                    height={24}
                    width={24}
                    color="white"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="white"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                  />
                ) : (
                  "Send Email"
                )}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Send me back to {' '}
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
