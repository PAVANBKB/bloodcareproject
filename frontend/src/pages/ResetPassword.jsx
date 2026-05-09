import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

export default function ResetPassword() {

  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      alert("Please enter a new password");
      return;
    }

    try {

      setLoading(true);

      const res = await API.post("/auth/reset-password", {
        token,
        password
      });

      alert(res.data.message);

      navigate("/login");

    } catch (error) {

      console.error(error);

      alert(error.response?.data?.message || "Reset failed");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-red-50 flex justify-center items-center">

      <div className="bg-white p-8 rounded-2xl shadow-lg border border-red-100 w-full max-w-md">

        <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg p-2"
          />

          <button
            disabled={loading}
            className="w-full py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

        </form>

      </div>

    </div>
  );
}