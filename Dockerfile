# Use nginx:stable-alpine as the base image
FROM nginx:stable-alpine

# Copy frontend code to nginx html directory
COPY ./dist /usr/share/nginx/html

# Copy Nginx configuration
COPY ./nginx.conf /etc/nginx/nginx.conf

# Install Node.js and other dependencies
RUN apk add --no-cache nodejs npm

# Set working directory to /app
WORKDIR /app

# Copy backend code to working directory
COPY ./backend .

# Install backend dependencies
RUN npm install

# Expose port 80
EXPOSE 80

# Start Nginx and Node.js server
CMD ["sh", "-c", "nginx && node server.js"]

