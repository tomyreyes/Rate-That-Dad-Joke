from flask import Flask
app = Flask(__name__)
from init import routes

from flask_alchemy import SQLAlchemy