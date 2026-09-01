package models

import (
	"context"
	"fmt"
	"time"

	"recipe-sharing/db"
)

type Recipe struct {
	ID           int       `json:"id"`
	Title        string    `json:"title"`
	Description  string    `json:"description"`
	Image        string    `json:"image"`
	Ingredients  string    `json:"ingredients"`
	Steps        string    `json:"steps"`
	AvgRating    float64   `json:"avg_rating"`
	RatingCount  int       `json:"rating_count"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}

func GetAllRecipes() ([]Recipe, error) {
	rows, err := db.Pool.Query(context.Background(),
		"SELECT id, title, description, image, ingredients, steps, created_at, updated_at FROM recipes ORDER BY created_at DESC")
	if err != nil {
		return nil, fmt.Errorf("query recipes: %w", err)
	}
	defer rows.Close()

	var recipes []Recipe
	for rows.Next() {
		var r Recipe
		if err := rows.Scan(&r.ID, &r.Title, &r.Description, &r.Image, &r.Ingredients, &r.Steps, &r.CreatedAt, &r.UpdatedAt); err != nil {
			return nil, fmt.Errorf("scan recipe: %w", err)
		}
		recipes = append(recipes, r)
	}
	return recipes, nil
}

func GetRecipeByID(id int) (*Recipe, error) {
	var r Recipe
	err := db.Pool.QueryRow(context.Background(),
		"SELECT id, title, description, image, ingredients, steps, created_at, updated_at FROM recipes WHERE id = $1", id).
		Scan(&r.ID, &r.Title, &r.Description, &r.Image, &r.Ingredients, &r.Steps, &r.CreatedAt, &r.UpdatedAt)
	if err != nil {
		return nil, fmt.Errorf("recipe not found: %w", err)
	}
	return &r, nil
}

func CreateRecipe(r *Recipe) error {
	err := db.Pool.QueryRow(context.Background(),
		`INSERT INTO recipes (title, description, image, ingredients, steps)
		 VALUES ($1, $2, $3, $4, $5)
		 RETURNING id, created_at, updated_at`,
		r.Title, r.Description, r.Image, r.Ingredients, r.Steps).
		Scan(&r.ID, &r.CreatedAt, &r.UpdatedAt)
	if err != nil {
		return fmt.Errorf("insert recipe: %w", err)
	}
	return nil
}

func UpdateRecipe(id int, r *Recipe) error {
	err := db.Pool.QueryRow(context.Background(),
		`UPDATE recipes
		 SET title = $1, description = $2, image = $3, ingredients = $4, steps = $5, updated_at = NOW()
		 WHERE id = $6
		 RETURNING id, created_at, updated_at`,
		r.Title, r.Description, r.Image, r.Ingredients, r.Steps, id).
		Scan(&r.ID, &r.CreatedAt, &r.UpdatedAt)
	if err != nil {
		return fmt.Errorf("update recipe: %w", err)
	}
	return nil
}

func DeleteRecipe(id int) error {
	_, err := db.Pool.Exec(context.Background(), "DELETE FROM recipes WHERE id = $1", id)
	if err != nil {
		return fmt.Errorf("delete recipe: %w", err)
	}
	return nil
}
