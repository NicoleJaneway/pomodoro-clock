import React, { useState } from "react";

import SettingsPopup from "./SettingsPopup";

export default function SettingsButton({ setShowPopups }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <button className="absolute top-2 right-3" onClick={handleClick}>
        ⚙️
      </button>
      {isOpen && (
        <SettingsPopup
          handleClose={() => setIsOpen(!isOpen)}
          setShowPopups={setShowPopups}
        />
      )}
    </>
  );
}
