from flask import Blueprint, request, jsonify, make_response
from .models import db, API_RESP
from .utils import generate_hash
from flask_cors import CORS

api_bp = Blueprint('api', __name__)
CORS(api_bp, origins=["http://localhost:3000"])

@api_bp.route('/api', methods=['GET'])
def get_api():
  try:
    api_resp = API_RESP.query.all()
    return make_response(jsonify([api.json() for api in api_resp]), 200)
  except Exception as e:
    return make_response(jsonify({'message': str(e)}), 500)
  
@api_bp.route('/api', methods=['POST'])
def create_url():
  try:
    data = request.get_json() 
    hash = generate_hash()
    api_resp = API_RESP(
      id=hash,
      message=data['message']
    )
    db.session.add(api_resp)
    db.session.commit()
    return make_response(jsonify({'message': 'api_resp created'}), 201)
  except Exception as e:
    return make_response(jsonify({'message': str(e)}), 500)

