# TD's url shortener

This is a url shortener where you can create short form url for your original url.

[Imgur](https://i.imgur.com/A0NECa1.png)

[Imgur](https://i.imgur.com/4xlsGxu.png)

[Imgur](https://i.imgur.com/qivowLp.png)

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
***
### Authors
[tsungtingdu](https://github.com/tsungtingdu) (Tim)

Self-taught and trained in software development knowledge and skills, I am passionate about creating changes through technology.

You can find more about me here:
* [Medium](https://medium.com/tds-note)
* [LinkedIn](https://www.linkedin.com/in/tsung-ting-tu/)
* [Teaching Assistant at ALPHA Camp](https://lighthouse.alphacamp.co/users/3247/ta_profile)