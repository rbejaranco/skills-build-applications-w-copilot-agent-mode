import { Document, Schema, model, Types } from "mongoose";

export interface WorkoutDocument extends Document {
  user: Types.ObjectId;
  title: string;
  description: string;
  durationMinutes: number;
  intensity: string;
  scheduledAt: Date;
  completed: boolean;
}

const workoutSchema = new Schema<WorkoutDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    intensity: { type: String, required: true },
    scheduledAt: { type: Date, required: true },
    completed: { type: Boolean, default: false }
  },
  { timestamps: false }
);

export default model<WorkoutDocument>("Workout", workoutSchema);
