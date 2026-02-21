import { useMemo, useState } from "react";

const initialPads = [
  { id: "ui", label: "UI", emoji: "🎨" },
  { id: "api", label: "API", emoji: "⚙️" },
  { id: "motion", label: "Motion", emoji: "✨" },
  { id: "qa", label: "QA", emoji: "🧪" }
];

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export default function InteractiveLab() {
  const [energy, setEnergy] = useState(44);
  const [combo, setCombo] = useState(1);
  const [pads, setPads] = useState([]);
  const [score, setScore] = useState(0);
  const [target, setTarget] = useState({ x: 42, y: 48 });
  const [pulseSize, setPulseSize] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lastHit, setLastHit] = useState(null);
  const [gameActive, setGameActive] = useState(false);

  const rhythm = useMemo(() => {
    if (pads.length === 0) {
      return "🔵 Idle";
    }

    if (pads.length <= 2) {
      return "🟢 Groove";
    }

    return "🔴 Overdrive";
  }, [pads.length]);

  const touchPad = (id) => {
    setPads((previous) => {
      if (previous.includes(id)) {
        return previous.filter((item) => item !== id);
      }

      return [...previous, id];
    });
  };

  const moveTarget = () => {
    setTarget({
      x: Math.floor(8 + Math.random() * 78),
      y: Math.floor(12 + Math.random() * 70)
    });
    setPulseSize(0);
    setTimeout(() => setPulseSize(20), 50);
  };

  const hitTarget = () => {
    const points = combo * 10;
    setScore((previous) => previous + points);
    setStreak((previous) => previous + 1);
    setLastHit("+" + points);
    
    setCombo((previous) => clamp(previous + 1, 1, 9));
    setEnergy((previous) => clamp(previous + 3, 0, 100));
    moveTarget();

    // Очистить сообщение о попадании через 500мс
    setTimeout(() => setLastHit(null), 500);
  };

  const burst = () => {
    setEnergy((previous) => clamp(previous + 18, 0, 100));
    setCombo((previous) => clamp(previous + 2, 1, 9));
  };

  const cooldown = () => {
    setEnergy((previous) => clamp(previous - 22, 0, 100));
    setCombo(1);
    setStreak(0);
  };

  const randomizePads = () => {
    const next = initialPads
      .filter(() => Math.random() > 0.45)
      .map((item) => item.id);
    setPads(next);
  };

  const startGame = () => {
    setGameActive(!gameActive);
    if (!gameActive) {
      setScore(0);
      setCombo(1);
      setStreak(0);
      moveTarget();
    }
  };

  return (
    <section>
      <div className="section-head">
        <h2>🔬 Interactive Lab</h2>
        <p>Мини-лаборатория: энерго-реактор, ритм-пэды и микрогейм для живого UX. Попробуйте всё! 🎮</p>
      </div>
      <div className="lab-grid">
        <article className="lab-card" style={{ animation: "slideInUp 0.5s ease-out" }}>
          <h3>⚡ Energy Reactor</h3>
          <p>Управляй энергией интерфейса: {energy}% заряда 🔋</p>
          <div className="lab-energy">
            <div className="bar-track">
              <span
                className="bar-fill tone-primary"
                style={{
                  width: `${energy}%`,
                  animation: energy > 80 ? "glow-pulse-primary 1s ease-in-out infinite" : "none"
                }}
              />
            </div>
            <strong style={{ color: energy > 80 ? "var(--primary)" : "inherit" }}>{energy}%</strong>
          </div>
          <div className="lab-actions">
            <button
              className="small-btn"
              type="button"
              onClick={burst}
              style={{ animation: energy > 50 ? "pulse 2s ease-in-out infinite" : "none" }}
            >
              🚀 Surge
            </button>
            <button className="small-btn" type="button" onClick={cooldown}>
              ❄️ Cooldown
            </button>
            <button
              className="small-btn"
              type="button"
              onClick={() => setEnergy((prev) => clamp(prev + 5, 0, 100))}
            >
              ➕ +5
            </button>
          </div>
        </article>

        <article className="lab-card" style={{ animation: "slideInUp 0.6s ease-out" }}>
          <h3>🎹 Interaction Pads</h3>
          <p>Собери ритм: {rhythm}</p>
          <div className="pad-grid">
            {initialPads.map((pad, idx) => (
              <button
                key={pad.id}
                type="button"
                className={pads.includes(pad.id) ? "pad-btn is-active" : "pad-btn"}
                onClick={() => touchPad(pad.id)}
                style={{
                  animation: pads.includes(pad.id) ? "bounce 0.4s ease-out" : "none",
                  animationDelay: `${idx * 0.05}s`
                }}
              >
                {pad.emoji} {pad.label}
              </button>
            ))}
          </div>
          <button
            className="chip"
            type="button"
            onClick={randomizePads}
            style={{ animation: "rotate 0.6s ease-in-out" }}
          >
            🎲 Randomize
          </button>
        </article>

        <article className="lab-card target-card" style={{ animation: "slideInUp 0.7s ease-out" }}>
          <h3>🎯 Catch Pulse</h3>
          <p>
            Поймай пульс! Combo: <span style={{ color: "var(--secondary)" }}>x{combo}</span> 💫
          </p>
          <div className="target-stage">
            {lastHit && (
              <div
                style={{
                  position: "absolute",
                  left: `${target.x}%`,
                  top: `${target.y}%`,
                  color: "var(--primary)",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  animation: "fadeInUp 0.5s ease-out forwards",
                  pointerEvents: "none"
                }}
              >
                {lastHit}
              </div>
            )}
            <button
              type="button"
              className="target-dot"
              style={{
                left: `${target.x}%`,
                top: `${target.y}%`,
                animation: gameActive ? "pulse 0.8s ease-in-out infinite" : "none",
                boxShadow:
                  pulseSize > 0
                    ? `0 0 ${pulseSize}px rgba(82, 244, 200, 0.8)`
                    : "0 0 12px rgba(82, 244, 200, 0.5)"
              }}
              onClick={hitTarget}
              aria-label="Hit target"
            />
          </div>
          <div className="target-meta">
            <span>📊 Score: {score}</span>
            <span>🔥 Streak: {streak}</span>
          </div>
          <button
            className={gameActive ? "chip is-active" : "chip"}
            type="button"
            onClick={startGame}
            style={{ width: "100%", marginTop: "8px" }}
          >
            {gameActive ? "⏹️ Стоп" : "🎮 Начать игру"}
          </button>
        </article>
      </div>
    </section>
  );
}
