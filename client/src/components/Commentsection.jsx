import { Button, Textarea } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Comment from './comment';

function Commentsection({ postId }) {
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.user.currentUser);
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState(null);
    const [comments, setComments] = useState([]);
    console.log(comments);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (comment.length > 200) return;

        try {
            const res = await fetch('/api/comment/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: comment, postId, userId: currentUser._id })
            });
            const data = await res.json();
            if (res.ok) {
                setComment('');
                setCommentError(null);
                setComments([data, ...comments]); // Add the new comment to the state
            }
        } catch (error) {
            setCommentError(error.message);
        }
    };

    useEffect(() => {
        const getComments = async () => {
            try {
                const res = await fetch(`/api/comment/getPostComments/${postId}`);
                if (res.ok) {
                    const data = await res.json();
                    setComments(data); 
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        getComments();
    }, [postId]);

    const handleLike = async (commentId) => {
        try {
            if (!currentUser) {
                navigate('/Sign-in');
                return;
            }

            const res = await fetch(`/api/comment/likeComment/${commentId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });

            if (res.ok) {
                const data = await res.json();
                
                setComments(comments.map((comment) =>
                    comment._id === commentId
                        ? {
                            ...comment,
                            likes: data.likes || [], 
                            numberOfLikes: data.numberOfLikes || 0, 
                        }
                        : comment
                ));
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    const handleEdit=async(comment,editedContent)=>
    {
        setComments(
            comments.map((c)=>
            c._id===comment._id?{...c,content:editedContent}:c)
        );
    }

    return (
        <div className='max-w-2xl mx-auto w-full p-3'>
            {currentUser ? (
                <div className='flex items-center gap-1 my-5 text-gray-400 text-sm'>
                    <p>Signed in as:</p>
                    <img src={currentUser.profilepicture} className='h-5 w-5 object-cover rounded-full' alt='' />
                    <Link to={'/dashboard?tab=profile'} className='text-xs text-cyan-600 hover:underline'>
                        @{currentUser.username}
                    </Link>
                </div>
            ) : (
                <div className='text-sm text-red-500 my-5'>
                    You must be signed in to comment
                    <Link className='text-black hover:underline ml-2' to={'/Sign-in'}>Sign In</Link>
                </div>
            )}

            {currentUser && (
                <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="mb-4">
                        <Textarea
                            placeholder="Add a comment..."
                            rows="3"
                            maxLength="200"
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-gray-400 transition-colors"
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-600">{200 - comment.length} characters remaining</p>
                        <Button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-colors">
                            Submit
                        </Button>
                    </div>
                    {commentError && <p className="text-red-500 text-sm mt-4">{commentError}</p>}
                </form>
            )}

            {comments.length === 0 ? (
                <p className='text-sm my-5'>No comments yet!</p>
            ) : (
                <>
                    <div className='flex gap-1 text-sm my-5 items-center'>
                        <p>Comments</p>
                        <div className='border border-gray-400 px-1 rounded-sm text-center'>
                            <p>{comments.length}</p>
                        </div>
                    </div>
                    {comments.map((comment) => (
                        <Comment key={comment._id} comment={comment} onLike={handleLike} onEdit={handleEdit} />
                    ))}
                </>
            )}
        </div>
    );
}

export default Commentsection;


