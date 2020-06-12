# TD's url shortener

This is a url shortener where you can create short form url for your original url. You can also visit the website [here](http://www.td.coffee/).

![Imgur](https://i.imgur.com/A0NECa1.png)

![Imgur](https://i.imgur.com/4xlsGxu.png)

![Imgur](https://i.imgur.com/qivowLp.png)

### Features
* User can create short url
* User can be redirected to original site via short url
* User can see his/her own urls after signed in
* User can access to the services above via API

### API
* POST /api/users/signup
* POST /api/users/signin
* GET /api - retrieve user's urls
* POST /api - create short url or retreive original url

You can also refer to the api document [here](http://www.td.coffee/api-doc/)

### Stack
* Node.js
* Express.js
* MySQL
* Nginx (rate limiter)
* Mocha (testing)
* Docker (environment)
* Travis (CI/CD)
* AWS Elastic Beanstalk (Deployment)

### Prerequisite

Install [docker](https://www.docker.com/get-started) in your computer.

### Setup

1. clone repo
```
$ git clone git@github.com:tsungtingdu/url_shortener_docker.git
```
2. go to project folder
```
$ cd url_shortener_docker
```
3. config your own settings in docker-compose.yml, for example:
```
...
HOST: http://localhost:3000
JWT_SECRET: development
```

4. run docker-compose build
```
$ docker-compose build 
```
5. start the server
```
$ docker-compose up 
```

### Test

1. start the server (follow the steps above)

2. open another terminal window and check container id of image ` td_url_shortener_web_1`
```
$ docker ps
```

3. start a bash shell in the running container
```
$ docker exec -it CONTAINER_ID /bin/bash
```

4. run test with npm test command
```
$ npm test
```
***
***
### Other pages
/next-launch ([check live web page](http://www.td.coffee/next-launch))

Countdown for the next lauch of SpaceX

![Imgur](https://i.imgur.com/O0DGKAb.png)

*data source: [SpaceX API](https://docs.spacexdata.com/?version=latest)*


***
### Authors
[tsungtingdu](https://github.com/tsungtingdu) (Tim)

Self-taught and trained in software development knowledge and skills, I am passionate about creating changes through technology.

You can find more about me here:
* [Medium](https://medium.com/tds-note)
* [LinkedIn](https://www.linkedin.com/in/tsung-ting-tu/)
* [Teaching Assistant at ALPHA Camp](https://lighthouse.alphacamp.co/users/3247/ta_profile)