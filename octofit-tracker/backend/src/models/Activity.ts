import { Document, Schema, model, Types } from "mongoose";

export interface ActivityDocument extends Document {
  user: Types.ObjectId;
  activityType: string;
  durationMinutes: number;
  distanceKilometers?: number;
  caloriesBurned: number;
  date: Date;
}

const activitySchema = new Schema<ActivityDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    activityType: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    distanceKilometers: { type: Number },
    caloriesBurned: { type: Number, required: true },
    date: { type: Date, required: true }
  },
  { timestamps: false }
);

export default model<ActivityDocument>("Activity", activitySchema);
