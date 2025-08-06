import React, { useEffect, useState } from 'react';
import { loggedUser, getUsers } from "../api";
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { UserHomePage } from "./UserHomePage";
import AdminHomePage from "./AdminHomePage";

export function Home() {
    const [userCredentials, setUserCredentials] = useState(null);
    const [users, setUsers] = useState([]);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const token = localStorage.getItem('jwt-token');

    const fetchUsers = () => {
        getUsers(token)
            .then((userList) => {
                console.log("Réponse brute users:", userList);
                setUsers(userList);
            })
            .catch(err => {
                console.error("Erreur lors du chargement des utilisateurs :", err);

                if (err.message.includes('401') || err.message.includes('403')) {
                    localStorage.removeItem('jwt-token');
                    navigate('/login');
                }
            });
    };

    useEffect(() => {
        const initializeUser = async () => {
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const user = await loggedUser(token);

                if (!user) {
                    console.error("Failed to retrieve user");
                    localStorage.removeItem('jwt-token');
                    navigate('/login');
                    return;
                }


                setUserCredentials(user);
                setRole(user.role);
                if (user.role === "admin") {
                    fetchUsers();
                }

            } catch (error) {
                console.error("Erreur lors de la récupération de l'utilisateur :", error);
                localStorage.removeItem('jwt-token');
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        initializeUser();
    }, [token, navigate]);

    if (loading || !userCredentials) {
        return <p>Chargement...</p>;
    }

///AFFICHAGE
    if(role ==="admin"){
        return(
            <>
                <Navbar user={userCredentials} />
                <AdminHomePage user={userCredentials} users={users} navigate={navigate} refreshUsers={fetchUsers} />
            </>
        );
    }
    else{
        return(
            <>
                <Navbar user={userCredentials}/>
                <UserHomePage user={userCredentials} navigate={navigate} />
            </>
        );
    }
}