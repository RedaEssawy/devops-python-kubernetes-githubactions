# Use the official Node.js image as the base image
FROM node:20-alpine AS builder

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app files to the working directory
COPY . .

# Build the app
RUN npm run build

FROM nginx:alpine AS final

# Copy the built app from the builder stage to the nginx html directory
COPY --from=builder /app/dist /usr/share/nginx/html


RUN echo 'server { listen 80; location / { root /usr/share/nginx/html; try_files $uri $uri/ /index.html; } }' \
    > /etc/nginx/conf.d/default.conf
 
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]