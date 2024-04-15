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
import styles from "./statTable.module.css";

const StatTable = ({ stats }) => {
  return (
    <Box className={styles["stat-table-container"]}>
      <Heading className={styles["stat-heading"]}>Stats</Heading>
      <TableContainer component={Paper}>
        <Table minWidth="320" aria-label="simple table">
          <Thead>
            <Tr>
              <Th align="center">HP</Th>
              <Th align="center">ATTACK</Th>
              <Th align="center">DEFENSE</Th>
              <Th align="center">S.ATTACK</Th>
              <Th align="center">S.DEFENSE</Th>
              <Th align="center">SPEED</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              {stats?.map((stat) => (
                <Td key={stat.stat.name} align="center">
                  {stat["base_stat"]}
                </Td>
              ))}
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StatTable;
