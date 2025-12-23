import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('Loading...');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGreeting = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/greeting');
        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`);
        }
        const data = await res.json();
        setMessage(data.message ?? 'No message');
      } catch (err) {
        setError(err.message);
      }
    };

    fetchGreeting();
  }, []);

  return (
    <main className="app">
      <header className="hero">
        <h1>React + Java Microservice</h1>
        <p>Frontend served by Vite, backend by Spring Boot.</p>
      </header>

      <section className="card">
        <h2>Backend greeting</h2>
        {error ? <p className="error">Error: {error}</p> : <p>{message}</p>}
      </section>

      <section className="card">
        <h2>Next steps</h2>
        <ul>
          <li>Run <code>npm run dev</code> inside <code>frontend</code></li>
          <li>Run <code>mvn spring-boot:run</code> inside <code>backend</code></li>
          <li>Update ports or API paths as needed</li>
        </ul>
      </section>
    </main>
  );
}

export default App;


