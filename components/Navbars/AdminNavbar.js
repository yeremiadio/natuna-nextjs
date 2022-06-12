import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { connect, useDispatch, useSelector } from "react-redux";
import UserDropdown from "../Dropdowns/UserDropdown";

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
    if (window !== undefined || errors?.entries?.status === 401) {
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
            className="mr-3 md:hidden flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full text-secondary"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>
        <UserDropdown user={user} />
      </div>
    </>
  );
};

export default AdminNavbar;
