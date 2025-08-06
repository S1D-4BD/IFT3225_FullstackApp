import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function UserDelete() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('jwt-token');

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
        // Étape 1 : Récupérer tous les users pour trouver l'id
        const res = await fetch('http://localhost:4467/users', {
            headers: { Authorization: `Bearer ${token}` },
        });

        const users = await res.json();
        const user = users.find(u => u.email === email);

        if (!user) {
            setMessage("Utilisateur non trouvé.");
            return;
        }

        // Étape 2 : Supprimer via son ID
        const deleteRes = await fetch(`http://localhost:4467/users/${user._id}`, {
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
