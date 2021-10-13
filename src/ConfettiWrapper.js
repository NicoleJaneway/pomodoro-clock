import "./styles.css";
import React, { useState, useEffect } from "react";
import ConfettiExplosion from "@reonomy/react-confetti-explosion";

export default function ConfettiWrapper({ completedSessionCounter }) {
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
