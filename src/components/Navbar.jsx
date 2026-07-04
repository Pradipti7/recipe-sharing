import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-sucess">
      <div className="container">
        <link className="navbar-brand fw-bold" to="/">
          🍴 RecipeHub
        </link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menu"
        >
          <span className="navbar-toggler-icon"> </span>
        </button>
        <div className="collapse navbar-collapse" id="menu">
          <ul className="navbar-nav ms-auto">
            <li className="nav-items">
              <link className="nav-link" to="/recipes">
                Recipes
              </link>
            </li>
            <li className="nav-item">
              <link className="nav-link" tp="/add">
                {" "}
                Add Recipe
              </link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
