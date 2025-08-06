# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy files
COPY . .

# Install dependencies
RUN npm install

# Build the app
RUN npm run build

# Start the app
CMD ["npm", "run", "start"]
