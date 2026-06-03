import { Router } from "express";
import Workout from "../models/Workout.js";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const workouts = await Workout.find().populate("user", "name email");
    res.json({ workouts });
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch workouts" });
  }
});

router.post("/", async (req, res) => {
  try {
    const workout = await Workout.create(req.body);
    const populated = await workout.populate("user", "name email");
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ error: "Unable to schedule workout" });
  }
});

export default router;
