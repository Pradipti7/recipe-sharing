import { useState, useEffect, useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import RecipeCard from "../components/RecipeCard";
import FavoritesContext from "../context/FavoritesContext";
import burgerImg from "../images/burger.jpeg";
import pastaImg from "../images/pasta.webp";
import momoImg from "../images/momo.webp";
import pizzaImg from "../images/pizza.jpeg";
import butterChickenImg from "../images/butterChicken.jpeg";
import vegetableStirFryImg from "../images/VegetableStirFry.jpeg";
import greekSaladImg from "../images/greekSalad.jpeg";
import chocolateLavaImg from "../images/chocolateLava.jpeg";

const defaultRecipes = [
  { id: 1, title: "Classic Margherita Pizza", description: "A timeless Italian pizza with fresh mozzarella, tomato sauce, and basil on a crispy thin crust.", image: pizzaImg, category: "Italian", avg_rating: 0, rating_count: 0 },
  { id: 2, title: "Spicy Chicken Momos", description: "Steamed dumplings filled with spicy minced chicken, served with tangy tomato achar.", image: momoImg, category: "Asian", avg_rating: 0, rating_count: 0 },
  { id: 3, title: "Creamy Garlic Pasta", description: "Al dente pasta tossed in a rich and creamy garlic parmesan sauce with herbs.", image: pastaImg, category: "Italian", avg_rating: 0, rating_count: 0 },
  { id: 4, title: "Classic Gourmet Burger", description: "Juicy beef patty with lettuce, tomato, cheese, and special sauce in a toasted bun.", image: burgerImg, category: "American", avg_rating: 0, rating_count: 0 },
  { id: 5, title: "Butter Chicken", description: "Tender chicken pieces simmered in a rich, creamy tomato-based curry sauce.", image: butterChickenImg, category: "Indian", avg_rating: 0, rating_count: 0 },
  { id: 6, title: "Vegetable Stir Fry", description: "Fresh seasonal vegetables wok-fried in a savory soy and ginger glaze.", image: vegetableStirFryImg, category: "Asian", avg_rating: 0, rating_count: 0 },
  { id: 7, title: "Greek Salad", description: "Crisp cucumbers, tomatoes, olives, and feta cheese drizzled with olive oil and oregano.", image: greekSaladImg, category: "Mediterranean", avg_rating: 0, rating_count: 0 },
  { id: 8, title: "Chocolate Lava Cake", description: "Warm chocolate cake with a gooey molten center, served with vanilla ice cream.", image: chocolateLavaImg, category: "Dessert", avg_rating: 0, rating_count: 0 },
];

function Recipes() {
  const [recipes, setRecipes] = useState(defaultRecipes);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const query = searchParams.get("q") || "";
  const { favorites } = useContext(FavoritesContext);

  useEffect(() => {
    axios
      .get("/api/recipes")
      .then((res) => {
        if (res.data.length > 0) {
          setRecipes(res.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  let filteredRecipes = query
    ? recipes.filter(
        (r) =>
          r.title.toLowerCase().includes(query.toLowerCase()) ||
          (r.category && r.category.toLowerCase().includes(query.toLowerCase()))
      )
    : recipes;

  if (showFavoritesOnly) {
    filteredRecipes = filteredRecipes.filter((r) => favorites.includes(r.id));
  }

  if (loading) {
    return (
      <div className="container py-9 text-center">
        <p>Loading recipes...</p>
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
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            style={{
              background: showFavoritesOnly ? "#D64B3E" : "white",
              color: showFavoritesOnly ? "white" : "#D64B3E",
              border: "2px solid #D64B3E",
              borderRadius: "10px",
              padding: "8px 16px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontWeight: "500",
              fontSize: "14px",
            }}
          >
            <FaHeart fill={showFavoritesOnly ? "white" : "#D64B3E"} />
            {showFavoritesOnly ? "Showing Favorites" : "Favorites"}
            {favorites.length > 0 && (
              <span style={{
                background: showFavoritesOnly ? "rgba(255,255,255,0.3)" : "#D64B3E",
                color: "white",
                borderRadius: "50%",
                width: "22px",
                height: "22px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
              }}>
                {favorites.length}
              </span>
            )}
          </button>
          <Link
            to="/add"
            className="btn"
            style={{ background: "#46603D", color: "white", borderRadius: "10px" }}
          >
            + Add Recipe
          </Link>
        </div>
      </div>
      {filteredRecipes.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">
            {showFavoritesOnly
              ? "No favorite recipes yet. Heart a recipe to save it!"
              : `No recipes found for "${query}".`}
          </p>
          <Link to="/" className="btn" style={{ background: "#46603D", color: "white", borderRadius: "10px" }}>
            Back to Home
          </Link>
        </div>
      ) : (
        <div className="row">
          {filteredRecipes.map((recipe) => (
            <div className="col-md-6 col-lg-3 mb-4" key={recipe.id}>
              <RecipeCard recipe={recipe} showRating />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Recipes;
