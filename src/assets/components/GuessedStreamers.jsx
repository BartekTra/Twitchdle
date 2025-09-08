import React, { useRef } from "react";
import { useState, useEffect } from "react";
import AttributesSquare from "./AttributesSquare";
import HintAttributes from "./HintAttributes";
import { motion } from "framer-motion";

const GuessedStreamers = ({ guessed, correctStreamer }) => {
  const [test, setTest] = React.useState([]);
  const [animationKey, setAnimationKey] = React.useState(0); // Klucz do resetowania animacji
  const [attributes] = useState([
    "Avatar",
    "Nickname",
    "Average Viewers",
    "Peak Viewers",
    "Total Followers",
    "Gender",
    "Active Subs",
    "Top 1 Game",
    "Top 2 Game",
    "Top 3 Game",
  ]);

  React.useEffect(() => {
    setTest(guessed);
    // Zwiększ klucz animacji za każdym razem gdy dodawany jest nowy streamer
    setAnimationKey(prev => prev + 1);
  }, [guessed]);

  function isAttributeCorrect(streamer, key, value) {
    if (streamer[key] === correctStreamer[key]) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="font-custom-regular mt-4 text-white">
      <h2 className="text-xl font-bold">Wybrani streamerzy:</h2>
      <div>
        <div className="flex">
          <HintAttributes
            guessedStreamers={guessed}
            correctStreamer={correctStreamer}
          />
        </div>
        <div className="mt-2 flex gap-x-2 gap-y-2">
          {attributes.map((idx, key) => (
            <p
              key={key}
              className="flex w-[100px] justify-center self-center px-1 text-center"
            >
              {idx}
            </p>
          ))}
        </div>
        {test.length > 0 &&
          test
            .slice()
            .reverse()
            .map((streamer, idx) => {
              // Sprawdź czy to najnowszy streamer (pierwszy w odwróconej liście)
              const isLatestStreamer = idx === 0;
              
              return (
                <div
                  key={`${streamer.nickname || idx}-${animationKey}`}
                  className={`flex gap-x-2 gap-y-2`}
                >
                  <img
                    src={`/streamersAvatars/${streamer.nickname}.jpeg`}
                    className="border-twitchPurpleLight mt-2 h-[100px] w-[100px] border-2"
                  />
                  <motion.div
                    key={`motion-${streamer.nickname || idx}-${animationKey}`}
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {},
                      visible: {
                        transition: { 
                          staggerChildren: isLatestStreamer ? 0.2 : 0, // Animacja tylko dla najnowszego
                        }, 
                      },
                    }}
                    className="flex gap-x-2 gap-y-2"
                  >
                    {Object.entries(streamer).map(([key, value]) => (
                      <AttributesSquare
                        key={`${key}-${animationKey}`}
                        keyValue={key}
                        value={value}
                        isAttributeCorrect={isAttributeCorrect(
                          streamer,
                          key,
                          value,
                        )}
                        shouldAnimate={isLatestStreamer}
                      />
                    ))}
                  </motion.div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default GuessedStreamers;