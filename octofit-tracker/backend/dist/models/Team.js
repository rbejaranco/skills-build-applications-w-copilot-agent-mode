import { Schema, model } from "mongoose";
const teamSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    createdAt: { type: Date, default: () => new Date() }
}, { timestamps: false });
export default model("Team", teamSchema);
