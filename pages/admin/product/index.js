import Admin from "../../../layouts/Admin";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// import Loader from "react-loader-spinner";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import instance from "../../../utils/instance";
import { Field, Form, Formik } from "formik";
import {
  PencilIcon,
  PlusIcon,
  SearchIcon,
  TrashIcon,
} from "@heroicons/react/solid";
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
import CardAdmin from "../../../components/Pages/Product/CardAdmin";
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
  const [isSmallestThan768] = useMediaQuery("(max-width: 768px)");
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
    <div className="bg-section">
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
      <Box display={{ lg: "flex" }} alignItems="center">
        <div>
          <h3 className="font-bold text-xl text-gray-800">Product</h3>
          <p className="font-base tracking-wide text-gray-400">
            Kelola semua produk kamu disini.
          </p>
        </div>
        <Button
          colorScheme="green"
          className="mt-2 ml-auto"
          leftIcon={<PlusIcon className="w-4 h-4" />}
          onClick={() => addProductModalRef.current.open()}
        >
          Tambah
        </Button>
      </Box>
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
                      onBlur={handleBlur}
                    >
                      {category.map((item, i) => (
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
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-y-6">
              {products.data.map((item, i) => (
                <CardAdmin
                  key={i}
                  description={item.description}
                  title={item.title}
                  thumbnail={
                    item.thumbnail === "" || item.thumbnail === null
                      ? "/imgPlaceholder.jpg"
                      : process.env.baseUrl +
                        "/assets/images/thumbnail/products/" +
                        item.thumbnail
                  }
                  categoryName={item.category.category_name}
                  price={item.price}
                  slug={item.slug}
                  deleteProductItem={() => {
                    onDeleteProduct(item);
                    deleteProductModalRef.current.open();
                  }}
                />
              ))}
            </div>
          ) : (
            <p className="text-center">Nothing more to show</p>
          )}
        </div>
      </div>
    </div>
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
