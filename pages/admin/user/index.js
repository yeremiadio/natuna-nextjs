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
import instance from "../../../utils/instance";

const index = ({ data }) => {
  const [users, setUsers] = useState(data);
  const updateUserModalRef = useRef();
  const deleteUserModalRef = useRef();
  const exportCSVRef = useRef();
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
      selector: (row) => (
        <ActionsButtonTable
          row={row}
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
      <Modal ref={deleteUserModalRef}>
        <DeleteUserModal
          id={selectedData?.id}
          userName={selectedData?.name}
          parent={deleteUserModalRef}
          toast={toast}
          setUsers={setUsers}
          users={users}
        />
      </Modal>
      <Modal ref={updateUserModalRef}>
        <UpdateUserModal
          user={selectedData}
          parent={updateUserModalRef}
          toast={toast}
        />
      </Modal>
      <div className="bg-section">
        <h3 className="font-bold text-xl text-primary">User</h3>
        <p className="font-base tracking-wide text-secondary">
          Lihat List Pengguna disini.
        </p>
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

export async function getServerSideProps(context) {
  let status = 0;
  let data = null;
  const cookie = context?.req.cookies["access_token"];
  await instance()
    .get("api/users", {
      headers: {
        Authorization: "Bearer " + cookie,
      },
    })
    .then((response) => (data = response.data.data))
    .catch((err) => (status = err.response.status));

  if (status === 500)
    return {
      props: {},
    };
  return {
    props: { data },
  };
}

export default index;

index.layout = Admin;
