import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const index = () => {
  const [listCatched, setListCatched] = useState();

  useEffect(() => {
    axios
      .get(`api/catched/`)
      .then((res) => {
        setListCatched(res.data);
      })

      .catch((error) => {
        console.error("Error al llamar a la API:", error);
      });
  }, []);

  console.log(listCatched, "listcatched");

  return (
    <>
      <h1>Catched</h1>
      <ul>
        {listCatched?.map((pokemon, index) => {
          return <li key={pokemon.id}>{pokemon.name}</li>;
        })}
      </ul>
    </>
  );
};

export default index;
