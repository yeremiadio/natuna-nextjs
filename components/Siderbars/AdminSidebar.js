import React, { Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  CubeIcon,
  HomeIcon,
  PuzzleIcon,
  UserGroupIcon,
  XIcon,
} from "@heroicons/react/solid";
// import Image from "next/image";
import { Transition, Dialog } from "@headlessui/react";
const AdminSidebar = ({ setOpen, open }) => {
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
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
            as="div"
            className="flex z-10 relative flex-col w-72 h-screen bg-white md:hidden"
          >
            <button
              onClick={() => setOpen(false)}
              className="hover:ring-2 hover:ring-gray-300 flex absolute top-2 right-2 justify-center items-center w-10 h-10 rounded-full"
              type="button"
            >
              <XIcon className="w-7 h-7 text-secondary" />
            </button>
            <div className="py-4 px-6 mt-10 flex flex-col justify-center items-center">
              <img
                src="/logo.jpeg"
                onClick={() => router.replace("/")}
                className="w-3/4 cursor-pointer object-cover"
              />
            </div>
            <div className="mb-10 mt-8">
              <ul className="md:flex-col md:min-w-screen flex flex-col list-none pt-2 mx-4 space-y-1">
                <li className="items-center" onClick={() => setOpen(false)}>
                  <Link href="/admin/dashboard">
                    <span
                      className={
                        "flex w-full transition-all delay-75 items-center space-x-3 py-3 px-4 rounded cursor-pointer " +
                        (router.pathname.indexOf("/dashboard") !== -1
                          ? "bg-blue-600 text-white font-medium"
                          : "font-normal text-secondary")
                      }
                    >
                      <HomeIcon
                        style={{
                          width: 24,
                          color:
                            router.pathname.indexOf("/dashboard") !== -1
                              ? "text-white"
                              : "text-secondary",
                        }}
                      />
                      <span>Dashboard</span>
                    </span>
                  </Link>
                </li>
                <li className="items-center" onClick={() => setOpen(false)}>
                  <Link href="/admin/products">
                    <span
                      className={
                        "flex w-full transition-all delay-75 items-center space-x-3 py-3 px-4 rounded cursor-pointer " +
                        (router.pathname.indexOf("/product") !== -1
                          ? "bg-blue-600 text-white font-medium"
                          : "font-normal text-secondary")
                      }
                    >
                      <CubeIcon
                        style={{
                          width: 24,
                          color:
                            router.pathname.indexOf("/product") !== -1
                              ? "text-white"
                              : "text-secondary",
                        }}
                      />
                      <span>Product</span>
                    </span>
                  </Link>
                </li>
                <li className="items-center" onClick={() => setOpen(false)}>
                  <Link href="/admin/category">
                    <span
                      className={
                        "flex w-full transition-all delay-75 items-center space-x-3 py-3 px-4 rounded cursor-pointer " +
                        (router.pathname.indexOf("/category") !== -1
                          ? "bg-blue-600 text-white font-medium"
                          : "font-normal text-secondary")
                      }
                    >
                      <PuzzleIcon
                        style={{
                          width: 24,
                          color:
                            router.pathname.indexOf("/category") !== -1
                              ? "text-white"
                              : "text-secondary",
                        }}
                      />
                      <span>Category</span>
                    </span>
                  </Link>
                </li>
                <li className="items-center" onClick={() => setOpen(false)}>
                  <Link href="/admin/users">
                    <span
                      className={
                        "flex w-full transition-all delay-75 items-center space-x-3 py-3 px-4 rounded cursor-pointer " +
                        (router.pathname.indexOf("/users") !== -1
                          ? "bg-blue-600 text-white font-medium"
                          : "font-normal text-secondary")
                      }
                    >
                      <UserGroupIcon
                        style={{
                          width: 24,
                          color:
                            router.pathname.indexOf("/users") !== -1
                              ? "text-white"
                              : "text-secondary",
                        }}
                      />
                      <span>Users</span>
                    </span>
                  </Link>
                </li>
              </ul>
              {/* <div className="m-4 absolute bottom-2">
                <p className="text-secondary text-xs leading-relaxed left-4">
                  ?? 2021 BUMDes Laut Sakti Daratan Bertuah. All rights reserved.
                </p>
              </div> */}
            </div>
          </Transition.Child>
          <Transition.Child
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            as="div"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-50" />
          </Transition.Child>
        </Dialog>
      </Transition>

      {/* Desktop */}
      <div className="hidden w-64 bg-white border-r border-gray-200 md:block fixed h-full z-50">
        <div className="py-4 px-6 mt-4 flex flex-col justify-center items-center">
          <img
            src="/logo.jpeg"
            onClick={() => router.replace("/")}
            className="w-2/4 object-cover cursor-pointer"
          />
        </div>
        <div className="my-10">
          <ul className="md:flex-col md:min-w-screen flex flex-col list-none pt-2 mx-4 space-y-1">
            <li className="items-center">
              <Link href="/admin/dashboard" as="/admin/dashboard">
                <span
                  className={
                    "flex w-full transition-all delay-75 items-center space-x-3 py-3 px-4 rounded cursor-pointer " +
                    (router.pathname.indexOf("/dashboard") !== -1
                      ? "bg-blue-600 text-white font-medium"
                      : "font-normal text-secondary")
                  }
                >
                  <HomeIcon
                    style={{
                      width: 24,
                      color:
                        router.pathname.indexOf("/dashboard") !== -1
                          ? "text-white"
                          : "text-secondary",
                    }}
                  />
                  <span>Dashboard</span>
                </span>
              </Link>
            </li>
            <li className="items-center">
              <Link href="/admin/products" as="/admin/products">
                <span
                  className={
                    "flex w-full transition-all delay-75 items-center space-x-3 py-3 px-4 rounded cursor-pointer " +
                    (router.pathname.indexOf("/products") !== -1
                      ? "bg-blue-600 text-white font-medium"
                      : "font-normal text-secondary")
                  }
                >
                  <CubeIcon
                    style={{
                      width: 24,
                      color:
                        router.pathname.indexOf("/products") !== -1
                          ? "text-white"
                          : "text-secondary",
                    }}
                  />
                  <span>Products</span>
                </span>
              </Link>
            </li>
            <li className="items-center" onClick={() => setOpen(false)}>
              <Link href="/admin/category">
                <span
                  className={
                    "flex w-full transition-all delay-75 items-center space-x-3 py-3 px-4 rounded cursor-pointer " +
                    (router.pathname.indexOf("/category") !== -1
                      ? "bg-blue-600 text-white font-medium"
                      : "font-normal text-secondary")
                  }
                >
                  <PuzzleIcon
                    style={{
                      width: 24,
                      color:
                        router.pathname.indexOf("/category") !== -1
                          ? "text-white"
                          : "text-secondary",
                    }}
                  />
                  <span>Category</span>
                </span>
              </Link>
            </li>
            <li className="items-center" onClick={() => setOpen(false)}>
              <Link href="/admin/users">
                <span
                  className={
                    "flex w-full transition-all delay-75 items-center space-x-3 py-3 px-4 rounded cursor-pointer " +
                    (router.pathname.indexOf("/users") !== -1
                      ? "bg-blue-600 text-white font-medium"
                      : "font-normal text-secondary")
                  }
                >
                  <UserGroupIcon
                    style={{
                      width: 24,
                      color:
                        router.pathname.indexOf("/users") !== -1
                          ? "text-white"
                          : "text-secondary",
                    }}
                  />
                  <span>Users</span>
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
