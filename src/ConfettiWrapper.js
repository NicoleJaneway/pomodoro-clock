import "./styles.css";
import React, { useState, useEffect } from "react";
import ConfettiExplosion from "@reonomy/react-confetti-explosion";
import Popup from "./Popup.js";

export default function ConfettiWrapper({
  completedSessionCounter,
  breakLength,
  setBreakLength,
  confettiInterval
}) {
  const [showingConfetti, setShowingConfetti] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
    if(showingConfetti === true) {
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => {
        clearTimeout(timer);
      }
    };
  }, [showingConfetti]);

  return (
    <>
      {showingConfetti && <Confetti />}
      {isOpen && (
        <Popup
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
