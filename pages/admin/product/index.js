import Admin from "../../../layouts/Admin";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// import Loader from "react-loader-spinner";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import instance from "../../../utils/instance";
import { Field, Form, Formik } from "formik";
import { PencilIcon, SearchIcon, TrashIcon } from "@heroicons/react/solid";
import InfiniteScroll from "react-infinite-scroll-component";
// import classNames from "../../../utils/classNamesTailwind";
import { Badge, Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { useMediaQuery } from "@chakra-ui/media-query";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Select } from "@chakra-ui/select";
import { Spinner } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { currencyFormat } from "../../../config/currencyFormat";
import { Modal } from "../../../components/Modals/Modal";
import AddProductModal from "../../../components/Pages/Product/AddProductModal";
import { useToast } from "@chakra-ui/toast";
import DeleteProductModal from "../../../components/Pages/Product/DeleteProductModal";
export default function Product({ products, category }) {
  const router = useRouter();
  const [idProduct, setIdProduct] = useState(0);
  const [titleProduct, setTitleProduct] = useState("");
  const { query } = useRouter();
  const addProductModalRef = useRef();
  const deleteProductModalRef = useRef();
  const FormikRef = useRef();
  const [page, setPage] = useState(1);
  const toast = useToast();
  // const [isSmallestThan768] = useMediaQuery("(max-width: 768px)");
  const initialValues = {
    search: query.search || "",
    category: query.category || "",
    sort: query.sort || "",
  };

  const onDeleteProduct = (item) => {
    setIdProduct(item.id);
    setTitleProduct(item.title);
  };

  const onSubmit = async (values) => {
    await new Promise((r) => setTimeout(r, 1000));
    router.push({
      href: "admin/product",
      query: {
        search: values.search,
        category: values.category,
        sort: values.sort,
      },
    });
  };

  return (
    <>
      <Modal ref={addProductModalRef}>
        <AddProductModal
          parent={addProductModalRef}
          category={category}
          toast={toast}
        />
      </Modal>
      <Modal ref={deleteProductModalRef}>
        <DeleteProductModal
          parent={deleteProductModalRef}
          id={idProduct}
          toast={toast}
          title={titleProduct}
        />
      </Modal>
      <h3 className="font-bold text-xl text-gray-800">Product</h3>
      <p className="font-base tracking-wide text-gray-400">
        Kelola semua produk kamu disini.
      </p>
      <Button
        colorScheme="green"
        className="mt-2"
        onClick={() => addProductModalRef.current.open()}
      >
        Tambah
      </Button>
      <div>
        <div className="py-4 bg-white sticky lg:block z-10 top-16 lg:top-auto">
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            innerRef={FormikRef}
          >
            {({ values, handleChange, handleBlur }) => (
              <Form>
                {/* Search Input */}
                <div className="flex items-center gap-2">
                  <div className="flex flex-col w-full lg:w-2/6 mb-2">
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
                  <Button
                    colorScheme="blue"
                    size="md"
                    variant="outline"
                    py="6"
                    paddingX="6"
                    className="bottom-1"
                    type="submit"
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
                  <div>
                    <Select
                      placeholder="Urutkan"
                      size="lg"
                      variant="outline"
                      focusBorderColor="green.600"
                      name="sort"
                      onChange={handleChange}
                      value={values.sort}
                      onBlur={handleBlur}
                    >
                      <option value="asc">Teratas</option>
                      <option value="desc">Terbawah</option>
                    </Select>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        {/* Products */}
        <div>
          {products.data.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-6">
              {products.data.map((item, i) => (
                <Box
                  key={i}
                  maxW="sm"
                  borderWidth="1px"
                  className="rounded-md hover:shadow-lg transition-all delay-75"
                  overflow="hidden"
                  m={{ lg: "2" }}
                  minHeight={{ lg: "lg", sm: "xl" }}
                >
                  <img
                    src={
                      item.thumbnail === "" || item.thumbnail === null
                        ? "/imgPlaceholder.jpg"
                        : process.env.baseUrl +
                          "/assets/images/thumbnail/products/" +
                          item.thumbnail
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
                      <Badge borderRadius="base" p="1" colorScheme="green">
                        {item.category.category_name}
                      </Badge>
                      <span className="text-green-600 font-bold">
                        {currencyFormat(item.price)}
                      </span>
                    </div>
                    <div className="block space-x-2">
                      <IconButton
                        aria-label="Update"
                        color="white"
                        bgColor="blue.500"
                        _hover={{ bgColor: "blue.600" }}
                        icon={<PencilIcon className="w-5 h-5" />}
                        onClick={() => router.push(`product/${item.slug}`)}
                      />
                      <IconButton
                        aria-label="Delete"
                        onClick={() => {
                          onDeleteProduct(item);
                          deleteProductModalRef.current.open();
                        }}
                        icon={<TrashIcon className="w-5 h-5" />}
                      />
                    </div>
                  </div>
                </Box>
              ))}
            </div>
          ) : (
            <p className="text-center">Nothing more to show</p>
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
      sort: context.query.sort,
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
