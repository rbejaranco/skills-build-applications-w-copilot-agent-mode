import { Schema, model } from "mongoose";
const workoutSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    intensity: { type: String, required: true },
    scheduledAt: { type: Date, required: true },
    completed: { type: Boolean, default: false }
}, { timestamps: false });
export default model("Workout", workoutSchema);
