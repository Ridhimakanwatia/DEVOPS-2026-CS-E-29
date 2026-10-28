
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev --fetch-retries=5 --fetch-timeout=300000

COPY . .

ENV NODE_ENV=production

EXPOSE 5000

CMD ["npm", "start"]
