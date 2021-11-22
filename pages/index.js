// import { motion } from "framer-motion";
// import Head from "next/head";
// import Navbar from "../components/Navbars/Navbar";
import { Button, IconButton } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import MainLayout from "../layouts/mainLayout";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ShoppingCartIcon,
} from "@heroicons/react/solid";
import Slider from "react-slick";
import instance from "../utils/instance";
import { currencyFormat } from "../config/currencyFormat";
import { Tag, TagLabel } from "@chakra-ui/tag";
import { useMediaQuery } from "@chakra-ui/media-query";
export default function Home({ products }) {
  const images = [
    "https://images.unsplash.com/photo-1530878902700-5ad4f9e4c318?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dmlsbGFnZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
    "https://wallpapercave.com/wp/wp2445553.jpg",
    "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80",
  ];
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  // const [isSmallestThan768] = useMediaQuery("(max-width: 768px)");
  return (
    <>
      <div className="container mx-auto">
        <section className="lg:mt-20 grid grid-cols-1 lg:grid-cols-2 h-screen gap-4">
          <div className="flex flex-col justify-center px-4 lg:px-16">
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
          <div className="hidden lg:flex flex-col justify-center items-center w-full lg:px-12">
            <div className=" w-full">
              <Slider {...settings}>
                {images.map((item, i) => (
                  <div key={i} className="h-96">
                    <div className="flex justify-center items-center w-full h-full">
                      <img src={item} className="rounded-lg w-4/5" />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </section>
        {/* <section className="grid grid-cols-1 lg:grid-cols-2 my-32">
          <div className="border border-blue-500 px-4 flex flex-col justify-center items-center">
            Grid Item 1
          </div>
          <div className="border border-red-500 px-4 flex flex-col justify-center items-center">
            Grid Item 2
          </div>
        </section> */}
        <section className="my-32 px-4 lg:px-16">
          <h3 className="text-4xl font-bold mb-12">Produk Unggulan</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {products?.data?.map((item, i) => (
              <div
                key={i}
                className="hover:shadow-lg transition-all delay-75 border border-gray-200 rounded-lg"
              >
                <img
                  src={
                    item.thumbnail !== null
                      ? `${process.env.baseUrl}/assets/images/thumbnail/products/${item.thumbnail}`
                      : "/imgPlaceholder.jpg"
                  }
                  alt=""
                  className="w-full h-80 object-cover rounded-lg"
                />
                <div className="p-4">
                  <h3 className="text-gray-800 text-xl lg:text-2xl font-bold line-clamp-2 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-base line-clamp-3 my-2">
                    {item.description}
                  </p>
                  <div className="py-4 space-x-2 flex items-center">
                    <Tag
                      colorScheme="green"
                      style={{ borderRadius: "3rem" }}
                      p="2"
                    >
                      <TagLabel>{item.category.category_name}</TagLabel>
                    </Tag>
                    <span className="text-blue-600 font-bold">
                      {currencyFormat(item.price)}
                    </span>
                  </div>
                  <Button
                    size="md"
                    leftIcon={<ShoppingCartIcon className="w-5 h-5" />}
                    colorScheme="blue"
                    className="p-6"
                    isFullWidth
                  >
                    Beli Sekarang
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const resProducts = await instance().get("api/products");
  const products = resProducts.data.data;

  return {
    props: {
      products: products,
    },
  };
};

Home.layout = MainLayout;
