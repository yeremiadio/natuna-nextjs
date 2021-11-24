import Admin from "../../../layouts/Admin";
// import { useMediaQuery } from "@chakra-ui/media-query";
import DataTable from "react-data-table-component";
import { Button, IconButton } from "@chakra-ui/button";
// import { DotsVerticalIcon } from "@heroicons/react/solid";
import { fetchWithToken } from "../../../utils/fetcher";
import CustomSpinner from "../../../components/Spinners/CustomSpinner";
import moment from "moment";
import { useRef, useState, useEffect } from "react";
import { useToast } from "@chakra-ui/toast";
import DeleteUserModal from "../../../components/Pages/User/DeleteUserModal";
import { Modal } from "../../../components/Modals/Modal";
import ActionsButtonTable from "../../../components/Actions/ActionsButtonTable";
import UpdateUserModal from "../../../components/Pages/User/UpdateUserModal";
import { CSVLink } from "react-csv";
import useSWR from "swr";
import AddUserModal from "../../../components/Pages/User/AddUserModal";
import { PlusIcon } from "@heroicons/react/solid";
import AddCategoryModal from "../../../components/Pages/Category/AddCategoryModal";
import UpdateCategoryModal from "../../../components/Pages/Category/UpdateCategoryModal";
import DeleteCategoryModal from "../../../components/Pages/Category/DeleteCategoryModal";

const index = () => {
  const {
    data: category,
    mutate,
    error,
  } = useSWR([`api/category`], (url) => fetchWithToken(url), {
    revalidateOnFocus: false,
  });
  const updateCategoryModalRef = useRef();
  const deleteCategoryModalRef = useRef();
  const addCategoryModalRef = useRef();
  const [selectedIndexData, setIndexData] = useState(0);
  const [selectedData, setSelectedData] = useState();
  const toast = useToast();

  const columns = [
    {
      name: "Kategori Produk",
      selector: (row) => row.category_name,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => moment(row.created_at).format("L"),
      sortable: true,
    },
    {
      name: "Updated At",
      selector: (row) => moment(row.updated_at).format("L"),
      sortable: true,
    },
    {
      name: "Actions",
      selector: (row, index) => (
        <ActionsButtonTable
          row={row}
          onClick={() => setIndexData(index)}
          updateParent={updateCategoryModalRef}
          setData={setSelectedData}
          deleteParent={deleteCategoryModalRef}
        />
      ),
    },
  ];

  const headers = [
    {
      label: "Kategori Produk",
      key: "category_name",
    },
    {
      label: "Slug",
      key: "category_slug",
    },
    {
      label: "Tanggal Dibuat",
      key: "created_at",
    },
    {
      label: "Tanggal Update",
      key: "updated_at",
    },
  ];

  const exportCSVProps = {
    filename: "export.csv",
    headers: headers,
    data: category,
  };

  const handleChangeSelectRows = ({ selectedRows }) => {
    console.log("Selected Rows: ", selectedRows);
  };
  return (
    <>
      <Modal ref={addCategoryModalRef}>
        <AddCategoryModal
          parent={addCategoryModalRef}
          toast={toast}
          mutate={mutate}
          category={category}
        />
      </Modal>
      <Modal ref={updateCategoryModalRef}>
        <UpdateCategoryModal
          selectedData={selectedData}
          mutate={mutate}
          category={category}
          indexData={selectedIndexData}
          parent={updateCategoryModalRef}
          toast={toast}
        />
      </Modal>
      <Modal ref={deleteCategoryModalRef}>
        <DeleteCategoryModal
          id={selectedData?.id}
          name={selectedData?.category_name}
          parent={deleteCategoryModalRef}
          toast={toast}
          mutate={mutate}
          category={category}
        />
      </Modal>
      <div className="bg-section">
        <div className="flex flex-col md:flex-row w-full items-center">
          <div>
            <h3 className="font-bold text-xl text-primary">Kategori</h3>
            <p className="font-base tracking-wide text-secondary">
              Kelola semua kategori produk kamu disini.
            </p>
          </div>
          <Button
            colorScheme="blue"
            className="mt-2 ml-auto"
            leftIcon={<PlusIcon className="w-4 h-4" />}
            onClick={() => addCategoryModalRef.current.open()}
          >
            Tambah
          </Button>
        </div>
        {!category ? (
          <CustomSpinner />
        ) : (
          <div className="mt-4">
            <CSVLink {...exportCSVProps}>
              <Button variant="ghost">Export to CSV</Button>
            </CSVLink>
            <DataTable
              columns={columns}
              data={category}
              pagination
              onSelectedRowsChange={handleChangeSelectRows}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default index;

index.layout = Admin;
