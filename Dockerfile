# -----------------------------
# Stage 1 — Build environment
# -----------------------------
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy app source
COPY . .

# -----------------------------
# Stage 2 — Runtime environment
# -----------------------------
FROM node:20-alpine

WORKDIR /app

# Copy from build stage
COPY --from=builder /app /app

# Expose the app port
EXPOSE 5000

# Define environment variable
ENV NODE_ENV=production

# Start the server
CMD ["node", "server.js"]
