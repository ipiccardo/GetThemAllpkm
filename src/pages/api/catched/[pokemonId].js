import { JsonDB, Config } from "node-json-db";

export default async function handler(req, res) {
  const db = new JsonDB(new Config("db", true, false, "/"));

  if (req.method === "GET") {
    try {
      const query = req.query;
      const { pokemonId } = query;
      const data = await db.getData("/catchedPokemon");

      const isPokemonCatched = data?.some(
        (pokemon) => pokemon.id === Number(pokemonId)
      );

      return res.status(200).json({ isCatched: isPokemonCatched });
    } catch (error) {
      console.error("Error al obtener datos:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  } else if (req.method === "DELETE") {
    try {
      const { pokemonId } = req.query;

      await db.delete(
        "/catchedPokemon[" +
          (await db.getIndex("/catchedPokemon", Number(pokemonId))) +
          "]"
      );

      return res.status(200).send("Pokemon liberado");
    } catch (error) {
      console.error("Error al eliminar datos:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  return res.status(405).send("Method not allowed.");
}
