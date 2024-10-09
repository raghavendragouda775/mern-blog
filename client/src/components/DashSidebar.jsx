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


function DashSidebar() {
    const location=useLocation()
    const dispatch=useDispatch();
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
            <Sidebar.ItemGroup>
                
                <Sidebar.Item active={tab==='profile'} href="/dashboard?tab=profile" icon={HiUser} label={'user'} labelColor='dark'>
                    Profile
                </Sidebar.Item>
                
                <Sidebar.Item  icon={HiArrowSmRight} href="/signout"label={'user'} labelColor='dark' onClick={handleSignOut}>
                    Sign Out
                </Sidebar.Item>
                

            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar