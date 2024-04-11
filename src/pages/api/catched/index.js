import { JsonDB, Config } from "node-json-db";

export default async function handler(req, res) {
  const db = new JsonDB(new Config("db", true, false, "/"));
  if (req.method === "GET") {
    var data = await db.getData("/catchedPokemon");

    return res.status(200).json(data);
  } else if (req.method === "POST") {
    const newPokemon = {
      id: req.body.id,
      name: req.body.name,
      image: req.body.image,
      types: req.body.types,
    };

    const existingPokemon = await db.getData("/catchedPokemon");
    const index = existingPokemon.findIndex(
      (pokemon) => pokemon.id === newPokemon.id
    );

    if (index === -1) {
      await db.push("/catchedPokemon[]", newPokemon);
      return res.status(200).json(newPokemon);
    } else {
      return res.status(409).send("Pokemon ya existente");
    }
  }
  return res.status(405).send("Method not allowed.");
}
