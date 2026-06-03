import { Document, Schema, model, Types } from "mongoose";

export interface LeaderboardEntryDocument extends Document {
  entityType: "user" | "team";
  entityId: Types.ObjectId;
  entityName: string;
  score: number;
  rank: number;
  category: string;
}

const leaderboardEntrySchema = new Schema<LeaderboardEntryDocument>(
  {
    entityType: { type: String, required: true, enum: ["user", "team"] },
    entityId: { type: Schema.Types.ObjectId, required: true },
    entityName: { type: String, required: true },
    score: { type: Number, required: true },
    rank: { type: Number, required: true },
    category: { type: String, required: true }
  },
  { timestamps: false }
);

export default model<LeaderboardEntryDocument>("LeaderboardEntry", leaderboardEntrySchema);
