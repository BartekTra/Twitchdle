import React from "react";

const Settings = React.forwardRef(({ onClick }, ref) => {
  return (
    <img
      ref={ref}
      src="/settingsicon.png"
      className="h-10 w-10 cursor-pointer self-center justify-self-center"
      alt="Ustawienia"
      onClick={onClick}
    />
  );
});

export default Settings;
