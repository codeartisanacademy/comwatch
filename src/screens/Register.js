import React, {useState, useEffect} from 'react'
import {Button, Modal, Form} from 'react-bootstrap';

import { auth, registerWithEmailAndPassword } from '../firebase';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = ()=>{
        if (!email || !password) alert("enter email and password");
        registerWithEmailAndPassword(email, password)
    }

  return (
    <div>
        <h1>Register</h1>
        <Form>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" onChange={(e)=>setEmail(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" onChange={(e)=>setPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Button variant="primary" className="mt-4" onClick={handleRegister} >
                Submit
              </Button>
        </Form>
    </div>
  )
}
