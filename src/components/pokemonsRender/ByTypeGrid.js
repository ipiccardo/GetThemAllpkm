import React from "react";
import ButtonsTypes from "../buttonTypes/ButtonTypes";
import { useState, useEffect } from "react";
import axios from "axios";
import Grilla from "./Grilla";
import Pagination from "../Pagination/Pagination";
import { Container, Stack, Flex, useDisclosure } from "@chakra-ui/react";
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

  const indexOfLastPokemon = (currentPage + 1) * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemon = filteredTypePkmName?.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  useEffect(() => {
    if (filteredPkm.length === 20) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [filteredPkm]);

  useEffect(() => {
    axios
      .get(`api/getByType/?pokeType=${pokeType}`)
      .then((res) => {
        setFilteredType(res.data);
        setFilteredTypePkmName(res.data.pokemon);
        setCurrentPage(0);
      })

      .catch((error) => {
        console.error("Error al llamar a la API:", error);
      });
  }, [pokeType]);

  useEffect(() => {
    setIsLoading(true);
    setFilteredPkm([]);
    const promises = currentPokemon.map((pkm) => {
      return axios.get(
        `api/getByName/?name=${pkm.pokemon.name}&url=${pkm.pokemon.url}`
      );
    });
    if (promises) {
      Promise.all(promises)
        .then((responses) => {
          const loadedPokemon = responses.map((res) => res.data);
          setFilteredPkm(loadedPokemon);
        })
        .catch((error) => {
          console.error("Error al llamar a la API:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
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
      <Flex alignItems="center" minH="100vh" justifyContent="center">
        <Container p="10" pt="0" maxW="container.lg">
          <Stack pt="5" alignItems="center" spacing="5">
            <ButtonsTypes
              setPokeType={setPokeType}
              setIsLoading={setIsLoading}
            />
            <Grilla
              key={ByTypeGrid}
              pokemon={filteredPkm}
              isLoading={isLoading}
              handleViewPokemon={handleViewPokemon}
              currentPage={currentPage}
            />
            <Pagination
              setPage={setCurrentPage}
              page={currentPage}
              pageCount={Math.floor(
                filteredType.pokemon?.length / pokemonPerPage
              )}
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
