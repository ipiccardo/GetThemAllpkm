import React, { useState } from "react";
import styles from "./buttonTypes.module.css";
import Swal from "sweetalert2";
import { colorTipos } from "@/utils/colorTypes";

export const ButtonsTypes = ({ setPokeType, setIsLoading }) => {
  const [activeButton, setActiveButton] = useState("normal");

  let tipos = [
    "fighting",
    "bug",
    "dark",
    "dragon",
    "electric",
    "fairy",
    "fire",
    "flying",
    "ghost",
    "grass",
    "ground",
    "ice",
    "normal",
    "poison",
    "psychic",
    "rock",
    "steel",
    "water",
  ];

  const handleClick = (e) => {
    const typeName = e.target.innerHTML;
    setIsLoading(true);
    setPokeType(typeName);
    setActiveButton(typeName);

    Swal.fire({
      background: `var(--${typeName})`,
      color: "#fff",
      padding: "1em",
      position: "top-right",
      showConfirmButton: false,
      timer: 2000,
      title: `${typeName[0].toUpperCase() + typeName.substring(1)} type!`,
      toast: true,
      width: "200px",
    });
  };

  return (
    <>
      <div className={styles.divButtons}>
        {tipos.map((tipo) => {
          return (
            <button
              onClick={handleClick}
              style={{
                backgroundColor: colorTipos(tipo),
                width: 80,
                color: "white",
                position: "relative",
              }}
              key={tipo}
              disabled={activeButton === tipo}
              className={
                activeButton === tipo ? styles.active : styles.defaultButton
              }
            >
              {tipo}
              {activeButton === tipo && (
                <img
                  src={`/pokeicon.svg`}
                  alt="Pokeball"
                  style={{
                    position: "absolute",
                    top: "-10px",
                    right: "-5px",
                    width: "18px",
                    height: "18px",
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default ButtonsTypes;
