import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [articles, setArticles] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar artículos
  const fetchArticles = () => {
    axios
      .get("http://localhost:8000/api/articles/")
      .then((res) => setArticles(res.data))
      .catch((err) => console.error("Error fetching articles:", err));
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // Enviar artículo nuevo
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    axios
      .post("http://localhost:8000/api/articles/", { title, body })
      .then((res) => {
        setTitle("");
        setBody("");
        fetchArticles(); // actualizar la lista
      })
      .catch((err) => setError("Error al crear el artículo"))
      .finally(() => setLoading(false));
  };

  return (
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Artículos del Blog</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <div>
          <label>Título:</label>
          <br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: "300px", padding: "0.5rem" }}
          />
        </div>
        <div>
          <label>Cuerpo:</label>
          <br />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            rows={4}
            style={{ width: "300px", padding: "0.5rem" }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
        >
          {loading ? "Guardando..." : "Crear Artículo"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {articles.length === 0 ? (
        <p>No hay artículos disponibles.</p>
      ) : (
        articles.map(({ id, title, body, created_at }) => (
          <article key={id} style={{ marginBottom: "1.5rem" }}>
            <h2>{title}</h2>
            <p>{body}</p>
            <small>Publicado el: {new Date(created_at).toLocaleString()}</small>
            <hr />
          </article>
        ))
      )}
    </main>
  );
}

export default App;
