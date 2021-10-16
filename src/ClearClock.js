import "./styles.css";
import React from "react";

export default function ClearClock({
  setCountdownTime,
  setIsSession,
  sessionLength,
  setActive,
  setSessionCounter,
  audioRef,
  setSessionLength,
  setBreakLength
}) {
  const handleClick = () => {
    setActive(false);
    setIsSession(true);
    setSessionLength(25);
    setBreakLength(5);
    setCountdownTime(sessionLength * 60 * 1000);
    setSessionCounter(0);
    audioRef.current.pause();
    audioRef.current.load();
  };

  return (
    <button id="clear" className="bg-transparent hover:bg-gray-500 text-grey-700 font-semibold hover:text-white py-1 px-4 mt-10 border border-gray-500 hover:border-transparent rounded" onClick={handleClick}>
      Clear Pomodoro Clock
    </button>
  );
}
