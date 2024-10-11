import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Button, Textarea } from 'flowbite-react';

function Comment({ comment, onLike, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);
    const [isSaving, setIsSaving] = useState(false); // Define isSaving state here
    const currentUser = useSelector((state) => state.user.currentUser);
    const [user, setUser] = useState({});

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/api/user/${comment.userId}`);
                const data = await res.json();
                if (res.ok) {
                    setUser(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        getUser();
    }, [comment]);

    const handleEdit = () => {
        setIsEditing(true);
        setEditedContent(comment.content);
    };

    const handleSave = async () => {
        setIsSaving(true); // Set isSaving to true when saving begins
        try {
            const res = await fetch(`/api/comment/editComment/${comment._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: editedContent,
                }),
                
            });
    
            console.log('Fetch response:', res); // Log the fetch response
    
            if (res.ok) {
                const data = await res.json(); // Handle successful response
                console.log('Comment updated successfully:', data); // Log successful update
                onEdit(comment, editedContent); // Notify the parent about the edited comment
                setIsEditing(false); // Exit editing mode
            } else {
                const errorData = await res.json();
                console.error('Error updating comment:', errorData.message);
            }
        } catch (error) {
            console.error('Error saving comment:', error.message);
        } finally {
            setIsSaving(false); // Ensure this is called after the try-catch
            console.log('Saving completed. isSaving set to false.'); // Log when saving is completed
        }
    };
    

    return (
        <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
            <div className='flex-shrink-0 mr-3'>
                <img className='w-10 h-10 rounded-full bg-gray-200' src={user.profilepicture} alt={user.username} />
            </div>
            <div className='flex-1'>
                <div className='flex items-center mb-1'>
                    <span className='font-bold mr-1 text-xs truncate'>
                        {user ? `@${user.username}` : 'anonymous user'}
                    </span>
                    <span className='text-gray-400 text-xs'>{moment(comment.createdAt).fromNow()}</span>
                </div>
                {isEditing ? (
                    <>
                        <Textarea
                            placeholder="Add a comment..."
                            rows="3"
                            maxLength="200"
                            onChange={(e) => setEditedContent(e.target.value)}
                            value={editedContent}
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-gray-400 transition-colors"
                        />
                        <div className='flex justify-end gap-1'>
                            <Button 
                                type='button' 
                                size='sm' 
                                gradientDuoTone='purpleToBlue' 
                                onClick={handleSave} 
                                disabled={isSaving} // Disable button while saving
                            >
                                {isSaving ? 'Saving...' : 'Save'} {/* Display loading state */}
                            </Button>
                            <Button 
                                type='button' 
                                size='sm' 
                                gradientDuoTone='purpleToBlue' 
                                outline 
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <p className='text-gray-500 pb-2'>{comment.content}</p>
                        <div className='flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2'>
                            <button
                                className={`text-gray-400 hover:text-blue-500 ${currentUser && comment.likes.includes(currentUser._id) && '!text-blue-500'}`}
                                type='button'
                                onClick={() => onLike(comment._id)}
                            >
                                <FaThumbsUp className='text-sm' />
                            </button>
                            <p className='text-gray-400'>
                                {comment.numberOfLikes > 0 
                                    ? `${comment.numberOfLikes} ${comment.numberOfLikes === 1 ? 'like' : 'likes'}`
                                    : '0 like'} 
                            </p>
                            {currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && (
                                <button type='button' onClick={handleEdit} className='text-gray-400 hover:text-red-500'>
                                    Edit
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Comment;

