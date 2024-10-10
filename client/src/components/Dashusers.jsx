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
function DashUsers() {
    const currentUser=useSelector(state=>state.user.currentUser)
    const [users,setusers]=useState([]);
    const[showmore,setshowmore]=useState(true);
    const [showModal,setShowModal]=useState(false);
    const [UserIdtodelete,setUserIdtodelete]=useState(' ')
 useEffect(()=>
 {
  const fetchUsers=async ()=>{
    
     try
     {
        const res = await fetch(`/api/user/getusers`);
        console.log(res);
        if(!res.ok)
        {
            console.log('Cant find users on this user')
        }
        else{
            const data=await res.json();
            console.log("fetched users",data);
            if(data.users.length<9)
            {
                setshowmore(false);
            }
            setusers(data.users);
        }
       
     }catch(error)
     {
        console.log(error.message);
     }
  };
  if(currentUser.isAdmin)
  {
    fetchUsers();
  }
 },[currentUser._id]
 );
 const handleshowmore=async ()=>
    {
       const startIndex =users.length;
       try{
        const res=await fetch(`/api/user/getusers?startIndex=${startIndex}`,{
            method:'GET',
            // headers: {
            //     'Authorization': `Bearer ${token}`, // Replace token with your actual JWT
            //   },
              credentials:'include',

        })
       
        if(res.ok)
        {
            const data=await res.json();
            setusers((prev)=>[...prev,...data.users])
            if(data.users.length<5)
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
    const handledeleteuser=async()=>{
       setShowModal(false);
       try
       {
        const res=await fetch(`http://localhost:3000/api/user/deleteuser/${UserIdtodelete}/${currentUser._id}`,
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
            setusers((prev)=>prev.filter((user)=>user._id!==UserIdtodelete))
        }
       }
       catch(error)
       {
        console.log(error);
       }
    }
 return <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-500 dark:scrollbar-thumb-slate-500'>
    {currentUser.isAdmin&&users.length>0?(
        <>
        <Table hoverable className='shadow-md'>
            <Table.Head>
                <Table.HeadCell>DATE CREATED </Table.HeadCell>
                <Table.HeadCell>User image</Table.HeadCell>
                <Table.HeadCell>Username</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Admin</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {users.map((user)=>(
                <Table.Body className='divide-y' key={user._id}>
                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                        <Table.Cell>
                            {new Date(user.createdAt).toLocaleDateString()}
                        </Table.Cell>
                        <Table.Cell>
                    
                            <img
                            src={user.profilepicture}
                            alt={user.username}
                            className='w-20 h-10 object-cover bg-gray-500'/>
                          
                            
                           

                        </Table.Cell>
                        <Table.Cell>
                                {user.username}
                            </Table.Cell>
                        <Table.Cell>{user.email}</Table.Cell>
                        <Table.Cell>{user.isAdmin?(<FaCheck className='text-green-600'/>):(<FaTimes className='text-red-600'/>)}</Table.Cell>
                        <Table.Cell className='font-medium text-red-500 hover:underline cursor-pointer'>
                            <span onClick={()=>{
                                setShowModal(true);
                                setUserIdtodelete(user._id);
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
        <p>You have no users yet</p>
    )}
     <Modal show={showModal} onClose={()=>{setShowModal(false)}} popup size='md'>

          
<Modal.Header/>
<Modal.Body>
    <div className='text-center'>
     <HiOutlineExclamationCircle className='w-14 h-14 text-gray-400 dark:text-gray-200 mx-auto mb-4'/>
      <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete this User?</h3>
      <div className='flex justify center gap-4'>
        <Button color='failure' onClick={handledeleteuser}>Yes,I'm Sure</Button>
        <Button color='gray' onClick={()=>setShowModal(false)}>No Cancel</Button>
      </div>
    </div>
</Modal.Body>
</Modal>
 </div>
}
export default DashUsers;