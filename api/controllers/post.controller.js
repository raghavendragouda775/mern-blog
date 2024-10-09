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
