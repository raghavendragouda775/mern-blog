import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector} from 'react-redux';
import { Alert, Button, TextInput } from 'flowbite-react';
import { updateFailure, updateStart, updateSuccess } from '../redux/User/UserSlice';
import { useDispatch } from 'react-redux';
import { Modal} from 'flowbite-react'
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { deleteUserFailure,deleteUserStart,deleteUserSuccess } from '../redux/User/UserSlice';

function DashProfile() {
    const { currentUser,error } = useSelector((state) => state.user);
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [showModal,setShowModal]=useState(false);
    const [updateUserFailure, setupdateFailure] = useState(null);
    console.log("Current User:", currentUser);

   
    const [formdata, setformdata] = useState({
        username: currentUser?.username || '',
        email: currentUser?.email || '',
        password: '',
    });

   
    const dispatch = useDispatch();

    const handlechange = (e) => {
        setformdata({ ...formdata, [e.target.id]: e.target.value });
    };

  
    const handlesubmit = async (e) => {
        e.preventDefault();
        
        
        if (!formdata.username && !formdata.email && !formdata.password) {
            setupdateFailure("No changes made");
            return;
        }

        const isSameData = (currentUser.username === formdata.username &&
            currentUser.email === formdata.email &&
            !formdata.password);

        if (isSameData) {
            setupdateFailure("No changes detected");
            return;
        }

        console.log("Current User ID:", currentUser._id);

        try {
            dispatch(updateStart());
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formdata),
                credentials: 'include',
            });
            const data = await res.json();
            if (!res.ok) {
                dispatch(updateFailure(data.message));
                setupdateFailure(data.message);
            } else {
                dispatch(updateSuccess(data));
                setUpdateUserSuccess("User profile updated successfully");
            }
        } catch (error) {
            dispatch(updateFailure(error.message));
            setupdateFailure(error.message);
        }
    };

    
    useEffect(() => {
        if (currentUser) {
            setformdata({
                username: currentUser.username || '',
                email: currentUser.email || '',
                password: '',
            });
        }
    }, [currentUser]);
    const handledeletUser=async ()=>{
        setShowModal(false);
        try{
             dispatch(deleteUserStart());
             const res=await fetch(`/api/user/delete/${currentUser._id}`,{
                method:'DELETE',
                credentials:'include',
             })
             const data=await res.json();
             if(!res.ok)
             {
                return dispatch(deleteUserFailure(data.message))
             }
             else{
                dispatch(deleteUserSuccess(data))
             }
        }catch(error)
        {
            dispatch(deleteUserFailure(error.message))
        }
    }

    const theme = useSelector((state) => state.theme.theme);
    const currentButtonStyle = theme === 'dark'
        ? 'bg-blue-500 hover:bg-blue-600 text-white transition duration-200 ease-in-out shadow-md'
        : 'bg-blue-400 hover:bg-blue-500 text-white transition duration-200 ease-in-out shadow-sm';

    return (
        <div className='max-w-lg mx-auto p-3 w-full '>
            <h1 className='text-2xl my-11 text-center'>Profile</h1>
            <form className='flex flex-col gap-2 font-bold' onSubmit={handlesubmit}>
                <div className='w-32 h-32 self-center overflow-hidden rounded-full shadow-md'>
                    <img
                        src={currentUser.profilepicture}
                        alt='user'
                        className='rounded-full w-full h-full object-cover border-8 border-[lightgray]' />
                </div>
                <TextInput
                    type='text'
                    id='username'
                    placeholder='Username'
                    value={formdata.username}
                    onChange={handlechange} />
                <TextInput
                    type='email'
                    id='email'
                    placeholder='Email'
                    value={formdata.email}
                    onChange={handlechange} />
                <TextInput
                    type='password'
                    id='password'
                    placeholder='Password'
                    onChange={handlechange} />
                <Button type='submit' className={currentButtonStyle}>
                    Update
                </Button>
            </form>
            <div className='text-red-500 font-semibold flex justify-between mt-4'>
                <span onClick={()=>setShowModal(true)} className='cursor-pointer'>Delete Account</span>
                <span className='cursor-pointer'>Sign Out</span>
            </div>
            {updateUserSuccess && (
                <Alert color='success' className='mt-5'>
                    {updateUserSuccess}
                </Alert>
            )}
            {updateUserFailure && (
                <Alert color='failure' className='mt-5'>
                    {updateUserFailure}
                </Alert>
            )}
            {error && (
                <Alert color='failure' className='mt-5'>
                    {error}
                </Alert>
            )}
            <Modal show={showModal} onClose={()=>{setShowModal(false)}} popup size='md'>

          
            <Modal.Header/>
            <Modal.Body>
                <div className='text-center'>
                 <HiOutlineExclamationCircle className='w-14 h-14 text-gray-400 dark:text-gray-200 mx-auto mb-4'/>
                  <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete your account?</h3>
                  <div className='flex justify center gap-4'>
                    <Button color='failure' onClick={handledeletUser}>Yes,I'm Sure</Button>
                    <Button color='gray' onClick={()=>setShowModal(false)}>No Cancel</Button>
                  </div>
                </div>
            </Modal.Body>
            </Modal>
        </div>
    );
}

export default DashProfile;
