import { Button } from 'flowbite-react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/User/UserSlice';
import { useNavigate } from 'react-router-dom';

function QAuth() {
    const auth = getAuth(app);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });

        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider);

            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    googlePhotoUrl: resultsFromGoogle.user.photoURL,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                dispatch(signInSuccess(data));
                navigate('/dashboard');
            } else {
                console.error('Google Sign-In API error:', data.message);
            }
        } catch (error) {
            console.error('Google Sign-In error:', error);
        }
    };

    return (
        <Button
            type="button"
            gradientDuoTone="purpleToOrange"
            className="flex items-center justify-center bg-gradient-to-r from-red-400 via-red-500 to-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-gradient-to-l transition duration-300 ease-in-out px-4 py-2"
            onClick={handleGoogleClick}
        >
            <FaGoogle className="ml-4 w-6 h-6 mr-2" />
            Continue with Google
        </Button>
    );
}

export default QAuth;
