import express from "express";
import { test } from "../controllers/user.controller.js";
import { updateUser } from "../controllers/user.controller.js";
import { verifyUser } from "../utils/verigyUser.js";
import { deleteUser } from "../controllers/user.controller.js";
const router=express.Router();
router.get("/test",test)
router.put("/update/:id",verifyUser,updateUser);
router.delete('/delete/:id',verifyUser,deleteUser)
export default router;