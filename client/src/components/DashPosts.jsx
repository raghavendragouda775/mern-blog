import { current } from '@reduxjs/toolkit';
import { Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal } from 'flowbite-react';
import { Button } from 'flowbite-react';
import { HiOutlineExclamationCircle } from "react-icons/hi";

function DashPosts() {
    const currentUser=useSelector(state=>state.user.currentUser)
    const [userposts,setuserposts]=useState([]);
    const[showmore,setshowmore]=useState(true);
    const [showModal,setShowModal]=useState(false);
    const [postIdtodelete,setPostIdtodelete]=useState(' ')
 useEffect(()=>
 {
  const fetchPosts=async ()=>{
    
     try
     {
        const res = await fetch(`http://localhost:3000/api/post/getposts?userId=${currentUser._id}`);
        if(!res.ok)
        {
            console.log('Cant find Blog on this user')
        }
        else{
            const data=await res.json();
            if(data.posts.length<9)
            {
                setshowmore(false);
            }
            setuserposts(data.posts);
        }
       
     }catch(error)
     {
        console.log(error.message);
     }
  };
  if(currentUser.isAdmin)
  {
    fetchPosts();
  }
 },[currentUser._id]
 );
 const handleshowmore=async ()=>
    {
       const startIndex =userposts.length;
       try{
        const res=await fetch(`http://localhost:3000/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`)
       
        if(res.ok)
        {
            const data=await res.json();
            setuserposts((prev)=>[...prev,...data.posts])
            if(data.posts.length<9)
            {
                setshowmore(false);
            }
        }
       } 
       catch(error)
        {
            console.log(error.message)
        }
    }
    const handledeletpost=async()=>{
       setShowModal(false);
       try
       {
        const res=await fetch(`http://localhost:3000/api/post/deletepost/${postIdtodelete}/${currentUser._id}`,
            {
                method:'DELETE',
                credentials:'include'
            }
        )
        console.log(res);
        const data=await res.json();
        if(!res.ok)
        {
            const errorText = await res.text(); 
            console.log('Error:', errorText);
            return;
        }else
        {
            setuserposts((prev)=>prev.filter((post)=>post._id!==postIdtodelete))
        }
       }
       catch(error)
       {
        console.log(error);
       }
    }
 return <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-500 dark:scrollbar-thumb-slate-500'>
    {currentUser.isAdmin&&userposts.length>0?(
        <>
        <Table hoverable className='shadow-md'>
            <Table.Head>
                <Table.HeadCell>Date updated</Table.HeadCell>
                <Table.HeadCell>Post image</Table.HeadCell>
                <Table.HeadCell>Post title</Table.HeadCell>
                <Table.HeadCell>category</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
                <Table.HeadCell>
                    <span>
                        Edit
                    </span>
                </Table.HeadCell>
            </Table.Head>
            {userposts.map((post)=>(
                <Table.Body className='divide-y'>
                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                        <Table.Cell>
                            {new Date(post.updatedAt).toLocaleDateString()}
                        </Table.Cell>
                        <Table.Cell>
                            <Link   to={`/post/${post.slug}`}>
                            <img
                            src={post.image}
                            alt={post.title}
                            className='w-20 h-10 object-cover bg-gray-500'/>
                          
                            </Link>
                           

                        </Table.Cell>
                        <Table.Cell>
                                <Link className='font-medium text-green-500 dark:text-white' to={`/post${post.slug}`}>{post.title}</Link>
                            </Table.Cell>
                        <Table.Cell>{post.category}</Table.Cell>
                        <Table.Cell className='font-medium text-red-500 hover:underline cursor-pointer'>
                            <span onClick={()=>{
                                setShowModal(true);
                                setPostIdtodelete(post._id);
                            }} >
                                Delete
                            </span>
                        </Table.Cell>
                        <Table.Cell>
                            <Link  className='hover:underline cursor-pointer text-teal-500' to={`/updatepost/${post._id}`} >
                            <span>
                               Edit
                            </span>
                            </Link>

                        </Table.Cell>

                    </Table.Row>
                </Table.Body>
            ))}
        </Table>
        {
            showmore&&(
                <button onClick={handleshowmore} className="w-full py-2 mt-4 text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition duration-300 ease-in-out">
                    Show More
                </button>
            )
        }
        
        </>
    ):(
        <p>You have no posts yet</p>
    )}
     <Modal show={showModal} onClose={()=>{setShowModal(false)}} popup size='md'>

          
<Modal.Header/>
<Modal.Body>
    <div className='text-center'>
     <HiOutlineExclamationCircle className='w-14 h-14 text-gray-400 dark:text-gray-200 mx-auto mb-4'/>
      <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete this post?</h3>
      <div className='flex justify center gap-4'>
        <Button color='failure' onClick={handledeletpost}>Yes,I'm Sure</Button>
        <Button color='gray' onClick={()=>setShowModal(false)}>No Cancel</Button>
      </div>
    </div>
</Modal.Body>
</Modal>
 </div>
}

export default DashPosts