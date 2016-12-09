package main

import (
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"strconv"
)

var InvalidHTTPMethod = errors.New("Invalid HTTP Method for delete")

type Comment struct {
	Id     int    `json:"id"`
	Author string `json:"author"`
	Body   string `json:"body"`
}

type Comments []Comment

var comments Comments

// func init() {
// 	comments = append(comments, comment{1, "Luiz Cezer", "Some comment"}, comment{2, "Cezer Luiz", "Another comment"})
// }

var currentId int

func generateId() int {
	currentId += 1
	return currentId
}

func indexComments(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	if err := json.NewEncoder(w).Encode(comments); err != nil {
		panic(err)
	}
}

func destroyComment(w http.ResponseWriter, r *http.Request) {
	if r.Method != "DELETE" {
		panic(InvalidHTTPMethod)
	}
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusNoContent)

	commentId := r.URL.Query().Get("commentId")
	commentIdInt, _ := strconv.Atoi(commentId)

	for i, comment := range comments {
		if comment.Id == commentIdInt {
			comments = append(comments[:i], comments[i+1:]...)
		}
	}
}

func createComment(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		panic(InvalidHTTPMethod)
	}
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusCreated)

	r.ParseForm()

	comment := Comment{}
	comment.Id = generateId()
	comment.Author = r.PostFormValue("author")
	comment.Body = r.PostFormValue("body")

	comments = append(comments, comment)
}

func main() {
	http.HandleFunc("/comments", indexComments)
	http.HandleFunc("/comments/delete", destroyComment)
	http.HandleFunc("/comments/create", createComment)

	log.Println("Server running...")
	log.Fatal(http.ListenAndServe(":8001", nil))
}
