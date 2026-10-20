# Makefile for the Quran class app API.
# Run `make` or `make help` to see all commands.

# Settings (override on the command line, e.g. `make run PORT=9000`)
IMAGE ?= goapi
BIN   := bin/api
PORT  ?= 8080

.DEFAULT_GOAL := help

## help: show this list of commands
.PHONY: help
help:
	@echo "Usage: make <command>"
	@echo ""
	@awk -F': ' '/^## / { sub(/^## /, ""); printf "  %-14s %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

# ---------------------------------------------------------------
# Development
# ---------------------------------------------------------------

## run: run the API locally (PORT=8080 by default)
.PHONY: run
run:
	go run ./cmd/api

## build: compile the API into bin/api
.PHONY: build
build:
	go build -o $(BIN) ./cmd/api

## clean: delete build output
.PHONY: clean
clean:
	rm -rf bin

# ---------------------------------------------------------------
# Quality checks
# ---------------------------------------------------------------

## fmt: format all Go files
.PHONY: fmt
fmt:
	gofmt -w .

## vet: look for likely bugs
.PHONY: vet
vet:
	go vet ./...

## test: run all tests
.PHONY: test
test:
	go test ./...

## check: run the same checks as CI (format, vet, test, build)
.PHONY: check
check:
	@test -z "$$(gofmt -l .)" || (echo "These files need formatting (run 'make fmt'):"; gofmt -l .; exit 1)
	go vet ./...
	go test ./...
	go build -o $(BIN) ./cmd/api

## tidy: add missing and remove unused dependencies
.PHONY: tidy
tidy:
	go mod tidy

# ---------------------------------------------------------------
# Docker
# ---------------------------------------------------------------

## docker-build: build the Docker image
.PHONY: docker-build
docker-build:
	docker build -t $(IMAGE) .

## docker-run: build and run the API in Docker on PORT
.PHONY: docker-run
docker-run: docker-build
	docker run --rm -p $(PORT):$(PORT) --env-file .env --name $(IMAGE) $(IMAGE)

## docker-stop: stop the running container
.PHONY: docker-stop
docker-stop:
	docker stop $(IMAGE)
