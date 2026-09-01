package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"recipe-sharing/models"

	"github.com/go-chi/chi/v5"
)

func GetRecipeRating(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(chi.URLParam(r, "id"))
	if err != nil {
		jsonError(w, http.StatusBadRequest, "Invalid recipe ID")
		return
	}

	rating, err := models.GetRecipeRating(id)
	if err != nil {
		jsonError(w, http.StatusInternalServerError, "Failed to fetch rating")
		return
	}
	jsonResponse(w, http.StatusOK, rating)
}

func CreateRating(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(chi.URLParam(r, "id"))
	if err != nil {
		jsonError(w, http.StatusBadRequest, "Invalid recipe ID")
		return
	}

	var body struct {
		Rating int `json:"rating"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		jsonError(w, http.StatusBadRequest, "Invalid request body")
		return
	}

	if body.Rating < 1 || body.Rating > 5 {
		jsonError(w, http.StatusBadRequest, "Rating must be between 1 and 5")
		return
	}

	if err := models.CreateRating(id, body.Rating); err != nil {
		jsonError(w, http.StatusInternalServerError, "Failed to create rating")
		return
	}

	rating, _ := models.GetRecipeRating(id)
	jsonResponse(w, http.StatusCreated, rating)
}
