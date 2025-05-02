from flask import Blueprint, request, jsonify, make_response
from api.services.auth_service import create_user, generate_token
from api.utils import generate_hash
from api.middleware.authorization import check_permission
from api.permissions.permissions import RolesPermissions

user_bp = Blueprint('user', __name__, url_prefix='/')

@user_bp.route('/<role>/register', methods=['POST'])
def admin_register(role):
  if role not in RolesPermissions:
    return make_response(jsonify({'message': 'Invalid role'}), 400)
  try:
    data = request.get_json() 
    username = data.get("username")
    password = data.get("password")
    hash = generate_hash()
    if username and password:
      user = create_user(hash, username, password, role)
      if not user:
        return make_response(jsonify({'message': 'User already exists'}), 400)
      resp = make_response(jsonify(user), 201)
      return resp
    return make_response(jsonify({'message': 'Username and password are wrong'}), 400)
  except Exception as e:
    return make_response(jsonify({'message': str(e)}), 500)
  
  
@user_bp.route('/<role>/login', methods=['POST'])
def admin_login(role):
  if role not in RolesPermissions:
    return make_response(jsonify({'message': 'Invalid role'}), 400)
  try:
    data = request.get_json() 
    username = data.get("username")
    password = data.get("password")
    token = generate_token(username, password)
    if token != "Unauthorized":
      return make_response(jsonify({"token": token}), 200)
    return make_response(jsonify(token), 401)   
  except Exception as e:
    return make_response(jsonify({'message': str(e)}), 500)

@user_bp.route('/<role>/checkdata', methods=['GET'])
@check_permission("write")
def check_data(role):
  if role not in RolesPermissions:
    return make_response(jsonify({'message': 'Invalid role'}), 400)
  try:
    return make_response(jsonify({"message": "You have access to this data"}), 200)
  except Exception as e:
    return make_response(jsonify({'message': str(e)}), 500)