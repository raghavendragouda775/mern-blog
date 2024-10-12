import { current } from '@reduxjs/toolkit';
import { Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal } from 'flowbite-react';
import { Button } from 'flowbite-react';
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
function DashComments() {
    const currentUser=useSelector(state=>state.user.currentUser)
    const [comments,setComments]=useState([]);
    const[showmore,setshowmore]=useState(true);
    const [showModal,setShowModal]=useState(false);
    const [commentIdtodelete,setcommentIdtodelete]=useState('')
 useEffect(()=>
 {
  const fetchComment=async ()=>{
    
     try
     {
        const res = await fetch(`/api/comment/getComments`);
        console.log(res);
        if(!res.ok)
        {
            console.log('Cant find users on this user')
        }
        else{
            const data=await res.json();
            console.log("fetched users",data);
            if(data.comments.length<9)
            {
                setshowmore(false);
            }
            setComments(data.comments);
        }
       
     }catch(error)
     {
        console.log(error.message);
     }
  };
  if(currentUser.isAdmin)
  {
    fetchComment();
  }
 },[currentUser._id]
 );
 const handleshowmore=async ()=>
    {
       const startIndex =comments.length;
       try{
        const res=await fetch(`/api/comment/getComments?startIndex=${startIndex}`,{
            method:'GET',
            // headers: {
            //     'Authorization': `Bearer ${token}`, // Replace token with your actual JWT
            //   },
              credentials:'include',

        })
       
        if(res.ok)
        {
            const data=await res.json();
            setComments((prev)=>[...prev,...data.comments])
            if(data.users.comments<5)
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
    const handledeleteComment=async()=>{
       setShowModal(false);
       try
       {
        const res=await fetch(`/api/comment/deleteComment/${commentIdtodelete}`,
            {
                method:'DELETE',
                credentials:'include'
            }
        )
        const data=await res.json();
        if(!res.ok)
        {
            const errorText = await res.text(); 
            console.log('Error:', errorText);
            return;
        }else
        {
            setComments((prev)=>prev.filter((comment)=>comment._id!==commentIdtodelete))
            setShowModal(false);
        }
       }
       catch(error)
       {
        console.log(error);
       }
    }
 return <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-500 dark:scrollbar-thumb-slate-500'>
    {currentUser.isAdmin&&comments.length>0?(
        <>
        <Table hoverable className='shadow-md'>
            <Table.Head>
                <Table.HeadCell>DATE updated </Table.HeadCell>
                <Table.HeadCell>Comment Content</Table.HeadCell>
                <Table.HeadCell>Number of Likes</Table.HeadCell>
                <Table.HeadCell>PostId</Table.HeadCell>
                <Table.HeadCell>UserId</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {comments.map((comment)=>(
                <Table.Body className='divide-y' key={comment._id}>
                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                        <Table.Cell>
                            {new Date(comment.updatedAt).toLocaleDateString()}
                        </Table.Cell>
                        <Table.Cell>
                    
                        
                          
                            
                           {comment.content}

                        </Table.Cell>
                        <Table.Cell>
                                {comment.numberOfLikes}
                            </Table.Cell>
                        <Table.Cell>{comment.postId}</Table.Cell>
                        <Table.Cell>{comment.userId}</Table.Cell>
                        <Table.Cell className='font-medium text-red-500 hover:underline cursor-pointer'>
                            <span onClick={()=>{
                                setShowModal(true);
                                setcommentIdtodelete(comment._id);
                            }} >
                                Delete
                            </span>
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
        <p>You have no comment yet</p>
    )}
     <Modal show={showModal} onClose={()=>{setShowModal(false)}} popup size='md'>

          
<Modal.Header/>
<Modal.Body>
    <div className='text-center'>
     <HiOutlineExclamationCircle className='w-14 h-14 text-gray-400 dark:text-gray-200 mx-auto mb-4'/>
      <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete this Comment?</h3>
      <div className='flex justify center gap-4'>
        <Button color='failure' onClick={handledeleteComment}>Yes,I'm Sure</Button>
        <Button color='gray' onClick={()=>setShowModal(false)}>No Cancel</Button>
      </div>
    </div>
</Modal.Body>
</Modal>
 </div>
}
export default DashComments;