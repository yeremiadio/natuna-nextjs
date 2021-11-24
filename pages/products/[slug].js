import React from "react";
import MainLayout from "../../layouts/mainLayout";
import instance from "../../utils/instance";
import { Tag, TagLabel } from "@chakra-ui/tag";
import { Button } from "@chakra-ui/button";
import { currencyFormat } from "../../config/currencyFormat";
import { ShoppingCartIcon } from "@heroicons/react/solid";
import { motion } from "framer-motion";
import { fadeInUp, stagger } from "../../utils/transitionProps";

export default function DetailProduct({ product }) {
  let message = `Halo kak, saya mau pesan ${product.title}`;
  return (
    <>
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
              <div className="flex justify-center items-center w-full h-full">
                <img
                  src={
                    product.thumbnail
                      ? process.env.baseUrl +
                        "/assets/images/thumbnail/products/" +
                        product.thumbnail
                      : "/imgPlaceholder.jpg"
                  }
                  className="rounded-lg w-10/12 object-cover"
                />
              </div>
            </div>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            className="flex flex-col justify-center w-auto px-4 lg:px-16"
          >
            <h3 className="text-primary text-3xl font-bold line-clamp-2 mb-2">
              {product.title}
            </h3>
            <p className="text-secondary text-base line-clamp-3 leading-loose">
              {product.description}
            </p>
            <div className="py-4 space-x-2 flex items-center">
              <Tag colorScheme="green" style={{ borderRadius: "3rem" }} p="2">
                <TagLabel>{product.category.category_name}</TagLabel>
              </Tag>
              <span className="text-blue-600 font-bold">
                {currencyFormat(product.price)}
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
    </>
  );
}
export async function getStaticPaths() {
  const res = await instance().get(`api/products`);
  const data = await res.data.data.data;

  const paths = data.map((item) => {
    return {
      params: { slug: item.slug.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const slug = context.params.slug;
  const res = await instance().get(`api/products/${slug}`);
  const product = await res.data.data;
  const resCategory = await instance().get("api/category");
  const category = resCategory.data.data;

  return { props: { product, category } };
}

DetailProduct.layout = MainLayout;
