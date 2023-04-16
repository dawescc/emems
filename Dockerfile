# Use a small base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the frontend code to the container
COPY ./dist ./dist

# Copy the backend code to the container
COPY ./backend ./backend

# Set the current directory to the backend folder
WORKDIR /app/backend

# Install backend dependencies
RUN npm install

# Expose port 3000
EXPOSE 3000

# Set the current directory to the root folder
WORKDIR /app

# Start the server
CMD ["node", "./backend/server.js"]
