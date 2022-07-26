import { Button, IconButton } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import MainLayout from "../layouts/mainLayout";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ShoppingCartIcon,
} from "@heroicons/react/solid";
import CustomSpinner from "../components/Spinners/CustomSpinner";
import Slider from "react-slick";
import Link from "next/link";
import { useMediaQuery } from "@chakra-ui/media-query";
import CardProductHome from "../components/Pages/Primary/CardProduct";
import { fetcher } from "../utils/fetcher";
import useSWR from "swr";
import { fadeInUp } from "../utils/transitionProps";
import { motion } from "framer-motion";
import EmptyDataComponent from "../components/EmptyData/EmptyDataComponent";
import { useRouter } from "next/router";
export default function Home() {
  const router = useRouter();
  const { data: products, error } = useSWR("/api/products", fetcher);
  const images = [
    "https://res.cloudinary.com/bumdesnatuna/image/upload/v1658832303/mangrovepointofinterestjembatan_yva80b.jpg",
    "https://res.cloudinary.com/bumdesnatuna/image/upload/v1658832302/tanjungdatukgeositeyangbiasanyadidatenginwisatawan_xj7ena.jpg",
    "https://res.cloudinary.com/bumdesnatuna/image/upload/v1658832302/tanjungdatukbawahkanan2_vrdupg.jpg",
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
      <div>
        <section className="my-12 lg:my-24 grid grid-cols-1 lg:grid-cols-2 gap-4 container mx-auto">
          <div className="flex flex-col justify-center px-4 lg:px-16">
            <h1 className="text-4xl text-primary lg:text-6xl font-bold mb-4 leading-snug">
              {/* Badan Usaha milik desa <b className="text-blue-500">pengadah </b>
              Kabupaten Natuna. */}
              Kami hadir memberi <span className="text-blue-500">solusi</span>,
              layanan dan fasilitas bagi masyarakat desa
            </h1>
            <p className="text-secondary leading-loose">
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
                onClick={() => router.push("/about")}
                colorScheme="blue"
                className="p-6 lg:hover:transition-all lg:hover:delay-100 hover:px-8"
              >
                Get To Know
              </Button>
              <Button
                size="md"
                leftIcon={<ShoppingCartIcon className="w-5 h-5" />}
                className="p-6 text-primary"
                onClick={() => router.push("/products")}
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
                    <img
                      src={item}
                      className="rounded-lg w-10/12 object-cover"
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>
        <section className="my-32 px-4 py-24 lg:px-16 bg-blue-900">
          <div className="container mx-auto">
            <h3 className="text-4xl font-bold mb-12 text-center text-white">
              Layanan Kami
            </h3>
            <div className="flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-8">
              <div className="bg-white max-h-[540px] md:w-2/4 lg:w-1/4 shadow-md rounded-lg overflow-hidden transition-all delay-100 ease-in-out hover:-translate-y-2">
                <img
                  src="images/opakubigambarsemangka.jpg"
                  className="max-h-48 w-full object-cover"
                  alt=""
                />
                <div className="p-4">
                  <h5 className="text-primary font-bold text-lg mb-2">
                    Produk Barang
                  </h5>
                  <p className="text-secondary text-sm md:text-base tracking-wide leading-loose lg:leading-loose">
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
              <div className="bg-white max-h-[540px] md:w-2/4 lg:w-1/4 shadow-md rounded-lg overflow-hidden transition-all delay-100 ease-in-out hover:-translate-y-2">
                <img
                  src="images/saputanganbatik.jpg"
                  alt=""
                  className="max-h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h5 className="text-primary font-bold text-lg mb-2">
                    Produk Jasa
                  </h5>
                  <p className="text-secondary tracking-wide text-sm md:text-base leading-loose lg:leading-loose">
                    BUMDes Laut Sakti Daratan Bertuah juga melayani produk
                    berupa jasa untuk seluruh warga, baik itu untuk kantor
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
              <div className="bg-white max-h-[540px] md:w-2/4 lg:w-1/4 shadow-md rounded-lg overflow-hidden transition-all delay-100 ease-in-out hover:-translate-y-2">
                <img
                  src="/images/tanjungdatukbawah(kiri).jpg"
                  className="max-h-48 w-full object-cover"
                  alt=""
                />
                <div className="p-4">
                  <h5 className="text-primary font-bold text-lg mb-2">
                    Objek Wisata
                  </h5>
                  <p className="text-secondary tracking-wide text-sm md:text-base leading-loose lg:leading-loose">
                    Desa pengadah memiliki beberapa objek wisata yang dapat
                    dinikmati. Lokasi wisata desa pengadah tersebar di beberapa
                    wilayah mulai dari dataran tinggi hingga daerah pesisir.
                    Beberapa diantaranya adalah wisata mangrove dan tanjung
                    datuk.
                  </p>
                  <Link href="/products">
                    <a className="font-semibold text-blue-600 hover:text-blue-900 transition-all ease-in-out delay-100 float-right py-4">
                      See Details
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="my-32 px-4 lg:px-16">
          <h3 className="text-4xl font-bold mb-12 text-primary">
            Produk Unggulan
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {!products && !error ? (
              <CustomSpinner />
            ) : (
              products?.data
                ?.slice(0, 3)
                .map((item, i) => (
                  <CardProductHome
                    key={i}
                    title={item.title}
                    slug={item.slug}
                    description={item.description}
                    price={item.price}
                    thumbnail={item.thumbnail}
                    category={item.category.category_name}
                  />
                ))
            )}
          </div>
          {products?.data?.length === 0 ||
            (error && (
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <EmptyDataComponent />
              </motion.div>
            ))}
        </section>
        <section className="my-32 px-4 lg:px-16">
          <h3 className="text-4xl text-center font-bold mb-12 text-primary">
            Supported by
          </h3>
          <div className="container mx-auto">
            <div className="flex flex-col flex-wrap lg:flex-row gap-8 justify-between items-center">
              <img
                src={"images/logoBumn.png"}
                alt=""
                className="bg-cover h-40 lg:h-20 xl:h-40"
              />
              <img
                src={"images/logoNatunaInstansi.png"}
                alt=""
                className="bg-cover h-32 lg:h-20 xl:h-28"
              />
              <img
                src={"images/logoKampusMerdeka.png"}
                alt=""
                className="bg-cover h-32 lg:h-20 xl:h-28"
              />
              <img
                src={"images/logoTelkomselIndonesia.png"}
                alt=""
                className="bg-cover h-32 lg:h-20 xl:h-40"
              />
              <img
                src={"images/logoInnovillage.png"}
                alt=""
                className="bg-cover h-16 lg:h-32 xl:h-24"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

Home.layout = MainLayout;
