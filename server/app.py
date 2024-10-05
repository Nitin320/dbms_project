from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

db = SQLAlchemy()

'''app = Flask(__name__, template_folder='templates')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///./database.db'
db.init_app(app)'''
def create_app():
    app = Flask(__name__, template_folder='templates')
    CORS(app)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///./database.db'
    db.init_app(app)
    
    #import routes 
    from routes import register_routes
    register_routes(app, db)

    Migrate(app, db)

    return app
