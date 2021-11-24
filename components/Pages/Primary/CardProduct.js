import React from "react";
import { Button } from "@chakra-ui/button";
import { Tag, TagLabel } from "@chakra-ui/tag";
import { ShoppingCartIcon } from "@heroicons/react/solid";
import { currencyFormat } from "../../../config/currencyFormat";
import { useRouter } from "next/router";

const CardProductHome = ({
  thumbnail,
  title,
  description,
  category,
  price,
  slug,
}) => {
  let message = `Halo kak, saya mau pesan ${title}`;
  const router = useRouter();
  return (
    <div className="hover:shadow-lg transition-all delay-75 border border-gray-200 rounded-lg">
      <img
        src={
          thumbnail !== null
            ? `${process.env.baseUrl}/assets/images/thumbnail/products/${thumbnail}`
            : "/imgPlaceholder.jpg"
        }
        alt=""
        onClick={() => router.push(`products/${slug}`)}
        className="w-full h-80 cursor-pointer object-cover rounded-lg"
      />
      <div className="p-4">
        <h3 className="text-primary text-xl lg:text-2xl font-bold line-clamp-2 mb-2">
          {title}
        </h3>
        <p className="text-secondary leading-loose text-base line-clamp-3 my-2">
          {description}
        </p>
        <div className="py-4 space-x-2 flex items-center">
          <Tag colorScheme="green" style={{ borderRadius: "3rem" }} p="2">
            <TagLabel>{category}</TagLabel>
          </Tag>
          <span className="text-blue-600 font-bold">
            {currencyFormat(price)}
          </span>
        </div>
        <Button
          size="md"
          leftIcon={<ShoppingCartIcon className="w-5 h-5" />}
          colorScheme="blue"
          className="p-6"
          isFullWidth
          onClick={() =>
            window.open(
              `https://wa.me/6282169611109?text=${encodeURIComponent(message)}`,
              "__blank"
            )
          }
        >
          Beli Sekarang
        </Button>
      </div>
    </div>
  );
};

export default CardProductHome;
