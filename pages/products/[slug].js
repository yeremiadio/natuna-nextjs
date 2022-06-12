import React, { useEffect } from "react";
import MainLayout from "../../layouts/mainLayout";
import instance from "../../utils/instance";
import { Tag, TagLabel } from "@chakra-ui/tag";
import { Button } from "@chakra-ui/button";
import { currencyFormat } from "../../config/currencyFormat";
import { ShoppingCartIcon } from "@heroicons/react/solid";
import { motion } from "framer-motion";
import { fadeInUp, stagger } from "../../utils/transitionProps";
import { useRouter } from "next/router";
import { fetchWithToken } from "../../utils/fetcher";
import useSWR from "swr";
import { useToast } from "@chakra-ui/toast";
import CustomSpinner from "../../components/Spinners/CustomSpinner";

export default function DetailProduct() {
  const router = useRouter();
  const { query } = router;
  const { slug } = query;
  const toast = useToast();
  const { data: product, error: errorProduct } = useSWR(
    slug ? [`api/products/${slug}`] : null,
    (url) => fetchWithToken(url)
  );

  useEffect(() => {
    const ac = new AbortController();
    if (errorProduct) {
      toast({
        title: "Error",
        description: "Error! Please Try Again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      router.replace("/admin/products");
    } else {
      return () => {
        ac.abort();
      };
    }
  }, [errorProduct]);

  let message = `Halo kak, saya mau pesan ${product?.title}`;
  return !product ? (
    <CustomSpinner />
  ) : (
    <div className="container mx-auto">
      <motion.div
        variants={stagger}
        className="my-12 lg:my-24 grid grid-cols-1 lg:grid-cols-2 gap-4"
      >
        <motion.div
          variants={fadeInUp}
          className="flex flex-col justify-center items-center w-full lg:px-12"
        >
          <div className="h-96">
            <div className="flex justify-center items-center w-full h-full border border-gray-200">
              <img
                src={
                  product?.thumbnail !== null
                    ? `${process.env.baseUrl}/assets/images/thumbnail/products/${product?.thumbnail}`
                    : "../imgPlaceholder.jpg"
                }
                className="rounded-lg w-full object-cover h-full"
              />
            </div>
          </div>
        </motion.div>
        <motion.div
          variants={fadeInUp}
          className="flex flex-col justify-center w-auto px-4 lg:px-16"
        >
          <h3 className="text-primary text-3xl font-bold mb-2">
            {product?.title}
          </h3>
          <p className="text-secondary text-base leading-loose">
            {product?.description}
          </p>
          <div className="py-4 space-x-2 flex items-center">
            <Tag colorScheme="green" style={{ borderRadius: "3rem" }} p="2">
              <TagLabel>{product?.category?.category_name}</TagLabel>
            </Tag>
            <span className="text-blue-600 font-bold">
              {currencyFormat(product?.price)}
            </span>
          </div>
          <Button
            size="md"
            leftIcon={<ShoppingCartIcon className="w-5 h-5" />}
            colorScheme="blue"
            className="p-6"
            onClick={() =>
              window.open(
                `https://wa.me/6282169611109?text=${encodeURIComponent(
                  message
                )}`,
                "__blank"
              )
            }
          >
            Beli Sekarang
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}

DetailProduct.layout = MainLayout;
