import {
  Stack,
  Text,
  Image,
  HStack,
  Badge,
  AspectRatio,
  Skeleton,
} from "@chakra-ui/react";
import { colorTipos } from "@/utils/colorTypes";
import { useState, useEffect } from "react";
import styles from "./pokemonrender.module.css";

export default function PokemonCard({ pokemon, singlePokemon }) {
  const [imageUrl, setImageUrl] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }

        setImageUrl(response.url);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching image:", error);
        setImageUrl(
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
        );
        setIsLoading(false);
      }
    };

    fetchImage();
  }, [pokemon.id]);

  if (singlePokemon) {
    return (
      <Stack
        spacing="5"
        boxShadow="xl"
        p="5"
        w="full"
        borderRadius="xl"
        alignItems="center"
      >
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
          alt={`${pokemon.name}`}
        />
        <Text textAlign="center" textTransform="Capitalize">
          {pokemon.name}
        </Text>
        <HStack>
          {pokemon?.types?.map((type) => (
            <Badge
              size="xs"
              key={type.slot}
              backgroundColor={colorTipos(type.type.name)}
              textColor={"white"}
              borderRadius={5}
            >
              {type.type.name}
            </Badge>
          ))}
        </HStack>
      </Stack>
    );
  }

  return (
    <Stack
      spacing="5"
      boxShadow="xl"
      p="5"
      w="full"
      borderRadius="xl"
      alignItems="center"
    >
      <AspectRatio w="full" ratio={1}>
        {isLoading ? (
          <div style={{ width: "100%", height: "100%" }} />
        ) : (
          <Image objectFit="contain" src={imageUrl} alt={`${pokemon.name}`} />
        )}
      </AspectRatio>
      <Text textAlign="center" textTransform="Capitalize">
        {pokemon.name}
      </Text>
      <HStack>
        {pokemon?.types?.map((type) => (
          <Badge
            size="xs"
            key={type.slot}
            backgroundColor={colorTipos(type.type.name)}
            textColor={"white"}
            borderRadius={5}
          >
            {type.type.name}
          </Badge>
        ))}
      </HStack>
    </Stack>
  );
}
