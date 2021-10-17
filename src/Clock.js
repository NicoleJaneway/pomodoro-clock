import "./styles.css";
import React, { useState, useEffect, useRef } from "react";

import ConfettiWrapper from "./ConfettiWrapper";
import ClearClock from "./ClearClock";
import Controls from "./Controls";
import SetTimer from "./SetTimer";
import TimerDisplay from "./TimerDisplay";

export default function Clock() {
  const [sessionLength, setSessionLength] = useState(1);
  const [breakLength, setBreakLength] = useState(2);
  const [countdownTime, setCountdownTime] = useState(sessionLength * 2 * 1000);
  const [active, setActive] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const [sessionCounter, setSessionCounter] = useState(0);
  const completedSessionCounter = Math.ceil(sessionCounter / 2);
  const audioRef = useRef();

  let initialTime = (isSession ? sessionLength : breakLength) * 2 * 1000; // fix

  useEffect(() => {
    setCountdownTime(initialTime);
  }, [sessionLength, breakLength]);

  if (countdownTime === 0) {
    setCountdownTime((isSession ? breakLength : sessionLength) * 2 * 1000);
    setSessionCounter((prev) => prev + 1);
    setIsSession(!isSession);
  }

  return (
    <>
      <div className="set-timer-container sm:flex sm:justify-center">
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
      <div className="flex justify-center">
        <div className="pomodoro mr-4 ml-4 mb-4 p-2 w-screen sm:w-80">
          <TimerDisplay
            type={isSession ? "Session" : "Break"}
            countdownTime={countdownTime}
          />
          <div className="center">
            <ConfettiWrapper 
              completedSessionCounter={completedSessionCounter}
              setBreakLength={setBreakLength} />
          </div>
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
      </div>
      <p className="session-count mb-2">
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
