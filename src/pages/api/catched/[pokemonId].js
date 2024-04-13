import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const query = req.query;
      const { pokemonId } = query;
      const data = await sql`SELECT * FROM catched_pokemon`;

      const isPokemonCatched = data.rows.some(
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

      await sql`DELETE FROM catched_pokemon WHERE id = ${pokemonId}`;

      return res.status(200).send("Pokemon liberado");
    } catch (error) {
      console.error("Error al eliminar datos:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  return res.status(405).send("Method not allowed.");
}
