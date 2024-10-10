import { current } from '@reduxjs/toolkit';
import { Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function DashPosts() {
    const currentUser=useSelector(state=>state.user.currentUser)
    const [userposts,setuserposts]=useState([]);
    console.log(userposts);
 useEffect(()=>
 {
  const fetchPosts=async ()=>{
    
     try
     {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        if(!res.ok)
        {
            console.log('Cant find Blog on this user')
        }
        else{
            const data=await res.json();
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
                            <Link   to='/post/${post.slug}'>
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
                            <span>
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
        
        </>
    ):(
        <p>You have no posts yet</p>
    )}
 </div>
}

export default DashPosts