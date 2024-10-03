from flask import render_template, request
from models import user_credentials

def register_routes(app, db):

    @app.route('/')
    def index():
        cred = user_credentials.query.all()
        print(cred)