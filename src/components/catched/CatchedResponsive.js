import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import Cards from "./cards/Cards";

const CatchedResponsive = ({ listCatched }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (listCatched) {
      setIsLoading(false);
    }
  }, [listCatched]);

  return (
    <>
      <Cards listCatched={listCatched} />
    </>
  );
};

export default CatchedResponsive;
