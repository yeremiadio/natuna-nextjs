import { IconButton } from "@chakra-ui/button";
import { Badge, Box } from "@chakra-ui/layout";
import { Tag, TagLabel } from "@chakra-ui/tag";
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React from "react";
import { currencyFormat } from "../../../config/currencyFormat";
// import Image from "next/image";
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
      minHeight={{ sm: "md" }}
    >
      {/* <Image
        layout="responsive"
        src={thumbnail}
        objectFit="cover"
        height={60}
        width="100%"
      /> */}
      <img src={thumbnail} alt="" className="w-full h-52 object-cover" />
      <div className="p-4">
        <h3 className="text-primary text-3xl font-bold line-clamp-2">
          {title}
        </h3>
        <p className="text-secondary text-base line-clamp-3">{description}</p>
        <div className="py-4 space-x-2 flex items-center">
          <Tag colorScheme="green" style={{ borderRadius: "3rem" }} p="2">
            <TagLabel>{categoryName}</TagLabel>
          </Tag>
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
