import "./styles.css";
import React, { useEffect, useState } from "react";
import { EditText } from "react-edit-text";
import "react-edit-text/dist/index.css";

/*
TODO:
-  Prevent set-time from ever being undefined
*/

export default function SetTimer({ type, length, setLength }) {
  const [displayLength, setDisplayLength] = useState(length.toString());

  useEffect(() => {
    setDisplayLength(length.toString());
  }, [length]);

  if (type === "Session") console.log({ displayLength });

  const incrementTimer = () => {
    setLength((prev) => prev + 1);
  };

  const decrementTimer = () => {
    if (length > 1) setLength((prev) => prev - 1);
  };

  const handleChange = ({ value }) => {
    setDisplayLength(value);
    console.log("from handleChange: ", { value });
  };

  const handleSave = ({ value }) => {
    console.log("from handleSave: ", { value });
    const userInput = Number.parseInt(value, 10);
    console.log({ userInput });
    if (userInput > 0 && userInput <= 99) {
      setLength(userInput);
    }
  };

  return (
    <>
      <div className="set-timer">
        <p id={type.toLowerCase() + "-label"}>{type} Length</p>
        <button id={type.toLowerCase() + "-increment"} onClick={incrementTimer}>
          ⬆️
        </button>
        <EditText
          style={{ display: "inline", width: "15px" }}
          value={displayLength}
          onEditMode={() => setDisplayLength("")}
          onChange={handleChange}
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
