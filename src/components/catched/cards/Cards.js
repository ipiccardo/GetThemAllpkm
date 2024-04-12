import React from "react";
import {
  Box,
  Flex,
  Heading,
  Badge,
  Image,
  SimpleGrid,
  Container,
} from "@chakra-ui/react";
import PokemonCatchedCard from "./PokemonCatchedCard";

const CatchedCards = ({ listCatched }) => {
  if (!listCatched?.length) {
    return (
      <Flex alignItems="center" minH="100vh" justifyContent="center">
        <Container maxW="container.lg">
          <Heading as="h1" size="lg" textAlign="center">
            Aún no has capturado ningún Pokemon
          </Heading>
        </Container>
      </Flex>
    );
  }

  return (
    <Container maxW="container.lg" mt={10}>
      <Heading
        as="h1"
        size="lg"
        mb={6}
        textAlign="center"
        borderBottom="1px solid burlywood"
        pb={2}
      >
        <Box textColor={"rgb(101, 67, 33)"}>My Team</Box>
      </Heading>
      <Box textColor={"rgb(101, 67, 33)"}>
        Total atrapados: {listCatched?.length}
      </Box>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="40px">
        {listCatched.map((pokemon) => (
          <PokemonCatchedCard
            key={pokemon.id}
            pokemon={pokemon}
            fromCatched={true}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default CatchedCards;
