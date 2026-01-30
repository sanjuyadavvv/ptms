import express from 'express'
import { createRole ,deleteRole,getRoles} from '../Controller/roleController.js'
import { authMiddleware } from '../middleware/authMiddleware.js';
import { checkPermission } from '../middleware/checkPermission.js';


const router = express.Router();

// Admin creates a role
router.post("/createrole",authMiddleware,checkPermission("CREATE_ROLE"), createRole);

// Fetch all roles
router.get("/getrole", getRoles);

router.delete("/deleterole/:id",authMiddleware,checkPermission("DELETE_ROLE"),deleteRole)

export default router;