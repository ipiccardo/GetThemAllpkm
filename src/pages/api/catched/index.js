import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const data = await sql`SELECT * FROM catched_pokemon`;
      return res.status(200).json(data.rows);
    } catch (error) {
      console.error("Error al obtener datos:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  } else if (req.method === "POST") {
    const newPokemon = {
      id: req.body.id,
      name: req.body.name,
      image: req.body.image,
      types: JSON.stringify(req.body.types),
    };

    try {
      const existingPokemon =
        await sql`SELECT * FROM catched_pokemon WHERE id = ${newPokemon.id}`;

      if (existingPokemon.rows.length === 0) {
        await sql`
          INSERT INTO catched_pokemon (id, name, image, types)
          VALUES (${newPokemon.id}, ${newPokemon.name}, ${newPokemon.image}, ${newPokemon.types})
        `;
        return res.status(200).json(newPokemon);
      } else {
        return res.status(409).send("Pokemon ya existente");
      }
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }
  return res.status(405).send("Method not allowed.");
}
