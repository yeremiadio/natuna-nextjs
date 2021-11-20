import React from "react";
import Link from "next/link";
import { Button } from "@chakra-ui/button";
import ActiveLink from "../ActiveLink";

const Navbar = () => {
  const navigations = [
    { href: "/", name: "Home" },
    { href: "/about", name: "About" },
    { href: "/products", name: "Products" },
    { href: "/contact", name: "Contact Us" },
  ];
  return (
    <header className="fixed top-0 z-10 w-full bg-white">
      <nav className="w-full z-40 top-0 border-b border-gray-200 p-4 lg:px-8">
        <div className="flex items-center justify-between flex-1 container mx-auto">
          <div>
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <img src="/logo.jpeg" className="object-cover w-14 mr-3" />
                <div className="text-sm hidden sm:flex flex-col">
                  <p className="mb-0 font-semibold">Bumi Desa</p> Laut Sakti
                  Daratan Bertuah
                </div>
              </div>
            </Link>
          </div>
          <div>
            <ul className="hidden lg:flex gap-16 p-4">
              {navigations.map((item, i) => (
                <li key={i}>
                  <ActiveLink href={item.href} name={item.name} />
                </li>
              ))}
            </ul>
          </div>
          {/* <div className="hidden lg:flex gap-1">
            <Button variant="ghost">Login</Button>
            <Button colorScheme="blue" variant="solid">
              Register
            </Button>
          </div> */}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
