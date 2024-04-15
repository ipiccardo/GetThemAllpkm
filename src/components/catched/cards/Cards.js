import React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Container,
  Skeleton,
} from "@chakra-ui/react";
import PokemonCatchedCard from "./PokemonCatchedCard";

const CatchedCards = ({ listCatched }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (listCatched) {
      setLoading(false);
    }
  }, [listCatched]);
  return (
    <Container maxW="container.lg" p={10} pt={0}>
      <Heading
        as="h1"
        size="lg"
        mb={6}
        textAlign="center"
        borderBottom="1px solid burlywood"
        pb={2}
        mt={"30px"}
      >
        <Box textColor={"rgb(101, 67, 33)"}>My Team</Box>
      </Heading>
      <Skeleton
        isLoaded={!loading}
        endColor={"var(--chakra-colors-gray-200)"}
        minH={"300px"}
      >
        <Box textColor={"rgb(101, 67, 33)"}>Catched: {listCatched?.length}</Box>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="40px">
          {listCatched?.map((pokemon) => (
            <PokemonCatchedCard
              key={pokemon.id}
              pokemon={pokemon}
              fromCatched={true}
            />
          ))}
        </SimpleGrid>
      </Skeleton>
    </Container>
  );
};
export default CatchedCards;
