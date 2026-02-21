const flattenSkills = (groups) => groups.flatMap((group) => group.skills);

export default function SkillOrbit({ groups, activity }) {
  const skills = flattenSkills(groups);

  return (
    <section>
      <div className="section-head">
        <h2>Навыки и инженерная форма</h2>
        <p>
          Орбита показывает рабочий стек, а правый блок отражает текущее качество
          продукта по ключевым осям.
        </p>
      </div>
      <div className="skills-layout">
        <div className="orbit-wrap" aria-hidden="true">
          <div className="orbit-core">Core</div>
          {skills.map((skill, index) => {
            const angle = (Math.PI * 2 * index) / skills.length;
            const x = Math.cos(angle) * 180;
            const y = Math.sin(angle) * 180;

            return (
              <span
                key={skill}
                className="orbit-item"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  animationDelay: `${index * 0.06}s`
                }}
              >
                {skill}
              </span>
            );
          })}
        </div>
        <div className="skills-side">
          <div className="skill-columns">
            {groups.map((group) => (
              <article key={group.title} className="skill-column">
                <h3>{group.title}</h3>
                <ul>
                  {group.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="activity-panel">
            {activity.map((item) => (
              <div key={item.label} className="activity-row">
                <div className="activity-meta">
                  <span>{item.label}</span>
                  <strong>{item.value}%</strong>
                </div>
                <div className="bar-track">
                  <span
                    className={`bar-fill tone-${item.tone}`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
