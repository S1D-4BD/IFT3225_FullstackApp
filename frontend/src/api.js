// src/api.js
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4467";

// ON IMPLEMENTE LE CRUD
// ICI SONT TOUTES NOS FCT QUI FETCH LE BACK END PR PAS POLLUER LE CODE

export async function generatePassword(length) {
    try {
        const res = await fetch(`${BASE_URL}/users/generate-password/${length}`);
        if (!res.ok) throw new Error("Erreur génération mot de passe");
        const data = await res.json();
        return data.password;
    } catch (err) {
        console.error("Erreur dans generatePassword:", err);
        return null;
    }
    }

    export async function validationEmail(email) {
    try {
        const res = await fetch(`${BASE_URL}/users/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
        });

        const data = await res.json();
        console.log("Brute rep :", data);

        let isValid = false;
        if (
        data &&
        data.result &&
        data.result.validation_details &&
        data.result.validation_details.format_valid === true
        ) {
        isValid = true;
        }

        return isValid;
    } catch (err) {
        console.error("Erreur dans validationEmail :", err);
        return false;
    }
    }

    export async function signup(userData) {
    try {
        const response = await fetch(`${BASE_URL}/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
        });

        if (!response.ok) {
        const errorData = await response.json();
        console.error("Erreur HTTP :", response.status, errorData);
        return null;
        }

        const data = await response.json();
        console.log("Réponse signup:", data);
        return data;
    } catch (err) {
        console.error("Erreur dans signup() :", err);
        return null;
    }
    }

    export async function getUsers(token) {
    const response = await fetch(`${BASE_URL}/users`, {
        method: "GET",
        headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
        }
    });

    if (response.ok) {
        return await response.json();
    } else {
        throw new Error("Pas recup users");
    }
    }

    export async function getSpecificUser(id, token) {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    });
    if (response.ok) return await response.json();
    else throw new Error("Pas recup ce user");
    }

    export async function createUser(userData, token) {
    try {
        const response = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(userData)
        });

        if (!response.ok) {
        const errorData = await response.json();
        console.error("Erreur createUser:", response.status, errorData);
        return null;
        }

        return await response.json();
    } catch (err) {
        console.error("Erreur dans createUser:", err);
        return null;
    }
    }

    export async function updateUser(id, modifications, token) {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(modifications)
    });
    return response;
    }

    export async function deleteUser(id, token) {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
    });
    if (response.ok) return true;
    else throw new Error("Erreur suppression");
    }

    export async function verifyUser(user) {
    const serverResponse = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    });

    console.log("Réponse brute :", serverResponse);

    if (!serverResponse.ok) {
        console.error("Erreur HTTP :", serverResponse.status);
        return null;
    }

    const serverResponseJSON = await serverResponse.json();
    console.log("Réponse JSON :", serverResponseJSON);

    if (serverResponseJSON.success) {
        return serverResponseJSON.token;
    } else {
        return null;
    }
    }

    export async function loggedUser(token) {
    const response = await fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    });

    if (!response.ok) throw new Error("Erreur lors de la récupération du user");
    return await response.json();
    }

    export async function deleteConnectedUser(token) {
    const response = await fetch(`${BASE_URL}/users/me`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la suppression du compte");
    }
    return true;
}
