import { Router } from "express";
import User from "../models/User.js";
import Team from "../models/Team.js";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const users = await User.find().populate("team", "name description");
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch users" });
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    const populated = await user.populate("team", "name description");
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ error: "Unable to create user" });
  }
});

export default router;
