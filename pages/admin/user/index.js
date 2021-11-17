import { useMemo } from "react";
import Admin from "../../../layouts/Admin";
import instance from "../../../utils/instance";
// import { token } from "../../../config/token";
import { useMediaQuery } from "@chakra-ui/media-query";

import DataTable from "react-data-table-component";
import { Badge, Box } from "@chakra-ui/layout";
import { Button, IconButton } from "@chakra-ui/button";
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";

const index = ({ users }) => {
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
  ];

  console.log(users);
  const [isSmallestThan562] = useMediaQuery("(max-width: 562px)");
  const handleChangeSelectRows = ({ selectedRows }) => {
    // You can set state or dispatch with something like Redux so we can use the retrieved data
    console.log("Selected Rows: ", selectedRows);
  };
  return (
    <div className="bg-section">
      <h3 className="font-bold text-xl text-gray-800">User</h3>
      <p className="font-base tracking-wide text-gray-400">
        Lihat List Pengguna disini.
      </p>
      <div className="mt-4">
        {isSmallestThan562 ? (
          users.map((item, i) => (
            <Box className="border border-gray-200 rounded" padding="4" key={i}>
              <h3 className="text-lg text-gray-700 font-bold">{item.name}</h3>
              <p className="text-base text-gray-500">{item.email}</p>
              <Badge
                p="1"
                mt="2"
                className="rounded-full"
                variant="outline"
                colorScheme="green"
              >
                {item.role.role_name}
              </Badge>
              <div className="block space-x-2 mt-4">
                <IconButton
                  aria-label="Update"
                  color="white"
                  bgColor="blue.500"
                  _hover={{ bgColor: "blue.600" }}
                  icon={<PencilIcon className="w-5 h-5" />}
                />
                <IconButton
                  aria-label="Delete"
                  icon={<TrashIcon className="w-5 h-5" />}
                />
              </div>
            </Box>
          ))
        ) : (
          <DataTable
            className="pr-40"
            columns={columns}
            data={users}
            selectableRows
            pagination
            onSelectedRowsChange={handleChangeSelectRows}
          />
        )}
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const cookie = context.req.cookies["access_token"];
  const res = await instance.get("api/users", {
    headers: {
      Authorization: "Bearer " + cookie,
    },
  });
  const users = res.data.data;

  return {
    props: { users }, // will be passed to the page component as props
  };
}

export default index;

index.layout = Admin;
