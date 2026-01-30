import express from "express";
import {
  createTask,
  getAllTasks,
  getTasksByProject,
  updateTask,
  deleteTask,
  ReassignTask,
  getTaskForUser,
  changeTaskStatus,
  getUserTaskCountByStatus,
  addComment,
  getTaskByTaskId
} from "../Controller/taskController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { checkPermission } from "../middleware/checkPermission.js";

const router = express.Router();

// create task
router.post("/createtask",authMiddleware,checkPermission("CREATE_TASK"), createTask);

// get all tasks
router.get("/getalltask",authMiddleware,checkPermission("VIEW_ALLTASK"), getAllTasks);

// get tasks by project
router.get("/task/project/:project_id",authMiddleware,checkPermission("VIEW_PROJECT"), getTasksByProject);

// delete task
router.delete("/deletetask/:id",authMiddleware,checkPermission("DELETE_TASK"),deleteTask);

// get tasks for user
router.get("/task/user",authMiddleware, getTaskForUser);

// get task by id
router.get("/task/:id",authMiddleware,checkPermission("VIEW_TASK") ,getTaskByTaskId);

// change status
router.patch("/task/status/:id", authMiddleware,changeTaskStatus);

// user task count by status
router.get("/task/user/:id/counts", getUserTaskCountByStatus);

// add comment
router.post("/task/addcomment/:id",authMiddleware ,addComment);

// reassign task
router.patch("/task/reassign/:id",authMiddleware, ReassignTask);

// update task
router.patch("/task/update/:id",authMiddleware,checkPermission("UPDATE_TASK"), updateTask);


export default router;
