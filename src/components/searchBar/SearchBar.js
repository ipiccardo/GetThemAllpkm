import React, { useState, useEffect } from "react";
import styles from "./searchBar.module.css";
import axios from "axios";

const SearchBar = ({ setSinglePokemon, singlePokemon }) => {
  const [searchValue, setSearchValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleSearch() {
    if (searchValue === "") {
      setSinglePokemon({});
      Object.keys(singlePokemon).length === 0
        ? setErrorMessage("Escribí el nombre del pokemon buscado")
        : setErrorMessage("");
      return;
    }
    axios
      .get(`api/getByName/?name=${searchValue}`)
      .then((res) => {
        const pokemonData = res.data;
        if (Object.keys(pokemonData).length !== 0) {
          setSinglePokemon(pokemonData);
          setErrorMessage("");
        }
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setSinglePokemon({});
          setErrorMessage("El Pokémon buscado no existe");
        } else {
          console.error("Error al llamar a la API:", error);
          setSinglePokemon({});
          setErrorMessage("error");
        }
      });
  }

  return (
    <>
      <div className={styles.container}>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className={styles.input}
          placeholder="Search..."
        />
        <button className={styles.button} onClick={handleSearch}>
          Search
        </button>
      </div>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </>
  );
};

export default SearchBar;
