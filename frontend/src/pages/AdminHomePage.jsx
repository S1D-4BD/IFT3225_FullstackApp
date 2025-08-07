import React, { useState } from 'react';
import { deleteUser } from "../api";

export default function AdminHomePage({ user, users, navigate, refreshUsers }) {
    const [searchId, setSearchId] = useState('');

    async function handleDelete(userId) {
        const token = localStorage.getItem('jwt-token');
        try {
            const success = await deleteUser(userId, token);
            if (success) {
                alert("Utilisateur supprimé !");
                refreshUsers();
            }
        } catch (error) {
            console.error("Erreur de suppression :", error);
            alert("Erreur lors de la suppression");
        }
    }

    let filteredUsers = users;

    if (searchId.trim() !== '') {
        filteredUsers = users.filter(user => user._id.includes(searchId.trim()));
    }


    return (
        <>
            <h1>Panneau d'administration {user.name}</h1>

            <div className="container">
                <div className="search-bar">
                    <label htmlFor="searchId">Rechercher par ID :</label>
                    <input type="text" id="searchId" placeholder="Entrer un ID pour get user" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
                </div>

                <table className="profile-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Rôle</th>
                            <th>Modifier</th>
                            <th>Supprimer</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/*SI FILTER NE RETOURNE RIEN*/}
                        {filteredUsers.length === 0 && (
                            <tr>
                                <td colSpan="6">Aucun utilisateur trouvé.</td>
                            </tr>
                        )}
                        {/*SInon mapper*/}
                        {filteredUsers.map((u) => (
                            <tr key={u._id}>
                                <td>{u._id}</td>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td className="li-role">
                                    <p className={u.role === "admin" ? "admin-tag" : "default-tag"}>{u.role}</p>
                                </td>
                                <td>
                                    <a href="#" onClick={(e) => {
                                        e.preventDefault();
                                        navigate(`/editadmin/${u._id}`);
                                    }}>
                                        Modifier <i className="fa fa-pencil" aria-hidden="true"></i>
                                    </a>
                                </td>
                                <td>
                                    <a href="#" className="delete-link" onClick={(e) => {
                                        e.preventDefault();
                                        if (confirm("Confirmer la suppression ?")) {
                                            handleDelete(u._id);
                                        }
                                    }}>
                                        Supprimer <i className="fa fa-trash" aria-hidden="true"></i>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
