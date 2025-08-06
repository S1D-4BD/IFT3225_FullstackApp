import React from 'react';
import { useState } from 'react';
import { verifyUser, updateUser } from '../api';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export function UserEdit() {

    const [modifications, setModifications] = useState({
        "name": "",
        "email": "",
        "password": ""
    });
    const id = useParams().id;
    const token = localStorage.getItem('jwt-token');
    let navigate = useNavigate();
    async function handleUpdate(e) {
        e.preventDefault();

        if (!token) {
            console.error("No token found, user not logged in");
            return;
        }
        else{
            try {
                const response = await updateUser(id, modifications, token);
                if (response.ok) {
                    const updatedUser = await response.json();
                    console.log("User updated successfully:", updatedUser);
                    navigate('/home');

                } else {
                    console.error("Failed to update user:", response.statusText);
                }
            } catch (error) {
                console.error("Error updating user:", error);
            }
        }
    }
    return (
        <>


        <div className='center-div'>
            <form className="formmodal" onSubmit={handleUpdate}>
                <div className="formelements"> <label>Name</label>
                    <input type="text" value={modifications.name} onChange={(e) => setModifications({ ...modifications, name: e.target.value })} />
                    <label>Email</label>
                    <input type="email" value={modifications.email} onChange={(e) => setModifications({ ...modifications, email: e.target.value })} />
                    <label>Password</label>
                    <input type="password" value={modifications.password} onChange={(e) => setModifications({ ...modifications, password: e.target.value })} />
                    <button type="submit">Update User</button>
                </div>
            </form>
        </div>


        </>
    );
}