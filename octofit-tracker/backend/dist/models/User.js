import { Schema, model } from "mongoose";
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: "member" },
    team: { type: Schema.Types.ObjectId, ref: "Team" },
    createdAt: { type: Date, default: () => new Date() }
}, { timestamps: false });
export default model("User", userSchema);
