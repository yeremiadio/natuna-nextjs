import { IconButton } from "@chakra-ui/react";
import { Menu, Transition } from "@headlessui/react";
import {
  DotsVerticalIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import React, { Fragment, useState } from "react";
import { Box } from "@chakra-ui/layout";

const ActionsButtonTable = ({
  updateParent,
  row,
  onClick,
  setData,
  deleteParent,
}) => {
  return (
    <Box display="flex" className="gap-1" onClick={onClick}>
      <IconButton
        icon={<PencilIcon className="w-5 h-5" />}
        style={{ borderRadius: "2rem" }}
        variant="ghost"
        onClick={() => {
          updateParent?.current.open();
          setData(row);
        }}
      />
      <IconButton
        onClick={() => {
          deleteParent?.current.open();
          setData(row);
        }}
        icon={<TrashIcon className="w-5 h-5" />}
        style={{ borderRadius: "2rem" }}
        variant="ghost"
      />
    </Box>
  );
};

export default ActionsButtonTable;
