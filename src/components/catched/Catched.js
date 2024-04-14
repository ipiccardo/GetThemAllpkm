import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import Table from "./table/Table";

const CatchedTable = ({ listCatched }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (listCatched) {
      setIsLoading(false);
    }
  }, [listCatched]);

  return (
    <>
      <Table listCatched={listCatched} />
    </>
  );
};

export default CatchedTable;
