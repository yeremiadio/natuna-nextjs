import Admin from "../../../layouts/Admin";
// import Link from "next/link";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { useRouter } from "next/router";
import { useRef, useState, Fragment } from "react";
import instance from "../../../utils/instance";
import { Field, Form, Formik } from "formik";
import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  PencilIcon,
  SearchIcon,
  SelectorIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import InfiniteScroll from "react-infinite-scroll-component";
import classNames from "../../../utils/classNamesTailwind";
import { Badge, Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { useMediaQuery } from "@chakra-ui/media-query";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/input";
import { Select } from "@chakra-ui/select";

export default function Product({ products, category }) {
  const router = useRouter();
  const { query } = useRouter();
  const FormikRef = useRef();
  const [data, setData] = useState(products.data);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [isSmallestThan768] = useMediaQuery("(max-width: 768px)");
  const initialValues = {
    search: query.search || "",
    category: query.category || "",
  };
  console.log(products);

  const getMoreProducts = async () => {
    const res = await instance.get(`api/products?limit=12&page=${page}`);
    const newProducts = await res.data.data.data;
    setPage((prev) => prev + 1);
    page > products.last_page && setHasMore(false);
    setData((product) => [...product, ...newProducts]);
  };

  const onSubmit = async (values) => {
    await new Promise((r) => setTimeout(r, 1000));
    router.push({
      href: "admin/product",
      query: {
        search: values.search,
        category: values.category,
      },
    });
  };

  return (
    <>
      <h3 className="font-bold text-xl text-gray-800">Product</h3>
      <p className="font-base tracking-wide text-gray-400">
        Kelola semua produk kamu disini.
      </p>
      <div>
        <div className="my-4">
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            innerRef={FormikRef}
          >
            {({ values, handleChange, handleBlur }) => (
              <Form>
                <div className="grid grid-cols-1 lg:grid-cols-3 space-y-2 lg:space-y-0 lg:space-x-2 items-center mb-2">
                  {/* Search Input */}
                  <div className="flex flex-col">
                    <Field as={InputGroup}>
                      <InputRightElement
                        pointerEvents="none"
                        children={
                          <SearchIcon className="text-gray-300 w-5 h-5 absolute top-3" />
                        }
                      />
                      <Input
                        size="lg"
                        variant="outline"
                        focusBorderColor="green.600"
                        name="search"
                        placeholder="Cari..."
                      />
                    </Field>
                  </div>

                  {/* Dropdown Input */}
                  <div>
                    <Select
                      placeholder="Kategori"
                      size="lg"
                      variant="outline"
                      focusBorderColor="green.600"
                      name="category"
                      onChange={handleChange}
                      value={values.category}
                      onBlur={handleBlur}
                    >
                      {category.map((item, i) => (
                        <option key={i} value={item.category_name}>
                          {item.category_name}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>
                <Button
                  colorScheme="green"
                  isFullWidth={isSmallestThan768 && true}
                  type="submit"
                  size="md"
                  px="6"
                  mt="2"
                >
                  Filter
                </Button>
              </Form>
            )}
          </Formik>
        </div>

        {/* Products */}
        <div>
          {data.length === 0 ? (
            "Data not found"
          ) : (
            <InfiniteScroll
              dataLength={data.length}
              next={getMoreProducts}
              hasMore={hasMore}
              loader={
                <div className="flex flex-col justify-center items-center p-6">
                  <Loader
                    type="TailSpin"
                    color="#059669"
                    height={40}
                    width={40}
                  />
                </div>
              }
              endMessage={
                <div className="p-6">
                  <h4 className="text-center">Nothing more to show</h4>
                </div>
              }
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-6">
                {query?.search || (query.category !== "None" && query?.category)
                  ? products.data.map((item, index) => (
                      <Box
                        key={index}
                        maxW="sm"
                        borderWidth="1px"
                        className="rounded-lg hover:shadow-lg transition-all delay-75"
                        overflow="hidden"
                        m={{ lg: "2" }}
                      >
                        <img
                          src={
                            item.thumbnail === "" || item.thumbnail === null
                              ? "/imgPlaceholder.jpg"
                              : item.thumbnail
                          }
                          alt=""
                          className="w-full h-auto lg:h-1/2 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="text-gray-800 text-3xl font-bold">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 text-base line-clamp-3">
                            {item.description}
                          </p>
                          <div className="py-4 space-x-2">
                            <Badge
                              borderRadius="base"
                              p="1"
                              colorScheme="green"
                            >
                              {item.category.category_name}
                            </Badge>
                            <span className="text-green-600 font-bold">
                              Rp. {item.price},00
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-1">
                            <Button
                              colorScheme="red"
                              variant="ghost"
                              leftIcon={<PencilIcon className="w-5 h-5" />}
                              size="md"
                            >
                              Update
                            </Button>
                            <Button
                              size="md"
                              variant="ghost"
                              leftIcon={<TrashIcon className="w-5 h-5" />}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </Box>
                    ))
                  : data.map((item, index) => (
                      <Box
                        key={index}
                        maxW="sm"
                        borderWidth="1px"
                        className="rounded-lg hover:shadow-lg transition-all delay-75"
                        overflow="hidden"
                        m={{ lg: "2" }}
                      >
                        <img
                          src={
                            item.thumbnail === "" || item.thumbnail === null
                              ? "/imgPlaceholder.jpg"
                              : item.thumbnail
                          }
                          alt=""
                          className="w-full h-auto lg:h-1/2 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="text-gray-800 text-3xl font-bold">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 text-base line-clamp-3">
                            {item.description}
                          </p>
                          <div className="py-4 space-x-2 ">
                            <Badge
                              borderRadius="base"
                              p="1"
                              colorScheme="green"
                            >
                              {item.category.category_name}
                            </Badge>
                            <span className="text-green-600 font-bold">
                              Rp. {item.price},00
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-1">
                            <Button
                              colorScheme="red"
                              variant="ghost"
                              leftIcon={<PencilIcon className="w-5 h-5" />}
                              size="md"
                            >
                              Update
                            </Button>
                            <Button
                              size="md"
                              variant="ghost"
                              leftIcon={<TrashIcon className="w-5 h-5" />}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </Box>
                    ))}
              </div>
            </InfiniteScroll>
          )}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const res = await instance.get(`api/products?limit=12&page=1`, {
    params: {
      search: context.query.search,
      category: context.query.category,
    },
  });
  const products = res.data.data;
  const resCategory = await instance.get("api/category");
  const category = resCategory.data.data;
  return {
    props: { products, category }, // will be passed to the page component as props
  };
}

Product.layout = Admin;
