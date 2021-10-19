import "./styles.css";
import React, { useState, useEffect, useRef, useContext } from "react";

import LongBreakWrapper from "./LongBreakWrapper";
import ClearClock from "./ClearClock";
import Controls from "./Controls";
import SetTimer from "./SetTimer";
import TimerDisplay from "./TimerDisplay";
import EnvironmentContext from "./EnvironmentContext";

const prodSettings = {
  sessionLength: 25,
  breakLength: 5,
  numberOfSeconds: 60,
  confettiInterval: 4
};

const testSettings = {
  sessionLength: 1,
  breakLength: 2,
  numberOfSeconds: 2,
  confettiInterval: 2
};

export default function Clock() {
  const environment = useContext(EnvironmentContext);
  const settings = environment === "production" ? prodSettings : testSettings;

  const [sessionLength, setSessionLength] = useState(settings.sessionLength);
  const [breakLength, setBreakLength] = useState(settings.breakLength);
  const [countdownTime, setCountdownTime] = useState(
    sessionLength * settings.numberOfSeconds * 1000
  );
  const [active, setActive] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const [sessionCounter, setSessionCounter] = useState(0);
  const completedSessionCounter = Math.ceil(sessionCounter / 2);
  const [task, setTask] = useState("");

  const audioRef = useRef();

  let initialTime =
    (isSession ? sessionLength : breakLength) * settings.numberOfSeconds * 1000; // fix

  useEffect(() => {
    setCountdownTime(initialTime);
  }, [sessionLength, breakLength]);

  if (countdownTime === 0) {
    setCountdownTime(
      (isSession ? breakLength : sessionLength) *
        settings.numberOfSeconds *
        1000
    );
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
            task={task}
          />
          <div className="center">
            <LongBreakWrapper
              completedSessionCounter={completedSessionCounter}
              breakLength={breakLength}
              setBreakLength={setBreakLength}
              confettiInterval={settings.confettiInterval}
            />
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
            setTask={setTask}
            task={task}
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
        setTask={setTask}
      />
    </>
  );
}
