import express from "express";
import { verifyUser } from "../utils/verigyUser.js";
import { createComment } from "../controllers/comment.controller.js";
import { getPostComments } from "../controllers/comment.controller.js";
import { likecomment } from "../controllers/comment.controller.js";
import { editComment } from "../controllers/comment.controller.js";

const router=express.Router();

router.post('/create',verifyUser,createComment);
router.get('/getPostComments/:postId',getPostComments)
router.put('/likeComment/:commentId',verifyUser,likecomment)
router.put('/editComment/:commentId',verifyUser,editComment)
export default router;