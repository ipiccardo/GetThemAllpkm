import React from "react";
import { AbsoluteCenter, Box, Flex, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import NavLinks from "./NavLinks";

export default function NavBar() {
  return (
    <Box
      bg="burlywood"
      w="100%"
      p={4}
      color="white"
      position={"absolute"}
      right={0}
      left={0}
    >
      <NavLinks />
    </Box>
  );
}
