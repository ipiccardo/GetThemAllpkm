import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Button,
  Box,
  Heading,
  Image,
  Flex,
  Badge,
  Skeleton,
} from "@chakra-ui/react";
import { colorTipos } from "@/utils/colorTypes";
import AbilityTable from "./abilityTable/AbilityTable";
import StatTable from "./statTable/StatTable";
import MoveTable from "./moveTable/MoveTable";
import axios from "axios";
import styles from "./pokeScreen.module.css";
import pokebolaImage from "/public/pokebola.jpg";

export const PokeScreen = () => {
  const pathName = usePathname();
  const [pokeData, setPokeData] = useState({});
  const [loading, setLoading] = useState(true);
  const nameInArray = pathName?.split("/");
  const id = nameInArray && nameInArray[1];

  useEffect(() => {
    setLoading(true);
    axios
      .get(`api/getById/?id=${id}`)
      .then((res) => {
        const pokemonData = res.data;
        setPokeData(pokemonData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Pokemon data:", error);
        setLoading(false);
      });
  }, [id]);

  const { name, sprites, types, stats, moves, abilities, height, weight } =
    pokeData;

  return (
    <Skeleton isLoaded={!loading}>
      <Box className={styles.pokeScreenContainer}>
        <Flex className={styles.imgDiv}>
          <Box className="animate__animated animate__fadeInLeft">
            <Image
              width={300}
              height={300}
              className={styles.imgClass}
              src={
                sprites?.other["official-artwork"].front_default ||
                sprites?.other["home"].front_default ||
                pokebolaImage
              }
              alt={name}
            />
          </Box>
          <Box className="animate__animated animate__fadeIn pokeScreen-info">
            <Heading as="h1" textAlign="left">
              {name ? name[0].toUpperCase() + name?.substring(1) : null}
            </Heading>
            <Flex className="typosEnPokeScreen" position="relative">
              {types?.map(({ type: { name } }, index) => (
                <Badge
                  key={index}
                  className="type"
                  backgroundColor={colorTipos(name)}
                  color={"white"}
                  marginRight="2"
                >
                  {name.toUpperCase()}
                </Badge>
              ))}
            </Flex>
            <Flex className="div-measures">
              <p>Height: {height / 10} m</p>
              <p>Weight: {weight / 10} kg</p>
            </Flex>
          </Box>
        </Flex>
        <Box marginTop="50">
          <AbilityTable abilities={abilities} />
          <StatTable stats={stats} />
          <MoveTable moves={moves} />
        </Box>
      </Box>
    </Skeleton>
  );
};

export default PokeScreen;
