import "./styles.css";
import React from "react";
import "react-edit-text/dist/index.css";

export default function LongBreakPopup({
  handleClose,
  breakLength,
  setBreakLength
}) {
  const handleClick = () => {
    setBreakLength(15);
    handleClose();
    const timer = setTimeout(() => setBreakLength(breakLength), 15 * 60 * 1000);
    return clearTimeout(timer);
  };

  return (
    <div className="popup-box">
      <div className="box w-10/12 mt-80 m-auto sm:w-72 ">
        <span className="close-icon" onClick={handleClose}>
          x
        </span>
        <p className="text-center pb-2 ">
          Congratulations on
          <br />
          finishing 4 pomodoros
        </p>
        <hr />
        <p className="text-center pt-2 pb-4">
          Would you like to take a 15 minute break?
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="pom-btn set-break w-14" onClick={handleClick}>
            Yes
          </button>
          <button className="pom-btn set-break w-14 " onClick={handleClose}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}
