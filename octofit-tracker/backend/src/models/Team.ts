import { Document, Schema, model, Types } from "mongoose";

export interface TeamDocument extends Document {
  name: string;
  description: string;
  members: Types.ObjectId[];
  createdAt: Date;
}

const teamSchema = new Schema<TeamDocument>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    createdAt: { type: Date, default: () => new Date() }
  },
  { timestamps: false }
);

export default model<TeamDocument>("Team", teamSchema);
