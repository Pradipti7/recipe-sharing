import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaListUl, FaBookOpen } from "react-icons/fa";
import pizzaImg from "../images/pizza.jpeg";
import momoImg from "../images/momo.webp";
import pastaImg from "../images/pasta.webp";
import burgerImg from "../images/burger.jpeg";
import butterChickenImg from "../images/butterChicken.jpeg";
import vegetableStirFryImg from "../images/VegetableStirFry.jpeg";
import greekSaladImg from "../images/greekSalad.jpeg";
import chocolateLavaImg from "../images/chocolateLava.jpeg";

const defaultRecipes = [
  {
    id: 1, title: "Classic Margherita Pizza",
    description: "A timeless Italian pizza with fresh mozzarella, tomato sauce, and basil on a crispy thin crust.",
    image: pizzaImg,
    category: "Italian",
    ingredients: "Pizza dough, San Marzano tomatoes, fresh mozzarella, fresh basil, extra virgin olive oil, salt",
    steps: "1. Preheat oven to 500\u00b0F (260\u00b0C) with a pizza stone.\n2. Stretch the dough into a 12-inch round on a floured surface.\n3. Spread a thin layer of crushed tomatoes, leaving a 1-inch border.\n4. Tear mozzarella into pieces and distribute evenly.\n5. Drizzle with olive oil and season with salt.\n6. Bake for 10-12 minutes until crust is golden and cheese is bubbly.\n7. Top with fresh basil leaves and serve immediately.",
  },
  {
    id: 2, title: "Spicy Chicken Momos",
    description: "Steamed dumplings filled with spicy minced chicken, served with tangy tomato achar.",
    image: momoImg,
    category: "Asian",
    ingredients: "All-purpose flour, minced chicken, onion, garlic, ginger, green chili, soy sauce, sesame oil, Sichuan pepper, tomato achar",
    steps: "1. Make dough with flour, water, and a pinch of salt. Rest for 30 minutes.\n2. Mix minced chicken with chopped onion, garlic, ginger, green chili, soy sauce, and sesame oil.\n3. Roll dough into small circles and place filling in the center.\n4. Pleat and seal the edges to form momos.\n5. Steam in a steamer for 12-15 minutes.\n6. Serve hot with spicy tomato achar.",
  },
  {
    id: 3, title: "Creamy Garlic Pasta",
    description: "Al dente pasta tossed in a rich and creamy garlic parmesan sauce with herbs.",
    image: pastaImg,
    category: "Italian",
    ingredients: "Fettuccine pasta, butter, garlic cloves, heavy cream, parmesan cheese, fresh parsley, salt, black pepper, nutmeg",
    steps: "1. Cook fettuccine in salted boiling water until al dente. Reserve 1 cup pasta water.\n2. Melt butter in a large pan over medium heat. Add minced garlic and saut\u00e9 for 1 minute.\n3. Pour in heavy cream and bring to a gentle simmer.\n4. Stir in grated parmesan until melted and sauce is smooth.\n5. Add drained pasta to the sauce and toss to coat.\n6. Season with salt, pepper, and a pinch of nutmeg.\n7. Garnish with fresh parsley and serve immediately.",
  },
  {
    id: 4, title: "Classic Gourmet Burger",
    description: "Juicy beef patty with lettuce, tomato, cheese, and special sauce in a toasted bun.",
    image: burgerImg,
    category: "American",
    ingredients: "Ground beef (80/20), brioche bun, cheddar cheese, lettuce, tomato, onion, pickles, special sauce (mayo + ketchup + relish)",
    steps: "1. Form ground beef into patties slightly wider than the buns. Season generously with salt and pepper.\n2. Cook on a hot grill or cast-iron skillet for 3-4 minutes per side for medium.\n3. Add cheddar cheese in the last minute and cover to melt.\n4. Toast the brioche buns on the grill for 30 seconds.\n5. Mix mayo, ketchup, and relish for the special sauce.\n6. Assemble: bottom bun, sauce, lettuce, patty with cheese, tomato, onion, pickles, top bun.\n7. Serve immediately with fries.",
  },
  {
    id: 5, title: "Butter Chicken",
    description: "Tender chicken pieces simmered in a rich, creamy tomato-based curry sauce.",
    image: butterChickenImg,
    category: "Indian",
    ingredients: "Chicken thighs, yogurt, lemon juice, garam masala, turmeric, cumin, coriander, tomatoes, butter, cream, kasuri methi, ginger-garlic paste",
    steps: "1. Marinate chicken in yogurt, lemon juice, and spices for at least 1 hour.\n2. Grill or pan-fry marinated chicken until charred. Set aside.\n3. In a pan, melt butter and saut\u00e9 ginger-garlic paste.\n4. Add pureed tomatoes and cook until oil separates.\n5. Stir in garam masala, turmeric, cumin, and coriander.\n6. Add grilled chicken pieces and simmer for 10 minutes.\n7. Finish with cream and crushed kasuri methi. Serve with naan or rice.",
  },
  {
    id: 6, title: "Vegetable Stir Fry",
    description: "Fresh seasonal vegetables wok-fried in a savory soy and ginger glaze.",
    image: vegetableStirFryImg,
    category: "Asian",
    ingredients: "Broccoli, bell peppers, snap peas, carrots, mushrooms, garlic, ginger, soy sauce, sesame oil, cornstarch, rice vinegar",
    steps: "1. Cut all vegetables into bite-sized pieces.\n2. Mix soy sauce, rice vinegar, sesame oil, and cornstarch for the sauce.\n3. Heat a wok or large pan over high heat with oil.\n4. Stir-fry garlic and ginger for 30 seconds.\n5. Add harder vegetables (carrots, broccoli) first, cook 2 minutes.\n6. Add softer vegetables (peppers, snap peas, mushrooms), cook 2 more minutes.\n7. Pour sauce over vegetables and toss until coated and glossy.\n8. Serve over steamed rice.",
  },
  {
    id: 7, title: "Greek Salad",
    description: "Crisp cucumbers, tomatoes, olives, and feta cheese drizzled with olive oil and oregano.",
    image: greekSaladImg,
    category: "Mediterranean",
    ingredients: "Cucumber, tomatoes, red onion, Kalamata olives, feta cheese, extra virgin olive oil, red wine vinegar, dried oregano, salt",
    steps: "1. Chop cucumber, tomatoes, and red onion into chunks.\n2. Combine in a large bowl with Kalamata olives.\n3. Crumble feta cheese on top.\n4. Drizzle generously with extra virgin olive oil and red wine vinegar.\n5. Sprinkle with dried oregano and salt.\n6. Toss gently and serve fresh.",
  },
  {
    id: 8, title: "Chocolate Lava Cake",
    description: "Warm chocolate cake with a gooey molten center, served with vanilla ice cream.",
    image: chocolateLavaImg,
    category: "Dessert",
    ingredients: "Dark chocolate (70%), butter, eggs, sugar, flour, vanilla extract, cocoa powder, pinch of salt",
    steps: "1. Melt chocolate and butter together over a double boiler.\n2. Whisk eggs and sugar until light and fluffy.\n3. Fold the chocolate mixture into the eggs.\n4. Gently fold in flour, cocoa powder, and salt.\n5. Pour into buttered and cocoa-dusted ramekins.\n6. Bake at 425\u00b0F (220\u00b0C) for 12-14 minutes.\n7. Let cool for 1 minute, then invert onto plates.\n8. Serve immediately with vanilla ice cream.",
  },
];

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    axios
      .get(`/api/recipes/${id}`, { signal: controller.signal })
      .then((res) => {
        if (!cancelled) {
          setRecipe(res.data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          const fallback = defaultRecipes.find((r) => r.id === Number(id));
          setRecipe(fallback || null);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [id]);

  if (loading) {
    return (
      <div className="container py-9 text-center">
        <p>Loading recipe...</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="container py-9 text-center">
        <h3>Recipe not found</h3>
        <Link to="/recipes" className="btn mt-3" style={{ background: "#46603D", color: "white", borderRadius: "10px" }}>
          Back to Recipes
        </Link>
      </div>
    );
  }

  const ingredientsList = recipe.ingredients
    ? recipe.ingredients.split(",").map((i) => i.trim()).filter(Boolean)
    : [];

  const stepsList = recipe.steps
    ? recipe.steps.split("\n").map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <div className="recipe-detail-page">
      <div className="recipe-detail-hero" style={{ backgroundImage: `url(${recipe.image || "https://via.placeholder.com/800x450?text=No+Image"})` }}>
        <div className="recipe-detail-overlay" />
        <div className="container position-relative" style={{ zIndex: 1 }}>
          <Link to="/recipes" className="back-link">
            <FaArrowLeft /> Back to Recipes
          </Link>
          <div className="recipe-detail-hero-content">
            {recipe.category && <span className="recipe-detail-category">{recipe.category}</span>}
            <h1 className="recipe-detail-title">{recipe.title}</h1>
            <p className="recipe-detail-desc">{recipe.description}</p>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="recipe-detail-body">
          {ingredientsList.length > 0 && (
            <div className="recipe-detail-section">
              <h3 className="recipe-detail-section-title">
                <FaListUl /> Ingredients
              </h3>
              <ul className="ingredients-list">
                {ingredientsList.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {stepsList.length > 0 && (
            <div className="recipe-detail-section">
              <h3 className="recipe-detail-section-title">
                <FaBookOpen /> Instructions
              </h3>
              <ol className="steps-list">
                {stepsList.map((step, idx) => (
                  <li key={idx}>{step.replace(/^\d+\.\s*/, "")}</li>
                ))}
              </ol>
            </div>
          )}

          {ingredientsList.length === 0 && stepsList.length === 0 && (
            <div className="recipe-detail-section">
              <p className="text-muted">No detailed instructions available for this recipe.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
