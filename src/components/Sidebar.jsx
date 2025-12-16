export default function Sidebar({ page, setPage, open, toggle }) {
  const item = (id, label) => (
    <p
      onClick={() => setPage(id)}
      style={{
        cursor: "pointer",
        color: page === id ? "#a31616" : "inherit",
        whiteSpace: "nowrap",
        opacity: open ? 1 : 0,
        transition: "opacity 0.2s"
      }}
    >
      {label}
    </p>
  );

  return (
    <aside
      style={{
        width: open ? "220px" : "32px",
        transition: "width 0.25s",
        borderRight: "1px solid #a31616",
        padding: "12px 6px",
        fontSize: "14px",
        overflow: "hidden",
        position: "relative"
      }}
    >
      {/* Botão retrátil */}
      <button
        onClick={toggle}
        style={{
          position: "absolute",
          top: "8px",
          right: open ? "-14px" : "-14px",
          width: "28px",
          height: "28px",
          background: "#0b0b0b",
          border: "1px solid #a31616",
          cursor: "pointer"
        }}
      >
        {open ? "◀" : "▶"}
      </button>

      <p style={{ opacity: open ? 1 : 0, transition: "opacity 0.2s" }}>
        📼 ARQUIVO
      </p>

      {item("inicio", "▶ INÍCIO")}
      {item("personagem", "🧙 PERSONAGEM")}
      {item("arquivos", "📖 ARQUIVOS")}
      {item("ferramentas", "🎲 FERRAMENTAS")}
      {item("config", "⚠️ CONFIG")}
    </aside>
  );
}
