package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"
	"github.com/gorilla/mux"
)

type event struct {
	Name string `json:"name"`
	Email string `json:"email"`
	MobileNumber string `json:"mobileNumber"`
	Address string `json:"address"`
	Birthday string `json:"birthday"`
	AppointmentDate string `json:"appointmentDate"`
	PhotoBase64 string `json:photobase64`
}

type allEvents []event

var event1 = event{
		Name: "Rui",
		Email: "123@321.com",
		MobileNumber: "666-666-6666",
		Address: "California",
		Birthday: "2020-01-01",
		AppointmentDate: "2020-01-01",
		PhotoBase64: "",
}

var events = allEvents{
	event1,
}

func homeLink(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome home!")
}

func createEvent(w http.ResponseWriter, r *http.Request) {
	var newEvent event
	reqBody, err := ioutil.ReadAll(r.Body)

	fmt.Println("body: %v", string(reqBody))
	if err != nil {
		fmt.Fprintf(w, "Kindly enter data with the event title and description only in order to update")
	}

	json.Unmarshal(reqBody, &newEvent)
	events = append(events, newEvent)
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusCreated)

	fmt.Println("Event: %v %v", time.Now(), newEvent)

	json.NewEncoder(w).Encode(newEvent)
}

func getOneEvent(w http.ResponseWriter, r *http.Request) {
	mobileNumber := mux.Vars(r)["mobileNumber"]

	for _, singleEvent := range events {
		if singleEvent.MobileNumber == mobileNumber {
			json.NewEncoder(w).Encode(singleEvent)
		}
	}
}

func getAllEvents(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE,PUT")

		fmt.Println("event: %v %v", time.Now(), event1)
	json.NewEncoder(w).Encode(events)
}


func main() {
	// initEvents()
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/", homeLink)
	router.HandleFunc("/appointment", createEvent).Methods("POST")
	router.HandleFunc("/patients", getAllEvents).Methods("GET")
	router.HandleFunc("/patients/{id}", getOneEvent).Methods("GET")
	http.ListenAndServe(":8080", router)
}
