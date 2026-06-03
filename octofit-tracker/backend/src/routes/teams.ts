import { Router } from "express";
import Team from "../models/Team.js";
import User from "../models/User.js";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const teams = await Team.find().populate("members", "name email role");
    res.json({ teams });
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch teams" });
  }
});

router.post("/", async (req, res) => {
  try {
    const team = await Team.create(req.body);
    const populated = await Team.findById(team._id).populate("members", "name email role");
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ error: "Unable to create team" });
  }
});

router.get("/:id/members", async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate("members", "name email role");
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    res.json({ members: team.members });
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch team members" });
  }
});

export default router;
