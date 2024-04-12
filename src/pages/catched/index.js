import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Skeleton } from "@chakra-ui/react";
import CatchedTable from "../../components/table/Table";

const Page = ({ initialData }) => {
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

  return (
    <>
      {
        <Skeleton isLoaded={!isLoading}>
          <CatchedTable listCatched={listCatched} />
        </Skeleton>
      }
    </>
  );
};

export async function getServerSideProps() {
  try {
    const response = await axios.get(`api/catched/`);
    const initialData = response.data;
    return { props: { initialData } };
  } catch (error) {
    console.error("Error fetching initial data:", error);
    return { props: { initialData: [] } };
  }
}

export default Page;
