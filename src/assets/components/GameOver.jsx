import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../../index.css";


function GameOver({ guessedStreamers, correctStreamer, setIsGameOver }) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (
      guessedStreamers.length >= 1 &&
      guessedStreamers[guessedStreamers.length - 1] === correctStreamer
    ) {
      setShowModal(true);
      setIsGameOver(true);
    }
  }, [guessedStreamers]);

  const handleRestart = () => {
    window.location.reload();
  };

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[1px]"
          initial={{ opacity: 0 }} // tło niewidoczne
          animate={{ opacity: 1 }} // fade-in
          transition={{ duration: 2 }} // szybkość animacji tła
        >
          <motion.div
            initial={{ y: 400, opacity: 0 }} // start: poniżej ekranu
            animate={{ y: 0, opacity: 5 }} // animacja: na środek
            transition={{ duration: 2, ease: "easeOut" }}
            className="flex h-60 w-96 flex-col items-center justify-center rounded-[8px] bg-twitchPurpleDark border-2 border-twitchPurpleLight p-6 text-center shadow-lg"
          >
            <h2 className="mb-6 text-2xl font-bold text-twitchBlack">Gratulacje, wygrałeś!</h2>
            <button
              onClick={handleRestart}
              className="rounded-[8px] bg-twitchBlack border-2 border-twitchWhite px-6 py-3 text-white transition hover:bg-twitchPurpleDark"
            >
              Restart
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default GameOver;
