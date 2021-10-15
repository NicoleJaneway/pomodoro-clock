import "./styles.css";
import React from "react";

import Clock from "./Clock";

/*
TODO 
-  Refactor weirdness sessionLength vs. breakLength vs. initialLength
-  Set up a test mode for the app:
   - Session length: 1
   - Break length: 2
   - Session time: 2 seconds
   - Break time: 4 seconds
   - Confetti: every 2 sessions
-  Versus prod mode:
   - Session length: 25
   - Break length: 5
   - Session time: 25 minutes
   - Break time: 5 minutes
   - Confetti: every 2 sessions
-  Popup on 4th session to ask user about a 15 min. break
*/

export default function App() {
  return (
    <>
      <h1>Pomodoro Clock</h1>
      <Clock />
    </>
  );
}
