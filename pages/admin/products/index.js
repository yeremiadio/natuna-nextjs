import Admin from "../../../layouts/Admin";
import router, { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import instance from "../../../utils/instance";
import { Field, Form, Formik } from "formik";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import { Box } from "@chakra-ui/layout";
import { Button, IconButton } from "@chakra-ui/button";
// import { useMediaQuery } from "@chakra-ui/media-query";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Select } from "@chakra-ui/select";
import { Modal } from "../../../components/Modals/Modal";
import AddProductModal from "../../../components/Pages/Product/AddProductModal";
import { useToast } from "@chakra-ui/toast";
import DeleteProductModal from "../../../components/Pages/Product/DeleteProductModal";
import CardAdminProducts from "../../../components/Pages/Product/CardAdminProducts";
import useSWR from "swr";
import { fetcherwithParams, fetchWithToken } from "../../../utils/fetcher";
import CustomSpinner from "../../../components/Spinners/CustomSpinner";
import EmptyDataComponent from "../../../components/EmptyData/EmptyDataComponent";
import { motion } from "framer-motion";
import { fadeInUp, stagger } from "../../../utils/transitionProps";
import Head from "next/head";
export default function Product() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [idProduct, setIdProduct] = useState(0);
  const [titleProduct, setTitleProduct] = useState("");
  const [searchText, setSearchText] = useState("");
  const { query } = useRouter();
  const addProductModalRef = useRef();
  const deleteProductModalRef = useRef();
  const toast = useToast();
  const { data: category } = useSWR([`api/category`], (url) =>
    fetchWithToken(url)
  );
  const {
    data: products,
    mutate,
    error: errorProducts,
  } = useSWR(
    [`api/products`, query.category, query.sort, query.search, page],
    (url) =>
      fetcherwithParams(query.category, query.sort, query.search, page, 6, url),
    {
      revalidateOnFocus: false,
    }
  );
  const handleInputChange = (value) => {
    setSearchText(value);
    console.log(searchText);
  };
  const onDeleteProduct = (item) => {
    setIdProduct(item.id);
    setTitleProduct(item.title);
  };

  return (
    <>
      {query?.search && (
        <Head>
          <title>{`Search result: ${query?.search} - BUMDes Laut Sakti Daratan Bertuah`}</title>
        </Head>
      )}
      <div className="bg-section">
        <Modal ref={addProductModalRef}>
          <AddProductModal
            parent={addProductModalRef}
            category={category}
            toast={toast}
            mutate={mutate}
            products={products?.data}
          />
        </Modal>
        <Modal ref={deleteProductModalRef}>
          <DeleteProductModal
            parent={deleteProductModalRef}
            id={idProduct}
            toast={toast}
            mutate={mutate}
            products={products?.data}
            title={titleProduct}
          />
        </Modal>
        <Box display={{ lg: "flex" }} alignItems="center">
          <div>
            <h3 className="font-bold text-xl text-primary">Product</h3>
            <p className="font-base tracking-wide text-secondary">
              Kelola semua produk kamu disini.
            </p>
          </div>
          <Button
            colorScheme="blue"
            className="mt-2 ml-auto"
            leftIcon={<PlusIcon className="w-4 h-4" />}
            onClick={() => addProductModalRef.current.open()}
          >
            Tambah
          </Button>
        </Box>
        <div>
          <div className="py-4 bg-white sticky lg:block z-10 top-16 lg:top-auto">
            {/* Search Input */}
            <div className="flex items-center gap-2">
              <div className="flex flex-col w-full lg:w-2/6 mb-2">
                <InputGroup>
                  <InputRightElement
                    pointerEvents="none"
                    children={
                      <SearchIcon className="text-gray-300 w-5 h-5 absolute top-3" />
                    }
                  />
                  <Input
                    size="lg"
                    variant="outline"
                    focusBorderColor="blue.600"
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder="Cari..."
                  />
                </InputGroup>
              </div>
              <Button
                color="green.500"
                size="md"
                variant="ghost"
                py="6"
                paddingX="6"
                className="bottom-1"
              >
                Filter
              </Button>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 lg:space-y-0 space-x-2 items-center mb-2">
              {/* Dropdown Input */}
              <div>
                <Select
                  placeholder="Kategori"
                  size="lg"
                  variant="outline"
                  focusBorderColor="blue.600"
                  onChange={(e) => {
                    router.push({
                      href: "admin/products",
                      query: {
                        category: e.target.value,
                        sort: query?.sort,
                      },
                    });
                  }}
                >
                  {category?.map((item, i) => (
                    <option key={i} value={item.category_slug}>
                      {item.category_name}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Select
                  placeholder="Urutkan"
                  size="lg"
                  variant="outline"
                  focusBorderColor="blue.600"
                  onChange={(e) => {
                    router.push({
                      href: "admin/products",
                      query: {
                        sort: e.target.value,
                        category: query?.category,
                      },
                    });
                  }}
                >
                  <option value="asc">Teratas</option>
                  <option value="desc">Terbawah</option>
                </Select>
              </div>
            </div>
          </div>

          {errorProducts && <p className="text-red-500">There is an error</p>}

          {/* Products */}
          <div>
            {!products && !errorProducts ? (
              <CustomSpinner />
            ) : (
              <motion.div
                variants={stagger}
                className="grid grid-cols-1 mdgrid-cols-2 xl:grid-cols-3 gap-y-6"
              >
                {products?.data
                  ?.filter((item) => {
                    if (
                      searchText.length > 0 &&
                      !item.title.toLowerCase().includes(searchText)
                    )
                      return false;

                    return true;
                  })
                  .map((item, i) => (
                    <motion.div variants={fadeInUp} key={i}>
                      <CardAdminProducts
                        description={item.description}
                        title={item.title}
                        thumbnail={
                          item.thumbnail !== null
                            ? `http://192.168.0.10:8000/assets/images/thumbnail/products/${item.thumbnail}`
                            : "/imgPlaceholder.jpg"
                        }
                        categoryName={item.category.category_name}
                        price={item.price}
                        slug={item.slug}
                        deleteProductItem={() => {
                          onDeleteProduct(item);
                          deleteProductModalRef.current.open();
                        }}
                      />
                    </motion.div>
                  ))}
              </motion.div>
            )}
            {products?.data?.length === 0 && (
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <EmptyDataComponent />
              </motion.div>
            )}
            <Box
              display="flex"
              className="mt-12 gap-4"
              justifyContent="center"
              alignItems="center"
            >
              <IconButton
                icon={<ChevronLeftIcon className="w-5 h-5" />}
                onClick={() => {
                  setPage((prev) => prev - 1);
                }}
              />
              <IconButton
                icon={<ChevronRightIcon className="w-5 h-5" />}
                onClick={() => {
                  setPage((prev) => prev + 1);
                }}
              />
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}

Product.layout = Admin;
