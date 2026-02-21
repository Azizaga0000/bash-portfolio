import { useEffect, useMemo, useState } from "react";

export default function CommandPalette({ isOpen, commands, onClose }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    setQuery("");
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) {
      return commands;
    }

    return commands.filter(
      (command) =>
        command.label.toLowerCase().includes(value) ||
        command.description.toLowerCase().includes(value)
    );
  }, [commands, query]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="command-layer" onMouseDown={onClose}>
      <div className="command-panel" onMouseDown={(event) => event.stopPropagation()}>
        <header>
          <strong>Quick Menu</strong>
          <span>Ctrl/Cmd + K</span>
        </header>
        <input
          className="command-input"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Найти действие..."
          autoFocus
        />
        <div className="command-list">
          {filtered.map((command) => (
            <button
              key={command.id}
              className="command-item"
              type="button"
              onClick={() => {
                command.run();
                onClose();
              }}
            >
              <strong>{command.label}</strong>
              <span>{command.description}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
