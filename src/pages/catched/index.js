import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Skeleton, useMediaQuery } from "@chakra-ui/react";
import CatchedTable from "../../components/catched/table/Table";
import Cards from "@/components/catched/cards/Cards";
import ErrorBoundary from "@/components/errorHandler/ErrorBoundary";

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
    return (
      <>
        {
          <ErrorBoundary>
            <Skeleton isLoaded={!isLoading}>
              <Cards listCatched={listCatched} />
            </Skeleton>
          </ErrorBoundary>
        }
      </>
    );
  }

  return (
    <>
      {
        <ErrorBoundary>
          <Skeleton isLoaded={!isLoading}>
            <CatchedTable listCatched={listCatched} />
          </Skeleton>
        </ErrorBoundary>
      }
    </>
  );
};

export default Page;
