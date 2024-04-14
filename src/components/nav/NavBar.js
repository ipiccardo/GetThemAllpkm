import React from "react";
import { Box } from "@chakra-ui/react";
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
      top={0}
      zIndex={100}
    >
      <NavLinks />
    </Box>
  );
}
