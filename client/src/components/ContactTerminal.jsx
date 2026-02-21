import { useMemo, useState } from "react";

const defaultForm = {
  name: "",
  email: "",
  message: ""
};

export default function ContactTerminal({ onSubmit }) {
  const [form, setForm] = useState(defaultForm);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState({ type: "", text: "" });
  const [logs, setLogs] = useState([
    "$ portfolio.connect --mode realtime",
    "> ready: API channel online"
  ]);

  const canSubmit = useMemo(
    () => form.name.trim() && form.email.trim() && form.message.trim().length >= 10,
    [form]
  );

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const appendLog = (line) => {
    setLogs((previous) => [...previous.slice(-6), line]);
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();
    if (!canSubmit || sending) {
      return;
    }

    try {
      setSending(true);
      appendLog("> sending payload...");
      const payload = await onSubmit(form);
      appendLog(`> accepted: ticket ${payload.ticket.slice(0, 8)}`);
      setStatus({ type: "success", text: payload.message });
      setForm(defaultForm);
    } catch (error) {
      appendLog("> rejected: validation error");
      setStatus({ type: "error", text: error.message });
    } finally {
      setSending(false);
    }
  };

  return (
    <section>
      <p>DEMO</p>
      <div className="section-head">
        <h2>Связаться со мной</h2>
        <p>Форма отправляет данные в Node.js API и сразу показывает результат.</p>
      </div>
      <div className="contact-layout">
        <form className="contact-form" onSubmit={onFormSubmit}>
          <label>
            Имя
            <input
              name="name"
              value={form.name}
              onChange={updateField}
              placeholder="Ваше имя"
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={updateField}
              placeholder="you@example.com"
              required
            />
          </label>
          <label>
            Сообщение
            <textarea
              name="message"
              value={form.message}
              onChange={updateField}
              rows={5}
              placeholder="Опишите задачу и желаемые сроки..."
              minLength={10}
              required
            />
          </label>
          <div className="form-actions">
            <button className="primary-btn" type="submit" disabled={!canSubmit || sending}>
              {sending ? "Отправка..." : "Отправить"}
            </button>
            <button
              className="secondary-btn"
              type="button"
              onClick={() =>
                setForm({
                  name: "Product Team",
                  email: "hello@startup.io",
                  message:
                    "Нужен интерактивный маркетинговый сайт с backend-формами и аналитикой."
                })
              }
            >
              Заполнить примером
            </button>
          </div>
          {status.text ? (
            <p className={status.type === "success" ? "status success" : "status error"}>
              {status.text}
            </p>
          ) : null}
        </form>
        <aside className="terminal">
          <h3>Live Console</h3>
          <div className="terminal-log">
            {logs.map((line, index) => (
              <p key={`${line}-${index}`}>{line}</p>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
