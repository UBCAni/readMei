# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies in the container (without copying local node_modules)
RUN npm install

# Copy the rest of the frontend code into the container
COPY . .

# Expose Vite's default port
EXPOSE 5173

# Command to run the Vite development server
CMD ["npm", "run", "dev"]
