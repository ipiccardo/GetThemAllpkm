import React from "react";
import {
  SimpleGrid,
  Box,
  useMediaQuery,
  Skeleton,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";
import PokemonCard from "./PokemonCard";
import LoadingDashboard from "../loader/LoadingDashboard";
import styles from "./pokemonrender.module.css";

const Grilla = ({ pokemon, handleViewPokemon, isLoading }) => {
  const [isLargerThan766] = useMediaQuery("(min-width: 766px)");
  const skeletonWidth = useBreakpointValue({
    base: "100%",
    md: "50%",
    lg: "33.33%",
  });
  const skeletonHeight = useBreakpointValue({
    base: "300px",
    md: "300px",
    lg: "500px",
  });

  if (!isLargerThan766) {
    return (
      <>
        <div className={styles.responsiveGrid}>
          {isLoading ? (
            <Flex gap={100} direction={"column"}>
              <Skeleton
                endColor={"var(--chakra-colors-gray-200)"}
                height={skeletonHeight}
                width={skeletonWidth}
              />
              <Skeleton
                endColor={"var(--chakra-colors-gray-200)"}
                height={skeletonHeight}
                width={skeletonWidth}
              />
              <Skeleton
                endColor={"var(--chakra-colors-gray-200)"}
                height={skeletonHeight}
                width={skeletonWidth}
              />
            </Flex>
          ) : (
            pokemon?.map((pokemon) => (
              <Box
                as="button"
                key={pokemon.id}
                onClick={() => handleViewPokemon(pokemon)}
              >
                <PokemonCard pokemon={pokemon} isLoading={isLoading} />
              </Box>
            ))
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <SimpleGrid
        mt="5"
        spacing="5"
        columns={{ base: 1, md: 5 }}
        w={{ base: "60%", md: "100%" }}
      >
        {isLoading ? (
          <LoadingDashboard />
        ) : (
          pokemon?.map((pokemon) => (
            <Box
              as="button"
              key={pokemon.id}
              onClick={() => handleViewPokemon(pokemon)}
            >
              <PokemonCard pokemon={pokemon} isLoading={isLoading} />
            </Box>
          ))
        )}
      </SimpleGrid>
    </>
  );
};

export default Grilla;
