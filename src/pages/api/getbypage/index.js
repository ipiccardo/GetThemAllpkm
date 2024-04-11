import axios from "axios";

export default async function handler(req, res) {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0`
    );
    const pokemons = response.data;
    res.status(200).json(pokemons);
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
