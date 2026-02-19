import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur de connexion");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);

      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[380px] rounded-lg p-6 border border-secondary flex flex-col"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">CONNEXION</h1>

        {error && (
          <div className="mb-4 p-3 border border-red-500 bg-red-50 text-red-700 text-sm">
            {error}
          </div>
        )}

        <label htmlFor="mail" className="font-bold text-sm uppercase mb-2">
          E-mail
        </label>
        <input
          className="border border-secondary mb-4 py-2 px-4 focus:bg-secondary/25 focus:outline-none"
          type="email"
          id="mail"
          name="mail"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />

        <label htmlFor="password" className="font-bold text-sm uppercase mb-2">
          Mot de passe
        </label>
        <input
          className="border border-secondary mb-6 py-2 px-4 focus:bg-secondary/25 focus:outline-none"
          id="password"
          name="password"
          type="password"
          placeholder="••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="border border-secondary px-6 py-3 hover:bg-secondary/25 cursor-pointer transition-colors font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "CONNEXION..." : "SE CONNECTER"}
        </button>
      </form>
    </main>
  );
};

export default Login;
