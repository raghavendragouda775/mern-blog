import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signOutSuccess } from '../redux/User/UserSlice';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate=useNavigate();
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const { theme } = useSelector((state) => state.theme);
  const[searchTerm,setSearchTerm]=useState('');
  const location =useLocation();
  console.log("loaction search",location.search);
  console.log("searchTerm",searchTerm);

  useEffect(()=>{
       const urlParams=new URLSearchParams(location.search)
       console.log("urlparams:",urlParams);
       const searchTermFromUrl=urlParams.get('searchTerm')
       console.log("SearchFromUrls",searchTermFromUrl);
       if(searchTermFromUrl)
       {
          setSearchTerm(searchTermFromUrl)
       }
  },[location.search])

  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
    const urlParams=new URLSearchParams(location.search)
    urlParams.set('searchTerm',searchTerm)
    const searchQuery=urlParams.toString();
    console.log("searchQuery:",searchQuery);
    navigate(`/search?${searchQuery}`);
  }

  const profilePicture = currentUser?.profilePicture || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

  return (
    <Navbar className="border-b-2 flex justify-between items-center px-4 py-2">
      <Link to="/" className="self-center text-sm sm:text-xl font-semibold dark:text-white">
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-sky-500 to-pink-500 rounded-lg font-serif">
          Raghu's
        </span>
        Blog
      </Link>

      <form className="hidden lg:flex" onSubmit={handleSubmit}>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="lg:inline mb-2"
          value={searchTerm}
          onChange={(e)=>setSearchTerm(e.target.value)}
        />
      </form>

      <Button className="lg:hidden" color="gray">
        <AiOutlineSearch />
      </Button>

      <div className="flex items-center gap-4 relative">
        <Button className="hidden sm:inline w-12 h-10" color="gray" onClick={() => {
          dispatch(toggleTheme());
        }}>
          {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button>

        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="user" img={profilePicture} rounded />}
            className="relative"
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">{currentUser.email}</span>
            </Dropdown.Header>
            <Link to="/dashboard?tab=profile">
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign In
            </Button>
          </Link>
        )}

        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        <Navbar.Link active={path === '/'} as="div">
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'} as="div">
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/projects'} as="div">
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

