import "./styles.css";
import React, { useEffect } from "react";

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
  // Timer function
  useEffect(() => {
    let timer = 0;
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
    </>
  );
}
