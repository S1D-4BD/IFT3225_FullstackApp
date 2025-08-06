import React from 'react';
import { deleteUser } from "../api";

export default function AdminHomePage({user, users, navigate, refreshUsers }) {


    async function handleDelete(userId) {
    const token = localStorage.getItem('jwt-token');

    try {
        const success = await deleteUser(userId, token);
        if (success) {
            alert("Utilisateur supprimé !");
            refreshUsers(); // remet jour la liste
        }
    } catch (error) {
        console.error("Erreur de suppression :", error);
        alert("Erreur lors de la suppression");
    }
}


    return (
        <>
        <h1>Panneau d'administration {user.name} </h1>

        <div className="container">
            <table className="profile-table">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Rôle</th>
                        <th>Modifier</th>
                        <th>Supprimer</th>
                    </tr>
                </thead>
                <tbody>
                    {(!Array.isArray(users) || users.length === 0) && (
                        <tr>
                            <td colSpan="5">Aucun utilisateur trouvé.</td>
                        </tr>
                    )}

                    {Array.isArray(users) && users.length > 0 && users.map((u) => (
                        <tr key={u._id}>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td className="li-role"><p className={u.role === "admin" ? "admin-tag" : "default-tag"}>{u.role}</p></td>
                            {/* mais c incroyable le ternary op */}
                            <td>
                                <a href="#" onClick={(e) => {
                                    e.preventDefault();
                                    navigate(`/edit/${u._id}`);
                                }}>
                                    Edit <i className="fa fa-pencil" aria-hidden="true"></i>
                                </a>
                            </td>
                            <td>
                                <a href="#"  className="delete-link" onClick={(e) => {
                                    e.preventDefault();
                                    if (confirm("Confirmer la suppression ?")) {
                                        handleDelete(u._id);
                                    }
                                }}>
                                    Delete <i className="fa fa-trash" aria-hidden="true"></i>
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
