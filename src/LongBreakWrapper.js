import "./styles.css";
import React, { useState, useEffect, useContext } from "react";
import ConfettiExplosion from "@reonomy/react-confetti-explosion";
import LongBreakPopup from "./LongBreakPopup.js";
import PopupContext from "./PopupContext";

export default function ConfettiWrapper({
  completedSessionCounter,
  breakLength,
  setBreakLength,
  confettiInterval
}) {
  const [showingConfetti, setShowingConfetti] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const popups = useContext(PopupContext);

  // show confetti
  useEffect(() => {
    if (
      completedSessionCounter > 0 &&
      completedSessionCounter % confettiInterval === 0
    ) {
      setShowingConfetti(true);
    }

    if (
      completedSessionCounter % confettiInterval === confettiInterval - 1 &&
      showingConfetti
    ) {
      setShowingConfetti(false); // Prime confetti explosion
    }
  });

  // show popup
  useEffect(() => {
    if (showingConfetti === true) {
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [showingConfetti]);

  return (
    <>
      {showingConfetti && <Confetti />}
      {isOpen && popups && (
        <LongBreakPopup
          handleClose={() => setIsOpen(!isOpen)}
          setBreakLength={setBreakLength}
          breakLength={breakLength}
        />
      )}
    </>
  );
}

const Confetti = React.memo(() => {
  return <ConfettiExplosion />;
});
