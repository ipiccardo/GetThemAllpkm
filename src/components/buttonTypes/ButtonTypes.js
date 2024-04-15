import React from "react";
import styles from "./buttonTypes.module.css";
import Swal from "sweetalert2";
import { colorTipos } from "@/utils/colorTypes";

export const ButtonsTypes = ({ setPokeType }) => {
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
    setPokeType(e.target.innerHTML);
    Swal.fire({
      background: `var(--${e.target.innerHTML})`,
      color: "#fff",
      padding: "1em",
      position: "top-right",
      showConfirmButton: false,
      timer: 2000,
      title: `${
        e.target.innerHTML[0].toUpperCase() + e.target.innerHTML.substring(1)
      } type!`,
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
              }}
              key={tipo}
            >
              {tipo}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default ButtonsTypes;
