import express from 'express';
import { createUserByAdmin ,deleteUser,fetchALLUser,getUser, getUserPermissions, googleLogin} from '../Controller/authController.js';

import {getProjectById,createProject,getProjects, updateProject } from '../Controller/projectController.js';
import { createTask,getAllTasks } from '../Controller/taskController.js';

import { fetchEmployees } from '../Controller/authController.js';

import { getProjectForManager } from '../Controller/projectController.js';


import { checkPermission } from '../middleware/checkPermission.js';


import { deleteProject } from '../Controller/projectController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { auth } from 'google-auth-library';


// import { getProjectForManager } from '../Controller/projectController.js';
const router = express.Router();




// add middleware to alllow only admin to create user 
router.post('/createuser',authMiddleware,checkPermission("CREATE_USER"),createUserByAdmin)


// add middleware to allow only admin to view all users 
router.get('/getusers',authMiddleware,checkPermission("VIEW_ALLUSERS"),getUser)

router.get('/emp',authMiddleware,checkPermission("VIEW_ALLEMP"),fetchEmployees)


// add middleware so that only admin and manager can add project

// create porject is working 

// router.post('/createproject',createProject)

// get project for a particular user 
router.get('/getprojects',authMiddleware,checkPermission('VIEW_ALLPROJECT'),getProjects)





// get project by projectid
router.get('/project/:id',getProjectById)
// router.patch('/update/project/:id',updateProject)


//tasks  - only manager and admin can assign tasks

// router.post('/createtask',createTask)
// router.post('/getTasks',getAllTasks)







router.post('/googlelogin',googleLogin)



// this is also working fine 
router.get('/manager/:employee_id',getProjectForManager)


router.get('/userpermissions/:id',authMiddleware,getUserPermissions)

router.get('/permissions/:id',authMiddleware,getUserPermissions)

router.get('/allusers',authMiddleware,fetchALLUser)


router.delete('/deleteuser/:id',authMiddleware,checkPermission('DELETE_USER'),deleteUser)
export default router;
