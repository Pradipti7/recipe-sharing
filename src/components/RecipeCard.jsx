import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useContext } from "react";
import FavoritesContext from "../context/FavoritesContext";

function RecipeCard({ recipe, showRating }) {
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);
  const liked = isFavorite(recipe.id);

  return (
    <div
      className="card h-100 border-0 shadow-sm"
      style={{
        borderRadius: "18px",
        overflow: "hidden",
        background: "#ffffff",
      }}
    >
      <div style={{ position: "relative" }}>
        <img
          src={recipe.image || "https://via.placeholder.com/500x300?text=No+Image"}
          alt={recipe.title}
          className="card-img-top"
          style={{
            height: "500px",
            objectFit: "cover",
          }}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(recipe.id);
          }}
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            background: "rgba(255,255,255,0.9)",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            transition: "transform 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <FaHeart
            size={18}
            color={liked ? "#D64B3E" : "#ccc"}
            fill={liked ? "#D64B3E" : "none"}
          />
        </button>
      </div>

      <div className="card-body d-flex flex-column">
        <h4
          className="fw-bold"
          style={{ color: "#2B211D" }}
        >
          {recipe.title}
        </h4>

        <p
          style={{
            color: "#7A4B32"
          }}
        >
          {recipe.description}
        </p>

        {showRating && recipe.avg_rating !== undefined && (
          <div style={{ color: "#E8A33D", fontSize: "14px", marginBottom: "8px" }}>
            {"★".repeat(Math.round(recipe.avg_rating || 0))}
            {"☆".repeat(5 - Math.round(recipe.avg_rating || 0))}
            <span style={{ color: "#7A4B32", marginLeft: "6px" }}>
              {recipe.rating_count > 0 ? `(${recipe.rating_count})` : "No ratings"}
            </span>
          </div>
        )}

        <Link
          to={`/recipes/${recipe.id}`}
          className="btn mt-auto text-decoration-none"
          style={{
            background: "#D64B3E",
            color: "white",
            borderRadius: "10px"
          }}
        >
          View Recipe
        </Link>
      </div>
    </div>
  );
}

export default RecipeCard;
