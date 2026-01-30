import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true ,trim:true}, // e.g. CREATE_USER
    description: { type: String }, // optional
  },
  { timestamps: true }
);

const Permission = mongoose.model("Permission", permissionSchema);

export default Permission;





