FROM node:20-alpine

WORKDIR /app

# Sao chep package.json va cai dat dependencies
COPY package*.json ./
RUN npm install --production

# Sao chep ma nguon
COPY . .

# Mo cong PORT cho Render
EXPOSE 3000

ENV PORT=3000
ENV NODE_ENV=production
ENV RENDER=true

CMD ["node", "server.js"]
