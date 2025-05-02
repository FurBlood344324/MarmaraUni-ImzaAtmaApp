from flask import Blueprint
from api.controllers.resp_controller import resp_bp
from api.controllers.user_controller import user_bp
from flask_cors import CORS

api_bp = Blueprint('api', __name__)

def register_blueprints(app):
    app.register_blueprint(resp_bp)
    app.register_blueprint(user_bp)
    CORS(api_bp)
