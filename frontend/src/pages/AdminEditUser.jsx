import React, { useEffect, useState } from 'react';
import { updateUser, BASE_URL } from '../api';
import { useNavigate, useParams } from 'react-router-dom';

export function AdminEditUser() {
    const [modifications, setModifications] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
    });

    const id = useParams().id;
    const navigate = useNavigate();
    const token = localStorage.getItem("jwt-token");

    useEffect(() => {
        fetch(`${BASE_URL}/users/${id}`, {
            headers: { "Authorization": `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
            setModifications({
                name: data.name || "",
                email: data.email || "",
                password: "",
                role: data.role || "user"
            });
        });
    }, [id, token]);

    async function handleUpdate(e) {
        e.preventDefault();
        try {
            const response = await updateUser(id, modifications, token);
            if (response.ok) {
                alert("Utilisateur mis à jour");
                navigate('/home');
            } else {
                alert("Erreur de mise à jour");
            }
        } catch (err) {
            console.error("Erreur serveur :", err);
        }
    }

    return (
        <div className="center-div">
            <form className="formmodal" onSubmit={handleUpdate}>
                <div className="formelements">
                    <label>Nom</label>
                    <input type="text" value={modifications.name} onChange={(e) => setModifications({ ...modifications, name: e.target.value })} />

                    <label>Email</label>
                    <input type="email" value={modifications.email} onChange={(e) => setModifications({ ...modifications, email: e.target.value })} />

                    <label>Mot de passe</label>
                    <input type="password" value={modifications.password} onChange={(e) => setModifications({ ...modifications, password: e.target.value })} />

                    <label>Rôle</label>
                    <select value={modifications.role} onChange={(e) => setModifications({ ...modifications, role: e.target.value })}>
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                    </select>

                    <button type="submit">Mettre à jour</button>
                </div>
            </form>
        </div>
    );
}
