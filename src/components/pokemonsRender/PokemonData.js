import {
  Box,
  AspectRatio,
  Image,
  Stack,
  Progress,
  Text,
  Badge,
  HStack,
  Checkbox,
} from "@chakra-ui/react";
import { colorTipos } from "@/utils/colorTypes";
import axios from "axios";
import { useState } from "react";
import styles from "./pokemonrender.module.css";
import Link from "next/link";

export default function PokemonData({ pokemon, isCatched, onUpdateCatched }) {
  const { weight, height, moves, types, sprites, id } = pokemon;

  const stats = pokemon.stats.map((stat) => {
    const baseStat = stat.base_stat;
    const name = stat.stat.name;
    if (name === "hp" || name === "attack") {
      return {
        baseStat,
        name,
      };
    }
  });

  const hp = stats.find((element) => element.name === "hp");
  const attack = stats.find((element) => element.name === "attack");

  const [catched, setCatched] = useState(false);

  const handleSelect = () => {
    const pokemonData = {
      id: pokemon.id,
      name: pokemon.name,
      image: sprites.other.dream_world.front_default,
      types: pokemon.types,
    };
    if (!isCatched) {
      axios
        .post(`api/catched/`, pokemonData)
        .then((res) => {
          setCatched(true);
          onUpdateCatched(pokemon.id);
          return res;
        })
        .catch((error) => {
          console.error("Error al llamar a la API:", error);
        });
    } else {
      axios
        .delete(`api/catched/${pokemon.id}`)
        .then((res) => {
          setCatched(true);
          onUpdateCatched(pokemon.id);
          return res;
        })
        .catch((error) => {
          console.error("Error al llamar a la API:", error);
        });
    }
  };

  return (
    <Stack spacing="5" pb="5">
      <Stack spacing="5" position="relative">
        <Box position="absolute" right="0" zIndex="99">
          <Checkbox defaultChecked={isCatched} onChange={handleSelect}>
            Catched
          </Checkbox>
        </Box>
        <AspectRatio w="full" ratio={1}>
          <Image
            objectFit="contain"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
            alt={`${pokemon.name}`}
          />
        </AspectRatio>
        <Stack direction="row" spacing="5">
          <Stack>
            <Text fontSize="sm">Weight</Text>
            <Text>{weight}</Text>
          </Stack>
          <Stack>
            <Text fontSize="sm">Height</Text>
            <Text>{height}</Text>
          </Stack>
          <Stack>
            <Text fontSize="sm">Movimientos</Text>
            <Text>{moves.length}</Text>
          </Stack>
          <Stack>
            <Text fontSize="sm">Tipos</Text>
            <div className={styles.typesContainer}>
              {types.map((type, index) => {
                return (
                  <div key={index}>
                    <Badge
                      textColor={"white"}
                      backgroundColor={colorTipos(type.type.name)}
                    >
                      {type.type.name}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </Stack>
        </Stack>
      </Stack>

      <Stack spacing="5" p="5" bg="gray.100" borderRadius="xl">
        <Stack>
          <Text fontSize="xs">hp</Text>
          <Progress bg="gray.300" borderRadius="full" value={hp.baseStat} />
        </Stack>
        <Stack>
          <Text fontSize="xs">attack</Text>
          <Progress bg="gray.300" borderRadius="full" value={attack.baseStat} />
        </Stack>
      </Stack>

      <Stack>
        <Link href={`${pokemon.id}`} className={styles.link}>
          Ver detalle
        </Link>
      </Stack>
    </Stack>
  );
}
