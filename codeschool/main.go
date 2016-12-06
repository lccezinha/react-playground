package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type comment struct {
	Id     int    `json:"id"`
	Author string `json:"author"`
	Body   string `json:"body"`
}

type comments []comment

func buildComments() comments {
	return comments{
		comment{1, "Luiz Cezer", "Some comment"},
		comment{2, "Cezer Luiz", "Another comment"},
	}
}

func getComments(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	comments := buildComments()

	if err := json.NewEncoder(w).Encode(comments); err != nil {
		panic(err)
	}
}

func main() {
	http.HandleFunc("/comments", getComments)

	log.Println("Server running...")
	log.Fatal(http.ListenAndServe(":8001", nil))
}
