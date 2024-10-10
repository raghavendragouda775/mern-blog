import express  from "express";
import { verifyUser } from "../utils/verigyUser.js";
import { create } from "../controllers/post.controller.js";
import { getposts } from "../controllers/post.controller.js";

const router=express.Router();

router.post("/create",verifyUser,create)
router.get("/getposts",getposts);

export default router;