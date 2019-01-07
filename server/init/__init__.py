from flask import Flask
app = Flask(__name__)
from init import routes
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sites.db'

db = SQLAlchemy(app)
migrate = Migrate(app, db)

class Ratings(db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    joke_id = db.Column(db.Integer, db.ForeignKey('joke.id'), primary_key=True)
    rating = db.Column(db.String(50))
    user = db.relationship("User", back_populates="jokes")
    joke = db.relationship("Joke", back_populates="users")

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50), unique=True, nullable=False) #find a way to check if email
    password = db.Column(db.String(50), nullable=False) #find way to hide this 
    jokes = db.relationship("Ratings", back_populates="user")

    def __repr__(self):
        return f"User('{self.email}')"
    
class Joke(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    joke = db.Column(db.String(500), unique=True, nullable=False)
    users = db.relationship("Ratings", back_populates="joke")

    def __repr__(self):
        return f"Joke('{self.joke}')"
