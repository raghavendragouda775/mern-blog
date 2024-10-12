import { errorhandler } from "../utils/error.js";
import Comment from "../models/comment.model.js";

export const createComment=async(req,res,next)=>{
    try{
        const{content,userId,postId}=req.body;
        if(userId!==req.user.id)
        {
            return next(errorhandler(403,'You Cant comment,Unauthorized!'))
        }
        const newComment=new Comment({

            content,
            userId,
            postId
        })
        await newComment.save();
        res.status(201).json(newComment);
    }catch(error)
    {
        next(error);
    }
}
export const getPostComments=async (req,res,next)=>{
    try{
    const comments=await Comment.find({postId:req.params.postId}).sort({
        createdAt:-1,
    })
    console.log("cmments",comments)
    res.status(200).json(comments);
    }catch(error)
    {
        next(error);
    }
}
// export const likecomment = async (req, res, next) => {
//     try {
//         const comment = await Comment.findById(req.params.commentId);
//         if (!comment) {
//             return next(errorhandler(404, 'Comment not found'));
//         }

//         const userIndex = comment.likes.indexOf(req.user.id);
//         if (userIndex === -1) {
//             comment.numberOfLikes += 1;
//             comment.likes.push(req.user.id);
//         } else {
//             comment.numberOfLikes -= 1;
//             comment.likes.splice(userIndex, 1);
//         }
//         await comment.save();

        
//         res.status(200).json({
//             likes: comment.likes,
//             numberOfLikes: comment.numberOfLikes, 
//         });
//     } catch (error) {
//         next(error);
//     }
// };
export const likecomment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId);

        if (!comment) {
            return next(errorhandler(404, 'Comment not found'));
        }

        
        const userIndex = comment.likes.indexOf(req.user.id);
        if (userIndex === -1) {
           
            comment.numberOfLikes += 1;
            comment.likes.push(req.user.id);
        } else {
            
            comment.numberOfLikes = Math.max(0, comment.numberOfLikes - 1); 
        }

        
        await comment.save();

       
        res.status(200).json({
            likes: comment.likes,
            numberOfLikes: comment.numberOfLikes,
        });
    } catch (error) {
        next(error);
    }
};
export const editComment=async(req,res,next)=>
{
    try {
        const comment=await Comment.findById(req.params.commentId);
        if(!comment)
        {
            return next(errorhandler(404,'Comment Not Found'))
        }
        if(comment.userId!==req.user.id&&!req.user.isAdmin)
        {
            return next(errorhandler(403,'You are not allowed to edit this Comment'));
        }
        const editedcomment=await Comment.findByIdAndUpdate(req.params.commentId,
        {
            content:req.body.content,
        },{new:true}
    )
    res.status(200).json(editedcomment);
    } catch (error) {
        next(error);
    }
}
export const deleteComment=async(req,res,next)=>
{
    try {
        const comment=await Comment.findById(req.params.commentId);
        if(!comment)
        {
            return next(errorhandler(404,'Comment Not Found'))
        }
        if(comment.userId!==req.user.id&&!req.user.isAdmin)
        {
            return next(errorhandler(403,'You are not allowed to delete this Comment'));
        }
        await Comment.findByIdAndDelete(req.params.commentId)
        res.status(200).json({message:'Comment has been deleted'})
    } catch (error) {
        
    }

}