import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { Form, Link, useNavigate } from 'react-router-dom';
import QAuth from '../components/QAuth';

function SignUp() {
  const [formdata, setformdata] = useState({});
  const [errormessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlechange = (e) => {
    setformdata({ ...formdata, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formdata.username || !formdata.email || !formdata.password) {
      return setErrorMessage("Please fill all details");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });

      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      navigate("/Sign-in");
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-28">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
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
              {/* Added htmlFor */}
              <Label htmlFor="username" value="Your Username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                name="username"
                autoComplete="username" 
                onChange={handlechange}
                className="w-full"
              />
            </div>
            <div>
              {/* Added htmlFor */}
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
              {/* Added htmlFor */}
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
              className="bg-gradient-to-t from-sky-500 to-emerald-300 text-lg font-bold text-white px-4 py-2 rounded-md"
            >
              {loading ? (
                <>
                  <Spinner size="sm"></Spinner>
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                'Sign up'
              )}
            </button>
            <QAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Already have an account?</span>
            <Link to="/Sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
          {errormessage && (
            <Alert className="mt-5" color="failure">
              <span>{errormessage}</span>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
