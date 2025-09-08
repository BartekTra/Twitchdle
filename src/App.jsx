import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./index.css";
import Header from "./assets/components/Header.jsx";
import InputField from "./assets/components/InputField.jsx";
import GuessedStreamers from "./assets/components/GuessedStreamers.jsx";
import GameOver from "./assets/components/GameOver.jsx";
function App() {
  const [correctStreamer, setCorrectStreamer] = useState(null);
  const [selectedStreamers, setSelectedStreamers] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleSetCorrectStreamer = (streamer) => {
    setCorrectStreamer(streamer);
  };

  const handleStreamerSelect = (name) => {
    setSelectedStreamers((prev) => {
      if (prev.includes(name)) return prev; // jeśli już jest, nie dodawaj
      return [...prev, name];
    });
  };

  return (
    <div className="flex h-max min-h-screen w-full flex-col items-center space-y-5 bg-[#513b83] pt-[1%]">
      <header className="h-[20%] w-[50%]">
        <Header />
      </header>
      {!isGameOver && (
        <InputField
          onStreamerSelect={handleStreamerSelect}
          selectedStreamers={selectedStreamers}
          setCorrectStreamer={handleSetCorrectStreamer}
          correctStreamer={correctStreamer}
        />
      )}
      <GuessedStreamers
        guessed={selectedStreamers}
        correctStreamer={correctStreamer}
      />
      <GameOver
        guessedStreamers={selectedStreamers}
        correctStreamer={correctStreamer}
        setIsGameOver={setIsGameOver}
      />
    </div>
  );
}

export default App;
