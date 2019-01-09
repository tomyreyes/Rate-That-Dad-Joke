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
```
from root directory:
cd client
npm install
npm start - should be set to localhost:3000
```

Server set-up:
```
from root directory:
cd server
pipenv install
pipenv shell
python run.py - should be set to localhost:5000
```
### Bonus
To predict if the user would like the next incoming joke I would try to make a guess based on the type of joke the user has liked in the past.
I think the easiest way to do this would be to make a guess based on the type of genre of comedy the person likes, the level of wittiness in a joke etc. However, this would rely heavily on the API one is using to retrieve the jokes categorizing jokes by genre/type. 

Although I have no experience with machine learning and AI I think this could be done through analyzing the jokes themselves that users like. For instance, if a user prefers jokes that are shorter and more to the point perhaps this can be detected. 