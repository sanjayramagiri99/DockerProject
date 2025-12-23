import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "";

function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const loadNotes = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/notes`);
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error(`Save failed: ${res.status}`);
      setText("");
      await loadNotes();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="app">
      <header className="hero">
        <h1>Notes Board</h1>
        <p>Add notes and persist them to MySQL via the Spring Boot backend.</p>
      </header>

      <section className="card">
        <h2>Add a note</h2>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="text"
            placeholder="Write something..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={saving}
          />
          <button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </button>
        </form>
        {error && <p className="error">Error: {error}</p>}
      </section>

      <section className="card">
        <h2>Saved notes</h2>
        {loading ? (
          <p>Loading...</p>
        ) : notes.length === 0 ? (
          <p>No notes yet. Add one above.</p>
        ) : (
          <ul className="notes">
            {notes.map((note) => (
              <li key={note.id}>
                <div>{note.text}</div>
                <small>{new Date(note.createdAt).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
