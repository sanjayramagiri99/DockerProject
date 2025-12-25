import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import UserRegistration from "./pages/UserRegistration";
import ProductEntry from "./pages/ProductEntry";
import TaskManagement from "./pages/TaskManagement";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header className="hero">
          <h1>Multi-Page Application</h1>
          <p>Manage users, products, and tasks with AWS RDS support.</p>
        </header>

        <nav className="nav">
          <Link to="/users" className="nav-link">User Registration</Link>
          <Link to="/products" className="nav-link">Product Entry</Link>
          <Link to="/tasks" className="nav-link">Task Management</Link>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<UserRegistration />} />
            <Route path="/users" element={<UserRegistration />} />
            <Route path="/products" element={<ProductEntry />} />
            <Route path="/tasks" element={<TaskManagement />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
