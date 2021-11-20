import React from "react";
import { Button } from "@chakra-ui/button";
const CustomButton = ({ name, ...props }) => {
  return (
    <Button {...props} colorScheme="blue" size="md" variant="solid">
      Register
    </Button>
  );
};

export default CustomButton;
