import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { connect, useDispatch, useSelector } from "react-redux";

import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import {
  ChevronDownIcon,
  MenuAlt1Icon,
  MenuAlt2Icon,
  MenuIcon,
} from "@heroicons/react/solid";
import { logoutUser } from "../../actions/auth/authAction";
import { createStandaloneToast } from "@chakra-ui/toast";

const AdminNavbar = ({ setOpen, open, user }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors);
  const toast = createStandaloneToast();

  const logOut = () => {
    if (window !== undefined || errors.entries.status === 401) {
      dispatch(logoutUser(toast));
      router.replace("/login");
    }
  };

  return (
    <>
      <div className="flex justify-between p-4 lg:py-6 lg:px-8 bg-white mt-0 fixed w-full z-40 top-0 border-b border-gray-200">
        <div className="flex items-center flex-1">
          <button
            onClick={() => setOpen(!open)}
            className="mr-3 md:hidden flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full text-gray-600"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>
        <Menu as="div" className="relative flex items-center">
          <Menu.Button className="flex items-center">
            <p className="inline mx-2 text-gray-600 font-medium text-sm tracking-wide">
              {user || ""}
            </p>
            {/* <img
              className="w-8 h-8 inline rounded-full"
              src="/vercel.svg"
              alt=""
            /> */}
            <ChevronDownIcon className="inline h-4 w-4 mt-0.5 mx-1 md:mx-0 text-gray-600" />
          </Menu.Button>
          <Transition
            enter="transition transform duration-100 ease-out"
            enterFrom="opacity-0 scale-90"
            enterTo="opacity-100 scale-100"
            leave="transition transform duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-90"
          >
            <Menu.Items className="origin-top-right mt-6 focus:outline-none absolute right-0 bg-white overflow-hidden rounded-md shadow-lg border w-48">
              <Menu.Item>
                <a className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100">
                  My Profile
                </a>
              </Menu.Item>
              <Menu.Item>
                <a
                  className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                  onClick={logOut}
                >
                  Logout
                </a>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </>
  );
};

export default AdminNavbar;
