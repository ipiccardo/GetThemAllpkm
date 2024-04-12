import React from "react";
import { Box, Flex, Badge, Image, HStack } from "@chakra-ui/react";
import { colorTipos } from "../../../utils/colorTypes";

const PokemonCatchedCard = ({ pokemon, fromCatched }) => {
  return (
    <Flex justify="center">
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="lg"
        mt={10}
      >
        {!fromCatched ? (
          <AspectRatio w="full" ratio={1}>
            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
              alt={`${pokemon.name}`}
            />
          </AspectRatio>
        ) : (
          <Image
            src={pokemon.image ? pokemon.image : "/pokebola.jpg"}
            alt={pokemon.name}
          />
        )}
        <Box p="6">
          <Box d="flex" alignItems="start">
            <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
              {pokemon.name}
            </Box>
            <HStack spacing={2}>
              {pokemon.types.map((type, index) => (
                <Badge
                  key={index}
                  borderRadius="full"
                  px="2"
                  backgroundColor={colorTipos(type.type.name)}
                  textColor={"white"}
                  marginRight={2}
                >
                  {type.type.name}
                </Badge>
              ))}
            </HStack>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default PokemonCatchedCard;
