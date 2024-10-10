import Post from "../models/post.model.js";
import { errorhandler } from "../utils/error.js";

export const create = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorhandler(403, "You are Not allowed to Create a Post"));
    }
    if (!req.body.title || !req.body.content) {
        return next(errorhandler(400, "Please Provide all required fields"));
    }
    console.log("Original Title:", req.body.title);

    const slug = req.body.title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove invalid characters
    .replace(/\s+/g, '-') // Replace spaces with a single hyphen
    .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
    .replace(/^-|-$/g, '');

    console.log(slug);

    let newSlug = slug;
    let count = 1;
    while (await Post.findOne({ slug: newSlug })) {
        newSlug = `${slug}-${count}`;
        count++;
    }

    console.log("User ID:", req.user.id); 
    const newPost = new Post({
        ...req.body,
        slug: newSlug,
        userId: req.user.id,
    });
    console.log("Post Data:", req.body);


    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        console.error("Error saving post:", error);
        next(error);
    }
};
export const getposts=async (req,res,next)=>
{
   try{
    const startIndex=parseInt(req.query.startIndex)||0;
    const limit=parseInt(req.query.limit)||9;
    const sortDirection=req.query.order==='asc'?1:-1;
    const posts=await Post.find({
        ...(req.query.userId&&{
            userId:req.query.userId
        }),
        ...(req.query.category&&{
            category:req.query.category
        }), ...(req.query.slug&&{
            slug:req.query.slug
        }),
        ...(req.query.postId&&{
            _id:req.query.postId
        }),
        ...(req.query.searchTerm&&{
            $or:[
                {
                    title:{$regex:req.query.searchTerm,$options:'i'}
                },
                {
                    content:{$regex:req.query.searchTerm,$options:'i'}
                },
                
            ]
        }),

        
    } ).sort({updatedAt:sortDirection}).skip(startIndex).limit(limit);
    const totalPost=await Post.countDocuments();
    const now =new Date();
    const monthAgo=new Date(
        now.getFullYear(),
        now.getMonth()-1,
        now.getDate()
    );
    const lastMonthPosts=await Post.countDocuments({
        createdAt:{$gte:monthAgo},

    });
    res.status(200).json({
        posts,
        totalPost,
        lastMonthPosts,

    })
   }catch(error)
   {
    next(error);
   }
}
export const deletepost = async (req, res, next) => {
    try {
      if (!req.user.isAdmin && req.user.id !== req.params.id) {
        return res.status(403).json({ message: 'You are not allowed to delete this post' });
      }
 
      const post = await Post.findById(req.params.postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      await Post.findByIdAndDelete(req.params.postId);
      res.status(200).json({ message: 'The post has been deleted' });
    } catch (error) {
      next(error);
    }
  };
  export const updatepost=async(req,res,next)=>{
    if (!req.user.isAdmin && req.user.id !== req.params.id) {
        return res.status(403).json({ message: 'You are not allowed to Update this post' });
  }
  try{
    const updatedPost=await Post.findByIdAndUpdate(
        req.params.postId,
        {
            $set:{
                title:req.body.title,
                content:req.body.content,
                category:req.body.category,
                image:req.body.image,
            }},{new:true}
           

        
    )
    res.status(200).json(updatedPost);
  }catch(error)
  {
    next(error);
  }
 }