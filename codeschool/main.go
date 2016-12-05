package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type comment struct {
	Id   int    `json:"id"`
	Name string `json:"name"`
	Body string `json:"body"`
}

type comments []comment

func buildComments() comments {
	return comments{
		comment{1, "Luiz Cezer", "Some comment"},
		comment{2, "Cezer Luiz", "Another comment"},
	}
}

func getComments(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")
	response.WriteHeader(http.StatusOK)

	comments := buildComments()

	if err := json.NewEncoder(response).Encode(comments); err != nil {
		panic(err)
	}
}

func main() {
	http.HandleFunc("/comments", getComments)

	log.Println("Server running...")
	log.Fatal(http.ListenAndServe(":8000", nil))
}
