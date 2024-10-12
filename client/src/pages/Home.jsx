import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MoreInfoFunc from '../components/MoreInfoFunc';
import PostCard from '../components/PostCard';

function Home() {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/post/getposts');
        const data = await res.json();
        setPosts(data.posts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="dark:bg-slate-900 bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative">
        <div className="bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 p-10 lg:p-28 text-center text-white rounded-b-3xl shadow-lg">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">Welcome to CodeCraft</h1>
          <p className="text-sm lg:text-lg mb-6">
            Unlock the secrets of modern web development with insights on JavaScript, React, Next.js, and more. Let’s build tomorrow’s web today.
          </p>
          <Link to="/search" className="text-sm lg:text-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-300 shadow-md">
            Explore All Posts
          </Link>
        </div>
        {/* Decorative overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-slate-900"></div>
      </div>

      {/* More Info Section */}
      <div className="p-6 bg-gray-100 dark:bg-slate-800 shadow-md rounded-md my-10">
        <h2 className="text-2xl lg:text-3xl font-bold text-center mb-6 dark:text-gray-200">Why Choose CodeCraft?</h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-4">
          Dive into tutorials, tips, and best practices from seasoned developers. Learn the intricacies of building scalable, performant web applications using the latest technologies.
        </p>
        <div className="text-center">
          <Link to="/about" className="text-teal-500 hover:text-teal-600 font-semibold text-sm lg:text-base dark:text-teal-400 dark:hover:text-teal-300">
            Learn More About Us
          </Link>
        </div>
      </div>

      {/* Recent Posts Section */}
      <div className="max-w-6xl mx-auto p-6 flex flex-col gap-8">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center dark:text-gray-100">Recent Posts</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link to="/search" className="text-teal-500 hover:underline text-center text-lg dark:text-teal-400 dark:hover:text-teal-300">
              View All Posts
            </Link>
          </div>
        )}
      </div>

      {/* More Info Component */}
      <div className="p-6  bg-gray-100 dark:bg-slate-800 mt-10 rounded-md shadow-md">
        <MoreInfoFunc />
      </div>
    </div>
  );
}

export default Home;
