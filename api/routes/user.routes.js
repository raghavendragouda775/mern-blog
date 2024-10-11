import express from "express";
import { test } from "../controllers/user.controller.js";
import { updateUser } from "../controllers/user.controller.js";
import { verifyUser } from "../utils/verigyUser.js";
import { deleteUser } from "../controllers/user.controller.js";
import { signOut } from "../controllers/user.controller.js";
import { getUsers } from "../controllers/user.controller.js";
import { getUser } from "../controllers/user.controller.js";
const router=express.Router();
router.get("/test",test)
router.put("/update/:id",verifyUser,updateUser);
router.delete('/delete/:userId',verifyUser,deleteUser)
router.post('/signout',signOut);
router.get('/getusers',verifyUser,getUsers)
router.get('/:userId',getUser);
export default router;