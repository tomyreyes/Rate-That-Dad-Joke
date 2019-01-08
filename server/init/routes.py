from init import app
from flask import jsonify, request
from init import db
from init.models import User, Joke, Ratings
import requests
import json
from flask_cors import CORS

cors = CORS(app, resources={r"/rate-joke": {"origins": "*"}})

@app.route('/get-joke', methods=['GET', 'POST'])
def send_joke():
    url = 'https://icanhazdadjoke.com/'
    headers = {'Accept': 'application/json'}
    user = User.query.filter_by(id=data['user_id']).first()
    joke_ids = list(map(lambda joke: joke.joke_id, user.jokes ))
    return get_joke(url, headers, user, joke_ids)

@app.route('/rate-joke', methods=['POST'])
def rate_joke():
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
    else: 
        return jsonify({'status': 400, 'message': 'Server has not received data.'})


def get_joke(url, headers, user, joke_ids, methods='GET'):
    try:
        joke = requests.get(url, headers=headers)
        joke_object = joke.json()
        joke.raise_for_status()
        if list(filter(lambda: id: id == joke_object['id'], joke_ids)):
            joke = requests.get(url, headers=headers)
            joke_object = joke.json()
            return get_joke(url, headers, user, joke_ids)
        else:
            return jsonify({'id': joke_object['id'],  'joke': joke_object['joke']})
    except requests.exceptions.HTTPError as err:
        return jsonify({'message': err})
