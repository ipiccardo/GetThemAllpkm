import axios from "axios";

export default async function handler(req, res) {
  const { limit, page } = req.query;

  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${page}`
    );
    const pokemons = response.data;
    res.status(200).json(pokemons);
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
