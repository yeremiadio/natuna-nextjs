import React, { useEffect, useRef, useState } from "react";
import { Formik, Field, Form } from "formik";
import instance from "../utils/instance";
import Link from "next/link";
import Image from "next/image";

const Register = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };
  const [errors, setErrors] = useState({});
  const FormikRef = useRef();
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setTimeout(() => {
        setErrors({});
      }, 3000);
    }
  }, [errors]);
  const onSubmit = async (values) => {
    values.password_confirmation = values.password;
    await instance
      .post("api/register", values)
      .then((res) => {
        FormikRef.current.setSubmitting(false);
        FormikRef.current.resetForm();
      })
      .catch((err) => {
        setErrors(err.response.data.data);
      });
  };
  return (
    <>
      <div className="bg-white h-screen">
        <div className="mx-4 flex flex-col justify-center items-center h-full">
          <Link href="/">
            <a>
              <Image
                src="/example-logo.png"
                width={140}
                height={140}
                objectFit="contain"
                alt="logo"
                className="cursor-pointer transition-all delay-75 hover:-translate-y-1"
              />
            </a>
          </Link>

          {/* Card */}
          <div className="bg-white border border-gray-100 p-4 rounded shadow-lg w-full sm:w-3/5 md:w-3/5 lg:w-4/12">
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
                      {errors?.name && (
                        <span className="text-red-500">{errors.name}</span>
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
                      {errors?.email && (
                        <span className="text-red-500">{errors.email}</span>
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
                      {errors?.password && (
                        <span className="text-red-500">{errors.password}</span>
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
                        className="w-full mt-2 py-3 rounded text-white bg-green-600 hover:bg-green-700 transition-all delay-75"
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
