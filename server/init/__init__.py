from flask import Flask
app = Flask(__name__)
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_migrate import Migrate
app.config['SECRET_KEY'] = 'c328486dad3626f60ed3d9294bbddd8e'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sites.db'
db = SQLAlchemy(app)
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)
login_manager = LoginManager()
login_manager.init_app(app)

from init import routes

