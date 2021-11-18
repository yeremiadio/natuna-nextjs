import { Box } from "@chakra-ui/layout";
import React from "react";
// import NotFoundSvg from "../assets/images/404NotFound.svg";
import Lottie from "react-lottie";
// import NotFoundGif from "../assets/lottie/66934-tumbleweed-rolling.json";
import NotFoundCone from "../../public/lottie/lf20_zxliqmhr.json";
const EmptyDataComponent = ({ label }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: NotFoundCone,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      <Box>
        <Lottie
          options={defaultOptions}
          width={200}
          style={{ cursor: "pointer" }}
        />
      </Box>
    </>
  );
};

export default EmptyDataComponent;
