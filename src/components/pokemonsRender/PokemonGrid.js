import React from "react";
import Head from "next/head";

import { Inter, Island_Moments } from "next/font/google";
import styles from "./pokemonrender.module.css";
import axios from "axios";
const inter = Inter({ subsets: ["latin"] });
import { useEffect, useState } from "react";
import {
  Container,
  Stack,
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
  useMediaQuery,
} from "@chakra-ui/react";
import PokemonCard from "@/components/pokemonsRender/PokemonCard";
import PokemonData from "@/components/pokemonsRender/PokemonData";
import CustomPagination from "../Pagination/Pagination";
import SearchBar from "../searchBar/SearchBar";
import LoadingDashboard from "../loader/LoadingDashboard";

const PokemonGrid = () => {
  const pokemonDataModal = useDisclosure();
  const [isLargerThan766] = useMediaQuery("(min-width: 766px)");
  const [page, setPage] = useState(0);
  const pageCount = 58;

  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState();
  const [currentPage, setCurrentPage] = useState(
    `api/getbypage?limit=20&page=${0}`
  );
  const [catchedPkm, setCatchedPkm] = useState();
  const [isCatched, setIsCatched] = useState(false);

  const [singlePokemon, setSinglePokemon] = useState({});

  useEffect(() => {
    setIsLoading(true);
    setPokemon([]);
    axios.get(currentPage).then(async ({ data }) => {
      const promises = data.results.map((result) => axios(result.url));
      const fetchedPokemon = (await Promise.all(promises)).map(
        (res) => res.data
      );
      setPokemon((prev) => [...prev, ...fetchedPokemon]);
      setIsLoading(false);
    });
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(`api/getbypage?limit=20&page=${page > 0 ? page * 20 : 0}`);
  }, [page]);

  function handleViewPokemon(pokemon) {
    if (catchedPkm.some((pkm) => pkm.id.toString() === pokemon.id.toString())) {
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
        setIsCatched(catchedPkm?.some((pkm) => pkm.id === pokemonId));
      })
      .catch((error) => {
        console.error("Error al llamar a la API:", error);
      });
  }

  if (isLoading && isLargerThan766) {
    return <LoadingDashboard />;
  }

  return (
    <>
      <Skeleton isLoaded={!isLoading}>
        <Flex alignItems="center" minH="100vh" justifyContent="center">
          <Container p="10" maxW="container.lg" position={"absolute"} top={0}>
            <Stack pt="5" alignItems="center" spacing="5">
              <>
                <SearchBar
                  setSinglePokemon={setSinglePokemon}
                  singlePokemon={singlePokemon}
                  setIsLoading={setIsLoading}
                />
              </>
              {Object.keys(singlePokemon).length === 0 ? (
                <>
                  <SimpleGrid
                    mt="10"
                    spacing="5"
                    columns={{ base: 1, md: 5 }}
                    w={{ base: "60%", md: "100%" }}
                  >
                    {pokemon.map((pokemon) => (
                      <Box
                        as="button"
                        key={pokemon.id}
                        onClick={() => handleViewPokemon(pokemon)}
                      >
                        {!isLargerThan766 ? (
                          <Skeleton isLoaded={!isLoading}>
                            <PokemonCard pokemon={pokemon} />
                          </Skeleton>
                        ) : (
                          <PokemonCard pokemon={pokemon} />
                        )}
                      </Box>
                    ))}
                  </SimpleGrid>
                  <CustomPagination
                    setPage={setPage}
                    page={page}
                    pageCount={pageCount}
                  />
                </>
              ) : (
                <Box
                  as="button"
                  key={singlePokemon.id}
                  onClick={() => handleViewPokemon(singlePokemon)}
                  className={styles.singleCard}
                  columns={{ base: 1, md: 5 }}
                  w={{ base: "60%", md: "100%" }}
                  mt={10}
                >
                  <PokemonCard pokemon={singlePokemon} fromCatched={false} />
                </Box>
              )}
            </Stack>
          </Container>
        </Flex>
      </Skeleton>
      <Modal {...pokemonDataModal} size={{ base: "lg", xm: "full" }}>
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
