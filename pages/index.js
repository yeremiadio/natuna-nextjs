// import { motion } from "framer-motion";
// import Head from "next/head";
// import Navbar from "../components/Navbars/Navbar";
import { Button, IconButton } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import HeroSlideShow from "../components/Pages/Primary/HeroSlideShow";
import MainLayout from "../layouts/mainLayout";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ShoppingCartIcon,
} from "@heroicons/react/solid";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { wrap } from "popmotion";

export default function Home() {
  const images = [
    "https://images.unsplash.com/photo-1530878902700-5ad4f9e4c318?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dmlsbGFnZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
    "https://wallpapercave.com/wp/wp2445553.jpg",
  ];
  const [page, setPage] = useState(0);
  const imageIndex = wrap(0, images.length, page);
  const paginate = (newIndex) => {
    setPage((prev) => prev + newIndex);
  };
  return (
    <>
      <div className="container mx-auto">
        <section className="mt-28 lg:mt-20 grid grid-cols-1 lg:grid-cols-2 h-screen gap-4">
          <div className="px-8 flex flex-col justify-center">
            <h1 className="text-6xl lg:text-8xl font-bold mb-4">
              Id mollit ut <b className="text-blue-500">mollit velit elit </b>
              exercitation.
            </h1>
            <p className="text-gray-400">
              Laborum consequat amet mollit duis commodo Lorem duis deserunt
              nulla enim proident. Minim fugiat laborum labore tempor excepteur
              non et ipsum non ipsum voluptate aliqua nulla. Ut qui mollit
              incididunt ipsum ipsum qui enim sint veniam cillum.
            </p>
            <Box display="flex" className="gap-2 mt-4">
              <Button
                size="md"
                leftIcon={<ShoppingCartIcon className="w-5 h-5" />}
                colorScheme="blue"
                className="p-6"
              >
                Beli Sekarang
              </Button>
            </Box>
          </div>
          <div className="flex-col lg:flex justify-center items-center hidden lg:px-12">
            <div className="group relative">
              <div className="bg-white rounded-lg flex items-center justify-center shadow-lg border border-gray-200 m-4 w-full overflow-hidden">
                <AnimatePresence>
                  <motion.img key={page} src={images[imageIndex]} alt="" />
                  {/* <img /> */}
                </AnimatePresence>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-all delay-75">
                <div className="absolute top-1/2 left-8 group-hover:left-0 transition-all delay-75">
                  <IconButton
                    colorScheme="whiteAlpha"
                    style={{ borderRadius: "3rem" }}
                    className="bg-white shadow-md border-gray-200"
                    onClick={() => paginate(-1)}
                    icon={<ArrowLeftIcon className="w-5 h-5 text-gray-600" />}
                  />
                </div>
                <div className="absolute top-1/2 right-1 group-hover:-right-8 transition-all delay-75">
                  <IconButton
                    colorScheme="whiteAlpha"
                    style={{ borderRadius: "3rem" }}
                    className="bg-white shadow-md border-gray-200"
                    onClick={() => paginate(1)}
                    icon={<ArrowRightIcon className="w-5 h-5 text-gray-600" />}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="grid grid-cols-1 lg:grid-cols-2 h-screen">
          <div className="border border-blue-500 px-4 flex flex-col justify-center items-center">
            Grid Item 1
          </div>
          <div className="border border-red-500 px-4 flex flex-col justify-center items-center">
            Grid Item 2
          </div>
        </section>
      </div>
    </>
  );
}

Home.layout = MainLayout;
