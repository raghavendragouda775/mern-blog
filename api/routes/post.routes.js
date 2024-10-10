import express  from "express";
import { verifyUser } from "../utils/verigyUser.js";
import { create } from "../controllers/post.controller.js";
import { getposts } from "../controllers/post.controller.js";
import { deletepost } from "../controllers/post.controller.js";
import { updatepost } from "../controllers/post.controller.js";

const router=express.Router();

router.post("/create",verifyUser,create)
router.get("/getposts",getposts);
router.delete("/deletepost/:postId/:userId",verifyUser,deletepost)
router.put('/updatepost/:postId/:userId',verifyUser,updatepost)

export default router;