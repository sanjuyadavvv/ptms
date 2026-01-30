import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // role ka unique naam hona chahiye
    },
    description: {
      type: String, // optional description about the role
    },
    default_permissions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Permission" }
    ],
  },
  { timestamps: true }
);

const Role = mongoose.model("Role", roleSchema);

export default Role;
