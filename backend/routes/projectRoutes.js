import express from "express";

import {
  createProject,
  updateProject,
  deleteProject,
  getProjectForManager,
  getProjectById,
  changeProjectStatus,
  getProjectByUserReq
} from "../Controller/projectController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

import { checkPermission } from "../middleware/checkPermission.js";

const router = express.Router();

//  create project
router.post("/project/createproject", authMiddleware,checkPermission("CREATE_PROJECT"),createProject);
router.get("/project/user",authMiddleware,getProjectByUserReq)



// update project
router.patch('/update/project/:id',authMiddleware,checkPermission('UPDATE_PROJECT'),updateProject)


// delete project 
router.delete(
  "/project/deleteproject/:id",
  authMiddleware,
  checkPermission("DELETE_PROJECT"),
deleteProject
);




// view project // default permission to all   this is using projectid 
router.get('/viewproject/:id',authMiddleware,checkPermission("VIEW_PROJECT"),getProjectById)




// get porjetc using employee _id this is using employeee id 
router.get('/manager/:employee_id',authMiddleware,checkPermission("VIEW_PROJECT"),getProjectForManager)




router.patch('/project/status/:id',authMiddleware,changeProjectStatus)
export default router;
