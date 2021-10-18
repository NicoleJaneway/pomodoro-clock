import "./styles.css";
import React from "react";

import Clock from "./Clock";
import EnvironmentContext from "./EnvironmentContext";
import PopupContext from "./PopupContext";
import SettingsButton from "./SettingsButton";

/*
TODO 
-  Refactor weirdness sessionLength vs. breakLength vs. initialLength
-  Rename confettiWrapper?
-  Popup to add task and put text before time left
-  Settings menu
   -  Gear button
   -  Toggle off dialogs
*/

export default function App() {
  return (
    <>
      <SettingsButton />
      <h1 className="mt-8 sm:mt-40">Pomodoro Clock</h1>
      <PopupContext.Provider value="show">
        <EnvironmentContext.Provider value="test">
          <Clock />
        </EnvironmentContext.Provider>
      </PopupContext.Provider>
    </>
  );
}
