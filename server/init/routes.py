from init import app
from flask import jsonify
from init.models import User, Joke, Ratings
import requests

@app.route("/")
def hello():
    return "Hello World!"

@app.route('/get-joke', methods=['GET'])
def getJoke():
    url = 'https://icanhazdadjoke.com/'
    headers = { 'Accept': 'application/json' }
    try: 
        joke = requests.get(url, headers=headers)
        joke_object = joke.json()
        joke.raise_for_status()
        return jsonify({'id':joke_object['id'],  'joke': joke_object['joke']})
    except requests.exceptions.HTTPError as err:
        return jsonify({'message': err})

#  @app.route('/get-rating', methods=['GET'])
#  def getRating():



