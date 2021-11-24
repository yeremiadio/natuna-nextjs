import { useState, useRef, useCallback } from "react";
import Cookies from "js-cookie";
import instance from "../../../utils/instance";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { Box } from "@chakra-ui/layout";
import { Field, Form, Formik } from "formik";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
// import { Textarea } from "@chakra-ui/textarea";
import { jsonToFormData } from "../../../config/jsonToFormData";
import { PaperAirplaneIcon } from "@heroicons/react/solid";
// import { useMediaQuery } from "@chakra-ui/media-query";
import { Select } from "@chakra-ui/select";
// import Dropzone from "react-dropzone";
import CustomSpinner from "../../../components/Spinners/CustomSpinner";
import useSWR from "swr";
import { fetchWithToken } from "../../../utils/fetcher";

function UpdateUserModal({ parent, user, toast }) {
  const initialValues = {
    name: user?.name || "",
    email: user?.email || "",
    role_id: user?.role.id || "",
  };
  const { data: roles, error } = useSWR("api/roles", fetchWithToken);
  const FormikRef = useRef();
  const [errors, setErrors] = useState({});
  const onSubmit = useCallback(
    async (values) => {
      const formData = jsonToFormData(values);
      formData.append("_method", "put");
      for (let pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      await instance()
        .post(`api/admin/users/${user.id}/update`, formData, {
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
          window.location.reload();
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
      <h3 className="font-bold text-xl text-primary">Edit User</h3>
      <p className="font-base tracking-wide text-secondary">
        Lengkapi datanya disini.
      </p>
      <Box className="mt-4">
        <Formik
          initialValues={initialValues}
          enableReinitialize
          innerRef={FormikRef}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, handleChange, handleBlur }) => (
            <Form>
              <div>
                <div className="mt-2">
                  <FormControl id="name">
                    <FormLabel>Nama</FormLabel>
                    <Field
                      as={Input}
                      isInvalid={errors?.name}
                      focusBorderColor="blue.600"
                      name="name"
                    />
                    <p className="text-red-500">{errors?.name}</p>
                  </FormControl>
                </div>
                <div className="mt-2">
                  <FormControl id="email">
                    <FormLabel>Email</FormLabel>
                    <Field
                      as={Input}
                      isInvalid={errors?.email}
                      focusBorderColor="blue.600"
                      name="email"
                      type="email"
                    />
                    <p className="text-red-500">{errors?.email}</p>
                  </FormControl>
                </div>
                {!roles && !error ? (
                  <CustomSpinner />
                ) : (
                  <div className="mt-2">
                    <FormControl id="role">
                      <FormLabel>Role</FormLabel>
                      <Select
                        placeholder="Role"
                        isInvalid={errors?.role_id}
                        size="lg"
                        variant="outline"
                        focusBorderColor="blue.600"
                        name="role_id"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        {roles?.map((item, i) => (
                          <option key={i} value={item.id}>
                            {item.role_name}
                          </option>
                        ))}
                      </Select>
                      <p className="text-red-500">{errors?.role_id}</p>
                    </FormControl>
                  </div>
                )}
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

export default UpdateUserModal;
