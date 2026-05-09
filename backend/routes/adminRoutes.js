import express from "express";

import {
  getAllUsers,
  getAllDonors,
  deleteUser,
  deleteDonor
} from "../controllers/adminController.js";

import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

/* =========================
   ADMIN ROUTES
========================= */

router.get("/test", (req,res)=>{
  res.send("Admin route working");
});

router.get(
  "/users",
  protect,
  isAdmin,
  getAllUsers
);

router.get(
  "/donors",
  protect,
  isAdmin,
  getAllDonors
);

router.delete(
  "/user/:id",
  protect,
  isAdmin,
  deleteUser
);

router.delete(
  "/donor/:id",
  protect,
  isAdmin,
  deleteDonor
);

export default router;