import "./styles.css";
import React, { useEffect } from "react";
import "react-edit-text/dist/index.css";
import { EditText } from "react-edit-text";

export default function TaskPopup({ setIsOpen, setTask, task }) {
  useEffect(() => {
    console.log(task);
  }, [task]);

  const handleClick = () => {
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setTask("");
  };

  const handleSave = ({ value }) => {
    setTask(value);
  };

  return (
    <div className="popup-box">
      <div className="box w-10/12 mt-80 m-auto sm:w-72 sm:top-1/3 sm:mt-0">
        <span className="close-icon" onClick={handleClose}>
          x
        </span>
        <p className="text-center pb-2 ">
          Would you like to set <br/>a task for this session?
        </p>
        <div className="pb-4">
          <label>
            <EditText style={{ background: "#efefef" }} onSave={handleSave} />
          </label>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="pom-btn set-break w-14" onClick={handleClick}>
            Done
          </button>
          <button className="pom-btn set-break w-14 " onClick={handleClose}>
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}
