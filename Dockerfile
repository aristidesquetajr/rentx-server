FROM node


WORKDIR /usr/app

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]
