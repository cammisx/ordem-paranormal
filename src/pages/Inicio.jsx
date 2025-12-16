import { useEffect, useState } from "react";

export default function Inicio({ onArquivos, onConfig, onCriar }) {
  /* =========================
     GLITCH OCASIONAL NO TÍTULO
  ========================= */
  const [glitchTitle, setGlitchTitle] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // chance de glitch (30%)
      if (Math.random() < 2.5) {
        setGlitchTitle(true);
        setTimeout(() => setGlitchTitle(false), 150);
      }
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  /* =========================
     DELAY DE ENTRADA DO MENU
  ========================= */
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowMenu(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="screen">
      {/* FUNDO VHS */}
      <div className="vhs-bg">
        <div className="layer" />
        <div className="layer red" />
        <div className="layer blue" />
        <div className="noise" />
      </div>

      {/* CONTEÚDO CENTRAL */}
      <div className="center">
       <h1
  className={`title ${glitchTitle ? "glitch" : ""}`}
  data-text="ORDEM PARANORMAL"
>
  ORDEM PARANORMAL
  <span aria-hidden="true">ORDEM PARANORMAL</span>
</h1>


        <div className={`menu ${showMenu ? "show" : ""}`}>
          <p className="line" onClick={onArquivos}>
            <span>&gt; arquivos</span>
            <i />
          </p>

          <p className="line" onClick={onConfig}>
            <span>&gt; configurações</span>
            <i />
          </p>

          <p className="line" onClick={onCriar}>
            <span>&gt; cadastrar novo agente</span>
            <i />
          </p>
        </div>
      </div>
    </div>
  );
}
