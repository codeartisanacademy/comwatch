import React, {useState, useEffect} from 'react'
import {Button, Form} from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, loginWithEmailAndPassword } from '../firebase';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const handleLogin = () =>{
        loginWithEmailAndPassword(email, password);
    }

    useEffect(() => {
        if(user) navigate("/profile");
    }, [user])
  return (
    <>
        <h1>Login</h1>
        <div>
            <Form>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" onChange={(e)=>setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={(e)=>setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" className="mt-4" onClick={handleLogin} >
                Login
              </Button>
            </Form>
        </div>
    </>
  )
}

export default Login