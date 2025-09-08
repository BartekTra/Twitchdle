import React, { useState, useRef, useEffect } from "react";
import Settings from "./Settings";
import SettingsMenu from "./SettingsMenu";

const Header = () => {
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const settingsRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        showSettingsMenu &&
        settingsRef.current &&
        !settingsRef.current.contains(event.target) &&
        !document.getElementById("settings-menu")?.contains(event.target)
      ) {
        setShowSettingsMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSettingsMenu]);

  return (
    <>
      <div className="grid min-h-full min-w-full grid-cols-[15%_70%_15%] grid-rows-1">
        <Settings
          onClick={() => setShowSettingsMenu((prev) => !prev)}
          ref={settingsRef}
        />

        <img src="/twitchdlelogocropped.png" className="w-full self-center" />

        <img
          src="/pudzianforloldle.png"
          className="h-full w-full self-center rounded-[4px]"
        />
      </div>

      {showSettingsMenu && (
        <SettingsMenu onClose={() => setShowSettingsMenu(false)} />
      )}
    </>
  );
};

export default Header;
