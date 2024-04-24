import axios from "axios";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

    res.status(200).json(data.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ message: "El Pokémon no existe" });
    } else {
      console.error("Error fetching Pokémon:", error);
      res.status(500).json({ message: "Hubo un error al buscar el Pokémon" });
    }
  }
}
