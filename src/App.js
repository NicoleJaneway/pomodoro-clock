import "./styles.css";
import React, { useState, useEffect, useRef } from "react";
import ConfettiExplosion from "@reonomy/react-confetti-explosion";

/*TODO:
-  Materialize icons
-  Click into session length to edit it
-  Confetti after four sessions (import ConfettiExplosion from "@reonomy/react-confetti-explosion";) */

export default function App() {
  return (
    <>
      <h1>Pomodoro Clock</h1>
      <Clock />
    </>
  );
}

const Clock = () => {
  const [sessionLength, setSessionLength] = useState(1);
  const [breakLength, setBreakLength] = useState(1);
  const [countdownTime, setCountdownTime] = useState(sessionLength * 3 * 1000);
  const [active, setActive] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const [sessionCounter, setSessionCounter] = useState(0);
  const completedSessionCounter = Math.ceil(sessionCounter / 2);

  let initialTime = (isSession ? sessionLength : breakLength) * 3 * 1000;

  useEffect(() => {
    setCountdownTime(initialTime);
  }, [sessionLength, breakLength]);

  if (countdownTime === 0) {
    setCountdownTime((isSession ? breakLength : sessionLength) * 3 * 1000);
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
        <p className="session-count">
          Completed session count: {completedSessionCounter}
        </p>
        <TimerDisplay
          type={isSession ? "Session" : "Break"}
          countdownTime={countdownTime}
        />
        <Controls
          countdownTime={countdownTime}
          setCountdownTime={setCountdownTime}
          active={active}
          setActive={setActive}
          initialTime={initialTime}
          sessionCounter={sessionCounter}
        />
        <ConfettiWrapper completedSessionCounter={completedSessionCounter} />
      </div>
    </>
  );
};

const SetTimer = ({ type, length, setLength }) => {
  const incrementTimer = () => {
    setLength((prev) => prev + 1);
  };

  const decrementTimer = () => {
    if (length > 1) setLength((prev) => prev - 1);
  };

  return (
    <>
      <div className="set-timer">
        <p id={type.toLowerCase() + "-label"}>{type} Length</p>
        <button id={type.toLowerCase() + "-increment"} onClick={incrementTimer}>
          ⬆️
        </button>
        <p id={type.toLowerCase() + "-length"} style={{ display: "inline" }}>
          {length}
        </p>
        <button id={type.toLowerCase() + "-decrement"} onClick={decrementTimer}>
          ⬇️
        </button>
      </div>
    </>
  );
};

const TimerDisplay = ({ type, countdownTime }) => {
  const convert = (ms) => {
    let seconds = Math.floor((ms / 1000) % 60);
    let minutes = Math.floor((ms / (1000 * 60)) % 60);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
  };

  return (
    <>
      <div className="timer-display">
        <h3 id="timer-label">{type}</h3>
        <p id="description">time left</p>
        <p id="time-left">{convert(countdownTime)}</p>
      </div>
    </>
  );
};

const Controls = ({
  countdownTime,
  setCountdownTime,
  active,
  setActive,
  initialTime,
  sessionCounter
}) => {
  const audioRef = useRef();

  useEffect(() => {
    let timer = 0;
    if (active && countdownTime >= 1000)
      timer = setTimeout(() => setCountdownTime((prev) => prev - 1000), 1000);
    return () => clearTimeout(timer);
  }, [countdownTime, active]);

  useEffect(() => {
    if (sessionCounter > 0) audioRef.current.play();
  }, [sessionCounter]);

  const handleToggleClick = () => {
    setActive(!active);
  };

  const handleResetClick = () => {
    setActive(false);
    setCountdownTime(initialTime);
    audioRef.current.pause();
    audioRef.current.load();
  };

  return (
    <>
      <div className="controls">
        <button id="start_stop" onClick={handleToggleClick}>
          {active ? "pause" : "play"}
        </button>
        <button id="reset" onClick={handleResetClick}>
          reset
        </button>
        <audio
          id="gong"
          src="https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Gongs%20and%20Super%20Crashes/1237[kb]kong-gong-long.wav.mp3"
          ref={audioRef}
        />
      </div>
    </>
  );
};

function ConfettiWrapper({ completedSessionCounter }) {
  const [showingConfetti, setShowingConfetti] = useState(false);

  useEffect(() => {
    if (completedSessionCounter > 0 && completedSessionCounter % 4 === 0) {
      setShowingConfetti(true);
    }
  });

  if (completedSessionCounter % 4 === 3 && showingConfetti) {
    setShowingConfetti(false);
  }

  return <>{showingConfetti && <Confetti />}</>;
}

const Confetti = React.memo(() => {
  return <ConfettiExplosion />;
});
