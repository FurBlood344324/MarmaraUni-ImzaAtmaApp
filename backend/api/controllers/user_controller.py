from flask import Blueprint, request, jsonify, make_response
from api.services.auth_service import create_user, generate_token, get_usersname_and_no_with_userid
from api.utils import generate_hash
from api.middleware.authorization import check_permission, get_user_id
from api.permissions.permissions import RolesPermissions

user_bp = Blueprint('user', __name__, url_prefix='/auth')

@user_bp.route('/<role>/register', methods=['POST'])
def register(role):
  if role not in RolesPermissions:
    return make_response(jsonify({'message': 'Invalid role'}), 400)
  
  try:
    data = request.get_json() 

    name = data.get("name")
    surname = data.get("surname")
    no = data.get("no")
    email = data.get("email")
    username = data.get("username")
    password = data.get("password")

    hash = generate_hash()

    if username and password:
      user = create_user(hash, name, surname, no, email, username, password, role)

      if not user:
        return make_response(jsonify({'message': 'User already exists'}), 400)
      
      resp = make_response(jsonify(user), 201)

      return resp
    
    return make_response(jsonify({'message': 'Infos are wrong'}), 400)
  except Exception as e:
    return make_response(jsonify({'message': str(e)}), 500)
  
  
@user_bp.route('/<role>/login', methods=['POST'])
def login(role):
  if role not in RolesPermissions:
    return make_response(jsonify({'message': 'Invalid role'}), 400)
  
  try:
    data = request.get_json()

    username = data.get("username")
    password = data.get("password")

    token = generate_token(username, password)

    if token != "Unauthorized":
      return make_response(jsonify({"token": token}), 200)
    
    return make_response(jsonify({"token": token}), 401)   
  except Exception as e:
    return make_response(jsonify({'message': str(e)}), 500)
  
@user_bp.route('/getnameandno', methods=['GET'])
@check_permission("write")
def get_name_and_no_by_userid():
  try:
    data_h = dict(request.headers)

    user_id = data_h.get('Creator-Id')

    if user_id:
      resp = get_usersname_and_no_with_userid(user_id)

      return make_response(resp)

    return make_response(jsonify({'message': 'Infos are wrong'}), 400)
  except Exception as e:
    return make_response(jsonify({'message': str(e)}), 500)


@user_bp.route('/<role>/checkpermission', methods=['GET'])
@check_permission("write")
def check_permission(role):
  if role not in RolesPermissions:
    return make_response(jsonify({'message': 'Invalid role'}), 400)
  try:
    return make_response(jsonify({"message": "You have access to this data"}), 200)
  except Exception as e:
    return make_response(jsonify({'message': str(e)}), 500)
  
@user_bp.route('/getuserid', methods=['GET'])
@get_user_id()
def get_id():
  return make_response(jsonify({'message': 'Error'}), 500)
