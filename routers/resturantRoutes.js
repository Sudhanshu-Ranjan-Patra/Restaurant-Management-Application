const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createResturantController,
  getAllResturantController,
  getResturantByIdController,
  deleteResturantController,
} = require("../controllers/resturantController");

const router = express.Router();

//routes
// CRAETE RESTURANT 
router.post("/create", authMiddleware, createResturantController);

// GET ALL RESTURANTS
router.get("/getAll", getAllResturantController);

// GET RESTURANT BY ID
router.get("/get/:id", getResturantByIdController);

// DELETE RESTURANT 
router.delete("/delete/:id", authMiddleware, deleteResturantController);

module.exports = router;