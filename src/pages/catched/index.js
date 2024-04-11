import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Flex, Container, Stack, Skeleton } from "@chakra-ui/react";
import CatchedTable from "../../components/table/Table";
import style from "../../components/table/table.module.css";

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

  if (isLoading) {
    return (
      <Flex alignItems="center" minH="100vh" justifyContent="center">
        <Container maxW="container.lg">
          <div className={style.tableContainer}>
            <Stack>
              {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton key={index} height="100px" />
              ))}
            </Stack>
          </div>
        </Container>
      </Flex>
    );
  }

  return <>{<CatchedTable listCatched={listCatched} />}</>;
};

export default index;
