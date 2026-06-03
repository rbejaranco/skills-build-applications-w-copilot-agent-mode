import { Router } from "express";
import Activity from "../models/Activity.js";
const router = Router();
router.get("/", async (_req, res) => {
    try {
        const activities = await Activity.find().populate("user", "name email");
        res.json({ activities });
    }
    catch (error) {
        res.status(500).json({ error: "Unable to fetch activities" });
    }
});
router.post("/", async (req, res) => {
    try {
        const activity = await Activity.create(req.body);
        const populated = await activity.populate("user", "name email");
        res.status(201).json(populated);
    }
    catch (error) {
        res.status(500).json({ error: "Unable to log activity" });
    }
});
export default router;
