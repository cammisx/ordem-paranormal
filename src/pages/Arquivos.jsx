import { useEffect, useMemo, useState } from "react";
import ClassPanel from "../panels/ClassPanel";

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

export default function Arquivos({ onVoltar }) {
  const [openClasses, setOpenClasses] = useState(false);
  const [openOrigens, setOpenOrigens] = useState(false);

  // painel lateral: agora é sempre um objeto
  const [panelItem, setPanelItem] = useState(null);

  const [panelAnim, setPanelAnim] = useState("enter");
  const [cursor, setCursor] = useState(0);

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

  function activate(entry) {
    if (!entry) return;

    if (entry.type === "toggle") {
      if (entry.key === "classes") setOpenClasses(v => !v);
      if (entry.key === "origens") setOpenOrigens(v => !v);
      return;
    }

    if (entry.type === "item") {
      const [type, id] = entry.key.split(":");
      openPanel(type, id);
    }
  }

  function openPanel(type, id) {
    if (!panelItem) {
      setPanelAnim("enter");
      setPanelItem({ type, id });
      return;
    }

    setPanelAnim("");
    requestAnimationFrame(() => {
      setPanelItem({ type, id });
      setPanelAnim("switch");
    });
  }

  function closePanel() {
    setPanelAnim("exit");
    setTimeout(() => {
      setPanelItem(null);
    }, 250);
  }

  return (
    <div className="screen arquivos">
      <div className="vhs-bg">
        <div className="layer" />
        <div className="layer red" />
        <div className="layer blue" />
        <div className="noise" />
      </div>

      <div className="arquivos-menu">
        <h1 className="title glitch" data-text="ARQUIVOS">
          ARQUIVOS
          <span aria-hidden="true">ARQUIVOS</span>
        </h1>

        <div className="menu show">
          {visibleItems.map((entry, i) => {
            const selected = i === cursor;
            if (entry.type === "toggle") {
              const open = entry.key === "classes" ? openClasses : openOrigens;
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

      {panelItem && (
        <div className={`panel panel-large ${panelAnim}`}>
          <button className="close" onClick={closePanel}>×</button>

          {panelItem.type === "classe" && panelItem.id === "combatente" && (
            <ClassPanel data={combatente} />
          )}
        </div>
      )}

      <button className="back-fixed" onClick={onVoltar}>
        &lt; voltar
      </button>
    </div>
  );
}
