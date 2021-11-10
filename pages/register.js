import React, { useEffect, useRef, useState } from "react";
import { Formik, Field, Form } from "formik";
import Link from "next/link";
import Image from "next/image";
import { Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { registerUser } from "../actions/auth/authAction";

const Register = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };
  const errors = useSelector((state) => state.errors);
  const [errorEntries, setErrorEntries] = useState({});
  const FormikRef = useRef();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const router = useRouter();
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
    values.password_confirmation = values.password;
    await dispatch(registerUser(values));
    // await instance
    //   .post("api/register", values)
    //   .then((res) => {
    //     FormikRef.current.setSubmitting(false);
    //     FormikRef.current.resetForm();
    //   })
    //   .catch((err) => {
    //     let errorRes = err.response.data.data;
    //     errorRes !== undefined && setErrors(errorRes);
    //   });
  };
  return (
    <>
      <div className="bg-white h-screen">
        <div className="mx-4 flex flex-col justify-center items-center h-full">
          <Link href="/">
            <a>
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

          {/* Card */}
          <div className="bg-white border border-gray-100 p-4 rounded shadow w-full sm:w-3/5 md:w-3/5 lg:w-4/12">
            <div className="text-center">
              <h3 className="text-gray-800 text-lg font-bold tracking-wide">
                Register
              </h3>
              <p className="text-gray-500 text-base">
                Silahkan daftarkan akun anda.
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
                      <div className="mt-4"></div>
                      <label htmlFor="name">Username</label>
                      <Field
                        id="name"
                        className="w-full h-12 px-4 mb-2 text-lg text-gray-700 placeholder-gray-600 border rounded-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                        type="text"
                        name="name"
                        placeholder="Masukkan Username..."
                      />
                      {errorEntries?.name && (
                        <Transition
                          show={errorEntries?.name && true}
                          enter="transition-opacity duration-75"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                          leave="transition-opacity duration-150"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <span className="text-red-500">
                            {errorEntries.name}
                          </span>
                        </Transition>
                      )}
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
                          Sudah memiliki akun? Klik{" "}
                        </span>
                        <Link href="/login">
                          <a className="text-green-600">login</a>
                        </Link>
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary"
                      >
                        Register
                      </button>
                    </>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
