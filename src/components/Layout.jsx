import { useState, useEffect } from "react";
import Inicio from "../pages/Inicio";
import Arquivos from "../pages/Arquivos";

import "../styles/glitch.css";
import "../styles/themes.css";

export default function Layout() {
  /* ================================
     ESTADO GLOBAL DA TELA
     ================================ */
  const [page, setPage] = useState("inicio");
  const [glitch, setGlitch] = useState(false);

  /* ================================
     TEMA (PADRÃO + SALVO)
     ================================ */
  const [theme, setTheme] = useState("vhs");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    document.body.className = `theme-${theme}`;
    localStorage.setItem("theme", theme);
  }, [theme]);

  /* ================================
     TROCA DE ESTADO COM GLITCH
     ================================ */
  function changePage(next) {
    if (next === page) return;

    setGlitch(true);

    setTimeout(() => {
      setPage(next);
      setGlitch(false);
    }, 300);
  }

  /* ================================
     RENDER
     ================================ */
  return (
    <main
      className={glitch ? "glitch" : ""}
      style={{
        minHeight: "100vh",
        overflow: "hidden"
      }}
    >
      {/* =========================
          TELA INICIAL
      ========================== */}
      {page === "inicio" && (
        <Inicio
          onArquivos={() => changePage("arquivos")}
          onConfig={() => changePage("config")}
          onCriar={() => changePage("criacao")}
        />
      )}

      {/* =========================
          ARQUIVOS (REAL)
      ========================== */}
      {page === "arquivos" && (
        <Arquivos onVoltar={() => changePage("inicio")} />
      )}

      {/* =========================
          CRIAÇÃO DE AGENTE
      ========================== */}
      {page === "criacao" && (
        <div style={{ padding: "24px" }}>
          <h1>CADASTRO DE AGENTE</h1>
          <p>&gt; iniciando protocolo de criação</p>

          <button onClick={() => changePage("inicio")}>
            cancelar
          </button>
        </div>
      )}

      {/* =========================
          CONFIGURAÇÕES (TEMA)
      ========================== */}
      {page === "config" && (
        <div style={{ padding: "24px" }}>
          <h1>CONFIGURAÇÕES</h1>
          <p>&gt; alterar interface visual</p>

          <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
            <button onClick={() => setTheme("vhs")}>VHS</button>
            <button onClick={() => setTheme("terminal")}>Terminal</button>
            <button onClick={() => setTheme("dossie")}>Dossiê</button>
          </div>

          <button
            style={{ marginTop: "24px" }}
            onClick={() => changePage("inicio")}
          >
            voltar
          </button>
        </div>
      )}
    </main>
  );
}
