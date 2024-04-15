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
import PokemonData from "./PokemonData";
import CustomPagination from "../Pagination/Pagination";
import SearchBar from "../searchBar/SearchBar";
import Grilla from "./Grilla";
import PokemonModal from "./Modal";

const PokemonGrid = () => {
  const pokemonDataModal = useDisclosure();
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
  const [errorMessage, setErrorMessage] = useState("");

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

  return Object.keys(singlePokemon).length === 0 ? (
    <Flex alignItems="center" minH="100vh" justifyContent="center">
      <Container p="10" maxW="container.lg">
        <Stack pt="5" alignItems="center" spacing="5">
          <SearchBar
            setSinglePokemon={setSinglePokemon}
            singlePokemon={singlePokemon}
            setIsLoading={setIsLoading}
            setErrorMessage={setErrorMessage}
            errorMessage={errorMessage}
          />
          <Grilla
            pokemon={pokemon}
            handleViewPokemon={handleViewPokemon}
            isLoading={isLoading}
          />
          <CustomPagination
            setPage={setPage}
            page={page}
            pageCount={pageCount}
          />
          <PokemonModal
            isOpen={pokemonDataModal.isOpen}
            onClose={pokemonDataModal.onClose}
            selectedPokemon={selectedPokemon}
            isCatched={isCatched}
            onUpdateCatched={handleUpdateCatched}
          />
        </Stack>
      </Container>
    </Flex>
  ) : (
    <Container p="10" maxW="container.lg">
      <Stack pt="5" alignItems="center" spacing="5">
        <SearchBar
          setSinglePokemon={setSinglePokemon}
          singlePokemon={singlePokemon}
          setIsLoading={setIsLoading}
          setErrorMessage={setErrorMessage}
          errorMessage={errorMessage}
        />
        <Box
          as="button"
          key={singlePokemon.id}
          onClick={() => handleViewPokemon(singlePokemon)}
          className={styles.singleCard}
          columns={{ base: 1, md: 5 }}
          w={{ base: "60%", md: "100%" }}
          mt={10}
        >
          <PokemonCard
            pokemon={singlePokemon}
            fromCatched={false}
            singlePokemon={singlePokemon}
          />
        </Box>
        <PokemonModal
          isOpen={pokemonDataModal.isOpen}
          onClose={pokemonDataModal.onClose}
          selectedPokemon={selectedPokemon}
          isCatched={isCatched}
          onUpdateCatched={handleUpdateCatched}
        />
      </Stack>
    </Container>
  );
};

export default PokemonGrid;
