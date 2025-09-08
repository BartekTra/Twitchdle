import React, { useEffect, useState } from "react";
import HintAttributesSquare from "./HintAttributesSquare";
const HintAttributes = ({ guessedStreamers, correctStreamer }) => {
  const [stats, setStats] = useState({
    avgViewers: { min: null, max: null },
    activeSubs: { min: null, max: null },
    peakViewers: { min: null, max: null },
    totalFollowers: { min: null, max: null },
    gender: "",
    top1Game: "",
    top2Game: "",
    top3Game: "",
  });

  useEffect(() => {
    const lastGuessedStreamer = guessedStreamers[guessedStreamers.length - 1];
    
    const getMinMax = (key) => {
      if (guessedStreamers.length > 0) {
        const lastGuessedStreamerInt = Number(lastGuessedStreamer[key]);
        const correctStreamerInt = Number(correctStreamer[key]);

        // Poprawny guess
        if (lastGuessedStreamerInt == correctStreamerInt) {
          return { max: lastGuessedStreamerInt, min: lastGuessedStreamerInt };
        }

        // Wartość ostatniego guess'a ponad wartością poprawnego streamer'a
        if (lastGuessedStreamerInt > correctStreamerInt) {
          // Brak zapisanej najwyższej odgadniętej wartości, automatyczne przypisanie wartości ostatniego guess'a do najwyższej odkrytej wartości
          if (stats[key].max == null) {
            return { max: lastGuessedStreamerInt, min: stats[key].min };
          }

          // Wartość ostatniego guess'a wyższy od poprawnego streamer'a i niższa od najwyższej odkrytej wartości
          if (lastGuessedStreamerInt < stats[key].max) {
            return { min: stats[key].min, max: lastGuessedStreamerInt };
          } else {
            // Brak działania - wartość ostatniego guess'a wyższa od obu wartości
            return { min: stats[key].min, max: stats[key].max };
          }
        }

        // wartość ostatniego guess'a niższa od wartości poprawnego streamer'a
        if (lastGuessedStreamerInt < correctStreamerInt) {
          // wartość najniższego guess'a nie była wcześniej przypisana - przypisujemy automatycznie wartość ostatniego
          if (stats[key].min == null) {
            return { min: lastGuessedStreamerInt, max: stats[key].max };
          }

          // ...kumasz dalej
          if (lastGuessedStreamerInt > stats[key].min) {
            return { min: lastGuessedStreamerInt, max: stats[key].max };
          } else {
            return { min: stats[key].min, max: stats[key].max };
          }
        }
      }

      return { min: stats[key].min, max: stats[key].max };
    };

    const getOtherStats = (key, stats) => {
      if (guessedStreamers.length >= 1) {
        if (
          guessedStreamers[guessedStreamers.length - 1][key] ===
          correctStreamer[key]
        ) {
          return guessedStreamers[guessedStreamers.length - 1][key];
        } else {
          return stats[key];
        }
      }
    };

    setStats((prevStats) => ({
      avgViewers: getMinMax("avgViewers", prevStats),
      activeSubs: getMinMax("activeSubs", prevStats),
      peakViewers: getMinMax("peakViewers", prevStats),
      totalFollowers: getMinMax("totalFollowers", prevStats),

      gender: getOtherStats("gender", prevStats),
      top1Game: getOtherStats("top1Game", prevStats),
      top2Game: getOtherStats("top2Game", prevStats),
      top3Game: getOtherStats("top3Game", prevStats),
    }));
  }, [guessedStreamers]);

  function getStatDisplay(statMin, statMax, key) {
    if (correctStreamer[key] === "noData"){
      return "No data :("
    }
    if (statMin == statMax && statMin != null && statMax != null) {
      return `${statMin}`;
    }
    if (statMin == null && statMax != null) {
      return `<${statMax}`;
    }
    if (statMax == null && statMin != null) {
      return `>${statMin}`;
    }
    if (statMin != null && statMax != null) {
      return `${statMin} - ${statMax}`;
    }
    if (statMin == null && statMax == null) {
      return "empty";
    }
  }

  function getOneValueStatDisplay(stat, key) {
    if (stat == 6 || stat == 7 || stat == 8) {
      console.log("Why not");

      return "No data :(";
    }

    if (stat == correctStreamer[key]) {
      return stat;
    } else {
      return "empty";
    }
  }

  if (!correctStreamer) return <p> LoadingXD </p>;
  return (
    <div className="flex flex-row">
      <HintAttributesSquare value={"empty"} />
      <HintAttributesSquare value={"empty"} />
      <HintAttributesSquare
        value={getStatDisplay(stats.avgViewers.min, stats.avgViewers.max, "avgViewers")}
      />
      <HintAttributesSquare
        value={getStatDisplay(stats.peakViewers.min, stats.peakViewers.max, "peakViewers")}
      />
      <HintAttributesSquare
        value={getStatDisplay(stats.totalFollowers.min,stats.totalFollowers.max, "totalFollowers")}
      />
      <HintAttributesSquare
        value={getOneValueStatDisplay(stats.gender, "gender")}
      />
      <HintAttributesSquare
        value={getStatDisplay(stats.activeSubs.min, stats.activeSubs.max, "activeSubs")}
      />
      <HintAttributesSquare
        value={getOneValueStatDisplay(stats.top1Game, "top1Game")}
      />
      <HintAttributesSquare
        value={getOneValueStatDisplay(stats.top2Game, "top2Game")}
      />
      <HintAttributesSquare
        value={getOneValueStatDisplay(stats.top3Game, "top3Game")}
      />
    </div>
  );
};

export default HintAttributes;
