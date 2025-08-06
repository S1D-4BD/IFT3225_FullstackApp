import React from "react";

export function UserHomePage({ user, navigate }) {
  return (
    <>
      <div className="container">
        <h1>Bienvenue, utilisateur {user.name}</h1>
        <table className="center-div profile-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          </tbody>
        </table>

      </div>
    </>
  );
}
