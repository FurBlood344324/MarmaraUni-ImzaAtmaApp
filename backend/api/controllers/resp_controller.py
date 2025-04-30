from flask import Blueprint, request, jsonify, make_response
from api.services.resp_service import get_all_resps, create_resp
from api.utils import generate_hash
from flask_cors import CORS

api_bp = Blueprint('api', __name__)
CORS(api_bp)

@api_bp.route('/api', methods=['GET'])
def get_api():
  try:
    resp = make_response(jsonify(get_all_resps()), 200)
    return resp
  except Exception as e:
    return make_response(jsonify({'message': str(e)}), 500)
  
@api_bp.route('/api', methods=['POST'])
def create_url():
  try:
    data = request.get_json() 
    hash = generate_hash()
    message = data.get("message")
    if message:
      resp = make_response(jsonify(create_resp(hash, message)), 201)
      return resp
  except Exception as e:
    return make_response(jsonify({'message': str(e)}), 500)

