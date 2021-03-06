import { useState, useRef, useCallback } from "react";
import Cookies from "js-cookie";
import instance from "../../../utils/instance";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Box } from "@chakra-ui/layout";
import { Field, Form, Formik } from "formik";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Textarea } from "@chakra-ui/textarea";
import { jsonToFormData } from "../../../config/jsonToFormData";
import { CameraIcon, PaperAirplaneIcon } from "@heroicons/react/solid";
import { Select } from "@chakra-ui/select";
import Dropzone from "react-dropzone";

function AddProductModal({ category, products, parent, mutate, toast }) {
  const initialValues = {
    title: "",
    description: "",
    price: "",
    thumbnail: "",
    category_id: "",
    product_images: "",
    unit: "",
  };
  const FormikRef = useRef();
  const thumbnailRef = useRef();
  const [errors, setErrors] = useState({});
  const onChangeImage = (e, index) => {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    FormikRef.current.setFieldValue(index, files[0]);
  };

  const onSubmit = useCallback(
    async (values) => {
      const formData = jsonToFormData(values);

      await instance()
        .post("api/admin/products/create", formData, {
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
          parent.current.close();
          mutate({ ...products, ...res.data.data });
        })
        .catch((err) => {
          toast({
            title: "Error",
            description: err?.response?.data?.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          setErrors(err.response.data.data);
          setTimeout(() => {
            setErrors();
          }, 3000);
        });
    },
    [errors]
  );

  return (
    <div className="p-4">
      <h3 className="font-bold text-xl text-primary">Tambah Produk</h3>
      <p className="font-base tracking-wide text-secondary">
        Lengkapi data produkmu disini.
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
            setFieldValue,
            values,
            touched,
            handleChange,
            handleBlur,
          }) => (
            <Form>
              <div>
                <div className="mt-2">
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
                    <FormErrorMessage>{errors?.title}</FormErrorMessage>
                  </FormControl>
                </div>
                <div className="mt-2">
                  <FormControl
                    id="description"
                    isInvalid={errors?.description && touched.description}
                  >
                    <FormLabel>Deskripsi</FormLabel>
                    <Field
                      as={Textarea}
                      focusBorderColor="blue.600"
                      name="description"
                      rows="4"
                    />
                    <FormErrorMessage>{errors?.description}</FormErrorMessage>
                  </FormControl>
                </div>
                <div className="mt-2">
                  <FormControl
                    id="category"
                    isInvalid={errors?.category_id && touched.category_id}
                  >
                    <FormLabel>Kategori</FormLabel>
                    <Select
                      placeholder="Kategori"
                      size="lg"
                      variant="outline"
                      focusBorderColor="blue.600"
                      name="category_id"
                      onChange={handleChange}
                      value={values.category_id}
                      onBlur={handleBlur}
                    >
                      {category.map((item, i) => (
                        <option key={i} value={item.id}>
                          {item.category_name}
                        </option>
                      ))}
                    </Select>
                    <FormErrorMessage>{errors?.category_id}</FormErrorMessage>
                  </FormControl>
                </div>
                <div className="w-full lg:w-3/6 mt-2">
                  <FormControl
                    id="price"
                    isInvalid={errors?.price && touched.price}
                  >
                    <FormLabel>Harga</FormLabel>
                    <Field
                      as={Input}
                      focusBorderColor="blue.600"
                      name="price"
                      type="number"
                    />
                    {errors?.price ? (
                      <FormErrorMessage>{errors?.price}</FormErrorMessage>
                    ) : (
                      <FormHelperText>Example: 4500</FormHelperText>
                    )}
                  </FormControl>
                </div>
                <div className="w-full lg:w-1/6 mt-2">
                  <FormControl
                    id="unit"
                    isInvalid={errors?.price && touched.price}
                  >
                    <FormLabel>Satuan</FormLabel>
                    <Field
                      as={Input}
                      focusBorderColor="blue.600"
                      name="unit"
                      type="text"
                    />
                    {errors?.unit ? (
                      <FormErrorMessage>{errors?.unit}</FormErrorMessage>
                    ) : (
                      <FormHelperText>Example: kg</FormHelperText>
                    )}
                  </FormControl>
                </div>
                <div className="mt-2">
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
                      {values?.thumbnail && (
                        <Box>
                          <p>{"Image Found"}</p>
                        </Box>
                      )}
                    </div>
                    {errors?.thumbnail && (
                      <FormErrorMessage>{errors?.thumbnail}</FormErrorMessage>
                    )}
                  </FormControl>
                </div>
                <div className="mt-2">
                  <FormControl
                    id="product_images"
                    isInvalid={errors?.product_images && touched.product_images}
                  >
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
                            className="mt-2 cursor-pointer border-dashed border-4 border-gray-200 w-full h-72 p-4 flex justify-center items-center"
                          >
                            <input
                              {...getInputProps()}
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
                    {errors?.product_images && (
                      <FormErrorMessage>
                        {errors?.product_images}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  {values.product_images &&
                    values.product_images.map((file, i) => (
                      <li key={i}>
                        {`File:${file.name} Type:${file.type} Size:${file.size} bytes`}{" "}
                      </li>
                    ))}
                </div>
              </div>
              <Box className="flex justify-end gap-2">
                <Button
                  isLoading={isSubmitting}
                  loadingText="Checking..."
                  size="md"
                  leftIcon={<PaperAirplaneIcon className="w-4 h-4 rotate-90" />}
                  mt="4"
                  colorScheme="blue"
                  type="submit"
                >
                  Submit
                </Button>
                <Button
                  size="md"
                  onClick={() => parent.current.close()}
                  mt="4"
                  type="button"
                >
                  Cancel
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </div>
  );
}

export default AddProductModal;
