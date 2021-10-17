import "./styles.css";
import React from "react";

export default function TimerDisplay({ type, countdownTime }) {
  const convert = (ms) => {
    let seconds = Math.floor((ms / 1000) % 60);
    let minutes = Math.floor(ms / (1000 * 60));

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
  };

  return (
    <>
      <div className="timer-display">
        <p id="timer-label" className="text-xl">
          {type}
        </p>
        <p id="description">time left</p>
        <p id="time-left">{convert(countdownTime)}</p>
      </div>
    </>
  );
}
