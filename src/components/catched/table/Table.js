import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Stack,
  Badge,
  Flex,
  Container,
  Heading,
  Box,
  Skeleton,
  position,
} from "@chakra-ui/react";
import Image from "next/image";
import { colorTipos } from "../../../utils/colorTypes";

const CatchedTable = ({ listCatched }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (listCatched) {
      setLoading(false);
    }
  }, [listCatched]);

  return (
    // <Flex alignItems="center" minH="100vh" justifyContent="center">
    <Container maxW="container.lg" mt={"80px"}>
      <>
        <Heading
          as="h1"
          size="lg"
          mb={6}
          textAlign="center"
          borderBottom="1px solid burlywood"
          pb={2}
          mt={"40px"}
        >
          <Box textColor={"rgb(101, 67, 33)"}>My Team</Box>
        </Heading>
        <Skeleton
          isLoaded={!loading}
          endColor={"var(--chakra-colors-gray-200)"}
          minH={"500"}
        >
          <Box textColor={"rgb(101, 67, 33)"}>
            Catched: {listCatched?.length}
          </Box>
          <TableContainer width={`100%`} mt={10}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Types</Th>
                  <Th>Image</Th>
                </Tr>
              </Thead>
              <Tbody>
                {listCatched?.map((pokemon) => (
                  <Tr key={pokemon.id}>
                    <Td>
                      {pokemon.name.charAt(0).toUpperCase() +
                        pokemon.name.slice(1).toLowerCase()}
                    </Td>
                    <Td>
                      <Stack direction="row">
                        {pokemon.types.map((type, index) => {
                          return (
                            <Badge
                              borderRadius={5}
                              variant="solid"
                              colorScheme={colorTipos(type.type.name)}
                              key={index}
                              padding={2}
                              backgroundColor={colorTipos(type.type.name)}
                            >
                              {type.type.name}
                            </Badge>
                          );
                        })}
                      </Stack>
                    </Td>
                    <Td>
                      <Image
                        height={100}
                        width={100}
                        src={pokemon.image ? pokemon?.image : "/pokebola.jpg"}
                        alt={pokemon.name}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Skeleton>
      </>
    </Container>
    // </Flex>
  );
};

export default CatchedTable;
