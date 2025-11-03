import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
        regd: string;
        // email: string;
        password: string;
}

const userSchema: Schema = new Schema<IUser>({
        regd: { type: String, required: true },
        // email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
});

// SAFE EXPORT (avoid OverwriteModelError)
const hostelUserModel = mongoose.models.HostelUser || mongoose.model<IUser>("HostelUser", userSchema);
export default hostelUserModel;