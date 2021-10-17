import "./styles.css";
import React, { useState, useEffect } from "react";
import ConfettiExplosion from "@reonomy/react-confetti-explosion";
import Popup from "./Popup.js"

export default function ConfettiWrapper({ completedSessionCounter, setBreakLength }) {
  const [showingConfetti, setShowingConfetti] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (completedSessionCounter > 0 && completedSessionCounter % 2 === 0) {
      setShowingConfetti(true);
      const timer = setTimeout(()=>setIsOpen(true), 3500)
      return ()=> {clearTimeout(timer)}
    }

    if (completedSessionCounter % 2 === 1 && showingConfetti) {
      setShowingConfetti(false); // Prime confetti explosion
    }
  });

  return <>
    {showingConfetti && <Confetti />}
    {isOpen && <Popup
      handleClose={()=> setIsOpen(!isOpen)}
      setBreakLength={setBreakLength}
    />}
  </>;
}

const Confetti = React.memo(() => {
  return <ConfettiExplosion />;
});
