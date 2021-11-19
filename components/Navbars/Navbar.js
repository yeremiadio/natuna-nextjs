import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <header>
      <nav className="w-full z-40 top-0 border-b border-gray-200 p-4">
        <div className="flex items-center flex-1 container mx-auto">
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <img src="/logo.jpeg" className="object-cover w-14 mr-3" />
              <div className="text-sm hidden sm:flex flex-col">
                <b className="mb-0">BUMDes</b> Laut Sakti Daratan Bertuah
              </div>
            </div>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
