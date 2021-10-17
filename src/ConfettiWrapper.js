import "./styles.css";
import React, { useState, useEffect } from "react";
import ConfettiExplosion from "@reonomy/react-confetti-explosion";
import Popup from "./Popup.js"

export default function ConfettiWrapper({ completedSessionCounter }) {
  const [showingConfetti, setShowingConfetti] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (completedSessionCounter > 0 && completedSessionCounter % 4 === 0) {
      setShowingConfetti(true);
      const timer = setTimeout(()=>setIsOpen(true), 3500)
      return ()=> {clearTimeout(timer)}
    }

    if (completedSessionCounter % 4 === 3 && showingConfetti) {
      setShowingConfetti(false); // Prime confetti explosion
    }
  });

  return <>
    {showingConfetti && <Confetti />}
    {isOpen && <Popup
      content={<>
        <b>Design your Popup</b>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <button>Test button</button>
      </>}
      handleClose={()=> setIsOpen(!isOpen)}
    />}
  </>;
}

const Confetti = React.memo(() => {
  return <ConfettiExplosion />;
});
