# Use the official Node.js image as the base image
FROM node:22-alpine as build

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

FROM node:22-alpine as production
WORKDIR /app



COPY --from=build /app/.output ./

ENV PORT=3001
ENV HOST=0.0.0.0

# Expose the port the app runs on
EXPOSE 3001

# Start the application
CMD ["node", "server/index.mjs"]