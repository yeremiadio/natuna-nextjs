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
import Link from "next/link";
import { useMediaQuery } from "@chakra-ui/media-query";
export default function Home({ products }) {
  const images = [
    "https://images.unsplash.com/photo-1530878902700-5ad4f9e4c318?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dmlsbGFnZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
    "https://wallpapercave.com/wp/wp2445553.jpg",
    "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80",
  ];
  const [isSmallestThan768] = useMediaQuery("(max-width: 768px)");
  const settings = {
    dots: !isSmallestThan768,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <>
      <div className="container mx-auto">
        <section className="my-12 lg:my-24 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col justify-center px-4 lg:px-16">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4 leading-snug">
              {/* Badan Usaha milik desa <b className="text-blue-500">pengadah </b>
              Kabupaten Natuna. */}
              Kami hadir memberi <span className="text-blue-500">solusi</span>,
              layanan dan fasilitas bagi masyarakat desa
            </h1>
            <p className="text-gray-400 leading-relaxed">
              Badan Usaha Milik Desa <b>Laut Sakti Daratan Bertuah</b> adalah
              sebuah badan usaha yang didirikan Pemerintah Desa Pengadah,
              Kecamatan Bunguran Timur Laut, Kabupaten Natuna-Kepulauan Riau.
              BUMDes saat ini sudah masuk ke periode ke 3 yang di Pimpin oleh{" "}
              <b>W. Syamsul Bahari.</b>
            </p>
            <Box
              display="flex"
              className="gap-2 mt-4 flex-col lg:flex-row w-full lg:w-auto"
            >
              <Button
                size="md"
                rightIcon={<ArrowRightIcon className="w-5 h-5" />}
                colorScheme="blue"
                className="p-6 lg:hover:transition-all lg:hover:delay-100 hover:px-8"
              >
                Get To Know
              </Button>
              <Button
                size="md"
                leftIcon={<ShoppingCartIcon className="w-5 h-5" />}
                className="p-6"
              >
                Beli Produk Kami
              </Button>
            </Box>
          </div>
          <div className="flex flex-col justify-center items-center w-full lg:px-12">
            <Slider {...settings} className="w-10/12 xl:w-full">
              {images.map((item, i) => (
                <div key={i} className="h-96">
                  <div className="flex justify-center items-center w-full h-full">
                    <img src={item} className="rounded-lg w-10/12" />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>
        <section className="my-32 px-4 py-24 lg:px-16 bg-blue-600">
          <h3 className="text-4xl font-bold mb-12 text-center text-white">
            Layanan Kami
          </h3>
          <div className="flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-8">
            <div className="bg-white md:w-2/4 lg:w-1/4 shadow-md rounded-lg overflow-hidden transition-all delay-100 ease-in-out hover:-translate-y-2">
              <img src="imgPlaceholder.jpg" className="object-cover" />
              <div className="p-4">
                <h5 className="text-gray-700 font-semibold text-lg mb-2">
                  Produk Barang
                </h5>
                <p className="text-gray-500 text-sm md:text-base tracking-wide leading-relaxed">
                  BUMDes Laut Sakti Daratan Bertuah melayani penjualan produk
                  berupa barang untuk seluruh warga, baik itu untuk kantor
                  pemerintahan maupun swasta. Produk - produk yang ditawarkan
                  antara lain seperti aneka <b>keripik dan kue</b>.
                </p>
                <Link href="/products">
                  <a className="font-semibold text-blue-600 hover:text-blue-900 transition-all ease-in-out delay-100 float-right py-4">
                    See Details
                  </a>
                </Link>
              </div>
            </div>
            <div className="bg-white md:w-2/4 lg:w-1/4 shadow-md rounded-lg overflow-hidden transition-all delay-100 ease-in-out hover:-translate-y-2">
              <img src="imgPlaceholder.jpg" />
              <div className="p-4">
                <h5 className="text-gray-700 font-semibold text-lg mb-2">
                  Produk Jasa
                </h5>
                <p className="text-gray-500 tracking-wide text-sm md:text-base leading-relaxed">
                  BUMDes Laut Sakti Daratan Bertuah juga melayani produk berupa
                  jasa berupa untuk seluruh warga, baik itu untuk kantor
                  pemerintahan maupun swasta seperti{" "}
                  <b>Pengolahan Air Bersih</b>, Warung dan sarana prasarana
                  lainnya yang memadai.
                </p>
                <Link href="/products">
                  <a className="font-semibold text-blue-600 hover:text-blue-900 transition-all ease-in-out delay-100 float-right py-4">
                    See Details
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="my-32 px-4 lg:px-16">
          <h3 className="text-4xl font-bold mb-12 text-gray-800">
            Produk Unggulan
          </h3>
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
