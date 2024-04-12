import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Stack,
  Badge,
  Flex,
  Container,
} from "@chakra-ui/react";
import Image from "next/image";
import style from "../table/table.module.css";
import { colorTipos } from "../../utils/colorTypes";

const CatchedTable = ({ listCatched }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [listCatched]);

  if (!listCatched?.length && !isLoading) {
    return (
      <>
        <Flex alignItems="center" minH="100vh" justifyContent="center">
          <Container maxW="container.lg">
            <div className={style.withOutPkms}>
              <h1>Aún no has capturado ningún pokemon</h1>
            </div>
          </Container>
        </Flex>
      </>
    );
  }

  return (
    <Flex alignItems="center" minH="100vh" justifyContent="center">
      <Container maxW="container.lg">
        <div className={style.tableContainer}>
          <h1 className={style.title}>My team</h1>
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
                    <Td>{pokemon.name}</Td>
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
                        src={pokemon.image}
                        alt={pokemon.name}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </Container>
    </Flex>
  );
};

export default CatchedTable;
