import React, { useState, useEffect } from "react";
import styles from "./searchBar.module.css";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({
  setSinglePokemon,
  singlePokemon,
  setIsLoading,
  errorMessage,
  setErrorMessage,
}) => {
  const [searchValue, setSearchValue] = useState("");

  function handleSearch() {
    if (searchValue === "") {
      setIsLoading(false);
      Object.keys(singlePokemon).length === 0
        ? setErrorMessage("Escribí el nombre del pokemon buscado")
        : setErrorMessage("");
      setSinglePokemon({});
      return;
    }
    axios
      .get(`api/getByName/?name=${searchValue}`)
      .then((res) => {
        setIsLoading(false);
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
          setIsLoading(false);
        } else {
          console.error("Error al llamar a la API:", error);
          setSinglePokemon({});
          setErrorMessage("error");
          setIsLoading(false);
        }
      });
  }

  const handleCleanInput = () => {
    setErrorMessage("");
    if (errorMessage !== "" && searchValue !== "") {
      setErrorMessage("");
      setSearchValue("");
      setSinglePokemon({});
    }
  };

  const handleFocus = () => {
    setErrorMessage("");
    setSearchValue("");
  };

  return (
    <>
      <div className={styles.container}>
        {singlePokemon && Object.keys(singlePokemon).length !== 0 && (
          <button
            className={styles.backButton}
            onClick={() => {
              setSinglePokemon({});
              setSearchValue("");
            }}
          >
            all
          </button>
        )}
        <input
          type="text"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value), setSinglePokemon({});
          }}
          className={styles.input}
          placeholder="Search..."
          onInput={handleCleanInput}
          onFocus={handleFocus}
        />
        <button className={styles.button} onClick={handleSearch}>
          <FaSearch />
        </button>
      </div>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </>
  );
};

export default SearchBar;
