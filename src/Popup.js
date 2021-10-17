import "./styles.css";
import React, { useEffect, useState } from "react";
import "react-edit-text/dist/index.css";

export default function Popup({handleClose, breakLength, setBreakLength}) {
  const handleClick = () => {
    setBreakLength(15)
    handleClose()
  }

  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={handleClose}>x</span>
        <>
          <p>Congratulations on finishing 4 pomodoros</p>
          <p>Would you like to take a 15 minute break?</p>
          <button onClick={handleClick}>Yes</button>
          <button onClick={handleClose}>No</button>
        </>
      </div>
    </div>
  );
};