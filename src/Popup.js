import "./styles.css";
import React from "react";
import "react-edit-text/dist/index.css";

export default function Popup({ handleClose, breakLength, setBreakLength }) {
  const handleClick = () => {
    setBreakLength(15);
    handleClose();
    const timer = setTimeout(setBreakLength(breakLength), 15 * 60 * 1000);
    return clearTimeout(timer);
  };

  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={handleClose}>
          x
        </span>
        <>
          <p>Congratulations on finishing 4 pomodoros</p>
          <p>Would you like to take a 15 minute break?</p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className="pom-btn set-break" onClick={handleClick}>
              Yes
            </button>
            <button className="pom-btn set-break" onClick={handleClose}>
              No
            </button>
          </div>
        </>
      </div>
    </div>
  );
}
