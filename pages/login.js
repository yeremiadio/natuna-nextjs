import React, { useEffect, useRef, useState } from "react";
import { Formik, Field, Form } from "formik";
import Link from "next/link";
import Image from "next/image";
import { Transition } from "@headlessui/react";
import { loginUser } from "../actions/auth/authAction";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

function Login() {
  const initialValues = {
    email: "",
    password: "",
  };
  const FormikRef = useRef();
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  const errors = useSelector((state) => state.errors);
  const [errorEntries, setErrorEntries] = useState({});

  //Check if authenticated with role
  auth.isAuthenticated
    ? auth.data.user.role_id === 1 && router.replace("/admin/dashboard")
    : "";

  useEffect(() => {
    const ac = new AbortController();
    if (errors.isError == true) {
      setErrorEntries(errors.entries);

      //Kalau errornya banyak
      Object.keys(errors.entries).length > 0 &&
        setTimeout(() => {
          setErrorEntries({});
        }, 3000);
    } else {
      return () => {
        ac.abort();
      };
    }
  }, [errors]);
  const onSubmit = async (values) => {
    dispatch(loginUser(values));
  };
  return (
    <>
      <div className="bg-white h-screen">
        <Link href="/">
          <a className="block text-center lg:absolute lg:right-10">
            <Image
              src="/example-logo.png"
              width={100}
              height={100}
              objectFit="contain"
              alt="logo"
              className="cursor-pointer transition-all delay-75 hover:-translate-y-1"
            />
          </a>
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          <div className="bg-green-500 hidden lg:flex flex-col items-center text-white">
            test
          </div>
          <div className="mx-2 mt-16 flex flex-col lg:justify-center items-center">
            {/* Card */}
            <div className="p-4 rounded w-full sm:w-8/12">
              <div className="text-center">
                <h3 className="text-gray-800 text-lg font-bold tracking-wide">
                  Login
                </h3>
                <p className="text-gray-500 text-base">
                  Silahkan masukkan kredensial anda.
                </p>
              </div>
              <div>
                <Formik
                  initialValues={initialValues}
                  innerRef={FormikRef}
                  onSubmit={onSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <>
                        <div className="mt-4">
                          <label htmlFor="email">Email</label>
                          <Field
                            id="email"
                            className="w-full h-12 px-4 mb-2 text-lg text-gray-700 placeholder-gray-600 border rounded-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                            type="email"
                            name="email"
                            placeholder="Masukkan Email..."
                          />
                        </div>
                        {errorEntries?.email && (
                          <Transition
                            show={errorEntries?.email && true}
                            enter="transition-opacity duration-75"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <span className="text-red-500">
                              {errorEntries.email}
                            </span>
                          </Transition>
                        )}
                        <div className="mt-4">
                          <label htmlFor="password">Password</label>
                          <Field
                            id="password"
                            className="w-full h-12 px-4 mb-2 text-lg text-gray-700 placeholder-gray-600 border rounded-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                            type="password"
                            name="password"
                            placeholder="Masukkan password..."
                          />
                        </div>
                        {errorEntries?.password && (
                          <Transition
                            show={errorEntries?.password && true}
                            enter="transition-opacity duration-75"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <span className="text-red-500">
                              {errorEntries.password}
                            </span>
                          </Transition>
                        )}
                        <div className="my-4 text-right">
                          <span className="text-gray-500">
                            Belum memiliki akun? Klik{" "}
                          </span>
                          <Link href="/register">
                            <a className="text-green-600">register</a>
                          </Link>
                        </div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn btn-primary"
                        >
                          Login
                        </button>
                      </>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
