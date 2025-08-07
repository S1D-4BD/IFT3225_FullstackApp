/* import React from "react";

export function UserHomePage({ user, navigate }) {
  const handleDelete = () => {
    if (confirm("Confirmer la suppression de votre compte ?")) {
      navigate("/delete-user");
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${user._id}`);
  };

  return (
    <>
      <div className="container">
        <h1>Bienvenue, {user.name}</h1>
        <table className="center-div profile-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <a href="#" onClick={(e) => { e.preventDefault(); handleEdit(); }}>
                  Edit <i className="fa fa-pencil" aria-hidden="true"></i>
                </a>
              </td>
              <td>
                <a href="#" className="delete-link" onClick={(e) => { e.preventDefault(); handleDelete(); }}>
                  Delete <i className="fa fa-trash" aria-hidden="true"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
 */

import React from "react";

export function UserHomePage({ user, navigate }) {

  function handleDelete() {
    if (confirm("Confirmer la suppression de votre compte ?")) {
      const token = localStorage.getItem("jwt-token");

      fetch("http://localhost:4467/users/me", {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(response => {
        if (response.ok) {
          alert("Compte supprimé !");
          localStorage.removeItem("jwt-token");
          navigate("/");
        } else {
          alert("Erreur lors de la suppression");
        }
      })
      .catch(error => {
        console.error("Erreur :", error);
        alert("Erreur serveur");
      });
    }
  }

  function handleEdit() {
    navigate(`/edit/${user._id}`);
  }

  function handleDeleteClick(e) {
    e.preventDefault();
    handleDelete();
  }

  return (
    <>
      <div className="container">
        <h1>Bienvenue, {user.name}</h1>
        <table className="center-div profile-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <a href="#" onClick={(e) => { e.preventDefault(); handleEdit(); }}>
                  Edit <i className="fa fa-pencil" aria-hidden="true"></i>
                </a>
              </td>
              <td>
                <a href="#" className="delete-link" onClick={handleDeleteClick}>
                  Delete <i className="fa fa-trash" aria-hidden="true"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
