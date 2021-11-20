import React, { useEffect, useRef, useState } from "react";
import { Formik, Field, Form } from "formik";
import Link from "next/link";
import Image from "next/image";
import { Transition } from "@headlessui/react";
import { loginUser } from "../actions/auth/authAction";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/toast";
import { Button } from "@chakra-ui/button";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/media-query";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import Head from "next/head";

function Login() {
  const initialValues = {
    email: "",
    password: "",
  };
  const FormikRef = useRef();
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const auth = useSelector((state) => state.auth);
  const errors = useSelector((state) => state.errors);
  const [errorEntries, setErrorEntries] = useState({});
  const toast = useToast();
  const [isSmallestThan768] = useMediaQuery("(max-width: 768px)");

  //Check if authenticated with role
  auth.isAuthenticated
    ? auth.user.role_id === 1 && router.replace("/admin/dashboard")
    : "";

  useEffect(() => {
    const ac = new AbortController();
    if (errors.isError == true) {
      // Kalau errornya banyak
      if (errors?.entries?.errors !== undefined) {
        setErrorEntries(errors.entries.errors);
        Object.keys(errors.entries).length > 0 &&
          setTimeout(() => {
            setErrorEntries({});
          }, 3000);
      }
    }
    return () => {
      ac.abort();
    };
  }, [errors]);
  const onSubmit = async (values) => {
    dispatch(loginUser(values, toast));
  };
  return (
    <>
      <Head>
        <title>Login - BUMDes Laut Sakti Daratan Bertuah</title>
      </Head>
      <div className="bg-white h-full">
        <Link href="/">
          <a className="lg:absolute lg:right-10 lg:top-6 flex flex-col justify-center items-center mt-20 lg:mt-0">
            <img
              src="/logo.jpeg"
              alt="logo"
              className="object-cover w-24 cursor-pointer transition-all delay-75 hover:-translate-y-1"
            />
          </a>
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
          <div className="bg-blue-500 hidden lg:flex flex-col items-center text-white"></div>
          <div className="mx-2 mt-16 flex flex-col lg:justify-center items-center">
            {/* Card */}
            <div className="p-4 rounded w-full border border-gray-100 sm:w-8/12">
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
                          <label
                            className={errorEntries?.email && "text-red-500"}
                          >
                            Email
                          </label>
                          <Field
                            as={Input}
                            isInvalid={errorEntries?.email && true}
                            size="lg"
                            variant="outline"
                            focusBorderColor="blue.600" // className="w-full h-12 px-4 mb-2 text-lg text-gray-700 placeholder-gray-600 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                          <label
                            className={errorEntries?.password && "text-red-500"}
                          >
                            Password
                          </label>
                          <InputGroup>
                            <Field
                              as={Input}
                              size="lg"
                              isInvalid={errorEntries?.password && true}
                              variant="outline"
                              focusBorderColor="blue.600"
                              pr="4.5rem"
                              type={showPassword ? "text" : "password"}
                              name="password"
                              placeholder="Masukkan password..."
                            />
                            <InputRightElement width="4.5rem">
                              <button
                                type="button"
                                className="absolute top-3"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <EyeIcon className="w-5 h-5 text-gray-500" />
                                ) : (
                                  <EyeOffIcon className="w-5 h-5 text-gray-500" />
                                )}
                              </button>
                            </InputRightElement>
                          </InputGroup>
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
                            <a className="text-blue-600 font-medium">
                              Register
                            </a>
                          </Link>
                        </div>
                        <Button
                          colorScheme="blue"
                          isLoading={auth.isFetching}
                          loadingText="Checking"
                          px="6"
                          isFullWidth={isSmallestThan768 && true}
                          type="submit"
                          size="md"
                        >
                          Login
                        </Button>
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
