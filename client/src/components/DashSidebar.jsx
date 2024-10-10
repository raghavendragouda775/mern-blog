import { Sidebar } from 'flowbite-react'
import React from 'react'
import { HiUser } from "react-icons/hi";
import { HiArrowSmRight } from "react-icons/hi";
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { signOutSuccess } from '../redux/User/UserSlice';
import { useDispatch } from 'react-redux';
import { HiDocumentText } from "react-icons/hi";
import { useSelector } from 'react-redux';
import { HiOutlineUserGroup } from "react-icons/hi";


function DashSidebar() {
    const location=useLocation()
    const dispatch=useDispatch();
    const currentUser=useSelector(state=>state.user.currentUser)
    console.log(currentUser);
const [tab,setTab]=useState('');
const handleSignOut=async ()=>{
    try{
    const res=await fetch('/api/user/signout',{
        method:'POST',
        credentials:'include'
    })
    const data= await res.json()
    if(!res.ok)
    {
        console.log(data.message);
    }
    else
    {
        dispatch(signOutSuccess())
    }
    
}catch(error)
{
  console.log(error);
}
 }
useEffect(()=>{
   const urlParam=new URLSearchParams(location.search)
   const tabFromUrl=urlParam.get('tab');
 if(tabFromUrl)
 {
  setTab(tabFromUrl)
 }
},[location.search]);

  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup className='flex flex-col gap-2'>
                
                <Sidebar.Item active={tab==='profile'} href="/dashboard?tab=profile" icon={HiUser} label={currentUser.isAdmin?'Admin':'User'} labelColor='dark'>
                    Profile
                </Sidebar.Item>
                {currentUser.isAdmin && (
            <Sidebar.Item
              active={tab === 'posts'}
              href="/dashboard?tab=posts"
              icon={HiDocumentText}
            >
              Posts
            </Sidebar.Item>
          )}
            {currentUser.isAdmin&& (
            <Sidebar.Item
              active={tab === 'users'}
              href="/dashboard?tab=users"
              icon={HiOutlineUserGroup}
            >
              Users
            </Sidebar.Item>
          )}
                
               
                <Sidebar.Item  icon={HiArrowSmRight} href="/Sign-in"label={'user'} labelColor='dark' onClick={handleSignOut}>
                    Sign Out
                </Sidebar.Item>
                

            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar