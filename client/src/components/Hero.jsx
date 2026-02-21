import { useEffect, useMemo, useState } from "react";

const roles = [
  "React-разработчик",
  "Node.js инженер",
  "UI Motion энтузиаст",
  "Fullstack партнёр"
];

export default function Hero({ profile, onExploreProjects, onOpenContact }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedRole, setTypedRole] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [magnet, setMagnet] = useState({ x: 0, y: 0 });
  const [panelTilt, setPanelTilt] = useState({ x: 0, y: 0 });
  const [activePulse, setActivePulse] = useState(0);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          const next = currentRole.slice(0, typedRole.length + 1);
          setTypedRole(next);

          if (next === currentRole) {
            setTimeout(() => setDeleting(true), 900);
          }
        } else {
          const next = currentRole.slice(0, Math.max(typedRole.length - 1, 0));
          setTypedRole(next);

          if (next.length === 0) {
            setDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      deleting ? 32 : 78
    );

    return () => clearTimeout(timeout);
  }, [deleting, roleIndex, typedRole]);

  const pulseLabel = useMemo(() => {
    const labels = ["Нормальный ритм", "Boost активен", "Turbo активен"];
    return labels[activePulse];
  }, [activePulse]);

  const onMagnetMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) / 8;
    const y = (event.clientY - rect.top - rect.height / 2) / 8;
    setMagnet({ x, y });
  };

  const onPanelMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientY - rect.top) / rect.height - 0.5) * -6;
    const y = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
    setPanelTilt({ x, y });
  };

  return (
    <section className="hero-grid">
      <div className={activePulse > 0 ? "hero-copy has-pulse" : "hero-copy"}>
        <span className="hero-chip">React + JavaScript + Node.js</span>
        <h1>
          {profile.fullName}
          <span>{profile.headline}</span>
        </h1>
        <p>{profile.summary}</p>
        <p className="typing-line">
          <strong>Сейчас в фокусе:</strong> {typedRole}
          <span className="typing-caret">|</span>
        </p>
        <div className="hero-cta">
          <button
            className="primary-btn magnetic"
            type="button"
            onClick={onExploreProjects}
            onMouseMove={onMagnetMove}
            onMouseLeave={() => setMagnet({ x: 0, y: 0 })}
            style={{ transform: `translate(${magnet.x}px, ${magnet.y}px)` }}
          >
            Смотреть проекты
          </button>
          <button className="secondary-btn" type="button" onClick={onOpenContact}>
            Написать мне
          </button>
        </div>
        <div className="hero-pulses">
          {[0, 1, 2].map((value) => (
            <button
              key={value}
              type="button"
              className={value === activePulse ? "pulse-btn is-active" : "pulse-btn"}
              onClick={() => setActivePulse(value)}
            >
              {value === 0 ? "Normal" : value === 1 ? "Boost" : "Turbo"}
            </button>
          ))}
          <span className="pulse-state">{pulseLabel}</span>
        </div>
        <div className="hero-socials">
          {profile.socials.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
              {social.label}
            </a>
          ))}
        </div>
      </div>
      <aside
        className="hero-panel"
        onMouseMove={onPanelMove}
        onMouseLeave={() => setPanelTilt({ x: 0, y: 0 })}
        style={{
          transform: `perspective(900px) rotateX(${panelTilt.x}deg) rotateY(${panelTilt.y}deg)`
        }}
      >
        <h3>Краткая сводка</h3>
        <p>{profile.availability}</p>
        <div className="stat-grid">
          {profile.stats.map((stat) => (
            <article key={stat.label} className="stat-card">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </div>
      </aside>
    </section>
  );
}
