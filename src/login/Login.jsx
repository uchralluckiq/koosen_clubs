import { useState } from "react";
import { useAuth } from "./AuthContext";

export default function Login({ isOpen, onClose }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Бүх талбарыг бөглөнө үү");
      setLoading(false);
      return;
    }

    const result = await login(email, password);

    if (result.success) {
      // Reset form and close modal on success
      setEmail("");
      setPassword("");
      setError("");
      onClose();
    } else {
      setError(result.error || "Нэвтрэх амжилтгүй боллоо");
    }

    setLoading(false);
  };

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal box */}
      <div 
        className="relative w-[90%] max-w-md rounded-2xl bg-gray-800/95 backdrop-blur-md p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-6 text-3xl font-semibold text-center text-white">
          Нэвтрэх
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-red-500/20 border border-red-500 text-red-300 px-4 py-2 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              И-мэйл
            </label>
            <input
              type="email"
              placeholder="И-мэйл хаягаа оруулна уу"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-600 bg-gray-700/50 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ff9f1c] focus:border-transparent"
              disabled={loading}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Нууц үг
            </label>
            <input
              type="password"
              placeholder="Нууц үгээ оруулна уу"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-600 bg-gray-700/50 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ff9f1c] focus:border-transparent"
              disabled={loading}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#ff9f1c] py-3 hover:bg-[#d07900] transition text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {loading ? "Нэвтэрч байна..." : "Нэвтрэх"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          <p>Туршилт:</p>
          <p className="text-xs mt-2">student1@example.com / password123</p>
          <p className="text-xs">admin@example.com / admin123</p>
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
