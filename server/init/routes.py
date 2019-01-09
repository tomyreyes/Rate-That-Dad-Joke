from init import app, db, bcrypt
from flask import jsonify, request
from init.models import User, Joke, Ratings
import requests
import json
from flask_cors import CORS
import jwt

CORS(app)

@app.route('/get-joke', methods=['GET', 'POST'])
def send_joke():
    url = 'https://icanhazdadjoke.com/'
    headers = {'Accept': 'application/json'}
    data = json.loads(request.data)
    if request.data: 
        if data['user'] and data['id']:
            user = User.query.filter_by(email=data['user']).first()
            joke_ids = list(map(lambda joke: joke.joke_id, user.jokes))
            return get_unrepeated_joke(url, headers, user, joke_ids)
        else: 
            return get_joke(url, headers)
    else: 
        return jsonify({'status': 400, 'message': 'Server cannot get a joke. Please Try Again'})

@app.route('/rate-joke', methods=['POST'])
def rate_joke():
    if request.data:
        data = json.loads(request.data)
        user = User.query.filter_by(email=data['user']).first()
        ratedJoke = Joke(id=data['joke_id'], joke=data['joke'])
        rating = Ratings(rating=data['rating'])
        print(rating)
        rating.joke = ratedJoke
        user.jokes.append(rating)
        db.session.add_all([ratedJoke, rating])
        db.session.commit()
        return jsonify({'status': 200})
    else: 
        return jsonify({'status': 400, 'message': 'Server has not received data. Please Try Again'})

@app.route('/user-registration', methods=['POST'])
def register():
    if request.data:
        data = json.loads(request.data)
        existing_user = User.query.filter_by(email=data['email']).first()
        
        if existing_user: 
            return jsonify({'status': 400, 'message': 'User already exists'})
        else: 
            hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
            new_user = User(email=data['email'], password=hashed_password)
            db.session.add(new_user)
            db.session.commit()
            return jsonify({'status':200})
    else: 
        return jsonify({'status': 500})

@app.route('/login', methods=['POST'])
def login():
    if request.data:
        data = json.loads(request.data)
        existing_user = User.query.filter_by(email=data['email']).first()
        if existing_user and bcrypt.check_password_hash(existing_user.password, data['password']):
            token = jwt.encode({'email': data['email']}, app.config['SECRET_KEY'])
            return jsonify({'status': 200, 'message': 'Log in succesful', 'email': data['email'], 'token': token.decode('UTF-8')})
        return jsonify({'status': 500})

@app.route('/get-user', methods=['GET'])
def getUser():
    token = request.args.get('token')
    data = jwt.decode(token, app.config['SECRET_KEY'])
    print(data['email'])
    return jsonify({'status': 200, 'email': data['email']})

def get_unrepeated_joke(url, headers, user, joke_ids, methods='GET'):
    try:
        joke = requests.get(url, headers=headers)
        joke_object = joke.json()
        joke.raise_for_status()
        if list(filter(lambda id: id == joke_object['id'], joke_ids)):
            joke = requests.get(url, headers=headers)
            joke_object = joke.json()
            return get_joke(url, headers, user, joke_ids)
        else:
            return jsonify({'id': joke_object['id'],  'joke': joke_object['joke']})
    except requests.exceptions.HTTPError as err:
        return jsonify({'message': err})

def get_joke(url, headers, methods='GET'):
    try:
        joke = requests.get(url, headers=headers)
        joke_object = joke.json()
        joke.raise_for_status()
        return jsonify({'id': joke_object['id'],  'joke': joke_object['joke']})
    except requests.exceptions.HTTPError as err:
        return jsonify({'message': err})
