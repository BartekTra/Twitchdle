import React, { useEffect, useState } from "react";
import "../../index.css";

const InputField = ({
  onStreamerSelect,
  selectedStreamers,
  setCorrectStreamer,
  correctStreamer,
}) => {
  const [query, setQuery] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [streamers, setStreamers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  useEffect(() => {
    if (streamers.length > 0 && correctStreamer === null) {
      const randomStreamerInt = Math.floor(Math.random() * streamers.length);
      setCorrectStreamer(streamers[randomStreamerInt]);
    }
  }, [streamers]);

  //Zebranie danych z pliku JSON do stałej streamers
  useEffect(() => {
    async function fetchStreamers() {
      let responseInit = await fetch("/streamers.json");
      const responseData = await responseInit.json();
      setStreamers(
        responseData.sort((a, b) => {
          if (a.nickname > b.nickname) {
            return 1;
          }
          if (a.nickname < b.nickname) {
            return -1;
          }
        }),
      );
    }
    fetchStreamers();
  }, []);

  useEffect(() => {
    const value = query.toLowerCase();
    const results = streamers
      .filter(
        (streamer) =>
          streamer.nickname.toLowerCase().includes(value) &&
          !selectedStreamers.some((s) => s.nickname === streamer.nickname),
      )
      .sort(
        (a, b) =>
          a.nickname.toLowerCase().indexOf(value) -
          b.nickname.toLowerCase().indexOf(value),
      );

    setFiltered(results);
  }, [selectedStreamers, query, streamers]);

  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
  };

  const handleSelect = (streamer) => {
    onStreamerSelect(streamer);
    setQuery("");
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!isInputFocused) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filtered.length - 1 ? prev + 1 : 0,
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filtered.length - 1,
      );
    }

    if (e.key === "Enter" && filtered.length > 0) {
      e.preventDefault();
      if (highlightedIndex >= 0) {
        handleSelect(filtered[highlightedIndex]);
      } else {
        handleSelect(filtered[0]);
      }
    }
  };

  return (
    <div className="relative mt-[1%] h-[8%] w-[30%]">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setTimeout(() => setIsInputFocused(false), 100)}
        onKeyDown={handleKeyDown}
        placeholder="Szukaj streamera..."
        className="font-custom-regular bg-twitchBlack focus:border-twitchPurpleLight focus:ring-twitchPurpleLight h-full w-full rounded-[7px] border border-transparent px-2 text-2xl text-white focus:ring-1 focus:outline-none"
      />

      {isInputFocused && filtered.length > 0 && (
        <ul className="bg-twitchBlack border-twitchPurpleLight scrollbar scrollbar-thumb-twitchPurpleLight scrollbar-thumb-rounded-[3px] scrollbar-track-rounded-full absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-md border shadow">
          {filtered.map((streamer, index) => (
            <li
              key={streamer.nickname}
              onClick={() => handleSelect(streamer)}
              className={`font-custom-regular hover:bg-twitchPurpleLight max-h-60 cursor-pointer overflow-y-auto px-4 py-2 text-white ${
                index === highlightedIndex
                  ? "bg-twitchPurpleLight"
                  : "hover:bg-twitchPurpleLight"
              } `}
            >
              {streamer.nickname}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputField;
