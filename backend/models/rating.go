package models

import (
	"context"
	"fmt"

	"recipe-sharing/db"
)

type Rating struct {
	ID       int   `json:"id"`
	RecipeID int   `json:"recipe_id"`
	Rating   int   `json:"rating"`
}

type RecipeRating struct {
	AvgRating   float64 `json:"avg_rating"`
	RatingCount int     `json:"rating_count"`
}

func CreateRating(recipeID, rating int) error {
	if rating < 1 || rating > 5 {
		return fmt.Errorf("rating must be between 1 and 5")
	}
	_, err := db.Pool.Exec(context.Background(),
		"INSERT INTO ratings (recipe_id, rating) VALUES ($1, $2)", recipeID, rating)
	if err != nil {
		return fmt.Errorf("insert rating: %w", err)
	}
	return nil
}

func GetRecipeRating(recipeID int) (*RecipeRating, error) {
	var rr RecipeRating
	err := db.Pool.QueryRow(context.Background(),
		`SELECT COALESCE(AVG(rating), 0), COUNT(*)
		 FROM ratings WHERE recipe_id = $1`, recipeID).
		Scan(&rr.AvgRating, &rr.RatingCount)
	if err != nil {
		return nil, fmt.Errorf("get recipe rating: %w", err)
	}
	return &rr, nil
}

func GetAllRecipesWithRatings() ([]Recipe, error) {
	rows, err := db.Pool.Query(context.Background(),
		`SELECT r.id, r.title, r.description, r.image, r.ingredients, r.steps,
		        r.created_at, r.updated_at,
		        COALESCE(AVG(rt.rating), 0) AS avg_rating,
		        COUNT(rt.id) AS rating_count
		 FROM recipes r
		 LEFT JOIN ratings rt ON r.id = rt.recipe_id
		 GROUP BY r.id
		 ORDER BY r.created_at DESC`)
	if err != nil {
		return nil, fmt.Errorf("query recipes with ratings: %w", err)
	}
	defer rows.Close()

	var recipes []Recipe
	for rows.Next() {
		var r Recipe
		if err := rows.Scan(&r.ID, &r.Title, &r.Description, &r.Image,
			&r.Ingredients, &r.Steps, &r.CreatedAt, &r.UpdatedAt,
			&r.AvgRating, &r.RatingCount); err != nil {
			return nil, fmt.Errorf("scan recipe: %w", err)
		}
		recipes = append(recipes, r)
	}
	return recipes, nil
}
