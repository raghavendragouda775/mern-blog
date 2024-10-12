import { Button, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { HiAnnotation, HiArrowNarrowUp, HiDocumentText, HiOutlineUserGroup } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Dashcom() {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [lastMonthUser, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/post/getposts?limit=5');
        if (res.ok) {
          const data = await res.json();
          setPosts(data.posts);
          setTotalPosts(data.totalPost);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/user/getusers?limit=5');
        if (res.ok) {
          const data = await res.json();
          setUsers(data.users);
          setTotalUsers(data.totalusers);
          setLastMonthUsers(data.lastMonthUser);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await fetch('/api/comment/getComments?limit=5');
        if (res.ok) {
          const data = await res.json();
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
      fetchComments();
      fetchPosts();
    }
  }, [currentUser]);

  return (
    <div className="p-3 md:mx-auto">
      {/* Statistics section */}
      <div className="flex-wrap flex gap-4 justify-center">
        {/* Total User Card */}
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 text-md uppercase">Total Users</h3>
              <p className="text-2xl">{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="bg-teal-600 text-white rounded-full p-3 text-5xl shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthUser}
            </span>
            <span className="text-gray-500">Last Month</span>
          </div>
        </div>

        {/* Total Posts Card */}
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 text-md uppercase">Total Posts</h3>
              <p className="text-2xl">{totalPosts}</p>
            </div>
            <HiDocumentText className="bg-indigo-500 text-white rounded-full p-3 text-5xl shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthPosts}
            </span>
            <span className="text-gray-500">Last Month</span>
          </div>
        </div>

        {/* Total Comments Card */}
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 text-md uppercase">Total Comments</h3>
              <p className="text-2xl">{totalComments}</p>
            </div>
            <HiAnnotation className="bg-teal-600 text-white rounded-full p-3 text-5xl shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthComments}
            </span>
            <span className="text-gray-500">Last Month</span>
          </div>
        </div>
      </div>

      {/* Recent Users and Comments Tables */}
      <div className="flex flex-wrap gap-2 md:flex-row justify-center md:space-x-4 mt-8">
        {/* Recent Users Table 1 */}
        <div className="flex flex-col w-full md:w-1/3 p-2">
          <div className="shadow p-2 dark:bg-gray-800">
            <div className="flex justify-between p-3 font-semibold text-sm">
              <h1 className="text-center p-2">Recent Users</h1>
              <Button outline gradientDuoTone="purpleToPink">
                <Link to={'/dashboard?tab=users'}>See all</Link>
              </Button>
            </div>
            <Table>
              <Table.Head>
                <Table.HeadCell>User Image</Table.HeadCell>
                <Table.HeadCell>Username</Table.HeadCell>
              </Table.Head>
              {users &&
                users.map((user) => (
                  <Table.Body key={user._id} className="divide-y">
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell>
                        <img
                          src={user.profilePicture}
                          alt="user"
                          className="w-10 h-10 rounded-full bg-gray-500"
                        />
                      </Table.Cell>
                      <Table.Cell>{user.username}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
            </Table>
          </div>
        </div>

        {/* Recent Users Table 2 */}
        <div className="flex flex-col w-full md:w-1/3 p-2">
          <div className="shadow p-2 dark:bg-gray-800">
            <div className="flex justify-between p-3 font-semibold text-sm">
              <h1 className="text-center p-2">Recent Posts</h1>
              <Button outline gradientDuoTone="purpleToPink">
                <Link to={'/dashboard?tab=users'}>See all</Link>
              </Button>
            </div>
            <Table>
              <Table.Head>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              </Table.Head>
              {posts &&
                posts.map((post) => (
                    <Table.Body key={post._id} className='divide-y'>
                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                      <Table.Cell>
                        <img
                          src={post.image}
                          alt='user'
                          className='w-14 h-10 rounded-md bg-gray-500'
                        />
                      </Table.Cell>
                      <Table.Cell className='w-96'>{post.title}</Table.Cell>
                      <Table.Cell className='w-5'>{post.category}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
            </Table>
          </div>
        </div>

        {/* Recent Comments Table */}
        <div className="flex flex-col w-full md:w-1/3 p-2">
          <div className="shadow p-2 dark:bg-gray-800">
            <div className="flex justify-between p-3 text-sm font-semibold">
              <h1 className="text-center p-2">Recent Comments</h1>
              <Button outline gradientDuoTone="purpleToPink">
                <Link to={'/dashboard?tab=comments'}>See all</Link>
              </Button>
            </div>
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Comment Content</Table.HeadCell>
                <Table.HeadCell>Likes</Table.HeadCell>
              </Table.Head>
              {comments &&
              comments.map((comment) => (
                <Table.Body key={comment._id} className='divide-y'>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell className='w-96'>
                        <p className='line-clamp-2'>{comment.content}</p>
                    </Table.Cell>
                    <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashcom;
