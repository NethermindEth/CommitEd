import { Box, HStack, Text } from "@chakra-ui/react";
import React from "react";
import data from "../../sample_data/data";
import Sidebar from "../Sidebar";
import Visualization from "../Visualization";

const MainLayout = () => {
  return (
    <HStack minH={"85vh"} alignItems={"stretch"}>
      <Sidebar />
      <Box height={"500px"} width={"800px"}>
        <Text>A Very Basic Network</Text>
        <Visualization data={data} />
      </Box>
    </HStack>
  );
};

export default MainLayout;
