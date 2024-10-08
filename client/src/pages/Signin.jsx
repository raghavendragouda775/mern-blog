import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInSuccess, signInFailure, signInStart } from '../redux/User/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import QAuth from '../components/QAuth';

function SignIn() {
  const [formdata, setformdata] = useState({});
  const { loading, error: errormessage } = useSelector((state) => state.user); // Ensure state structure is correct
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlechange = (e) => {
    setformdata({ ...formdata, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!formdata.email || !formdata.password) {
      return dispatch(signInFailure('Please fill in all details'));
    }

    try {
      dispatch(signInStart()); 

     
      const res = await fetch('http://localhost:3000/api/auth/signin', {
        method: 'POST',
        credentials:'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formdata),
      });

      const contentType = res.headers.get('content-type');
      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
      } else {
        throw new Error('Received non-JSON response');
      }

      if (!res.ok || data.success === false) {
      
        dispatch(signInFailure(data.message || 'Sign-in failed'));
      } else {
        
        dispatch(signInSuccess(data));
        navigate('/dashboard');
      }
    } catch (error) {
     
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen mt-28">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
       
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white transition duration-300 shadow-md ease-in-out hover:bg-purple-700">
              Sahand's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is a demo project. You can sign up with your email and password
            or with Google.
          </p>
        </div>

      
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email" value="Your Email" />
              <TextInput
                type="email"
                placeholder="Email"
                id="email"
                name="email"
                autoComplete="email"
                onChange={handlechange}
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="password" value="Your Password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                autoComplete="new-password"
                onChange={handlechange}
                className="w-full"
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-gradient-to-l transition duration-300 ease-in-out px-4 py-2"
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                'Sign In'
              )}
            </button>
            <QAuth/>
          </form>

          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account?</span>
            <Link to="/Sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </div>

          
          {errormessage && (
            <Alert className="mt-5" color="failure">
              <span>{typeof errormessage === 'string' ? errormessage : errormessage.toString()}</span>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignIn;

