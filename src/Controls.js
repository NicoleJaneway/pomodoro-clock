import "./styles.css";
import React, { useState, useEffect, useContext } from "react";
import PopupContext from "./PopupContext";
import TaskPopup from "./TaskPopup";

export default function Controls({
  countdownTime,
  setCountdownTime,
  active,
  setActive,
  initialTime,
  sessionCounter,
  sessionLength,
  breakLength,
  isSession,
  setIsSession,
  audioRef
}) {
  const [isOpen, setIsOpen] = useState(false);
  const popups = useContext(PopupContext);

  // Timer function
  useEffect(() => {
    let timer = 0;
    launchPopup();
    if (active && countdownTime >= 1000)
      timer = setTimeout(() => setCountdownTime((prev) => prev - 1000), 1000);
    return () => clearTimeout(timer);
  }, [countdownTime, active]);

  useEffect(() => {
    if (sessionCounter > 0) audioRef.current.play();
  }, [sessionCounter]);

  const handleToggleClick = () => {
    setActive(!active);
  };

  const handleResetClick = () => {
    setActive(false);
    setCountdownTime(initialTime);
    audioRef.current.pause();
    audioRef.current.load();
  };

  const handleNextClick = () => {
    setIsSession(!isSession);
    setCountdownTime((isSession ? breakLength : sessionLength) * 60 * 1000);
  };

  const launchPopup = () => {
    if (active && isSession && popups && countdownTime === initialTime) {
      setIsOpen(true);
      const timer = setTimeout(() => setIsOpen(false), 45000);
      return clearTimeout(timer);
    }
  };

  return (
    <>
      <div className="controls">
        <button id="start_stop" onClick={handleToggleClick}>
          {active ? "⏸" : "▶️"}
        </button>
        <button id="reset" onClick={handleResetClick}>
          🔄
        </button>
        <button id="next" onClick={handleNextClick}>
          ⏭
        </button>
        <audio
          id="gong"
          src="https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Gongs%20and%20Super%20Crashes/1237[kb]kong-gong-long.wav.mp3"
          ref={audioRef}
        />
      </div>
      {isOpen && <TaskPopup handleClose={() => setIsOpen(!isOpen)} />}
    </>
  );
}
