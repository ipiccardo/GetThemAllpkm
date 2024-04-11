import React from "react";
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
} from "@chakra-ui/react";
import Image from "next/image";

const CatchedTable = ({ listCatched }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [listCatched]);

  if (!listCatched?.length && !isLoading) {
    return <h1>Aún no has capturado ningún pokemon</h1>;
  }

  console.log(listCatched);

  return (
    <TableContainer>
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
                  {pokemon.types.map((type, index) => (
                    <Badge
                      borderRadius={2}
                      variant="solid"
                      colorScheme="green"
                      key={index}
                    >
                      {type.type.name}
                    </Badge>
                  ))}
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
        <Tfoot>
          <Tr>
            <Th>Total</Th>
            <Th>{listCatched?.length}</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default CatchedTable;
