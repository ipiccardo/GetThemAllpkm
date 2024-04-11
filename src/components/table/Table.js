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
} from "@chakra-ui/react";

const CatchedTable = ({ listCatched }) => {
  console.log(listCatched, "a ver");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [listCatched]);

  if (!listCatched?.length && !isLoading) {
    return <h1>Aún no has capturado ningún pokemon</h1>;
  }

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Species</Th>
            <Th>Image</Th>
          </Tr>
        </Thead>
        <Tbody>
          {listCatched?.map((pokemon) => (
            <Tr key={pokemon.id}>
              <Td>{pokemon.name}</Td>
              <Td>{pokemon.species}</Td>
              <Td>
                <img src={pokemon.image} alt={pokemon.name} />
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
