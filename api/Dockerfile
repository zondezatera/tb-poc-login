# Build Stage
FROM golang:1.24-alpine AS builder
RUN apk add --no-cache git
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-s -w" -o main ./cmd/main.go

# Runtime Stage
FROM alpine:latest
RUN apk --no-cache add ca-certificates tzdata && \
    addgroup -g 1000 appgroup && \
    adduser -D -u 1000 -G appgroup appuser
WORKDIR /app
COPY --from=builder /app/main .
RUN chown -R appuser:appgroup /app
USER appuser
EXPOSE 8080

CMD ["./main"]
