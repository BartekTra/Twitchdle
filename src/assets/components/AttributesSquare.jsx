import React from "react";
import "../../index.css";
import { motion, AnimatePresence, easeOut } from "framer-motion";

const AttributesSquare = ({
  value,
  keyValue,
  correctAttribute,
  isAttributeCorrect,
  shouldAnimate = true, // Nowy prop do kontroli animacji
}) => {
  if (keyValue === "avatarFileName") {
    return (
      <img
        src={`/streamersAvatars/${value}`}
        className="border-twitchPurpleLight bg-twitchPurpleDark mt-2 h-[100px] w-[100px] border-2"
      ></img>
    );
  }

  function whatColor(isAttributeCorrect, value) {
    if (value === "noData") {
      return "bg-black";
    }
    if (isAttributeCorrect) {
      return "bg-green-600";
    } else {
      return "bg-red-600";
    }
  }

  function checkIfDataExists(value) {
    if (value == "noData") {
      return "No Data :(";
    } else {
      return value;
    }
  }

  return (
    <motion.div
      variants={{
        hidden: shouldAnimate ? { y: -20, opacity: 0 } : { y: 0, opacity: 1 },
        visible: { y: 0, opacity: 1 },
      }}
      transition={{
        duration: shouldAnimate ? 0.3 : 0, // Brak czasu trwania dla nieanimowanych
        ease: "easeOut",
      }}
      className={`bg-gray border-twitchPurpleLight h-[100px] w-[100px] border-2 ${whatColor(
        isAttributeCorrect,
        value,
      )} mt-2 flex items-center justify-center`}
    >
      <span style={{ fontSize: 'clamp(8px, 4vw, 16px)' }}>{checkIfDataExists(value)}</span>
    </motion.div>
  );
};

export default AttributesSquare;
