import React from "react";
import { Link, useNavigate } from "react-router-dom";

interface NavbarProps {
  handleLogout?: () => void;
  token?: string | null;
}

export default function Navbar({ handleLogout, token }: NavbarProps) {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
          ClubConnect
        </Link>
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="btn btn-outline-success" to="/addclub">
                Add Club
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/clubs">
                Clubs
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/contact">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              {token ? (
                <button
                  className="btn btn-outline-danger"
                  onClick={() => {
                    if (handleLogout) {
                      handleLogout();
                    }
                    navigate("/login");
                  }}
                >
                  Logout
                </button>
              ) : (
                <Link className="btn btn-outline-success" to="/login">
                  Login
                </Link>
              )}
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}