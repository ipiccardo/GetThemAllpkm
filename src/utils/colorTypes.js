export const colorTipos = (tipo) => {
  switch (tipo) {
    case "fighting":
      return "#944b41";
    case "bug":
      return "#a4ac4e";
    case "dark":
      return "#74645d";
    case "dragon":
      return "#8073c4";
    case "electric":
      return "#f2c443";
    case "fairy":
      return "#fab2fc";
    case "fire":
      return "#e84d25";
    case "flying":
      return "#b2b7ff";
    case "ghost":
      return "#5f5a91";
    case "grass":
      return "#89d861";
    case "ground":
      return "#cbb37d";
    case "ice":
      return "#58bdd1";
    case "normal":
      return "#a3a2a1";
    case "poison":
      return "#9e6890";
    case "psychic":
      return "#e884a6";
    case "rock":
      return "#c69e69";
    case "steel":
      return "#bbb8cc";
    case "water":
      return "#56a1f2";
    default:
      return "black";
  }
};
