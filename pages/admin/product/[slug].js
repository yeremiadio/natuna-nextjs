import Cookies from "js-cookie";
import Admin from "../../../layouts/Admin";
import instance from "../../../utils/instance";
import Image from "next/image";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { Box } from "@chakra-ui/layout";
import { Field, Form, Formik } from "formik";
// import { currencyFormat } from "../../../config/currencyFormat";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Textarea } from "@chakra-ui/textarea";
import { jsonToFormData } from "../../../config/jsonToFormData";
import { useRef, useState } from "react";
import { CameraIcon } from "@heroicons/react/solid";
import Dropzone from "react-dropzone";
import { useToast } from "@chakra-ui/toast";
import { useRouter } from "next/router";
function DetailProduct({ product }) {
  const initialValues = {
    title: product.title || "",
    description: product.description || "",
    price: product.price || "",
    thumbnail: product.thumbnail || "",
    category_id: product.category_id || "",
    product_images: null,
  };
  const FormikRef = useRef();
  const thumbnailRef = useRef();
  const router = useRouter();
  const toast = useToast();
  const [productImages, setProductImages] = useState(product.product_images);
  console.log(productImages);
  const onChangeImage = (e, index) => {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    FormikRef.current.setFieldValue(index, files[0]);
  };
  console.log(product);
  const onSubmit = async (values) => {
    const formData = jsonToFormData(values);
    formData.append("_method", "put");
    for (let pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    await instance
      .post("api/admin/products/" + product.slug + "/update", formData, {
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
        // parent.current.close();
        router.replace("/admin/product");
      });
  };
  return (
    <>
      <h3 className="font-bold text-xl text-gray-800">Detail</h3>
      <p className="font-base tracking-wide text-gray-400">
        Kelola item produk disini.
      </p>
      <Box className="mt-4">
        <Formik
          initialValues={initialValues}
          enableReinitialize
          innerRef={FormikRef}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form>
              <div>
                <div className="mt-2">
                  <FormControl id="title">
                    <FormLabel>Nama Produk</FormLabel>
                    <Field
                      as={Input}
                      focusBorderColor="green.600"
                      name="title"
                    />
                  </FormControl>
                </div>
                <div className="mt-2">
                  <FormControl id="description">
                    <FormLabel>Deskripsi</FormLabel>
                    <Field
                      as={Textarea}
                      focusBorderColor="green.600"
                      name="description"
                      rows="4"
                    />
                  </FormControl>
                </div>
                <div className="w-full lg:w-1/6 mt-2">
                  <FormControl id="price">
                    <FormLabel>Price</FormLabel>
                    <Field
                      as={Input}
                      focusBorderColor="green.600"
                      name="price"
                      type="number"
                    />
                  </FormControl>
                </div>
                <div className="mt-2">
                  <FormControl id="thumbnail">
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
                    {/* <p className="text-red-500">{errors?.thumbnail}</p> */}
                  </FormControl>
                </div>
                <div className="mt-2">
                  {values?.thumbnail &&
                  typeof values?.thumbnail !== "object" ? (
                    <Box>
                      <img
                        src={
                          process.env.baseUrl +
                          "/assets/images/thumbnail/products/" +
                          values.thumbnail
                        }
                        alt=""
                        className="w-full lg:w-3/12 lg:h-1/2 rounded-md shadow-md scale-90 transition-all delay-100 hover:scale-100"
                      />
                    </Box>
                  ) : (
                    <Box>
                      <p className="truncate w-1/4">
                        Image Found: {values?.thumbnail?.name}
                      </p>
                    </Box>
                  )}
                </div>
                <FormLabel>Product Images</FormLabel>
                <Dropzone
                  onDrop={(acceptedFiles) => {
                    console.log(acceptedFiles);
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
                        <p>
                          Drag 'n' drop some files here, or click to select
                          files
                        </p>
                      </div>
                    </>
                  )}
                </Dropzone>
              </div>
              <div className="mt-2">
                {values.product_images &&
                  values.product_images.map((file, i) => (
                    <li key={i} className="w-1/6 truncate">
                      {`File: ${file.name} Type:${file.type} Size:${file.size} bytes`}{" "}
                    </li>
                  ))}
              </div>
              <div className="mt-2 flex gap-4">
                {productImages &&
                  productImages.map((item, i) => (
                    <Box key={i}>
                      <img
                        src={
                          process.env.baseUrl +
                          "/assets/images/products/" +
                          item.image_name
                        }
                        alt=""
                        className="w-full rounded-md shadow-md"
                      />
                    </Box>
                  ))}
              </div>
              <Button size="md" mt="4" colorScheme="green" type="submit">
                Update
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
}

export async function getStaticPaths() {
  const res = await instance.get(`api/products`);
  const data = await res.data.data.data;

  const paths = data.map((item) => {
    return {
      params: { slug: item.slug.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const slug = context.params.slug;
  const res = await instance.get(`api/products/${slug}`);
  const product = await res.data.data;

  return { props: { product } };
}

export default DetailProduct;

DetailProduct.layout = Admin;
