import React from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyUser,loggedUser } from '../api';
import { useState } from 'react';
import LineSvg from '../components/LineSvg';
import '../App.css';


export function Login() {
    const [userCredentials, setUserCredentials] = useState({ email: '', password: '' });

    const navigate = useNavigate();

    //handler
    async function handleSubmit(e){
        e.preventDefault();
        const token = await verifyUser(userCredentials);
        if (token) {
            localStorage.setItem('jwt-token', token);
            const currentUser = await loggedUser(token);
            if (currentUser) {
                console.log("User : ", currentUser);
                navigate('/home');
            } else {
                console.error("Failed to retrieve user");
            }
        }
        else {
            alert("Erreur! Mauvais email ou MDP, sinon imscrit-toi");
            console.error("Login failed");
        }

    }
    return(
        <>
        <LineSvg />
        <div className="center-div">
            <form className="formmodal" onSubmit={handleSubmit}>
                <div>
                    <h2>Login</h2>
                    <div className="formelements">
                        <label>Email</label>
                        <input type="email" value={userCredentials.email} onChange={(e) => setUserCredentials({...userCredentials, email:e.target.value})}/>
                        <label>Password</label>
                        <input type="password" value={userCredentials.password} onChange={(e)=> setUserCredentials({...userCredentials, password:e.target.value}) }/>
                        <button type="submit">Login</button>
                        <a href="/">back to landing</a>
                    </div>
                </div>
            </form>
        </div>
        </>
    )
}