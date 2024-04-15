import * as React from "react";
import AbilityTableData from "./AbilityTableData";
import { useState, useEffect } from "react";
import axios from "axios";

const AbilityTable = ({ abilities }) => {
  const [urlArrayAbilities, setUrlArrayAbilities] = useState([]);
  const [abilitiesData, setAbilitiesData] = useState([]);
  const [hiddenAbility, setHiddenAbility] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const urls = abilities?.map(({ ability: { url } }) => url);
    setUrlArrayAbilities(urls);
  }, [abilities]);

  useEffect(() => {
    if (!urlArrayAbilities || urlArrayAbilities.length === 0) return;
    const fetchAbilitiesData = async () => {
      try {
        const responses = await Promise.all(
          urlArrayAbilities.map((url) => axios.get(url))
        );
        const abilitiesData = responses.map((response) => response.data);
        setAbilitiesData(abilitiesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching abilities data:", error);
      }
    };
    fetchAbilitiesData();
  }, [urlArrayAbilities]);

  useEffect(() => {
    if (!abilities) return; // Verificar si abilities es undefined
    const hidden = abilities.find((ability) => ability.is_hidden);
    setHiddenAbility(hidden ? hidden.ability.name : "");
  }, [abilities]);

  return (
    <>
      <AbilityTableData
        hiddenAbility={hiddenAbility}
        abilitiesData={abilitiesData}
      />
    </>
  );
};

export default AbilityTable;
