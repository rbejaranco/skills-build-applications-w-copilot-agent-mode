/**
 * Seed the octofit_db database with test data
 */
import mongoose from "mongoose";
import { MONGODB_URI } from "../config.js";
import User from "../models/User.js";
import Team from "../models/Team.js";
import Activity from "../models/Activity.js";
import Workout from "../models/Workout.js";
import LeaderboardEntry from "../models/LeaderboardEntry.js";
async function seed() {
    console.log("Seed the octofit_db database with test data");
    await mongoose.connect(MONGODB_URI);
    await Promise.all([
        User.deleteMany({}),
        Team.deleteMany({}),
        Activity.deleteMany({}),
        Workout.deleteMany({}),
        LeaderboardEntry.deleteMany({})
    ]);
    const teams = await Team.create([
        {
            name: "Team Hydra",
            description: "A high-energy team focused on strength and endurance training.",
            members: []
        },
        {
            name: "Team Kraken",
            description: "A performance group built around aquatic and cardio challenges.",
            members: []
        }
    ]);
    const users = await User.create([
        {
            name: "Ava Summers",
            email: "ava.summers@example.com",
            role: "captain",
            team: teams[0]._id
        },
        {
            name: "Noah Patel",
            email: "noah.patel@example.com",
            role: "member",
            team: teams[1]._id
        },
        {
            name: "Mia Lin",
            email: "mia.lin@example.com",
            role: "member",
            team: teams[0]._id
        }
    ]);
    await Team.updateOne({ _id: teams[0]._id }, { $set: { members: [users[0]._id, users[2]._id] } });
    await Team.updateOne({ _id: teams[1]._id }, { $set: { members: [users[1]._id] } });
    const activities = await Activity.create([
        {
            user: users[0]._id,
            activityType: "Trail Run",
            durationMinutes: 52,
            distanceKilometers: 10.4,
            caloriesBurned: 760,
            date: new Date("2026-06-01T07:15:00Z")
        },
        {
            user: users[1]._id,
            activityType: "Open Water Swim",
            durationMinutes: 38,
            distanceKilometers: 2.2,
            caloriesBurned: 440,
            date: new Date("2026-06-02T10:00:00Z")
        },
        {
            user: users[2]._id,
            activityType: "HIIT Session",
            durationMinutes: 28,
            caloriesBurned: 390,
            date: new Date("2026-06-03T18:30:00Z")
        }
    ]);
    const workouts = await Workout.create([
        {
            user: users[0]._id,
            title: "Strength Circuit",
            description: "Full-body resistance training with kettlebells and bodyweight drills.",
            durationMinutes: 45,
            intensity: "High",
            scheduledAt: new Date("2026-06-05T06:30:00Z"),
            completed: false
        },
        {
            user: users[1]._id,
            title: "Recovery Swim",
            description: "Low-impact recovery workout that focuses on breathing and form.",
            durationMinutes: 35,
            intensity: "Medium",
            scheduledAt: new Date("2026-06-06T09:00:00Z"),
            completed: false
        }
    ]);
    const leaderboardEntries = await LeaderboardEntry.create([
        {
            entityType: "user",
            entityId: users[0]._id,
            entityName: "Ava Summers",
            score: 980,
            rank: 1,
            category: "weekly"
        },
        {
            entityType: "team",
            entityId: teams[0]._id,
            entityName: "Team Hydra",
            score: 1440,
            rank: 1,
            category: "team"
        },
        {
            entityType: "user",
            entityId: users[1]._id,
            entityName: "Noah Patel",
            score: 850,
            rank: 2,
            category: "weekly"
        }
    ]);
    console.log(`Seed complete:`);
    console.log(`  users: ${users.length}`);
    console.log(`  teams: ${teams.length}`);
    console.log(`  activities: ${activities.length}`);
    console.log(`  workouts: ${workouts.length}`);
    console.log(`  leaderboard entries: ${leaderboardEntries.length}`);
    await mongoose.disconnect();
}
seed().catch((error) => {
    console.error("Seed script error:", error);
    process.exit(1);
});
