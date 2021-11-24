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

const index = () => {
  const {
    data: users,
    mutate,
    error,
  } = useSWR([`api/users`], (url) => fetchWithToken(url), {
    revalidateOnFocus: false,
  });
  const updateUserModalRef = useRef();
  const deleteUserModalRef = useRef();
  const addUserModalRef = useRef();
  const exportCSVRef = useRef();
  const [selectedIndexData, setIndexData] = useState(0);
  const [selectedData, setSelectedData] = useState();
  const toast = useToast();

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role.role_name,
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
          updateParent={updateUserModalRef}
          setData={setSelectedData}
          deleteParent={deleteUserModalRef}
        />
      ),
    },
  ];

  const headers = [
    {
      label: "Nama",
      key: "name",
    },
    {
      label: "Email",
      key: "email",
    },
    {
      label: "Role",
      key: "role.role_name",
    },
  ];

  const exportCSVProps = {
    filename: "export.csv",
    headers: headers,
    data: users,
  };

  const handleChangeSelectRows = ({ selectedRows }) => {
    console.log("Selected Rows: ", selectedRows);
  };
  return (
    <>
      <Modal ref={addUserModalRef}>
        <AddUserModal
          parent={addUserModalRef}
          toast={toast}
          mutate={mutate}
          users={users}
        />
      </Modal>
      <Modal ref={deleteUserModalRef}>
        <DeleteUserModal
          id={selectedData?.id}
          userName={selectedData?.name}
          parent={deleteUserModalRef}
          toast={toast}
          mutate={mutate}
          users={users}
        />
      </Modal>
      <Modal ref={updateUserModalRef}>
        <UpdateUserModal
          user={selectedData}
          mutate={mutate}
          users={users}
          indexData={selectedIndexData}
          parent={updateUserModalRef}
          toast={toast}
        />
      </Modal>
      <div className="bg-section">
        <div className="flex items-center">
          <div>
            <h3 className="font-bold text-xl text-primary">User</h3>
            <p className="font-base tracking-wide text-secondary">
              Kelola semua pengguna kamu disini.
            </p>
          </div>
          <Button
            colorScheme="blue"
            className="mt-2 ml-auto"
            leftIcon={<PlusIcon className="w-4 h-4" />}
            onClick={() => addUserModalRef.current.open()}
          >
            Tambah
          </Button>
        </div>
        {!users ? (
          <CustomSpinner />
        ) : (
          <div className="mt-4">
            <CSVLink {...exportCSVProps}>
              <Button variant="ghost">Export to CSV</Button>
            </CSVLink>
            <DataTable
              columns={columns}
              data={users}
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
