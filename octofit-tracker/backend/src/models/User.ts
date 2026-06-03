import { Document, Schema, model, Types } from "mongoose";

export interface UserDocument extends Document {
  name: string;
  email: string;
  role: string;
  team?: Types.ObjectId;
  createdAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: "member" },
    team: { type: Schema.Types.ObjectId, ref: "Team" },
    createdAt: { type: Date, default: () => new Date() }
  },
  { timestamps: false }
);

export default model<UserDocument>("User", userSchema);
