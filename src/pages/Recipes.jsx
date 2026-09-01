import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";
import burgerImg from "../images/burger.jpeg";
import pastaImg from "../images/pasta.webp";
import momoImg from "../images/momo.webp";
import pizzaImg from "../images/pizza.jpeg";

const defaultRecipes = [
  { id: 1, title: "Classic Margherita Pizza", description: "A timeless Italian pizza with fresh mozzarella, tomato sauce, and basil on a crispy thin crust.", image: pizzaImg, category: "Italian" },
  { id: 2, title: "Spicy Chicken Momos", description: "Steamed dumplings filled with spicy minced chicken, served with tangy tomato achar.", image: momoImg, category: "Asian" },
  { id: 3, title: "Creamy Garlic Pasta", description: "Al dente pasta tossed in a rich and creamy garlic parmesan sauce with herbs.", image: pastaImg, category: "Italian" },
  { id: 4, title: "Classic Gourmet Burger", description: "Juicy beef patty with lettuce, tomato, cheese, and special sauce in a toasted bun.", image: burgerImg, category: "American" },
  { id: 5, title: "Butter Chicken", description: "Tender chicken pieces simmered in a rich, creamy tomato-based curry sauce.", image: "https://via.placeholder.com/500x300?text=Butter+Chicken", category: "Indian" },
  { id: 6, title: "Vegetable Stir Fry", description: "Fresh seasonal vegetables wok-fried in a savory soy and ginger glaze.", image: "https://via.placeholder.com/500x300?text=Stir+Fry", category: "Asian" },
  { id: 7, title: "Greek Salad", description: "Crisp cucumbers, tomatoes, olives, and feta cheese drizzled with olive oil and oregano.", image: "https://via.placeholder.com/500x300?text=Greek+Salad", category: "Mediterranean" },
  { id: 8, title: "Chocolate Lava Cake", description: "Warm chocolate cake with a gooey molten center, served with vanilla ice cream.", image: "https://via.placeholder.com/500x300?text=Lava+Cake", category: "Dessert" },
];

function Recipes() {
  const [recipes, setRecipes] = useState(defaultRecipes);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

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
