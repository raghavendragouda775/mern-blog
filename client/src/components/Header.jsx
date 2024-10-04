import { Navbar, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineSearch} from "react-icons/ai";
import { FaMoon } from "react-icons/fa";


function Header() {
  return (
   <Navbar className='border-b-2 '>
    <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
    <span className='px-2 py-1  bg-gradient-to-r from-indigo-500 via-sky-500 to bg-pink-500 rounded-lg font-serif'>
    Raghu's
    </span>
    Blog
    </Link>
    <form >
        <TextInput
            type='text'
            placeholder='search...'
            rightIcon={AiOutlineSearch}
           className='hidden lg:inline'

        />
        {/* <AiOutlineSearch className='absolute  top-1/2 left-3 transform -translate-y-1/2 text-gray-500'/> */}
    </form>
    <button className='w-12 h-10 lg:hidden ' color='grey'>
        <AiOutlineSearch/>
    </button>
    <div className='flex pr-2'>
    <button className='w-12 h-10 hidden sm:inline ' color='grey'>
        <FaMoon/>
    </button>
    <Link to="/Sign-in">
    <button className='w-16 px-auto h-10 bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-md'>SignIn </button></Link>
    
    </div>
    <Navbar.Collapse>
        <Navbar.Link>
            <Link to='/'>Home</Link>
        </Navbar.Link>
        <Navbar.Link>
            <Link to='/about'>About</Link>
        </Navbar.Link>
        <Navbar.Link>
            <Link to='/projects'>Projects</Link>
        </Navbar.Link>
    </Navbar.Collapse>
   

   </Navbar>
  )
}

export default Header