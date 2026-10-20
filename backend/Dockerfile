FROM golang:1.27 AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -o /server ./cmd/api

# Stage 2: run
FROM gcr.io/distroless/static:nonroot
COPY --from=builder /server /server
ENV PORT=8080
EXPOSE 8080
ENTRYPOINT ["/server"]
