import "./styles.css";
import React, { useState, useEffect, useRef } from "react";

import ConfettiWrapper from "./ConfettiWrapper";
import ClearClock from "./ClearClock";
import Controls from "./Controls";
import SetTimer from "./SetTimer";
import TimerDisplay from "./TimerDisplay";

export default function Clock() {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [countdownTime, setCountdownTime] = useState(sessionLength * 60 * 1000);
  const [active, setActive] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const [sessionCounter, setSessionCounter] = useState(0);
  const completedSessionCounter = Math.ceil(sessionCounter / 2);
  const audioRef = useRef();

  let initialTime = (isSession ? sessionLength : breakLength) * 60 * 1000;

  useEffect(() => {
    setCountdownTime(initialTime);
  }, [sessionLength, breakLength]);

  if (countdownTime === 0) {
    setCountdownTime((isSession ? breakLength : sessionLength) * 60 * 1000);
    setSessionCounter((prev) => prev + 1);
    setIsSession(!isSession);
  }

  return (
    <>
      <div className="set-timer-container">
        <SetTimer
          type="Session"
          length={sessionLength}
          setLength={setSessionLength}
        />
        <SetTimer
          type="Break"
          length={breakLength}
          setLength={setBreakLength}
        />
      </div>
      <div className="pomodoro">
        <TimerDisplay
          type={isSession ? "Session" : "Break"}
          countdownTime={countdownTime}
        />
        <ConfettiWrapper completedSessionCounter={completedSessionCounter} />
        <Controls
          countdownTime={countdownTime}
          setCountdownTime={setCountdownTime}
          active={active}
          setActive={setActive}
          initialTime={initialTime}
          sessionCounter={sessionCounter}
          sessionLength={sessionLength}
          breakLength={breakLength}
          isSession={isSession}
          setIsSession={setIsSession}
          audioRef={audioRef}
        />
      </div>
      <p className="session-count">
        Sessions completed: {completedSessionCounter}
      </p>
      <ClearClock
        setCountdownTime={setCountdownTime}
        setIsSession={setIsSession}
        sessionLength={sessionLength}
        setActive={setActive}
        setSessionCounter={setSessionCounter}
        audioRef={audioRef}
        setSessionLength={setSessionLength}
        setBreakLength={setBreakLength}
      />
    </>
  );
}
