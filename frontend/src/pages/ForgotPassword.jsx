import { useState } from "react";
import API from "../api";

export default function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email");
      return;
    }

    try {

      setLoading(true);

      const res = await API.post("/auth/forgot-password", { email });

      setMessage(res.data.message);

    } catch (error) {

      console.error(error);

      alert("Failed to send reset email");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-red-50 flex justify-center items-center">

      <div className="bg-white p-8 rounded-2xl shadow-lg border border-red-100 w-full max-w-md">

        <h2 className="text-3xl font-bold text-center text-red-600 mb-4">
          Forgot Password
        </h2>

        <p className="text-center text-gray-600 mb-6 text-sm">
          Enter your email and we will send you a password reset link.
        </p>

        {message && (
          <p className="text-green-600 text-center mb-4">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg p-2"
          />

          <button
            disabled={loading}
            className="w-full py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

        </form>

      </div>

    </div>
  );
}