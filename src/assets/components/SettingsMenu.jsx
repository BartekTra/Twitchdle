import { useEffect } from "react";

const SettingsMenu = ({ onClose }) => {
  useEffect(() => {
    function createPlayer() {
      new window.YT.Player("yt-player", {
        videoId: "KSPxHniCtmw",
        playerVars: {
          autoplay: 1,
          controls: 1,
        },
        events: {
          onReady: (event) => {
            event.target.setVolume(10);
            event.target.playVideo();
          },
        },
      });
    }

    // Jeśli API jeszcze nie istnieje → doładuj i poczekaj
    if (!window.YT) {
      if (!document.getElementById("youtube-iframe-api")) {
        const tag = document.createElement("script");
        tag.id = "youtube-iframe-api";
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
      }
      window.onYouTubeIframeAPIReady = () => createPlayer();
    } else {
      // Jeśli API już gotowe → twórz playera od razu
      createPlayer();
    }
  }, []);

  return (
    <div
      id="settings-menu"
      className="fixed top-1/2 left-1/2 h-[60vh] w-[60vw] -translate-x-1/2 -translate-y-1/2 z-50"
    >
      <div className="relative h-full w-full">
        <div
          id="yt-player"
          className="absolute top-0 left-0 w-full h-full"
        ></div>
      </div>
    </div>
  );
};

export default SettingsMenu;
