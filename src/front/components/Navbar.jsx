import { Link } from "react-router-dom";
import logo from "../assets/img/logo.jpg";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="Logo" style={{ height: "60px" }} />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item mx-2">
              <Link to="/planets" className="nav-link">
                Planets
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link to="/character" className="nav-link">
                Character
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link to="/starships" className="nav-link">
                StarShips
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link to="/contacts" className="nav-link">
                Contacts
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link to="/favorites">
                <button type="button" className="btn btn-outline-warning">
                  Favoritos
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
