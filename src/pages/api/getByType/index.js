import axios from "axios";

export default async function handler(req, res) {
  const { pokeType } = req.query;
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/type/${pokeType}/`
    );
    const pokemon = response.data;
    res.status(200).json(pokemon);
  } catch (error) {
    if (error.response.data === "Not Found") {
      res.status(404).json({ message: "El Pokémon no existe" });
    } else {
      console.error("Error fetching Pokémon:", error);
      res.status(500).json({ message: "Hubo un error al buscar el Pokémon" });
    }
  }
}
