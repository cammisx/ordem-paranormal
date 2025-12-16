import { useState } from "react";

export default function Tooltip({ term, children }) {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className="tooltip-wrapper"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}

      {visible && (
        <span className="tooltip">
          {/* placeholder */}
          Explicação de <strong>{term}</strong>
        </span>
      )}
    </span>
  );
}
