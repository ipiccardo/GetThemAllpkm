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

export default function PokemonCard({ pokemon, singlePokemon }) {
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

  const pokemonWithoutPic = [
    "10080",
    "10081",
    "10082",
    "10083",
    "10084",
    "10085",
    "10061",
    "10158",
  ];

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
        <Image
          src={
            pokemonWithoutPic.some(
              (id) => id.toString() === pokemon.id.toString()
            )
              ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
              : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`
          }
          alt={`${pokemon.name}`}
        />
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
