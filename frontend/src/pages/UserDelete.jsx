import { BASE_URL } from "../api";

/* import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function UserDelete() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('jwt-token');

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
        //
        const res = await fetch('${BASE_URL}/users', {
            headers: { Authorization: `Bearer ${token}` },
        });

        const users = await res.json();
        const user = users.find(u => u.email === email);

        if (!user) {
            setMessage("Utilisateur non trouvé.");
            return;
        }

///////////////////////////////////3
        const deleteRes = await fetch(`${BASE_URL}/users/${user._id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
        });

        if (deleteRes.ok) {
            setMessage("Utilisateur supprimé avec succès !");
        } else {
            const errData = await deleteRes.json();
            setMessage("Erreur : " + (errData.message || 'suppression impossible'));
        }

        } catch (err) {
        setMessage("Erreur serveur : " + err.message);
        }
    };

    return (
        <div className='center-div'>
        <form className="formmodal" onSubmit={handleDelete}>
            <div className="formelements">
            <label>Entrer l'email de l'utilisateur à supprimer :</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <button type="submit">Supprimer l'utilisateur</button>
            <p>{message}</p>
            </div>
        </form>
        </div>
    );
}
 */