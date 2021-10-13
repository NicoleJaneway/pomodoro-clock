import "./styles.css";
import React from "react";

export default function SetTimer({ type, length, setLength }) {
  const incrementTimer = () => {
    setLength((prev) => prev + 1);
  };

  const decrementTimer = () => {
    if (length > 1) setLength((prev) => prev - 1);
  };

  return (
    <>
      <div className="set-timer">
        <p id={type.toLowerCase() + "-label"}>{type} Length</p>
        <button id={type.toLowerCase() + "-increment"} onClick={incrementTimer}>
          ⬆️
        </button>
        <p id={type.toLowerCase() + "-length"} style={{ display: "inline" }}>
          {length}
        </p>
        <button id={type.toLowerCase() + "-decrement"} onClick={decrementTimer}>
          ⬇️
        </button>
      </div>
    </>
  );
}
