import React, { useState } from "react";

import SettingsPopup from "./SettingsPopup";

export default function SettingsButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(true);

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <button onClick={handleClick}>⚙️</button>
      <SettingsPopup handleClose={() => setIsOpen(!isOpen)} />
    </>
  );
}
