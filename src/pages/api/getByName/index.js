import axios from "axios";

export default async function handler(req, res) {
  const { name } = req.query;
  const { url } = req.query;

  try {
    const data = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=1302`
    );

    if (url) {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name
          .toLowerCase()
          .replace(/\s+/g, "-")}`
      );
      const pokemon = response.data;
      res.status(200).json(pokemon);
    } else {
      const filteredPokemon =
        data.data.results.length > 1
          ? data.data.results.filter((pokemon) =>
              pokemon.name.includes(name.toLowerCase().replace(/\s+/g, "-"))
            )
          : data.data.results.find(
              (pokemon) =>
                pokemon.name === name.toLowerCase().replace(/\s+/g, "-")
            );

      const gettingPokeData = filteredPokemon.map((pokemon) => {
        return axios.get(pokemon.url);
      });

      const allPokeData = await Promise.all(gettingPokeData);

      const formattedData = allPokeData.map((response) => response.data);

      res.status(200).json(formattedData);
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ message: "El Pokémon no existe" });
    } else {
      console.error("Error fetching Pokémon:", error);
      res.status(500).json({ message: "Hubo un error al buscar el Pokémon" });
    }
  }
}

//   try {
//     const response = await axios.get(
//       `https://pokeapi.co/api/v2/pokemon/${name
//         .toLowerCase()
//         .replace(/\s+/g, "-")}`
//     );
//     const pokemon = response.data;
//     res.status(200).json(pokemon);
//   } catch (error) {
//     if (error.response.data === "Not Found") {
//       res.status(404).json({ message: "El Pokémon no existe" });
//     } else {
//       console.error("Error fetching Pokémon:", error);
//       res.status(500).json({ message: "Hubo un error al buscar el Pokémon" });
//     }
//   }
// }
