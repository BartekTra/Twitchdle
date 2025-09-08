import React from "react";

const HintAttributesSquare = ({ value }) => {
  if (value === "empty") {
    return (
      <div className="flex flex-row">
        <div className="mt-2 ml-2 h-[100px] w-[100px]"></div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-row">
        <div className="border-twitchPurpleLight mt-2 ml-2 h-[100px] w-[100px] border-2 flex items-center justify-center">
          <h1 className="text-white"> {value} </h1>
        </div>
      </div>
    );
  }
};

export default HintAttributesSquare;
