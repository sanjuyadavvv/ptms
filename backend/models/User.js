import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },

    is_active: {
      type: String,
      enum: ["ACTIVATE", "DEACTIVATE"],
      default: "ACTIVATE",
    },
    permissions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Permission" }
    ],
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
