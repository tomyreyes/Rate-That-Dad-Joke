# Rate That Dad Joke

This is a Full Stack Application built with Flask and React. This is my first time using Flask and Python for that matter. 
This application allows users to register, sign-in and rate dad jokes coming from [icanhazdadjoke's API](https://icanhazdadjoke.com/api). 
User's are also able to see dad jokes they have rated in the past, as well as the rating they gave the joke. 

### Application Structure

Client - I separated the components into a component directory. In the component directory there are also two directors, styles and utils. 
```
├── client
    ├── public
    │   ├── index.html
    ├── src
    │   ├── components
    │   │    ├── styles
    │   │    │   ├── **.css
    │   │    ├── utils
    │   │    │  ├── **.js    # Helper functions
    │   │    │**.js           
    │   │**.js               # React configurations
    │
    │
    │
    │   
    ├── package.json
    ├── package.json
    └── .gitignore
```

Server - I structured the server as a package called init to be a bit more organized. 
```
├── server
    ├── init
    ├── init
    │   ├── __init__.py
    │   │── models.py             
    │   │── routes.py             #API endpoints
    │   |── sites.db 
    │
    │
    │
    │   
    ├── Pipfile
    ├── Pipfile.lock
    └── run.py                   # run this
```

### Running this project 

Client Pre-equisites: [Node.js and NPM](https://nodejs.org/en/download/)
Server Prerequisites: [Python 3](https://docs.python-guide.org/starting/install3/osx/) and [Pipenv](https://pipenv.readthedocs.io/en/latest/)

Before you begin make sure to: 
```
git clone https://github.com/tomyreyes/Rate-That-Dad-Joke.git
Open project in code editor
```

Client set-up:

Step 1: 
```
cd client
```

Step 2:
```
npm install
```
Step 3:
```
npm start - should be set to localhost:3000
```

Server set-up:
Step 1:
```
cd server
```

Step 2: 
```
pipenv install
```

Step 3: 
```
pipenv shell
```

Step 4:
```
python run.py - should be set to localhost:5000
```
