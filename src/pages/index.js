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
} from "@chakra-ui/react";
import PokemonCard from "@/components/PokemonCard";
import PokemonData from "@/components/PokemonData";
import NavBar from "../components/nav/NavBar";

export default function Home() {
  const pokemonDataModal = useDisclosure();

  const [isLoading, setIsLoading] = useState(false);
  const [pokemon, setPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState();
  const [pokemonstoShow, setPokemonsToShow] = useState(20);
  const [sinceWhere, setSinceWhere] = useState(0);
  const [currentPage, setCurrentPage] = useState(
    `https://pokeapi.co/api/v2/pokemon/?limit=${pokemonstoShow}&offset=${sinceWhere}`
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
      setPokemonsToShow(data.next);
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

  return (
    <>
      <Head>
        <title>Pokemon Challenge</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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

            <Button isLoading={false} onClick={handleNextPage}>
              Cargas más
            </Button>
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
}
