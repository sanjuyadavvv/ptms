// import mongoose from "mongoose";

// const taskSchema = new mongoose.Schema(
//   {
//     project_id: {
//       type:mongoose.Schema.Types.ObjectId,
//       ref: "Project",
//       required: true,
//     },
//     title: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//     },
//     status: {
//       type: String,
//       enum: ["TODO", "IN_PROGRESS", "DONE"],
//       default: "TODO",
//     },
//     priority: {
//       type: String,
//       enum: ["LOW", "MEDIUM", "HIGH"],
//       default: "MEDIUM",
//     },
//     assigned_to: {
//      type:mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     due_date: {
//       type: Date,
//       required: true,
//     },
//     estimated_time: {
//       type: Number, // in hours
//     },
//     actual_time: {
//       type: Number, // in hours
//       default: 0,
//     },
//   },
//   { timestamps: true }
// );

// const Task = mongoose.model("Task", taskSchema);
// export default Task;







import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["TODO", "IN_PROGRESS", "BLOCKED", "REVIEW", "DONE"],
      default: "TODO",
    },

    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      default: "MEDIUM",
    },

    assigned_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    due_date: {
      type: Date,
      required: true,
    },

    estimated_time: {
      type: Number, // hours
      required: true,
    },

    actual_time: {
      type: Number, // hours
      default: 0,
    },

    dependency_type: {
      type: String,
      enum: ["INTERNAL", "EXTERNAL", "APPROVAL"],

    },

    dependency_description: {
      type: String,
    },

    blocked_by_task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      default: null,
    },

    blocked_by_external_party: {
      type: String, // team name / vendor / client
      default: null,
    },
    comments: [
  {
    text: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now }
  }
]
  },
  
  {
    timestamps: true,
  }
);


const Task=mongoose.model("Task",taskSchema)
export default Task






