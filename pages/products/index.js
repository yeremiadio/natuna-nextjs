import { IconButton } from "@chakra-ui/button";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Box } from "@chakra-ui/layout";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import { Field, Form, Formik } from "formik";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import useSWR from "swr";
import EmptyDataComponent from "../../components/EmptyData/EmptyDataComponent";
import CardProductHome from "../../components/Pages/Primary/CardProduct";
import CustomSpinner from "../../components/Spinners/CustomSpinner";
import MainLayout from "../../layouts/mainLayout";
import { fetcherwithParams } from "../../utils/fetcher";
import { fadeInUp, stagger } from "../../utils/transitionProps";
import Link from "next/link";
import ActiveLink from "../../components/ActiveLink";

export default function products() {
  const { query } = useRouter();
  const router = useRouter();
  const FormikRef = useRef();
  const [page, setPage] = useState(1);
  const initialValues = {
    search: query.search || "",
    category: query.category || "",
    sort: query.sort || "",
  };
  const { data: products, error } = useSWR(
    [`api/products`, query.category, query.sort, query.search, page],
    (url) =>
      fetcherwithParams(query.category, query.sort, query.search, page, 6, url)
  );
  const onSubmit = async (values) => {
    router.push({
      href: "product",
      query: {
        search: values.search,
        category: values.category,
        sort: values.sort,
      },
    });
  };
  return (
    <>
      <div>
        <section className="bg-blue-900 h-32 relative w-full">
          <div className="container mx-auto">
            <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 w-full lg:w-1/2 px-4 h-full">
              <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                innerRef={FormikRef}
              >
                {() => (
                  <Form>
                    <div className="container mx-auto">
                      <Field
                        as={InputGroup}
                        className="bg-white p-5 rounded-md"
                        style={{ boxShadow: "0px 8px 20px rgb(0 0 0 / 6%)" }}
                      >
                        <InputRightElement
                          pointerEvents="none"
                          children={
                            <SearchIcon className="text-gray-400 w-6 h-6 absolute top-1/2 transform -translate-x-4" />
                          }
                        />
                        <Input
                          size="lg"
                          variant="unstyled"
                          name="search"
                          placeholder="Cari produk..."
                        />
                      </Field>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </section>
        <section className="my-40 px-4 lg:px-16">
          <div className="container mx-auto">
            {!products && !error ? (
              <CustomSpinner />
            ) : (
              <motion.div
                variants={stagger}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
              >
                {products?.data?.map((item, i) => (
                  <motion.div variants={fadeInUp} key={i}>
                    <Link href={`products/${item.slug}`}>
                      <a>
                        <div className="transition-all delay-75 cursor-pointer border border-gray-100 rounded-md">
                          <img
                            src={
                              item.thumbnail !== null
                                ? item.thumbnail
                                : "../imgPlaceholder.jpg"
                            }
                            alt=""
                            className="w-full h-80 object-cover rounded-lg"
                          />
                          <div className="p-4">
                            <h3 className="text-primary text-xl font-bold line-clamp-2 mb-2">
                              {item.title}
                            </h3>
                          </div>
                        </div>
                      </a>
                    </Link>
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
                onClick={() => setPage((prev) => prev - 1)}
              />
              <IconButton
                icon={<ChevronRightIcon className="w-5 h-5" />}
                onClick={() => setPage((prev) => prev + 1)}
              />
            </Box>
          </div>
        </section>
      </div>
    </>
  );
}

products.layout = MainLayout;
