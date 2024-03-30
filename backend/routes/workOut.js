const express = require("express");
const {
  getWorkOuts,
  getWorkOut,
  creatWorkOut,
  updateWorkOut,
  deleteWorkOut,
} = require("../controllers/workController");

const requireAuth=require('../middleware/requireAuth')
const router = express.Router();

router.use(requireAuth)
// GET all workouts
router.get("/", getWorkOuts);

// GET a single workout
router.get("/:id", getWorkOut);

// POST a new workout
router.post("/", creatWorkOut);

// DELETE a workout
router.delete("/:id", deleteWorkOut);

// UPDATE a workout
router.patch("/:id", updateWorkOut);

module.exports = router;
