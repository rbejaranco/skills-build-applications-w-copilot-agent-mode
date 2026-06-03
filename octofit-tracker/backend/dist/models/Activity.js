import { Schema, model } from "mongoose";
const activitySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    activityType: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    distanceKilometers: { type: Number },
    caloriesBurned: { type: Number, required: true },
    date: { type: Date, required: true }
}, { timestamps: false });
export default model("Activity", activitySchema);
