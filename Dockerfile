# Use the official Nginx image as the base image
FROM nginx

# Set the working directory to /usr/share/react
WORKDIR /usr/share/react

# Install Node.js and npm
RUN apt-get update && apt-get install -y \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Build the React application
RUN npm run build

# Remove the default Nginx static content
RUN rm -r /usr/share/nginx/html/*

# Copy the built React app to the Nginx default HTML directory
RUN cp -a build/. /usr/share/nginx/html

# Expose port 3000 (the port on which your React app will run)
EXPOSE 3000