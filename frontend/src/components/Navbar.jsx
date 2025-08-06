import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <a href="/" className="logo">
            Synchro UdeM
          </a>
        </div>

        <div className="navbar-right">
          <ul className="nav-links">
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/edit/${user._id}`);
                }}
              >
                Edit account
              </a>
            </li>

            {user.role === "admin" && ( //VERY IMPORTANT --> CAN ONLY CREATE ADMINS AS AN ADMIN, NOT == REGISTER
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/create");
                  }}
                >
                  Create account
                </a>
              </li>
            )}

            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  localStorage.removeItem("jwt-token");
                  navigate("/login");
                }}
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <br />
      <br />
    </>
  );
};

export default Navbar;
