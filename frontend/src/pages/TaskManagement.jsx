import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "";

function TaskManagement() {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const loadTasks = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/tasks`);
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError("Title is required");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error(`Save failed: ${res.status}`);
      setFormData({ title: "", description: "", priority: "MEDIUM" });
      await loadTasks();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <section className="card">
        <h2>Task Management</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Task Title *</label>
            <input
              type="text"
              id="title"
              placeholder="Enter task title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              disabled={saving}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Enter task description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              disabled={saving}
              rows="4"
            />
          </div>
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              disabled={saving}
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>
          <button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Create Task"}
          </button>
        </form>
        {error && <p className="error">Error: {error}</p>}
      </section>

      <section className="card">
        <h2>Tasks</h2>
        {loading ? (
          <p>Loading...</p>
        ) : tasks.length === 0 ? (
          <p>No tasks created yet.</p>
        ) : (
          <ul className="list">
            {tasks.map((task) => (
              <li key={task.id}>
                <div className="list-item">
                  <strong>{task.title}</strong>
                  <div className={`priority priority-${task.priority.toLowerCase()}`}>
                    {task.priority}
                  </div>
                  {task.description && <div>{task.description}</div>}
                  <small>{new Date(task.createdAt).toLocaleString()}</small>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default TaskManagement;

