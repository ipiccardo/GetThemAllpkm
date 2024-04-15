import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Paper,
  Box,
  Heading,
} from "@chakra-ui/react";
import { colorTipos } from "@/utils/colorTypes";
import styles from "../pokeScreen.module.css";

const MoveTableData = ({ orderedMoveData }) => {
  return (
    <Box marginTop="20px">
      <Heading marginTop="20px" marginBottom="20px">
        Attacks
      </Heading>
      <TableContainer component={Paper}>
        <Table minWidth={320} aria-label="simple table">
          <Thead>
            <Tr>
              <Th align="center">LEVEL</Th>
              <Th align="center">NAME</Th>
              <Th align="center">TYPE</Th>
              <Th align="center">CAT.</Th>
              <Th align="center">POW.</Th>
              <Th align="center">ACC.</Th>
              <Th align="center">PP</Th>
              <Th align="center">L.METHOD</Th>
              <Th align="left">DESCRIPTION</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orderedMoveData?.map(
              (
                {
                  name,
                  level,
                  method,
                  type,
                  damage_class,
                  power,
                  accuracy,
                  pp,
                  effect_entries,
                  effect_chance,
                },
                index
              ) => (
                <Tr key={name + index}>
                  <Td>{level !== 0 ? level : "-"}</Td>
                  <Td>{name && name[0]?.toUpperCase() + name.substring(1)}</Td>
                  <Td
                    bgColor={colorTipos(type.name)}
                    color="white"
                    fontWeight="bold"
                    width={80}
                    textAlign="center"
                  >
                    {type.name &&
                      type.name[0]?.toUpperCase() + type.name.substring(1)}
                  </Td>
                  <Td>{damage_class.name}</Td>
                  <Td>{power || "-"}</Td>
                  <Td>{accuracy || "-"}</Td>
                  <Td>{pp}</Td>
                  <Td>{method}</Td>
                  <Td className={styles.description}>
                    {effect_entries[0] &&
                      effect_entries[0].short_effect.replace(
                        "$effect_chance",
                        effect_chance
                      )}
                  </Td>
                </Tr>
              )
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MoveTableData;
