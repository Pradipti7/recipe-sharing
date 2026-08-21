import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

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

  const filteredRecipes = query
    ? recipes.filter(
        (r) =>
          r.title.toLowerCase().includes(query.toLowerCase()) ||
          (r.category && r.category.toLowerCase().includes(query.toLowerCase()))
      )
    : recipes;

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
        <div>
          <h2 className="mb-0">
            {query ? `Results for "${query}"` : "Popular Recipes"}
          </h2>
          {query && (
            <p className="text-muted mt-1 mb-0">
              {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? "s" : ""} found
            </p>
          )}
        </div>
        <Link
          to="/add"
          className="btn"
          style={{ background: "#46603D", color: "white", borderRadius: "10px" }}
        >
          + Add Recipe
        </Link>
      </div>
      {filteredRecipes.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">No recipes found for "{query}".</p>
          <Link to="/" className="btn" style={{ background: "#46603D", color: "white", borderRadius: "10px" }}>
            Back to Home
          </Link>
        </div>
      ) : (
        <div className="row">
          {filteredRecipes.map((recipe) => (
            <div className="col-md-6 col-lg-3 mb-4" key={recipe.id}>
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Recipes;
