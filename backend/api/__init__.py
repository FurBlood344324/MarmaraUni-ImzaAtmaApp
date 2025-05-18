from flask import Flask
from api.entities.entities import db
from api.controllers.api import register_blueprints
import time

def create_app():
    app = Flask(__name__)
    app.config.from_object('api.config.Config')

    db.init_app(app)

    max_retries = 5
    for i in range(max_retries):
        with app.app_context():
            try:
                db.create_all()
                print("Database created successfully.")
                break
            except Exception as e:
                print(f"Database not ready, retrying ({i+1}/{max_retries})...")
                time.sleep(3)
    else:
        print("Database connection failed after retries.")
    
    register_blueprints(app)

    return app