from init import app
from flask import jsonify, request
from init.models import User, Joke, Ratings
import requests
import json


@app.route("/")
def hello():
    return "Hello World!"


@app.route('/get-joke', methods=['GET'])
def getJoke():
    url = 'https://icanhazdadjoke.com/'
    headers = {'Accept': 'application/json'}
    try:
        joke = requests.get(url, headers=headers)
        joke_object = joke.json()
        joke.raise_for_status()
        return jsonify({'id': joke_object['id'],  'joke': joke_object['joke']})
    except requests.exceptions.HTTPError as err:
        return jsonify({'message': err})

@app.route('/rate-joke', methods=['POST'])
def rateJoke():
   
    if request.data:
        data = json.loads(request.data)
        user = User.query.filter_by(id=data['user_id']).first()
        ratedJoke = Joke(id=data['joke_id'], joke=data['joke'])
        rating = Ratings(rating=data['rating'])
        rating.joke = ratedJoke
        user.jokes.append(rating)
        db.session.add_all([ratedJoke, rating])
        db.session.commit()

        return jsonify({'status': 200})

    # this route will add Joke to database, and then add User rating to Association Object



