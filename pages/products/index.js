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
      <div className="container mx-auto">
        <section className="bg-gray-100 h-32 relative w-full">
          <div className="absolute top-3/4 left-1/2 transform translate-y-1 -translate-x-1/2 w-full lg:w-1/2 px-4 h-full">
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              innerRef={FormikRef}
            >
              {({ values, handleChange, handleBlur }) => (
                <Form>
                  <div>
                    <Field as={InputGroup} className="bg-white">
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
                        name="search"
                        placeholder="Cari produk..."
                      />
                    </Field>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </section>
        <section className="my-40 px-4 lg:px-16">
          <div>
            {!products && !error ? (
              <CustomSpinner />
            ) : (
              <motion.div
                variants={stagger}
                className="grid grid-cols-1 lg:grid-cols-3 gap-y-6"
              >
                {products?.data?.map((item, i) => (
                  <motion.div variants={fadeInUp} key={i}>
                    <CardProductHome
                      key={i}
                      title={item.title}
                      description={item.description}
                      price={item.price}
                      thumbnail={item.thumbnail}
                      category={item.category.category_name}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
            {products?.data?.length === 0 || error && (
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
