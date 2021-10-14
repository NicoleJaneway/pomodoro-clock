import "./styles.css";
import React, {useEffect, useState} from "react";
import { EditText } from "react-edit-text";
import "react-edit-text/dist/index.css";

/*
TODO:
-  Prevent set-time from ever being undefined
*/

export default function SetTimer({ type, length, setLength }) {
  const [newLength, setNewLength] = useState(length)
  const incrementTimer = () => {
    setLength((prev) => prev + 1);
  };

  const decrementTimer = () => {
    if (length > 1) setLength((prev) => prev - 1);
  };

  const handleSave = ({newLength}) => {
    setLength(newLength)
  }

  return (
    <>
      <div className="set-timer">
        <p id={type.toLowerCase() + "-label"}>{type} Length</p>
        <button id={type.toLowerCase() + "-increment"} onClick={incrementTimer}>
          ⬆️
        </button>
        <p id={type.toLowerCase() + "-length"} style={{ display: "inline" }}>
          {length + " min."}
        </p>
        <button id={type.toLowerCase() + "-decrement"} onClick={decrementTimer}>
          ⬇️
        </button>

        <button id={type.toLowerCase() + "-increment"} onClick={incrementTimer}>
          ⬆️
        </button>
        <EditText
          style={{ display: "inline", width: "15px" }}
          value={newLength}
          onChange={setNewLength}
          onSave={handleSave}
        />
        <p style={{ display: "inline" }}> min.</p>
        <button id={type.toLowerCase() + "-decrement"} onClick={decrementTimer}>
          ⬇️
        </button>
      </div>
    </>
  );
}
