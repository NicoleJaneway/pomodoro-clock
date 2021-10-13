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
    <button id="clear" onClick={handleClick}>
      Clear Pomodoro Clock
    </button>
  );
}
