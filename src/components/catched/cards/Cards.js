import React from "react";
import {
  Box,
  Flex,
  Heading,
  Badge,
  Image,
  SimpleGrid,
  Container,
  Skeleton,
} from "@chakra-ui/react";
import PokemonCatchedCard from "./PokemonCatchedCard";
import { useState, useEffect } from "react";

const CatchedCards = ({ listCatched }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (listCatched) {
      setIsLoading(false);
    }
  }, [listCatched]);

  return (
    <Container maxW="container.lg" mt={100}>
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
        {listCatched?.map((pokemon) => (
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
