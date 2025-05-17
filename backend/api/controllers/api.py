from flask import Blueprint
from api.controllers.user_controller import user_bp
from api.controllers.signature_controller import signature_bp
from api.controllers.task_controller import task_bp
from flask_cors import CORS

api_bp = Blueprint('api', __name__)

def register_blueprints(app):
    CORS(user_bp, origins="*")
    CORS(signature_bp, origin="*")
    CORS(task_bp, origins="*")
    app.register_blueprint(user_bp)
    app.register_blueprint(signature_bp)
    app.register_blueprint(task_bp)
