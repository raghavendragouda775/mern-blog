import { Footer } from 'flowbite-react';
import React from 'react'
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram , BsTwitterX ,BsGithub} from "react-icons/bs";
function Footercomp() {
  return (
   <Footer container className='border border-t-8 border-teal-500'>
    <div className='w-full max-w-7xl mx-auto '>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
            <div className='mt-5 '>
            <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
    <span className='px-2 py-1  bg-gradient-to-r from-indigo-500 via-sky-500 to bg-pink-500 rounded-lg font-serif'>
    Raghu's
    </span>
    Blog
    </Link>
            </div>
            <div className='grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3 mt-6 -mr-24'>
                <div>
                    <Footer.Title title='About' className='mb-2 font-bold text-gray-900 text-lg'/>
                    <Footer.LinkGroup col>
                        <Footer.Link
                        href='https://www.100jsprojects.com'
                        target='_blank'
                        rel='noopener noreferrer'>100 JS Projects</Footer.Link>
                        <Footer.Link
                        href='/about'
                        target='_blank'
                        rel='noopener noreferrer'>Raghu's Blog</Footer.Link>
                    </Footer.LinkGroup>

                </div>
                <div>
                    <Footer.Title title='Follow Us ' className='mb-2 font-bold text-lg text-gray-900'/>
                    <Footer.LinkGroup col>
                        <Footer.Link
                        href='https://www.100jsprojects.com'
                        target='_blank'
                        rel='noopener noreferrer'>100 JS Projects</Footer.Link>
                        <Footer.Link
                        href='/about'
                        target='_blank'
                        rel='noopener noreferrer'>Raghu's Blog</Footer.Link>
                    </Footer.LinkGroup>
                    
                </div>
                <div>
                    <Footer.Title title='Legal'className='mb-2  font-bold text-gray-900 text-lg'/>
                    <Footer.LinkGroup col>
                        <Footer.Link
                        href='https://www.100jsprojects.com'
                        target='_blank'
                        rel='noopener noreferrer'><span>Privacy policy</span></Footer.Link>
                        <Footer.Link
                        href='#'
                        target='_blank'
                        rel='noopener noreferrer'>Discord</Footer.Link>
                    </Footer.LinkGroup>
                    
                </div>
            </div>
        </div>
        <Footer.Divider/>
        <div className="w-full sm:flex sm:items-center sm:justify-between p-4 mt-2 bg-gray-800 text-white">
    <Footer.Copyright
        href="#"
        by="Raghu's Blog"
        year={new Date().getFullYear()}
        className="text-center sm:text-left mb-4 sm:mb-0"
    />
    <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
        <Footer.Icon href="#" icon={BsFacebook} className="transition duration-300 ease-in-out hover:text-blue-500" />
        <Footer.Icon href="#" icon={BsTwitterX} className="transition duration-300 ease-in-out hover:text-blue-400" />
        <Footer.Icon href="#" icon={BsInstagram} className="transition duration-300 ease-in-out hover:text-pink-400" />
        <Footer.Icon href="#" icon={BsGithub} className="transition duration-300 ease-in-out hover:text-gray-300" />
    </div>
</div>

       
    </div>
   </Footer>
  )
}

export default Footercomp;