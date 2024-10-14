import { Button, Select, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';

function Search() {
    const navigate=useNavigate()
    const location=useLocation();
    const[sidebarData, setSidebarData]=useState({
        searchTerm:'',
        sort:'desc',
        category:'uncategorized',
    });
    const[posts,setPosts]=useState([])
    const[loading,setloading]=useState(false);
    const[showMore,setShowMore]=useState(false);
    useEffect(()=>{
     const urlParams=new URLSearchParams(location.search)
     const searchTermFromUrl=urlParams.get('searchTerm')
     const sortFromUrl=urlParams.get('sort')
     const categoryFromUrl=urlParams.get('category');
     console.log("Search Term:", searchTermFromUrl);
     console.log("Sort Order:", sortFromUrl);
     console.log("Category:", categoryFromUrl);
     if(searchTermFromUrl||sortFromUrl||categoryFromUrl)
     {
        setSidebarData({...sidebarData,searchTerm:searchTermFromUrl,
            sort:sortFromUrl,category:categoryFromUrl
      } )
     }
     const fetchPosts=async()=>{
        setloading(true)
        const searchQuery=urlParams.toString();
        const res=await fetch(`/api/post/getposts?${searchQuery}`);
        if(!res.ok)
        {
           setloading(false);
           return; 
        }
        if(res.ok)
        {
            const data=await res.json();
            setPosts(data.posts);
            console.log(data.posts)
            setloading(false);
            if(data.posts.length===9)
            {
                setShowMore(true);
            }
            else{
                setShowMore(false);
            }
        }
     }
     fetchPosts();
    },[location.search])
    const handleChange=(e)=>{
        if(e.target.id==='searchTerm')
        {
            setSidebarData({...sidebarData,searchTerm:e.target.value})
        }
        if(e.target.id==='sort')
        {
            const order=e.target.value||'desc';
            
            setSidebarData({...sidebarData,sort:order})

        }
        if(e.target.id==='category')
            {
                const category=e.target.value||'uncategorized';
                console.log("category",category);
                
                setSidebarData({...sidebarData,category:category})
                
            }
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        const urlParams=new URLSearchParams(location.search)
        urlParams.set('searchTerm',sidebarData.searchTerm)
        urlParams.set('sort',sidebarData.sort)
        urlParams.set('category',sidebarData.category)
        const searchQuery=urlParams.toString();
        navigate(`/search?${searchQuery}`);
        
    }
    const handleShowmore= async()=>{
        const numberofPosts=posts.length;
        const startIndex=numberofPosts;
        const urlParams =new URLSearchParams(location.search);
        urlParams.get('startIndex',startIndex);
        const searchQuery=urlParams.toString();
        const res=await fetch(`/api/post/getposts?${searchQuery}`)
        if(!res.ok)
        {
            console.log("can't fetch the Blogs")
            return;
        }
        if(res.ok)
        {
            const data=await res.json();
            setPosts((prevPosts) => [...prevPosts, ...data.posts]);  // Correctly appending new posts

            if(data.posts.length===9)
            {
                setShowMore(true);
            }
            setShowMore(false)
        }
    }
  return (
    <div className='flex flex-col md:flex-row'>
        <div className='p-7 border-b md:border-r md:min-h-screen border-gray-500'>
            <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
                <div className='flex items-center gap-2'>
                    <label className='whitespace-nowrap font-semibold'>Search Term:</label>
                    <TextInput placeholder='Search...'id='searchTerm' type='text' value={sidebarData.searchTerm} onChange={handleChange}></TextInput>
                </div>
                <div className='flex items-center gap-2'>
                    <label className='font-semibold'>Sort</label>
                    <Select onChange={handleChange} value={sidebarData.sort} id='sort'>
                        <option value='desc'>
                            Latest
                        </option>
                        <option value='asc'>
                            oldest
                        </option>
                    </Select>
                </div>
                <div className='flex items-center gap-2'>
                    <label className='font-semibold'>Category</label>
                    <Select onChange={handleChange} value={sidebarData.category} id='category'>
                        <option value='uncategorized'>
                            uncategorized
                        </option>
                        <option value='reactjs'>
                            ReactJs
                        </option>
                        <option value='nextjs'>
                            NextJs
                        </option>
                        <option value='javascript'>
                            JavaScript
                        </option>
                    </Select>
                </div>
                <Button type='submit' outline gradientDuoTone='purpleToPink'>
                    Apply Filters
                </Button>
            </form>
        </div>
        <div className='w-full'>
            <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5'>Posts results:</h1>
            <div className='p-7 flex flex-wrap gap-4'>
                     {
                        !loading&&posts.length===0&&(
                            <p className='text-xl text-gray-500'>No Posts Found</p>
                        )
                     }
                     {
                        loading&&<p className='text-xl text-gray-500'>Loading...</p>
                     }
                     {
                        !loading&&posts&&posts.map((post)=>{
                           return <PostCard key={post._id} post={post}/>
                         
                           })
                     }
                       {
                             showMore&&<button onClick={handleShowmore} className='text-teal-500 text-lg hover:underline p-7'>
                                Show More
                             </button>
                           }
            </div>
        </div>
    </div>
  )
}

export default Search