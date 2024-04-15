import React from "react";
import ButtonsTypes from "../buttonTypes/ButtonTypes";
import { useState, useEffect } from "react";
import axios from "axios";
import Grilla from "./Grilla";
import Pagination from "../Pagination/Pagination";
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
import PokemonModal from "./Modal";

const ByTypeGrid = () => {
  const pokemonDataModal = useDisclosure();
  const [pokeType, setPokeType] = useState("normal");
  const [filteredType, setFilteredType] = useState([]);
  const [filteredTypePkmName, setFilteredTypePkmName] = useState([]);
  const [filteredPkm, setFilteredPkm] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [pokemonPerPage] = useState(20);
  const [catchedPkm, setCatchedPkm] = useState();
  const [isCatched, setIsCatched] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`api/getByType/?pokeType=${pokeType}`)
      .then((res) => {
        setFilteredType(res.data);
        setFilteredTypePkmName(res.data.pokemon);
      })

      .catch((error) => {
        console.error("Error al llamar a la API:", error);
      });
    setIsLoading(false);
  }, [pokeType]);

  const indexOfLastPokemon =
    currentPage > 0 ? currentPage * pokemonPerPage : 20;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemon = filteredTypePkmName?.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  useEffect(() => {
    setFilteredPkm([]);
    setIsLoading(true);
    currentPokemon?.map((pkm) => {
      axios
        .get(`api/getByName/?name=${pkm.pokemon.name}`)
        .then((res) => {
          setFilteredPkm((prevFilteredPkm) => [...prevFilteredPkm, res.data]);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error al llamar a la API:", error);
        });
    });
  }, [filteredTypePkmName, currentPage]);

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

  function handleViewPokemon(pokemon) {
    if (catchedPkm.some((pkm) => pkm.id.toString() === pokemon.id.toString())) {
      setIsCatched(true);
    } else {
      setIsCatched(false);
    }
    setSelectedPokemon(pokemon);
    pokemonDataModal.onOpen();
  }

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

  return (
    <>
      <ButtonsTypes setPokeType={setPokeType} />
      <Flex alignItems="center" minH="100vh" justifyContent="center">
        <Container p="10" maxW="container.lg">
          <Stack pt="5" alignItems="center" spacing="5">
            <Grilla
              key={ByTypeGrid}
              pokemon={filteredPkm}
              isLoading={isLoading}
              handleViewPokemon={handleViewPokemon}
            />
            <Pagination
              setPage={setCurrentPage}
              page={currentPage}
              pageCount={pokemonPerPage}
            />
          </Stack>
        </Container>
      </Flex>
      <PokemonModal
        isOpen={pokemonDataModal.isOpen}
        onClose={pokemonDataModal.onClose}
        selectedPokemon={selectedPokemon}
        isCatched={isCatched}
        onUpdateCatched={handleUpdateCatched}
      />
    </>
  );
};

export default ByTypeGrid;
