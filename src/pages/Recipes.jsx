import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/api/recipes")
      .then((res) => {
        setRecipes(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load recipes");
        setLoading(false);
        console.error(err);
      });
  }, []);

  if (loading) {
    return (
      <div className="container py-9 text-center">
        <p>Loading recipes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-9 text-center">
        <p className="text-danger">{error}</p>
      </div>
    );
  }

  return (
    <div className="container py-9">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Popular Recipes</h2>
        <Link
          to="/add"
          className="btn"
          style={{ background: "#46603D", color: "white", borderRadius: "10px" }}
        >
          + Add Recipe
        </Link>
      </div>
      <div className="row">
        {recipes.map((recipe) => (
          <div className="col-md-6 col-lg-3 mb-4" key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recipes;
