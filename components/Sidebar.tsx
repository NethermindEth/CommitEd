import { Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";

const Sidebar = () => {
  return (
    <Flex
      direction={"column"}
      p={"10px"}
      maxW={"350px"}
      border={"1px dashed"}
      h={"100%"}
      borderRadius={"10px"}
    >
      <Heading variant={"h3"} fontSize={"2xl"} mb={"20px"}>
        Commitment Scheme's
      </Heading>
      <Text>Merkle Tree's</Text>
    </Flex>
  );
};

export default Sidebar;
