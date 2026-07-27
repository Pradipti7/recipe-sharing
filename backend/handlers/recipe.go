package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"recipe-sharing/models"

	"github.com/go-chi/chi/v5"
)

func jsonResponse(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(data)
}

func jsonError(w http.ResponseWriter, status int, msg string) {
	jsonResponse(w, status, map[string]string{"error": msg})
}

func GetRecipes(w http.ResponseWriter, r *http.Request) {
	recipes, err := models.GetAllRecipes()
	if err != nil {
		jsonError(w, http.StatusInternalServerError, "Failed to fetch recipes")
		return
	}
	if recipes == nil {
		recipes = []models.Recipe{}
	}
	jsonResponse(w, http.StatusOK, recipes)
}

func GetRecipe(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(chi.URLParam(r, "id"))
	if err != nil {
		jsonError(w, http.StatusBadRequest, "Invalid recipe ID")
		return
	}

	recipe, err := models.GetRecipeByID(id)
	if err != nil {
		jsonError(w, http.StatusNotFound, "Recipe not found")
		return
	}
	jsonResponse(w, http.StatusOK, recipe)
}

func CreateRecipe(w http.ResponseWriter, r *http.Request) {
	var recipe models.Recipe
	if err := json.NewDecoder(r.Body).Decode(&recipe); err != nil {
		jsonError(w, http.StatusBadRequest, "Invalid request body")
		return
	}

	if recipe.Title == "" {
		jsonError(w, http.StatusBadRequest, "Title is required")
		return
	}

	if err := models.CreateRecipe(&recipe); err != nil {
		jsonError(w, http.StatusInternalServerError, "Failed to create recipe")
		return
	}
	jsonResponse(w, http.StatusCreated, recipe)
}

func UpdateRecipe(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(chi.URLParam(r, "id"))
	if err != nil {
		jsonError(w, http.StatusBadRequest, "Invalid recipe ID")
		return
	}

	var recipe models.Recipe
	if err := json.NewDecoder(r.Body).Decode(&recipe); err != nil {
		jsonError(w, http.StatusBadRequest, "Invalid request body")
		return
	}

	if recipe.Title == "" {
		jsonError(w, http.StatusBadRequest, "Title is required")
		return
	}

	if err := models.UpdateRecipe(id, &recipe); err != nil {
		jsonError(w, http.StatusInternalServerError, "Failed to update recipe")
		return
	}
	jsonResponse(w, http.StatusOK, recipe)
}

func DeleteRecipe(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(chi.URLParam(r, "id"))
	if err != nil {
		jsonError(w, http.StatusBadRequest, "Invalid recipe ID")
		return
	}

	if err := models.DeleteRecipe(id); err != nil {
		jsonError(w, http.StatusInternalServerError, "Failed to delete recipe")
		return
	}
	jsonResponse(w, http.StatusOK, map[string]string{"message": "Recipe deleted"})
}
