import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow-sm"
      style={{ backgroundColor: "#46603D" }}
    >
      <div className="container">
        {/* Logo */}
        <Link
          className="navbar-brand fw-bold fs-3"
          to="/"
          style={{ color: "#F3F6EE" }}
        >
          🍴 RecipeHub
        </Link>

        {/* Hamburger button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse justify-content-end" id="menu">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link text-light" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-light" to="/recipes">
                Recipes
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-light" to="/add">
                Add Recipe
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
