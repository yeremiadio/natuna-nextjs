import React, { Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  CubeIcon,
  HomeIcon,
  TemplateIcon,
  XIcon,
} from "@heroicons/react/solid";
import Image from "next/image";
import { Transition, Dialog } from "@headlessui/react";
const AdminSidebar = ({ setOpen, open, user }) => {
  const router = useRouter();

  return (
    <>
      {/* Mobile */}
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          onClose={() => setOpen(false)}
          className="fixed inset-0 z-40 md:hidden"
        >
          <Transition.Child
            enter="transition ease-in-out duration-200 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-200 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
            as="div"
          >
            <div className="flex relative z-10 flex-col w-72 h-screen bg-white md:hidden">
              <button
                onClick={() => setOpen(false)}
                className="hover:ring-2 hover:ring-gray-300 flex absolute top-2 right-2 justify-center items-center w-10 h-10 rounded-full"
                type="button"
              >
                <XIcon className="w-7 h-7 text-gray-400" />
              </button>
              <div className="py-4 px-6 mt-10 flex flex-col justify-center items-center">
                <img src="/example-logo.png" className="w-3/4 object-cover" />
              </div>
              <div className="mb-10 mt-8">
                <ul className="md:flex-col md:min-w-screen flex flex-col list-none pt-2 mx-4 space-y-1">
                  <li className="items-center">
                    <Link href="/admin/dashboard">
                      <span
                        className={
                          "flex w-full transition-all delay-75 items-center space-x-3 py-3 px-4 rounded cursor-pointer " +
                          (router.pathname.indexOf("/dashboard") !== -1
                            ? "bg-green-600 text-white font-medium"
                            : "font-normal text-gray-600")
                        }
                      >
                        <HomeIcon
                          style={{
                            width: 24,
                            color:
                              router.pathname.indexOf("/dashboard") !== -1
                                ? "text-white"
                                : "text-gray-600",
                          }}
                        />
                        <span>Dashboard</span>
                      </span>
                    </Link>
                  </li>
                  <li className="items-center">
                    <Link href="/admin/product">
                      <span
                        className={
                          "flex w-full transition-all delay-75 items-center space-x-3 py-3 px-4 rounded cursor-pointer " +
                          (router.pathname.indexOf("/product") !== -1
                            ? "bg-green-600 text-white font-medium"
                            : "font-normal text-gray-600")
                        }
                      >
                        <CubeIcon
                          style={{
                            width: 24,
                            color:
                              router.pathname.indexOf("/dashboard") !== -1
                                ? "text-white"
                                : "text-gray-600",
                          }}
                        />
                        <span>Product</span>
                      </span>
                    </Link>
                  </li>
                </ul>
                <p className="text-gray-400 text-xs absolute bottom-4 left-4">
                  © 2021 Bumidesa. All rights reserved.
                </p>
              </div>
            </div>
          </Transition.Child>
          <Transition.Child
            enter="transition-opacity ease-linear duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            as="div"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-50"></Dialog.Overlay>
          </Transition.Child>
        </Dialog>
      </Transition>

      {/* Desktop */}
      <div className="hidden w-64 bg-white border-r border-gray-200 md:block fixed h-full z-50">
        <div className="py-4 px-6 mt-4 flex flex-col justify-center items-center">
          <img src="/example-logo.png" className="w-3/4 object-cover" />
        </div>
        <div className="my-10">
          <ul className="md:flex-col md:min-w-screen flex flex-col list-none pt-2 mx-4 space-y-1">
            <li className="items-center">
              <Link href="/admin/dashboard">
                <span
                  className={
                    "flex w-full transition-all delay-75 items-center space-x-3 py-3 px-4 rounded cursor-pointer " +
                    (router.pathname.indexOf("/dashboard") !== -1
                      ? "bg-green-600 text-white font-medium"
                      : "font-normal text-gray-600")
                  }
                >
                  <HomeIcon
                    style={{
                      width: 24,
                      color:
                        router.pathname.indexOf("/dashboard") !== -1
                          ? "text-white"
                          : "text-gray-600",
                    }}
                  />
                  <span>Dashboard</span>
                </span>
              </Link>
            </li>
            <li className="items-center">
              <Link href="/admin/product">
                <span
                  className={
                    "flex w-full transition-all delay-75 items-center space-x-3 py-3 px-4 rounded cursor-pointer " +
                    (router.pathname.indexOf("/product") !== -1
                      ? "bg-green-600 text-white font-medium"
                      : "font-normal text-gray-600")
                  }
                >
                  <CubeIcon
                    style={{
                      width: 24,
                      color:
                        router.pathname.indexOf("/dashboard") !== -1
                          ? "text-white"
                          : "text-gray-600",
                    }}
                  />
                  <span>Product</span>
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
