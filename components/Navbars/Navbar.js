import React from "react";
import Link from "next/link";
import { Button } from "@chakra-ui/button";
import ActiveLink from "../ActiveLink";
import { useSelector } from "react-redux";
import UserDropdown from "../Dropdowns/UserDropdown";
import { Box } from "@chakra-ui/layout";
import WhatsappIcon from "../SocialMediaIcons/WhatsappIcon";
import { MailIcon, MenuIcon } from "@heroicons/react/solid";

const Navbar = ({ setOpen, open }) => {
  const navigations = [
    { href: "/", name: "Home" },
    { href: "/about", name: "About" },
    { href: "/products", name: "Products" },
    { href: "/contact", name: "Contact Us" },
  ];
  const auth = useSelector((state) => state.auth);
  return (
    <>
      <div className="hidden lg:flex sticky top-0 p-4 lg:px-12 items-center justify-between bg-blue-600">
        <span className="text-sm text-white">
          Jl. Ismail Mahdi, Telp : 0821-6961-1109
        </span>
        <Box display="flex" className="gap-2">
          <Button
            leftIcon={<WhatsappIcon className="w-6 h-6" />}
            variant="solid"
          >
            Call Now
          </Button>
          <Button leftIcon={<MailIcon className="w-6 h-6" />} variant="solid">
            Email
          </Button>
        </Box>
      </div>
      <header className="sticky top-0 z-40">
        <nav className="w-full bg-white border-b border-gray-200 p-4 lg:px-12">
          <div className="flex flex-row-reverse lg:flex-row items-center justify-between flex-1 container mx-auto">
            <div className="contents">
              <button
                onClick={() => setOpen(!open)}
                className="mr-3 lg:hidden flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full text-gray-600"
              >
                <MenuIcon className="h-6 w-6" />
              </button>
            </div>
            <div>
              <Link href="/">
                <div className="flex items-center cursor-pointer">
                  <img src="/logo.jpeg" className="object-cover w-14 mr-3" />
                  <div className="text-sm hidden sm:flex flex-col">
                    <p className="mb-0 font-semibold">BUMDes</p> Laut Sakti
                    Daratan Bertuah
                  </div>
                </div>
              </Link>
            </div>
            <div className="hidden lg:contents">
              <ul className="flex gap-16 p-4">
                {navigations.map((item, i) => (
                  <li key={i}>
                    <ActiveLink href={item.href} name={item.name} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden lg:flex gap-1">
              {auth.isAuthenticated ? (
                <UserDropdown user={auth.user} />
              ) : (
                <>
                  <Button variant="ghost">
                    <Link href="login">
                      <a>Login</a>
                    </Link>
                  </Button>
                  <Button colorScheme="blue" variant="solid">
                    <Link href="register">
                      <a>Register</a>
                    </Link>
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
