import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPizzaSlice, FaUtensils, FaHeart, FaStar, FaQuoteLeft, FaSearch } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import burgerImg from "../images/burger.jpeg";
import pastaImg from "../images/pasta.webp";
import momoImg from "../images/momo.webp";
import pizzaImg from "../images/pizza.jpeg";
import FavoritesContext from "../context/FavoritesContext";

const popularRecipes = [
  { id: 1, title: "Classic Margherita", category: "Italian", image: pizzaImg, time: "30 min" },
  { id: 2, title: "Spicy Momos", category: "Asian", image: momoImg, time: "45 min" },
  { id: 3, title: "Creamy Pasta", category: "Italian", image: pastaImg, time: "25 min" },
  { id: 4, title: "Gourmet Burger", category: "American", image: burgerImg, time: "20 min" },
];

const testimonials = [
  { id: 1, name: "Sarah M.", text: "RecipeHub transformed my cooking! I've discovered dishes I never knew I could make at home.", rating: 5 },
  { id: 2, name: "James L.", text: "The best recipe sharing platform. I use it every week to plan my meals and try new cuisines.", rating: 5 },
  { id: 3, name: "Maria K.", text: "Love how easy it is to share my family recipes. The community here is amazing and supportive!", rating: 5 },
];

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/recipes?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="home-page">

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-badge">Welcome to RecipeHub</span>
          <h1 className="hero-title">
            Discover <span className="highlight">Amazing</span> Recipes
          </h1>
          <p className="hero-subtitle">
            Share your favorite dishes with the world. Explore thousands of
            recipes from every cuisine imaginable.
          </p>
          <div className="hero-buttons">
            <Link to="/recipes" className="btn-hero-primary">
              Browse Recipes <FiArrowRight className="btn-icon" />
            </Link>
            <Link to="/add" className="btn-hero-secondary">
              Share a Recipe
            </Link>
          </div>
          <form className="hero-search" onSubmit={handleSearch}>
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search for recipes, cuisines, ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="hero-search-input"
            />
            <button type="submit" className="hero-search-btn">Search</button>
          </form>
          <div className="hero-stats">
            <div className="stat-item">
              <strong>500+</strong> <span>Recipes</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <strong>120+</strong> <span>Chefs</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <strong>50+</strong> <span>Cuisines</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Why RecipeHub?</span>
            <h2 className="section-title">Everything You Need</h2>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon" style={{ background: "linear-gradient(135deg, #D64B3E22, #D64B3E11)" }}>
                <FaPizzaSlice size={28} color="#D64B3E" />
              </div>
              <h4 className="feature-title">Thousands of Recipes</h4>
              <p className="feature-text">
                Find recipes from all around the world. From quick weeknight dinners to elaborate weekend feasts.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon" style={{ background: "linear-gradient(135deg, #E8A33D22, #E8A33D11)" }}>
                <FaUtensils size={28} color="#E8A33D" />
              </div>
              <h4 className="feature-title">Share Your Creations</h4>
              <p className="feature-text">
                Upload your own recipes, add photos, and inspire fellow food lovers with your culinary magic.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon" style={{ background: "linear-gradient(135deg, #46603D22, #46603D11)" }}>
                <FaHeart size={28} color="#46603D" />
              </div>
              <h4 className="feature-title">Save Your Favorites</h4>
              <p className="feature-text">
                Create your personal cookbook. Bookmark recipes you love and access them anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Recipes Section */}
      <section className="recipes-showcase">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Trending Now</span>
            <h2 className="section-title">Popular Recipes</h2>
          </div>
          <div className="recipes-grid">
            {popularRecipes.map((recipe) => {
              const liked = isFavorite(recipe.id);
              return (
                <div key={recipe.id} className="recipe-showcase-card">
                  <div className="recipe-image-wrapper">
                    <img src={recipe.image} alt={recipe.title} className="recipe-image" />
                    <span className="recipe-category">{recipe.category}</span>
                    <button
                      onClick={() => toggleFavorite(recipe.id)}
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        background: "rgba(255,255,255,0.9)",
                        border: "none",
                        borderRadius: "50%",
                        width: "36px",
                        height: "36px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                      }}
                    >
                      <FaHeart size={16} color={liked ? "#D64B3E" : "#ccc"} fill={liked ? "#D64B3E" : "none"} />
                    </button>
                  </div>
                  <div className="recipe-info">
                    <h5 className="recipe-title">{recipe.title}</h5>
                    <div className="recipe-meta">
                      <span className="recipe-time">{recipe.time}</span>
                      <div className="recipe-rating">
                        <FaStar size={14} color="#E8A33D" />
                        <span>4.8</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-4">
            <Link to="/recipes" className="btn-hero-primary">
              View All Recipes <FiArrowRight className="btn-icon" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Testimonials</span>
            <h2 className="section-title">Loved by Food Lovers</h2>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t) => (
              <div key={t.id} className="testimonial-card">
                <FaQuoteLeft size={24} color="#E8A33D" className="quote-icon" />
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-footer">
                  <div className="testimonial-avatar">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <strong className="testimonial-name">{t.name}</strong>
                    <div className="testimonial-stars">
                      {Array.from({ length: t.rating }, (_, i) => (
                        <FaStar key={i} size={12} color="#E8A33D" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Start Cooking?</h2>
          <p className="cta-text">
            Join thousands of food lovers sharing and discovering new recipes every day.
          </p>
          <div className="cta-buttons">
            <Link to="/add" className="btn-hero-primary">
              Share Your First Recipe <FiArrowRight className="btn-icon" />
            </Link>
            <Link to="/recipes" className="btn-hero-secondary" style={{ color: "#F3F6EE", borderColor: "#F3F6EE88" }}>
              Explore Recipes
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
