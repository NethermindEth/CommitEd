import { HStack } from "@chakra-ui/react";
import React from "react";
import Sidebar from "../Sidebar";
import Visualisation from "../MerkleTree/Container";

const MainLayout = () => {
  return (
    <HStack minH={"85vh"} alignItems={"stretch"}>
      <Sidebar />
      <Visualisation />
    </HStack>
  );
};

export default MainLayout;
