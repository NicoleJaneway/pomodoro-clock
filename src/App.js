import "./styles.css";
import React, { useState } from "react";

import Clock from "./Clock";
import EnvironmentContext from "./EnvironmentContext";
import PopupContext from "./PopupContext";
import SettingsButton from "./SettingsButton";

/*
TODO 
-  Refactor weirdness sessionLength vs. breakLength vs. initialLength
-  Popup to add task and put text before time left
-  Settings menu
   -  Gear button
   -  Toggle off dialogs
*/

export default function App() {
  const [showPopups, setShowPopups] = useState(true);

  return (
    <>
      <PopupContext.Provider value={showPopups}>
        <SettingsButton setShowPopups={setShowPopups} />
        <h1 className="mt-8 sm:mt-40">Pomodoro Clock</h1>
        <EnvironmentContext.Provider value="test">
          <Clock />
        </EnvironmentContext.Provider>
      </PopupContext.Provider>
    </>
  );
}
