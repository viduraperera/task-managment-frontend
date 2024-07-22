# Use the official Node.js image as a base
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port Next.js is running on (usually 3000)
EXPOSE 3000

# Start the Next.js application in development mode
CMD ["npm", "run", "dev"]