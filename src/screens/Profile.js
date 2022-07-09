import React, {useState, useEffect} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';



function Profile() {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate()
    useEffect(()=>{
        if (loading) return;
        if (!user) navigate("/login");
    }, [user])
  return (
    <h1>Profile</h1>
  )
}

export default Profile