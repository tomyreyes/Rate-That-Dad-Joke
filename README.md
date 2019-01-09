# Rate That Dad Joke

This is a Full Stack Application built with Flask and React. This is my first time using Flask, and Python for that matter. 
This application allows users to register, sign-in and rate dad jokes coming from [icanhazdadjoke's API](https://icanhazdadjoke.com/api). 
User's are also able to see dad jokes they have rated in the past, as well as the rating they provided. React and Flask are able to communicate with each other through the REST API I created. 


### Client Notes: 
User login sessions are handled through a JWT I generate in the Flask Server that is stored in localstorage. The client retrieves the JWT token when they sign-in. 

### Server Notes: 

For my database, I am using flask-sqlalchemy.

The database is structured into three models as follows:

User - users who have registered are added into the database. 

Joke - each joke rated is added to the database. 

Ratings - this is an Association Object responsible for the many to many relationship between User and Joke. 
I am using a model for Ratings because I wanted to store ratings, as well as both foreign keys. 

To prevent users from receiving the same joke, I query the current user from the database and check the relationship between the User and Joke.  If the joke's id coming from [icanhazdadjoke's API](https://icanhazdadjoke.com/api) can be found, I make another request to the API. 


## Future Additions:
Due to time constraints, I did not get into nearly enough of what I wanted to do with this project. 
I would have liked to structure the server using [Blueprints](http://flask.pocoo.org/docs/1.0/blueprints/). Right now, I just have a large routes.py. I think I can do a better job separating the server by concerns. I also wanted create tests for the routes I created and separate implementation code from my route end-point. Finally, I would have loved to spend more time learning Python as a language. 


### Application Structure

Client - I separated the components into a component directory. In the component directory there are also two directories, styles and utils. 
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

Server - I structured the server as a package. 
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

### Prerequisites: 
[Node.js and NPM](https://nodejs.org/en/download/)

[Python 3](https://docs.python-guide.org/starting/install3/osx/)

[Pipenv](https://pipenv.readthedocs.io/en/latest/)

### Running this Project
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
To predict if the user would like the incoming joke I would try to make a guess based on the type of joke the user has liked in the past.
I think the easiest way to do this would be to make a guess based on the type of genre of comedy the person likes, the level of wittiness in a joke etc. However, this would rely heavily on the API one is using to retrieve the jokes categorizing jokes by genre/type. 

Although I have no experience with machine learning and AI I think this could be done through analyzing the jokes users like directly. For instance, if a user prefers jokes that are shorter and more to the point perhaps this can be detected.

## This application was built using:

- [React](https://reactjs.org/)
- [react-router](https://reacttraining.com/react-router/)
- [axios](https://github.com/axios/axios)
- [reactstrap](https://reactstrap.github.io/)
- [flask](http://flask.pocoo.org/)
- [flask-sqlalchemy](http://flask-sqlalchemy.pocoo.org/2.3/)
- [flask-cors](https://flask-cors.readthedocs.io/en/latest/)
- [flask-bcrypt](https://flask-bcrypt.readthedocs.io/en/latest/)
- [requests](http://docs.python-requests.org/en/master/)

## Special Thanks To: 

[Corey Schafer](https://www.youtube.com/channel/UCCezIgC97PvUuR4_gbFUs5g) and [Pretty Printed](https://www.youtube.com/channel/UC-QDfvrRIDB6F0bIO4I4HkQ), both of whom I referred to countless times in learning Flask in the past five days. 