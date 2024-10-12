import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/Dashusers';
import DashComments from '../components/DashComments';

function Dashboard() {
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
   <div className='min-h-screen flex flex-col md:flex-row'>
    <div>
    <DashSidebar/>
    </div>
  {tab==='profile'&&<DashProfile/>}
  {tab==='posts'&&<DashPosts/>}
  {tab==='users'&&<DashUsers/>}
  {tab==='comments'&&<DashComments/>}
   
   </div>
  )
}

export default Dashboard;