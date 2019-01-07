from flask import Flask
app = Flask(__name__)
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sites.db'
db = SQLAlchemy(app)
migrate = Migrate(app, db)
from init import routes

