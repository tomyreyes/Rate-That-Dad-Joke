#!/usr/bin/python
from flask import Flask
app = Flask(__name__)
from init import routes
from flask_sqlalchemy import SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sites.db'

db = SQLAlchemy(app)

class Joke(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    joke = db.Column(db.String(250), unique=True, nullable=False)
    ratings = db.Column(db.PickleType)

    def __repr__(self):
        return f"Joke('{self.joke}', '{self.ratings}')"
        
