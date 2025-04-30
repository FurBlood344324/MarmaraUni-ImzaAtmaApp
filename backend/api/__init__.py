from flask import Flask
from api.controllers.resp_controller import api_bp 
from api.entities.resp_entity import db

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
    
    app.register_blueprint(api_bp)

    return app