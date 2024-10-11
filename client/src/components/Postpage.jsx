import { Link, useParams } from 'react-router-dom'
// useparams is a hook used to get slug

import React, { useEffect, useState } from 'react'
import { Button, Spinner } from 'flowbite-react';
import MoreInfoFunc from './MoreInfoFunc';
import Commentsection from './commentsection';


function Postpage() {
    const {postSlug}=useParams();
    const[loading,setloading]=useState(true);
    const[error,setError]=useState(false)
    const [post,setpost]=useState(null);
    useEffect(()=>{
        const fetchPost=async()=>{
            try{
                // to delay loading 
                // await new Promise(resolve => setTimeout(resolve, 1000));
               setloading(true);
               const res =await fetch(`/api/post/getposts?slug=${postSlug}`)
               console.log(res);
               const data=await res.json();
               if(!res.ok)
               {
                setError(true)
                return ;
               }
               if(res.ok)
               {
                setpost(data.posts[0]);
                setError(false);
                
               }
            }catch(error)
            {
                setError(true);
                
            }finally{
                setloading(false);
            }

        }
        fetchPost();
    },[postSlug]);
    if(loading)
        {
            console.log("loading")
            return(
                <div className='flex items-center justify-center min-h-screen'>
                    <Spinner size='xl'/>
                </div>
            )
        }
       
    
  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
  
    <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl transition duration-300 ease-in-out hover:underline dark:text-gray-100">
        {post && post.title}
    </h1>
    
   
    <Link to={`/search?category=${post && post.category}`} className="self-center mt-5">
        <Button
            color="gray"
            pill
            size="xs"
            className="transition duration-300 ease-in-out hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-gray-200"
        >
            {post && post.category}
        </Button>
    </Link>
    
    <div className="mt-10 flex justify-center">
    <img
        src={post && post.image}
        alt={post && post.title}
        className="p-3 hover:shadow-[0_0_10px_3px_rgba(0,0,0,0.2)] object-cover rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 w-full max-w-[400px] lg:max-w-[500px] mx-auto"
    />
</div>



    

    <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs text-slate-600 dark:text-gray-400">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
            {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
    </div>
    
  
    <div
        className="p-3 max-w-2xl mx-auto w-full post-content text-slate-700 dark:text-gray-300 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
    />
    <div className='max-w-4xl mx-auto w-full'>
        <MoreInfoFunc/>
    </div>
    <Commentsection postId={post._id}/>
</main>


  )
}

export default Postpage