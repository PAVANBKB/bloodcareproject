import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api";

export default function AdminDashboard() {

  const navigate = useNavigate();
  const { user } = useAuth();

  const [users, setUsers] = useState([]);
  const [donors, setDonors] = useState([]);
  const [stats, setStats] = useState({
    users: 0,
    donors: 0
  });

  useEffect(() => {

    // FRONTEND ADMIN PROTECTION
    if (!user || user.role !== "admin") {
      navigate("/login");
      return;
    }

    fetchUsers();
    fetchDonors();

  }, [user]);

  async function fetchUsers() {
    try {

      const res = await API.get("/admin/users");

      const data = res.data.data || res.data;

      setUsers(data);
      setStats(prev => ({ ...prev, users: data.length }));

    } catch (err) {
      console.error(err);
    }
  }

  async function fetchDonors() {
    try {

      const res = await API.get("/admin/donors");

      const data = res.data.data || res.data;

      setDonors(data);
      setStats(prev => ({ ...prev, donors: data.length }));

    } catch (err) {
      console.error(err);
    }
  }

  async function deleteUser(id) {

    if (!window.confirm("Delete this user?")) return;

    try {

      await API.delete(`/admin/user/${id}`);

      fetchUsers();

    } catch (err) {

      alert("Failed to delete user");

    }

  }

  async function deleteDonor(id) {

    if (!window.confirm("Remove this donor?")) return;

    try {

      await API.delete(`/admin/donor/${id}`);

      fetchDonors();

    } catch (err) {

      alert("Failed to remove donor");

    }

  }

  // EXTRA GUARD (PREVENT FLASH)
  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-red-50 p-6">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-red-600">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Manage users and blood donors in the BloodCare platform
          </p>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-red-100 text-center">
            <h3 className="text-gray-500 text-sm">Total Users</h3>
            <p className="text-3xl font-bold text-red-600">{stats.users}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-red-100 text-center">
            <h3 className="text-gray-500 text-sm">Total Donors</h3>
            <p className="text-3xl font-bold text-red-600">{stats.donors}</p>
          </div>

        </div>

        {/* USERS TABLE */}
        <div className="bg-white rounded-2xl shadow-lg border border-red-100 mb-10">

          <div className="p-4 border-b">
            <h2 className="font-bold text-gray-800 text-lg">
              Users Management
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">

              <thead className="bg-red-50">
                <tr className="text-left">
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {users.map(user => (
                  <tr key={user._id} className="border-t">

                    <td className="p-3">{user.fullName}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.phone}</td>

                    <td className="p-3">
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

        {/* DONORS TABLE */}
        <div className="bg-white rounded-2xl shadow-lg border border-red-100">

          <div className="p-4 border-b">
            <h2 className="font-bold text-gray-800 text-lg">
              Donor Management
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">

              <thead className="bg-red-50">
                <tr className="text-left">
                  <th className="p-3">Name</th>
                  <th className="p-3">Blood Group</th>
                  <th className="p-3">City</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {donors.map(donor => (
                  <tr key={donor._id} className="border-t">

                    <td className="p-3">{donor.fullName}</td>
                    <td className="p-3">{donor.bloodGroup}</td>
                    <td className="p-3">{donor.city}</td>
                    <td className="p-3">{donor.phone}</td>

                    <td className="p-3">
                      <button
                        onClick={() => deleteDonor(donor._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

      </div>
    </div>
  );
}