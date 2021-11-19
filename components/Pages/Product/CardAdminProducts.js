import { IconButton } from "@chakra-ui/button";
import { Badge, Box } from "@chakra-ui/layout";
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React from "react";
import { currencyFormat } from "../../../config/currencyFormat";

const CardAdminProducts = ({
  deleteProductItem,
  thumbnail,
  title,
  description,
  price,
  categoryName,
  slug,
}) => {
  const router = useRouter();
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      className="rounded-md hover:shadow-lg transition-all delay-75"
      overflow="hidden"
      m={{ lg: "2" }}
      minHeight={{ sm: "sm", lg: "lg" }}
    >
      <img
        src={thumbnail}
        alt=""
        className="w-full h-auto lg:h-1/2 object-cover"
      />
      <div className="p-4">
        <h3 className="text-gray-800 text-3xl font-bold">{title}</h3>
        <p className="text-gray-600 text-base line-clamp-3">{description}</p>
        <div className="py-4 space-x-2">
          <Badge borderRadius="base" p="1" colorScheme="blue">
            {categoryName}
          </Badge>
          <span className="text-blue-600 font-bold">
            {currencyFormat(price)}
          </span>
        </div>
        <div className="block space-x-2">
          <IconButton
            aria-label="Update"
            color="white"
            bgColor="blue.500"
            _hover={{ bgColor: "blue.600" }}
            icon={<PencilIcon className="w-5 h-5" />}
            onClick={() => router.push(`product/${slug}`)}
          />
          <IconButton
            aria-label="Delete"
            onClick={deleteProductItem}
            icon={<TrashIcon className="w-5 h-5" />}
          />
        </div>
      </div>
    </Box>
  );
};

export default CardAdminProducts;
