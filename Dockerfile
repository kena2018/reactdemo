# Stage 1: Build the React app
FROM node:18 AS build

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source files and build
COPY . .
RUN npm run build

# Stage 2: Serve built app with Nginx
FROM nginx:alpine

# Copy production build to Nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the container port for K8s ingress/service
EXPOSE 80
EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]