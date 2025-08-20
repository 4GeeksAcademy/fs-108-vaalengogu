import { Link } from "react-router-dom";
import logo from "../assets/img/logo.jpg";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="Logo" style={{ height: "60px" }} />
        </Link>

        <div className="collapse navbar-collapse justify-content-end">
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
              <Link to="/demo">
                <button type="button" className="btn btn-dark">Favoritos</button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
