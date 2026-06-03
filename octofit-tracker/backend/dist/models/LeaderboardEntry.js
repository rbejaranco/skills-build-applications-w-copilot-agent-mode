import { Schema, model } from "mongoose";
const leaderboardEntrySchema = new Schema({
    entityType: { type: String, required: true, enum: ["user", "team"] },
    entityId: { type: Schema.Types.ObjectId, required: true },
    entityName: { type: String, required: true },
    score: { type: Number, required: true },
    rank: { type: Number, required: true },
    category: { type: String, required: true }
}, { timestamps: false });
export default model("LeaderboardEntry", leaderboardEntrySchema);
