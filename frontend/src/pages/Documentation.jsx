import React from 'react';

export function Documentation() {
    return (
        <div className="profile-table">
            <h1>API Documentation</h1>

            <h2>Base URL: <a href="http://localhost:4467">http://localhost:4467</a></h2>

            <p><strong>Authentification:</strong> <code>Authorization: Bearer TOKEN</code></p>
            <a href="/">back to landing</a>

            <h2>Routes publiques</h2>
            <table border="1" cellPadding="3" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Route</th>
                        <th>Description</th>
                        <th>Curl</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>POST /users/signup</td>
                        <td>Créer un compte</td>
                        <td>
                            <pre>
<code>{`curl -X POST localhost:4467/users/signup
-H "Content-Type: application/json"
-d '{ "name": "etudiant", "email": "etudiant@iro.ca", "password": "123" }'`}</code>
                            </pre>
                        </td>
                    </tr>
                    <tr>
                        <td>POST /users/login</td>
                        <td>Se connecter</td>
                        <td>
                            <pre>
<code>{`curl -X POST localhost:4467/users/login
-H "Content-Type: application/json"
-d '{ "email": "g@gmail.com", "password": "ggg" }'`}</code>
                            </pre>
                        </td>
                    </tr>
                    <tr>
                        <td>GET /users/generate-password/:length</td>
                        <td>Générer MDP random <br></br>(longueur spéciféé)</td>
                        <td>
                            <pre>
<code>{`curl -X GET localhost:4467/users/generate-password/12`}</code>
                            </pre>
                        </td>
                    </tr>
                    <tr>
                        <td>POST /users/verify-email</td>
                        <td>Vérifier email <br></br>(appelle l'api de MAILEROO)</td>
                        <td>
                            <pre>
<code>{`curl -X POST localhost:4467/users/verify-email
-H "Content-Type: application/json"
-d '{ "email": "test@test.com" }'`}</code>
                            </pre>
                        </td>
                    </tr>
                </tbody>
            </table>

            <h2>Routes utilisateur (token requis)</h2>
            <table border="1" cellPadding="8" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Route</th>
                        <th>Description</th>
                        <th>Curl</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>GET /users/me</td>
                        <td>Profil ACTUEL</td>
                        <td>
                            <pre>
<code>{`curl -X GET localhost:4467/users/me -H "Authorization: Bearer TOKEN"`}</code>
                            </pre>
                        </td>
                    </tr>
                    <tr>
                        <td>PUT /users/:id</td>
                        <td>Modifier profil ACTUEL</td>
                        <td>
                            <pre>
<code>{`curl -X PUT localhost:4467/users/ID
-H "Authorization: Bearer TOKEN"
-H "Content-Type: application/json"
-d '{ "name": "modificationNom" }'`}</code>
                            </pre>
                        </td>
                    </tr>
                    <tr>
                        <td>DELETE /users/me</td>
                        <td>Supprimer compte ACTUEL</td>
                        <td>
                            <pre>
<code>{`curl -X DELETE localhost:4467/users/me -H "Authorization: Bearer TOKEN"`}</code>
                            </pre>
                        </td>
                    </tr>
                </tbody>
            </table>

            <h2>Routes admin uniquement</h2>
            <table border="1" cellPadding="8" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Route</th>
                        <th>Description</th>
                        <th>Curl</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>GET /users</td>
                        <td>Récup tous les utilisateurs</td>
                        <td>
                            <pre>
<code>{`curl -X GET localhost:4467/users -H "Authorization: Bearer ADMIN_TOKEN"`}</code>
                            </pre>
                        </td>
                    </tr>
                    <tr>
                        <td>POST /users</td>
                        <td>Créer utilisateur</td>
                        <td>
                            <pre>
<code>{`curl -X POST localhost:4467/users
-H "Authorization: Bearer ADMIN_TOKEN"
-H "Content-Type: application/json"
-d '{ "name": "etudiant", "email": "iro@diro.ca", "password": "123", "role": "user" }'`}</code>
                            </pre>
                        </td>
                    </tr>
                    <tr>
                        <td>DELETE /users/:id</td>
                        <td>Supprimer utilisateur X</td>
                        <td>
                            <pre>
<code>{`curl -X DELETE localhost:4467/users/:id -H "Authorization: Bearer ADMIN_TOKEN"`}</code>
                            </pre>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
