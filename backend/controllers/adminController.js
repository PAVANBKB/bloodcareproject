import User from "../models/User.js";
import Donor from "../models/Donor.js";



/* =========================
   GET ALL USERS
========================= */

export const getAllUsers = async (req, res) => {
  try {

    const users = await User
      .find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });

  } catch (error) {

    console.error("Error fetching users:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch users"
    });
  }
};




/* =========================
   GET ALL DONORS
========================= */

export const getAllDonors = async (req, res) => {
  try {

    const donors = await Donor
      .find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: donors.length,
      data: donors
    });

  } catch (error) {

    console.error("Error fetching donors:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch donors"
    });
  }
};




/* =========================
   DELETE USER
========================= */

export const deleteUser = async (req, res) => {
  try {

    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });

  } catch (error) {

    console.error("Delete user error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete user"
    });
  }
};




/* =========================
   DELETE DONOR
========================= */

export const deleteDonor = async (req, res) => {
  try {

    const { id } = req.params;

    const donor = await Donor.findById(id);

    if (!donor) {
      return res.status(404).json({
        success: false,
        message: "Donor not found"
      });
    }

    await Donor.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Donor removed successfully"
    });

  } catch (error) {

    console.error("Delete donor error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to remove donor"
    });
  }
};
