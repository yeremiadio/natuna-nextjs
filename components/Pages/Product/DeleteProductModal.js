import { Button } from "@chakra-ui/button";
import { ExclamationIcon } from "@heroicons/react/solid";
import Cookies from "js-cookie";
import instance from "../../../utils/instance";

function DeleteProductModal({ parent, id, title, toast }) {
  const deleteProduct = async () => {
    instance
      .delete(`api/admin/products/${id}/delete`, {
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
      });
  };
  return (
    <>
      <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 sm:flex sm:items-start">
        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <ExclamationIcon
            className="h-6 w-6 text-red-600"
            aria-hidden="true"
          />
        </div>
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Delete Confirmation
          </h3>
          <p className="text-sm text-gray-500">
            Are you sure you want to delete this product? This product name{" "}
            <b>{title}</b> will be permanently removed. This action cannot be
            undone.
          </p>
        </div>
      </div>
      <div className="p-4 bg-gray-100 flex justify-end gap-2">
        <Button colorScheme="gray" onClick={() => parent.current.close()}>
          Cancel
        </Button>
        <Button colorScheme="red" onClick={deleteProduct}>
          Delete
        </Button>
      </div>
    </>
  );
}

export default DeleteProductModal;
