# Use the official Node.js image as the base image
FROM node:22-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Nuxt.js application
RUN npm run build

FROM node:22-alpine AS production
WORKDIR /app



COPY --from=build /app/.output ./

ENV PORT=3000
ENV HOST=0.0.0.0

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "server/index.mjs"]