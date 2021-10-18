import React, { useContext } from "react";
import PopupContext from "./PopupContext";

export default function Popup({ handleClose, setShowPopups }) {
  const popups = useContext(PopupContext);
  return (
    <div className="popup-box">
      <div className="box w-10/12 mt-28 m-auto sm:w-72 ">
        <span className="settings-close-icon" onClick={handleClose}>
          x
        </span>
        <h2 className="text-center pb-1">Settings</h2>
        <label>
          <input
            name="popupToggle"
            type="checkbox"
            checked={popups}
            onChange={() => setShowPopups(!popups)}
          />
          <span className="pl-3">Show dialogs</span>
        </label>
      </div>
    </div>
  );
}
