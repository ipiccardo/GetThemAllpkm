import React from "react";
import Head from "next/head";

import { Inter, Island_Moments } from "next/font/google";
import styles from "@/styles/Home.module.css";
import axios from "axios";
const inter = Inter({ subsets: ["latin"] });
import { useEffect, useState } from "react";
import {
  Container,
  Stack,
  Input,
  Button,
  SimpleGrid,
  Flex,
  Box,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
  Skeleton,
} from "@chakra-ui/react";
import PokemonCard from "@/components/pokemonsRender/PokemonCard";
import PokemonData from "@/components/pokemonsRender/PokemonData";
import MyLoader from "@/components/loader/Skeletons";

const PokemonGrid = () => {
  const pokemonDataModal = useDisclosure();

  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState();
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(
    `api/getbypage?limit=${limit}&offset=${offset}`
  );
  const [catchedPkm, setCatchedPkm] = useState();
  const [isCatched, setIsCatched] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get(currentPage).then(async ({ data }) => {
      const promises = data.results.map((result) => axios(result.url));
      const fetchedPokemon = (await Promise.all(promises)).map(
        (res) => res.data
      );
      // setPokemonsToShow(data.next);
      setPokemon((prev) => [...prev, ...fetchedPokemon]);
      setIsLoading(false);
    });
  }, [currentPage]);

  function handleNextPage() {
    //   setCurrentPage(pokemonstoShow);
  }

  // function handlePrevious() {}

  function handleViewPokemon(pokemon) {
    if (catchedPkm.some((pkm) => pkm.id === pokemon.id)) {
      setIsCatched(true);
    } else {
      setIsCatched(false);
    }
    setSelectedPokemon(pokemon);
    pokemonDataModal.onOpen();
  }

  useEffect(() => {
    axios
      .get(`api/catched/`)
      .then((res) => {
        setCatchedPkm(res.data);
      })

      .catch((error) => {
        console.error("Error al llamar a la API:", error);
      });
  }, []);

  function handleUpdateCatched(pokemonId) {
    axios
      .get(`api/catched/`)
      .then((res) => {
        setCatchedPkm(res.data);
        setIsCatched(catchedPkm.some((pkm) => pkm.id === pokemonId));
      })
      .catch((error) => {
        console.error("Error al llamar a la API:", error);
      });
  }

  if (isLoading) {
    return (
      <Flex alignItems="center" minH="100vh" justifyContent="center">
        <Container maxW="container.lg">
          <Stack p="5" alignItems="center" spacing="5">
            <SimpleGrid spacing="5" columns={{ base: 1, md: 5 }}>
              {Array.from({ length: 20 }).map((_, index) => (
                <Box key={index}>
                  <MyLoader />
                </Box>
              ))}
            </SimpleGrid>
          </Stack>
        </Container>
      </Flex>
    );
  }

  return (
    <>
      <Flex alignItems="center" minH="100vh" justifyContent="center">
        <Container maxW="container.lg">
          <Stack p="5" alignItems="center" spacing="5">
            <SimpleGrid spacing="5" columns={{ base: 1, md: 5 }}>
              {pokemon.map((pokemon) => (
                <Box
                  as="button"
                  key={pokemon.id}
                  onClick={() => handleViewPokemon(pokemon)}
                >
                  <PokemonCard pokemon={pokemon} />
                </Box>
              ))}
            </SimpleGrid>
            {!isLoading && (
              <Button isLoading={isLoading} onClick={handleNextPage}>
                Cargas más
              </Button>
            )}
          </Stack>
        </Container>
      </Flex>
      <Modal {...pokemonDataModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textTransform="capitalize">
            {selectedPokemon?.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedPokemon && (
              <PokemonData
                pokemon={selectedPokemon}
                isCatched={isCatched}
                onUpdateCatched={handleUpdateCatched}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PokemonGrid;
