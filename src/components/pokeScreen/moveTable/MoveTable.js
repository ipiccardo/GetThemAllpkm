import React, { useState, useEffect } from "react";
import axios from "axios";
import MoveTableData from "./MoveTableData";
import { Box, Skeleton } from "@chakra-ui/react";

const MoveTable = ({ moves }) => {
  const [urlArrayMoves, setUrlArrayMoves] = useState([]);
  const [moveData, setMoveData] = useState([]);
  const [learnedMethod, setLearnedMethod] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const urls = moves?.map(({ move: { url } }) => url);
    setUrlArrayMoves(urls);
  }, [moves]);

  useEffect(() => {
    if (!urlArrayMoves || urlArrayMoves.length === 0) return;
    const fetchMoveData = async () => {
      try {
        const responses = await Promise.all(
          urlArrayMoves.map((url) => axios.get(url))
        );
        const moveData = responses.map((response) => response.data);
        setMoveData(moveData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching move data:", error);
      }
    };
    fetchMoveData();
  }, [urlArrayMoves]);

  useEffect(() => {
    if (!moves) return;
    const newLearnedMethod = moves.map((move) => {
      const lastVersionDetails =
        move.version_group_details[move.version_group_details.length - 1];
      return {
        name: move.move.name,
        level: lastVersionDetails ? lastVersionDetails.level_learned_at : "",
        method: lastVersionDetails
          ? lastVersionDetails.move_learn_method.name
          : "",
      };
    });
    setLearnedMethod(newLearnedMethod);
  }, [moves]);

  if (loading) {
    return <Skeleton width={"100%"} height={"100vh"} />;
  }

  const orderedMoveData = moveData.sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { ignorePunctuation: true })
  );

  const orderedLearnedMethod = learnedMethod.sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { ignorePunctuation: true })
  );

  const moveFinalData = orderedMoveData.map((item, i) => ({
    ...item,
    ...orderedLearnedMethod[i],
  }));

  const orderedMoveByLevel = moveFinalData.sort((a, b) => a.level - b.level);

  const orderedMoveFinalData = orderedMoveByLevel.sort((a, b) =>
    a.method.localeCompare(b.method, undefined, { ignorePunctuation: true })
  );

  return (
    <Box>
      <MoveTableData
        moveData={moveData}
        learnedMethod={learnedMethod}
        orderedMoveData={orderedMoveFinalData}
      />
    </Box>
  );
};

export default MoveTable;
