
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function CreateUser() {
    const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
    const [authorized, setAuthorized] = useState(false);
    const [checking, setChecking] = useState(true); // empêche l’affichage
    const navigate = useNavigate();
    const token = localStorage.getItem("jwt-token");

    useEffect(() => {
        const checkAdmin = async () => {
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const res = await fetch("http://localhost:4467/users/me", {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (!res.ok) {
                    navigate("/login");
                    return;
                }

                const data = await res.json();

                if (data.role !== "admin") {
                    navigate("/home");
                    return;
                }

                setAuthorized(true);
            } catch (err) {
                navigate("/login");
            } finally {
                setChecking(false); // on a fini la vérif
            }
        };

        checkAdmin();
    }, [navigate, token]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:4467/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error("Échec de création");

            navigate("/home");
        } catch (err) {
            console.error("Erreur création:", err.message);
        }
    };

    // 🔐 Empêche tout affichage pendant la vérification
    if (checking || !authorized) return null;

    return (
        <form className="formmodal center-div" onSubmit={handleSubmit}>
            <div>
                <h2>Création compte</h2>
                <div className="formelements">
                    <input name="name" placeholder="Nom" onChange={handleChange} required />
                    <input name="email" placeholder="Email" onChange={handleChange} required />
                    <input name="password" placeholder="Mot de passe" type="password" onChange={handleChange} required />
                    <select name="role" onChange={handleChange}>
                        <option value="user">Utilisateur</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button type="submit">Créer</button>
                </div>
            </div>
        </form>
    );
}
