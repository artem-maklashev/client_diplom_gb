FROM nginx

COPY nginx.conf /etc/nginx/conf.d/default.conf

#ENV REACT_APP_API_URL="http://localhost:8080/api"

WORKDIR /usr/share/react

RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs

COPY package*.json ./

RUN npm install

COPY . .
COPY .env.production .env

RUN npm run build

RUN rm -r /usr/share/nginx/html/*

RUN cp -a build/. /usr/share/nginx/html

# Этой строкой мы указываем, что наше приложение слушает порт 3000
#EXPOSE 3000

# Команда для запуска сервера
CMD ["nginx", "-g", "daemon off;"]