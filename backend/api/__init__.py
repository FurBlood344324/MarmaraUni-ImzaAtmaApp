from flask import Flask
from api.entities.entities import db
from api.controllers.api import register_blueprints

def create_app():
    app = Flask(__name__)
    app.config.from_object('api.config.Config')

    db.init_app(app)

    if app.config['FLASK_ENV'] == 'development':
        with app.app_context():
            try:
                db.create_all()
                print("Database created successfully.")
            except Exception as e:
                print(f"Database creation failed: {e}")
    
    register_blueprints(app)

    return app