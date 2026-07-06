import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      className="navbar shadow-sm py-3"
      style={{ backgroundColor: "#46603D" }}
    >
      <div className="container d-flex justify-content-between align-items-center">
        {/* Logo */}
        <Link
          className="navbar-brand fw-bold fs-3 m-0"
          to="/"
          style={{
            color: "#F3F6EE",
            textDecoration: "none",
          }}
        >
          🍴 RecipeHub
        </Link>

        {/* Navigation Links */}
        <ul className="navbar-nav d-flex flex-row gap-4 mb-0">
          <li className="nav-item">
            <Link className="nav-link text-light fw-semibold" to="/">
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link text-light fw-semibold" to="/recipes">
              Recipes
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link text-light fw-semibold" to="/add">
              Add Recipe
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
