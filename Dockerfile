# Use nginx:stable-alpine as the base image
FROM nginx:stable-alpine

# Install node.js
RUN apk add --no-cache nodejs

# Set working directory to /app
WORKDIR /app

# Copy frontend code to nginx html directory
COPY ./dist /usr/share/nginx/html/

# Copy backend code to working directory
COPY ./backend .

# Install backend dependencies
RUN npm install

# Expose port 80
EXPOSE 80

# Start the backend server
CMD ["node", "server.js"]

