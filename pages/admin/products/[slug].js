import Cookies from "js-cookie";
import Admin from "../../../layouts/Admin";
import instance from "../../../utils/instance";
import Image from "next/image";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  IconButton,
} from "@chakra-ui/react";
import { Box } from "@chakra-ui/layout";
import { Field, Form, Formik } from "formik";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Textarea } from "@chakra-ui/textarea";
import { jsonToFormData } from "../../../config/jsonToFormData";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeftIcon,
  CameraIcon,
  PencilIcon,
  XIcon,
} from "@heroicons/react/solid";
import Dropzone from "react-dropzone";
import { useToast } from "@chakra-ui/toast";
import { useRouter } from "next/router";
import { Select } from "@chakra-ui/select";
import { FormErrorMessage } from "@chakra-ui/form-control";
import Head from "next/head";
import DeleteProductImageModal from "../../../components/Pages/Product/DeleteProductImageModal";
import { Modal } from "../../../components/Modals/Modal";
import { fetchWithToken } from "../../../utils/fetcher";
import useSWR from "swr";
export default function DetailProduct() {
  const router = useRouter();
  const { query } = router;
  const { slug } = query;
  const { data: product, error: errorProduct } = useSWR(
    slug ? [`api/products/${slug}`] : null,
    (url) => fetchWithToken(url)
  );

  const { data: category } = useSWR([`api/category`], (url) =>
    fetchWithToken(url)
  );
  const initialValues = {
    title: product?.title || "",
    description: product?.description || "",
    price: product?.price || "",
    thumbnail: product?.thumbnail || "",
    category_id: product?.category_id || "",
    product_images: product?.product_images || null,
  };
  const FormikRef = useRef();
  const thumbnailRef = useRef();
  const [errors, setErrors] = useState();
  const [deleteIdImage, setDeleteIdImage] = useState();
  const [productImageName, setProductImageName] = useState();
  const toast = useToast();
  const deleteImageModalRef = useRef();
  const [productImages, setProductImages] = useState(
    product?.product_images ?? []
  );
  const onChangeImage = (e, index) => {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    FormikRef.current.setFieldValue(index, files[0]);
  };
  const deleteProductImage = (e, item) => {
    e.preventDefault();
    deleteImageModalRef.current.open();
    setDeleteIdImage(item.id);
    setProductImageName(item.image_name);
  };

  useEffect(() => {
    const ac = new AbortController();
    if (errorProduct) {
      toast({
        title: "Error",
        description: "Error! Please Try Again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      router.replace("/admin/products");
    } else {
      return () => {
        ac.abort();
      };
    }
  }, [errorProduct]);

  const onSubmit = async (values) => {
    const formData = jsonToFormData(values);
    formData.append("_method", "put");
    for (let pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    await instance()
      .post("api/admin/products/" + product?.id + "/update", formData, {
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      })
      .then((res) => {
        toast({
          title: "Success",
          description: res.data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        router.replace("/admin/products");
      })
      .catch((err) => {
        setErrors(err.response.data.data);
        setTimeout(() => {
          setErrors();
        }, 3000);
      });
  };
  return (
    <>
      {product?.title && (
        <Head>
          <title>{`${product?.title} - BUMDes Laut Sakti Daratan Bertuah`}</title>
        </Head>
      )}
      <Modal ref={deleteImageModalRef}>
        <DeleteProductImageModal
          parent={deleteImageModalRef}
          id={deleteIdImage}
          title={productImageName}
          setProductImages={setProductImages}
          productImages={initialValues.product_images}
          toast={toast}
        />
      </Modal>
      <div
        className="flex cursor-pointer items-center mb-4"
        onClick={() => router.back()}
      >
        <IconButton
          variant="unstyled"
          icon={<ArrowLeftIcon className="w-5 h-5" />}
        />
        <span className="text-base text-primary">Back</span>
      </div>
      <div className="bg-section">
        <h3 className="font-bold text-xl text-primary">Detail</h3>
        <p className="font-base tracking-wide text-secondary">
          Kelola item produk disini.
        </p>
        <Box className="mt-4">
          <Formik
            initialValues={initialValues}
            enableReinitialize
            innerRef={FormikRef}
            onSubmit={onSubmit}
          >
            {({
              isSubmitting,
              handleChange,
              handleBlur,
              values,
              setFieldValue,
              touched,
            }) => (
              <Form>
                <div>
                  <div className="my-2 lg:my-4">
                    <FormControl
                      id="title"
                      isInvalid={errors?.title && touched.title}
                    >
                      <FormLabel>Nama Produk</FormLabel>
                      <Field
                        as={Input}
                        focusBorderColor="blue.600"
                        name="title"
                      />
                      {errors?.title && (
                        <FormErrorMessage>{errors?.title}</FormErrorMessage>
                      )}
                    </FormControl>
                  </div>
                  <div className="my-2 lg:my-4">
                    <FormControl
                      id="description"
                      isInvalid={errors?.description && touched.description}
                    >
                      <FormLabel>Deskripsi</FormLabel>
                      <Field
                        as={Textarea}
                        focusBorderColor="blue.600"
                        name="description"
                        rows="8"
                      />
                      {errors?.description ? (
                        <FormErrorMessage>
                          {errors?.description}
                        </FormErrorMessage>
                      ) : (
                        <FormHelperText>Minimal 15 characters</FormHelperText>
                      )}
                    </FormControl>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="my-2 lg:my-4">
                      <FormControl
                        id="price"
                        isInvalid={errors?.price && touched.price}
                      >
                        <FormLabel>Price</FormLabel>
                        <Field
                          as={Input}
                          focusBorderColor="blue.600"
                          name="price"
                          type="number"
                        />
                        {errors?.price ? (
                          <FormErrorMessage>{errors?.price}</FormErrorMessage>
                        ) : (
                          <FormHelperText>Example: 4000</FormHelperText>
                        )}
                      </FormControl>
                    </div>
                    <div className="my-2 lg:my-4">
                      <FormControl
                        isInvalid={errors?.category_id && touched.category_id}
                      >
                        <FormLabel>Kategori</FormLabel>
                        <Select
                          placeholder="Kategori"
                          isInvalid={errors?.category_id}
                          size="md"
                          variant="outline"
                          focusBorderColor="blue.600"
                          name="category_id"
                          onChange={handleChange}
                          value={values.category_id}
                          className="w-3/4"
                          onBlur={handleBlur}
                        >
                          {category?.map((item, i) => (
                            <option key={i} value={item.id}>
                              {item.category_name}
                            </option>
                          ))}
                        </Select>
                        {errors?.category_id && (
                          <FormErrorMessage>
                            {errors?.category_id}
                          </FormErrorMessage>
                        )}
                      </FormControl>
                    </div>
                  </div>

                  <div className="my-2 lg:my-4">
                    <FormControl
                      id="thumbnail"
                      isInvalid={errors?.thumbnail && touched.thumbnail}
                    >
                      <FormLabel>Thumbnail</FormLabel>
                      <div className="flex flex-row w-full items-center gap-2">
                        <Button
                          variant="outline"
                          leftIcon={<CameraIcon className="w-5 h-5" />}
                          onClick={() => thumbnailRef.current.click()}
                        >
                          Upload
                          <input
                            ref={thumbnailRef}
                            type="file"
                            name="thumbnail"
                            hidden
                            accept="image/*"
                            onChange={(event) => {
                              onChangeImage(event, "thumbnail");
                            }}
                          />
                        </Button>
                      </div>
                      {errors?.thumbnail && (
                        <FormErrorMessage>{errors?.thumbnail}</FormErrorMessage>
                      )}
                    </FormControl>
                  </div>
                  <div className="my-2 lg:my-4">
                    {values?.thumbnail ? (
                      typeof values?.thumbnail !== "object" ? (
                        <Box className="w-full lg:w-80 rounded-md p-4 border border-gray-200">
                          <img
                            src={
                              process.env.baseUrl +
                              "/assets/images/thumbnail/products/" +
                              values.thumbnail
                            }
                            alt=""
                            className="w-full object-cover"
                          />
                        </Box>
                      ) : (
                        <Box display="flex">
                          <p className="truncate w-2/4">
                            Image Found: {values?.thumbnail?.name} +{" "}
                          </p>
                          {values?.thumbnail.type}
                        </Box>
                      )
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="my-2 lg:my-4">
                    <FormLabel>Product Images</FormLabel>
                    <Dropzone
                      onDrop={(acceptedFiles) => {
                        setFieldValue("product_images", acceptedFiles);
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <>
                          <div
                            {...getRootProps()}
                            className="mt-2 cursor-pointer border-dashed border-4 border-gray-200 w-full h-96 p-4 flex justify-center items-center"
                          >
                            <input
                              {...getInputProps()}
                              name="product_images"
                              // multiple
                            />
                            <p className="text-center">
                              Drag 'n' drop some files here, or click to select
                              files
                            </p>
                          </div>
                        </>
                      )}
                    </Dropzone>
                    {errors?.product_images && (
                      <p className="text-red-500">{errors?.product_images}</p>
                    )}
                  </div>
                </div>
                <div className="my-2 lg:my-4">
                  {values.product_images &&
                    values.product_images.map((file, i) => (
                      <li key={i} className="w-3/6 lg:w-1/6 truncate">
                        {`File: ${file.path ? file.path : file.image_name}`}{" "}
                      </li>
                    ))}
                </div>
                <div className={"mt-4 flex flex-col lg:flex-row gap-4"}>
                  {/* {JSON.stringify(productImages)} */}
                  {values.product_images &&
                    values.product_images.map((item, i) => (
                      <div
                        key={i}
                        className="group relative bg-no-repeat bg-cover border-gray-200 border w-full lg:w-60 h-40 rounded-md p-3"
                        style={{
                          backgroundImage: `url(${
                            process.env.baseUrl +
                            "/assets/images/products/" +
                            item.image_name
                          })`,
                        }}
                      >
                        <div className="flex w-full">
                          <IconButton
                            size="sm"
                            style={{ borderRadius: "3rem" }}
                            icon={<XIcon className="w-4 h-4" />}
                            className="ml-auto group-hover:visible invisible"
                            onClick={(e) => deleteProductImage(e, item)}
                          />
                        </div>
                      </div>
                    ))}
                  <p className="text-red-500">{errors?.product_images}</p>
                </div>
                <Button
                  disabled={isSubmitting}
                  size="md"
                  loadingText="Checking..."
                  isLoading={isSubmitting}
                  mt="4"
                  colorScheme="blue"
                  type="submit"
                  leftIcon={<PencilIcon className="w-4 h-4" />}
                >
                  Update
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </div>
    </>
  );
}

// export async function getStaticPaths() {
//   const res = await instance().get(`api/products`);
//   const data = await res.data.data.data;

//   const paths = data.map((item) => {
//     return {
//       params: { slug: item.slug.toString() },
//     };
//   });

//   return {
//     paths,
//     fallback: false,
//   };
// }

// export async function getStaticProps(context) {
//   const slug = context.params.slug;
//   const res = await instance().get(`api/products/${slug}`);
//   const product = await res.data.data;
//   const resCategory = await instance().get("api/category");
//   const category = resCategory.data.data;

//   return { props: { product, category } };
// }

DetailProduct.layout = Admin;
