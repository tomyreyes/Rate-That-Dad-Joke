from datetime import datetime
from init import db 

class Ratings(db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    joke_id = db.Column(db.Integer, db.ForeignKey('joke.id'), primary_key=True)
    rating = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    user = db.relationship("User", back_populates="jokes")
    joke = db.relationship("Joke", back_populates="users")

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50), unique=True, nullable=False) #find a way to check if email
    password = db.Column(db.String(50), nullable=False) #find way to hide this 
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    jokes = db.relationship("Ratings", back_populates="user")

    def __repr__(self):
        return f"User('{self.email}')"
    
class Joke(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    joke = db.Column(db.String(500), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    users = db.relationship("Ratings", back_populates="joke")

    def __repr__(self):
        return f"Joke('{self.joke}')"
