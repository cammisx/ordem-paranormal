import { useState } from "react";

export default function Config({ setTheme }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={toggleMenu}>
        ⚙️ Alterar Tema
      </button>
      {isOpen && (
        <div>
          <button onClick={() => handleThemeChange("vhs")}>VHS</button>
          <button onClick={() => handleThemeChange("terminal")}>Terminal</button>
          <button onClick={() => handleThemeChange("dossie")}>Dossiê</button>
        </div>
      )}
    </div>
  );
}
