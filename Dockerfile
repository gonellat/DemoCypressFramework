# Base image with Cypress and browsers
FROM cypress/included:14.5.0

# Set working directory inside container
WORKDIR /e2e

# Copy all local files into container
COPY . .

# Install dependencies (uses package-lock.json)
RUN npm install --legacy-peer-deps

# Optionally set default command (can override in docker-compose)
CMD ["npx", "cypress", "run"]
