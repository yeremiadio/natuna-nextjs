import { useState, useRef, useCallback } from "react";
import Cookies from "js-cookie";
import instance from "../../../utils/instance";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { Box } from "@chakra-ui/layout";
import { Field, Form, Formik } from "formik";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { jsonToFormData } from "../../../config/jsonToFormData";
import { PaperAirplaneIcon, CameraIcon } from "@heroicons/react/solid";
import { Select } from "@chakra-ui/select";
import CustomSpinner from "../../../components/Spinners/CustomSpinner";
import useSWR from "swr";
import { fetchWithToken } from "../../../utils/fetcher";
import { FormErrorMessage } from "@chakra-ui/form-control";

function AddCategoryModal({ parent, category, mutate, toast }) {
  const initialValues = {
    category_name: "",
  };
  const [errors, setErrors] = useState({});
  const onSubmit = useCallback(
    async (values) => {
      await instance()
        .post(`api/admin/category/create`, values, {
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
          mutate([...category, res.data.data], false);
        })
        .catch((err) => {
          toast({
            title: "Error",
            description: err.response.data.message,
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
      <h3 className="font-bold text-xl text-primary">Tambah Kategori</h3>
      <p className="font-base tracking-wide text-secondary">
        Lengkapi datanya disini.
      </p>
      <Box className="mt-4">
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ isSubmitting, values, touched, handleChange, handleBlur }) => (
            <Form>
              <div>
                <div className="mt-2">
                  <FormControl id="name">
                    <FormLabel>Nama Kategori</FormLabel>
                    <Field
                      as={Input}
                      isInvalid={errors?.category_name}
                      focusBorderColor="blue.600"
                      name="category_name"
                    />
                    <p className="text-red-500">{errors?.category_name}</p>
                  </FormControl>
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

export default AddCategoryModal;
