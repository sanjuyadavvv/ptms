import express from "express";
import { addPermissionToUser, createPermission, getRolePermissions } from "../Controller/permissionController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { checkPermission } from "../middleware/checkPermission.js";
import { removePermissionFromUser } from "../Controller/permissionController.js";
import { addMultiplePermissionsToUser } from "../Controller/permissionController.js";
import { getALLPermissions } from "../Controller/permissionController.js";
import { removeRolePermission } from "../Controller/permissionController.js";
import { addPermissionByRole } from "../Controller/roleController.js";
const router = express.Router();

router.post("/createpermission", authMiddleware,checkPermission('CREATE_PERMISSION'),createPermission);
// router.post("/addpermission/:id/:permissionname",authMiddleware,checkPermission("ASSIGN_PERMISSION"),addPermissionToUser)
router.delete("/removepermission/:id/:permissionname",authMiddleware,checkPermission("REMOVE_PERMISSION"), removePermissionFromUser);

router.post( "/addpermissions/:id",
  authMiddleware,
  checkPermission("ASSIGN_PERMISSION"),
  addMultiplePermissionsToUser
)


router.get('/allperms',authMiddleware,getALLPermissions)



router.get('/rolepermission/:id',authMiddleware,getRolePermissions)
router.delete("/removerolepermission/:id/:permissionId",authMiddleware,checkPermission("REMOVE_PERMISSION"),removeRolePermission);


router.post( "/addrolepermissions/:id",
  authMiddleware,
  checkPermission("ASSIGN_PERMISSION"),
  addPermissionByRole
)


export default router;
