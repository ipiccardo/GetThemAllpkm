import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Skeleton, useMediaQuery } from "@chakra-ui/react";
import Catched from "../../components/catched/Catched";
import CatchedResponsive from "@/components/catched/CatchedResponsive";

const Page = () => {
  const [listCatched, setListCatched] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isSmallScreen] = useMediaQuery("(max-width: 766px)");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`api/catched/`)
      .then((res) => {
        setListCatched(res.data);
        setIsLoading(false);
      })

      .catch((error) => {
        console.error("Error al llamar a la API:", error);
      });
  }, []);

  if (isSmallScreen) {
    return <>{<CatchedResponsive listCatched={listCatched} />}</>;
  }

  return <>{<Catched listCatched={listCatched} />}</>;
};

export default Page;
