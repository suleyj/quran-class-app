package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestHelloHandler(t *testing.T) {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /hello/{name}", helloHandler)

	req := httptest.NewRequest(http.MethodGet, "/hello/amina", nil)
	rec := httptest.NewRecorder()
	mux.ServeHTTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", rec.Code, http.StatusOK)
	}

	var body map[string]string
	if err := json.NewDecoder(rec.Body).Decode(&body); err != nil {
		t.Fatalf("decode body: %v", err)
	}
	if got, want := body["message"], "hello, amina"; got != want {
		t.Errorf("message = %q, want %q", got, want)
	}
}
