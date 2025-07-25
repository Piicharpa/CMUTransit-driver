FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Generate Prisma client
RUN npx prisma generate

EXPOSE 5000

# Update your CMD to run migrations prior to starting the app
CMD ["sh", "-c", "npx prisma generate && npm start"]
