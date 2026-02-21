import { useState } from "react";

const achievements = [
  "Сильный фокус на performance budget и доступность",
  "Быстрые релизы через CI/CD и feature toggles",
  "Проработка UX до уровня деталей микро-анимаций"
];

export default function Timeline({ items }) {
  const [activeCard, setActiveCard] = useState(0);

  return (
    <section>
      <div className="section-head">
        <h2>Опыт</h2>
        <p>Кликабельные этапы роста: роли, контекст и что именно улучшалось.</p>
      </div>
      <div className="timeline-track" />
      <div className="timeline">
        {items.map((item, index) => (
          <article
            key={item.year + item.title}
            className={index === activeCard ? "timeline-card is-active" : "timeline-card"}
            onClick={() => setActiveCard(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                setActiveCard(index);
              }
            }}
          >
            <span className="timeline-year">{item.year}</span>
            <h3>{item.title}</h3>
            <h4>{item.company}</h4>
            <p>{item.details}</p>
            {index === activeCard ? (
              <ul className="timeline-achievements">
                {achievements.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
