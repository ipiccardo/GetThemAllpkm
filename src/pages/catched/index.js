import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import CatchedTable from "../../components/table/Table";
import MyLoader from "@/components/loader/Skeletons";

const index = () => {
  const [listCatched, setListCatched] = useState();
  const [isLoading, setIsLoading] = useState(false);

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

  return <>{!isLoading && <CatchedTable listCatched={listCatched} />}</>;
};

export default index;
