import React from "react";
import Link from "next/link";
import { Button } from "@chakra-ui/button";
import { useSelector } from "react-redux";
import UserDropdown from "../Dropdowns/UserDropdown";
import { MenuIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

const Navbar = ({ setOpen, open }) => {
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  return (
    <>
      <div className="hidden lg:flex sticky top-0 p-4 lg:px-12 items-center justify-center bg-blue-600">
        <span className="text-sm text-white">
          Jl. Ismail Mahdi, Telp : 0821-6961-1109
        </span>
      </div>
      <header className="sticky top-0 z-40">
        <nav className="w-full bg-white border-b border-gray-200 p-4 lg:px-12">
          <div className="flex flex-row-reverse lg:flex-row items-center justify-between flex-1 container mx-auto">
            <div className="contents">
              <button
                onClick={() => setOpen(!open)}
                className="mr-3 lg:hidden flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full text-secondary"
              >
                <MenuIcon className="h-6 w-6" />
              </button>
            </div>
            <div>
              <Link href="/">
                <div className="flex items-center cursor-pointer">
                  <img
                    src={
                      auth?.user?.avatar
                        ? process.env.baseUrl +
                          "/assets/images/user/avatar/" +
                          auth?.user?.avatar
                        : "/vercel.svg"
                    }
                    className="object-cover w-14 mr-3"
                  />
                  <div className="text-sm hidden sm:flex flex-col">
                    <p className="mb-0 font-semibold">BUMDes</p> Laut Sakti
                    Daratan Bertuah
                  </div>
                </div>
              </Link>
            </div>
            <div className="hidden lg:contents">
              <ul className="flex gap-16 p-4">
                <Link href="/">
                  <a
                    className={
                      router.asPath === "/" || router.pathname === "/"
                        ? "text-primary font-bold transition ease-in-out delay-75"
                        : "text-secondary hover:text-primary font-medium transition ease-in-out delay-75"
                    }
                  >
                    Home
                  </a>
                </Link>
                <Link href="/about">
                  <a
                    className={
                      router.asPath === "/about" || router.pathname === "/about"
                        ? "text-primary font-bold transition ease-in-out delay-75"
                        : "text-secondary hover:text-primary font-medium transition ease-in-out delay-75"
                    }
                  >
                    About
                  </a>
                </Link>
                <Link href="/products">
                  <a
                    className={
                      router.pathname.indexOf("/products") !== -1
                        ? "text-primary font-bold transition ease-in-out delay-75"
                        : "text-secondary hover:text-primary font-medium transition ease-in-out delay-75"
                    }
                  >
                    Products
                  </a>
                </Link>
                <Link href="/contact">
                  <a
                    className={
                      router.asPath === "/contact" ||
                      router.pathname === "/contact"
                        ? "text-primary font-bold transition ease-in-out delay-75"
                        : "text-secondary hover:text-primary font-medium transition ease-in-out delay-75"
                    }
                  >
                    Contact
                  </a>
                </Link>
              </ul>
            </div>
            <div className="hidden lg:flex gap-1">
              {auth?.isAuthenticated ? (
                <UserDropdown user={auth?.user} />
              ) : (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => router.replace("/login")}
                  >
                    Login
                  </Button>
                  <Button
                    colorScheme="blue"
                    variant="solid"
                    onClick={() => router.replace("/register")}
                  >
                    Register
                  </Button>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
