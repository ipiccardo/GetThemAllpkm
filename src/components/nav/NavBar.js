import React from "react";
import { AbsoluteCenter, Box, Flex, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import NavLinks from "./NavLinks";

export default function NavBar({ links }) {
  return (
    <Box bg="burlywood" w="100%" p={4} color="white" position={"absolute"}>
      <NavLinks />
    </Box>
  );
}
