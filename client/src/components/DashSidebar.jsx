import { Sidebar } from 'flowbite-react'
import React from 'react'
import { HiUser } from "react-icons/hi";
import { HiArrowSmRight } from "react-icons/hi";
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';


function DashSidebar() {
    const location=useLocation()
const [tab,setTab]=useState('');
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
                
                <Sidebar.Item  icon={HiArrowSmRight} href="/signout"label={'user'} labelColor='dark'>
                    Sign Out
                </Sidebar.Item>
                

            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar