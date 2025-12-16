import { useEffect, useMemo, useState } from "react";
import ClassPanel from "../panels/ClassPanel";
import combatente from "../data/classes/combatente";


/* =========================
   DADOS
========================= */

const CLASSES = [
  "combatente",
  "especialista",
  "ocultista"
];

const ORIGENS = [
  "acadêmico",
  "agente de saúde",
  "amnésico",
  "artista",
  "atleta",
  "chef",
  "criminoso",
  "cultista arrependido",
  "desgarrado",
  "engenheiro",
  "executivo",
  "investigador",
  "lutador",
  "magnata",
  "mercenário",
  "militar",
  "operário",
  "policial",
  "religioso",
  "servidor público",
  "teórico da conspiração",
  "T.I.",
  "trabalhador rural",
  "trambiqueiro",
  "universitário",
  "vítima"
];
/* =========================
   DADOS DE CLASSES (TESTE)
========================= */

const CLASS_DATA = {
  combatente: {
    nome: "COMBATENTE",
    resumo:
      "Um perito em armas brancas e de fogo, este agente serve como a linha de frente na luta contra o Outro Lado.",
    caracteristicas: [
      "Pontos de vida iniciais: 6 + VIG",
      "Pontos de esforço iniciais: 4 + PRE",
      "Sanidade inicial: 20"
    ],
    pericias: [
      "Luta",
      "Pontaria",
      "Fortitude",
      "Reflexos"
    ],
    proficiencias: [
      "Armas simples",
      "Armas táticas",
      "Proteções leves"
    ],
    habilidades: [
      "Ataque Especial",
      "Golpe Pesado"
    ]
  }
};

/* =========================
   COMPONENTE
========================= */

export default function Arquivos({ onVoltar }) {
  /* =========================
     ESTADOS
  ========================= */

  const [openClasses, setOpenClasses] = useState(false);
  const [openOrigens, setOpenOrigens] = useState(false);

  // painel lateral
  const [panelItem, setPanelItem] = useState(null);
  // panelItem = { type: "classe" | "origem", id: string }

  const [panelAnim, setPanelAnim] = useState("enter");
  const [cursor, setCursor] = useState(0);

  /* =========================
     LISTA VISÍVEL
  ========================= */

  const visibleItems = useMemo(() => {
    const items = [];

    items.push({ type: "toggle", key: "classes", label: "classes" });
    if (openClasses) {
      CLASSES.forEach(c =>
        items.push({ type: "item", key: `classe:${c}`, label: c })
      );
    }

    items.push({ type: "toggle", key: "origens", label: "origens" });
    if (openOrigens) {
      ORIGENS.forEach(o =>
        items.push({ type: "item", key: `origem:${o}`, label: o })
      );
    }

    return items;
  }, [openClasses, openOrigens]);

  /* =========================
     TECLADO (opcional)
  ========================= */

  useEffect(() => {
    function onKey(e) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setCursor(c => Math.min(c + 1, visibleItems.length - 1));
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setCursor(c => Math.max(c - 1, 0));
      }

      if (e.key === "Enter") {
        e.preventDefault();
        activate(visibleItems[cursor]);
      }

      if (e.key === "Escape") {
        if (panelItem) closePanel();
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cursor, visibleItems, panelItem]);

  /* =========================
     AÇÕES
  ========================= */

function activate(entry) {
  if (!entry) return;

  // TOGGLES
  if (entry.type === "toggle") {
    if (entry.key === "classes") setOpenClasses(v => !v);
    if (entry.key === "origens") setOpenOrigens(v => !v);
    return;
  }

  // ITEM → abre painel
  if (entry.type === "item") {
    openPanel(entry.label); // ex: "combatente"
    return;
  }
}


function openPanel(label) {
  // PRIMEIRA VEZ QUE ABRE O PAINEL
  if (!panelItem) {
    setPanelAnim("enter");
    setPanelItem(label); // ex: "combatente"
    return;
  }

  // PAINEL JÁ ABERTO → troca com animação
  setPanelAnim("");

  requestAnimationFrame(() => {
    setPanelItem(label);
    setPanelAnim("switch");
  });
}


  function closePanel() {
    setPanelAnim("exit");
    setTimeout(() => {
      setPanelItem(null);
    }, 250);
  }

  /* =========================
     RENDER
  ========================= */

  return (
    <div className="screen arquivos">
      {/* FUNDO VHS */}
      <div className="vhs-bg">
        <div className="layer" />
        <div className="layer red" />
        <div className="layer blue" />
        <div className="noise" />
      </div>

      {/* MENU */}
      <div className="arquivos-menu">
        <h1 className="title glitch" data-text="ARQUIVOS">
          ARQUIVOS
          <span aria-hidden="true">ARQUIVOS</span>
        </h1>

        <div className="menu show">
          {visibleItems.map((entry, i) => {
            const selected = i === cursor;

            if (entry.type === "toggle") {
              const open =
                entry.key === "classes" ? openClasses : openOrigens;

              return (
                <p
                  key={entry.key}
                  className={`line ${selected ? "active" : ""}`}
                  onClick={() => activate(entry)}
                >
                  <span>{open ? "v" : ">"} {entry.label}</span>
                </p>
              );
            }

            if (entry.type === "item") {
              return (
                <p
                  key={entry.key}
                  className={`line sub ${selected ? "active" : ""}`}
                  onClick={() => activate(entry)}
                >
                  <span style={{ paddingLeft: "24px" }}>
                    {entry.label}
                  </span>
                </p>
              );
            }

            return null;
          })}
        </div>
      </div>
{/* PAINEL LATERAL */}
{panelItem && (
  <div className={`panel panel-large ${panelAnim}`}>
    <button
      className="close"
      onClick={closePanel}
      aria-label="Fechar painel"
    >
      ×
    </button>

    <ClassPanel data={CLASS_DATA[panelItem]} />
  </div>
)}


      {/* VOLTAR */}
      <button className="back-fixed" onClick={onVoltar}>
        &lt; voltar
      </button>
    </div>
  );
}
