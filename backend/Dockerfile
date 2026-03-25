FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Expose backend port
EXPOSE 5000

# Start server
CMD ["node", "src/app.js"]
