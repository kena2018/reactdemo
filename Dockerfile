FROM node:18 AS build

# Set the working directory inside the container to /app
WORKDIR /app

# Copy the dependency files to the working directory
COPY package.json package-lock.json ./

# Install all project dependencies
RUN npm install

# Copy all remaining project files to the container
COPY . .

# Build the project
RUN npm run build
EXPOSE 80
EXPOSE 5173
CMD ["npm", "run", "dev"]