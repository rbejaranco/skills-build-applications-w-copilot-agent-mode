import cors from "cors";
import express from "express";
import usersRouter from "./routes/users.js";
import teamsRouter from "./routes/teams.js";
import activitiesRouter from "./routes/activities.js";
import leaderboardRouter from "./routes/leaderboard.js";
import workoutsRouter from "./routes/workouts.js";
import { API_PORT, API_URL } from "./config.js";
import { connectDatabase } from "./db.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/teams", teamsRouter);
app.use("/api/activities", activitiesRouter);
app.use("/api/leaderboard", leaderboardRouter);
app.use("/api/workouts", workoutsRouter);
app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});
app.get("/api/config", (_req, res) => {
    res.json({ apiUrl: API_URL });
});
connectDatabase()
    .then(() => {
    console.log("MongoDB connected");
    app.listen(API_PORT, () => {
        console.log(`Server listening at ${API_URL}`);
    });
})
    .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
});
