import { useState } from "react";

export default function ClassPanel({ data }) {
  if (!data) return null;

  /* =========================
     CONTROLE DOS TOGGLES
     (apenas um aberto)
  ========================= */
  const [openSection, setOpenSection] = useState(null);

  function toggleSection(section) {
    setOpenSection(prev => (prev === section ? null : section));
  }

  const {
    nome,
    resumo,
    caracteristicas = [],
    pericias = [],
    proficiencias = [],
    habilidades = []
  } = data;

  return (
    <div className="class-panel">
      {/* =========================
          TÍTULO
      ========================= */}
      <h1 className="class-title glitch" data-text={nome}>
  {nome}
</h1>


      {/* =========================
          RESUMO
      ========================= */}
      <p className="class-resumo">
        {resumo}
      </p>

      {/* =========================
          CARACTERÍSTICAS
      ========================= */}
      <div className="class-section">
        <h3
          className="section-title"
          onClick={() => toggleSection("caracteristicas")}
        >
          {openSection === "caracteristicas" ? "v" : ">"} características
        </h3>

        {openSection === "caracteristicas" && (
          <ul className="section-content">
            {caracteristicas.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}
      </div>

      {/* =========================
          PERÍCIAS TREINADAS
      ========================= */}
      <div className="class-section">
        <h3
          className="section-title"
          onClick={() => toggleSection("pericias")}
        >
          {openSection === "pericias" ? "v" : ">"} perícias treinadas
        </h3>

        {openSection === "pericias" && (
          <ul className="section-content">
            {pericias.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        )}
      </div>

      {/* =========================
          PROFICIÊNCIAS
      ========================= */}
      <div className="class-section">
        <h3
          className="section-title"
          onClick={() => toggleSection("proficiencias")}
        >
          {openSection === "proficiencias" ? "v" : ">"} proficiências
        </h3>

        {openSection === "proficiencias" && (
          <ul className="section-content">
            {proficiencias.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        )}
      </div>

      {/* =========================
          HABILIDADES
          (vamos completar depois)
      ========================= */}
      {habilidades.length > 0 && (
        <div className="class-section">
          <h3
            className="section-title"
            onClick={() => toggleSection("habilidades")}
          >
            {openSection === "habilidades" ? "v" : ">"} habilidades
          </h3>

          {openSection === "habilidades" && (
            <ul className="section-content">
              {habilidades.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
