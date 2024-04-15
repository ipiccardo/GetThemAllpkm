import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Paper,
  Icon,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const AbilityTableData = ({ hiddenAbility, abilitiesData }) => {
  return (
    <Box className="stat-table-container" marginBottom="20px">
      <Heading marginBottom="2">Abilities</Heading>
      <Table minWidth="320" aria-label="simple table">
        <Thead>
          <Tr>
            <Th align="left">Abilities</Th>
            <Th align="left">Description</Th>
          </Tr>
        </Thead>
        <Tbody>
          {abilitiesData?.map(({ name, effect_entries }) => (
            <Tr key={name}>
              <Td style={{ width: "150px", position: "relative" }} align="left">
                {name && name[0].toUpperCase() + name.substring(1)}
                {hiddenAbility === name && (
                  <Icon
                    as={FontAwesomeIcon}
                    style={{ position: "absolute", top: "5", left: "5" }}
                    icon={faStar}
                  />
                )}
              </Td>
              <Td align="left">
                {effect_entries?.map(
                  (effect) =>
                    effect.language.name === "en" && (
                      <Flex key={effect.short_effect} alignItems="center">
                        {effect.short_effect}
                      </Flex>
                    )
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default AbilityTableData;
