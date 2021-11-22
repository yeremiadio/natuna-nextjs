import React, { Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  CubeIcon,
  HomeIcon,
  UserGroupIcon,
  XIcon,
} from "@heroicons/react/solid";
// import Image from "next/image";
import { Transition, Dialog } from "@headlessui/react";
const MainSideBar = ({ setOpen, open }) => {
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
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
            as="div"
            className="flex z-10 relative flex-col w-72 float-right bg-white shadow-boxShadow-siderbar-main h-screen md:hidden"
          >
            <button
              onClick={() => setOpen(false)}
              className="hover:ring-2 hover:ring-gray-300 flex absolute top-6 right-7 justify-center items-center w-10 h-10 rounded-full"
              type="button"
            >
              <XIcon className="w-7 h-7 text-gray-400" />
            </button>
            <div className="mb-10 mt-8">
              <ul className="md:flex-col md:min-w-screen flex flex-col list-none pt-2 mx-4 space-y-1">
                <li
                  className="items-center"
                  onClick={() => setOpen(false)}
                ></li>
              </ul>
              <div className="m-4 absolute bottom-2">
                <p className="text-gray-400 text-xs leading-relaxed left-4">
                  © 2021 BUMDes Laut Sakti Daratan Bertuah. All rights reserved.
                </p>
              </div>
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
    </>
  );
};

export default MainSideBar;
