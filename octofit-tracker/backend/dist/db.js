import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";
export function connectDatabase() {
    return mongoose.connect(MONGODB_URI);
}
