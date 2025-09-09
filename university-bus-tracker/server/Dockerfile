FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 5001

# Update your CMD to run migrations prior to starting the app
CMD ["npm", "start"]
