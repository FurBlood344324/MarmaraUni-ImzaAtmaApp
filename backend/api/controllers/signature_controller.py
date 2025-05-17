from flask import Blueprint, request, jsonify, make_response
from api.services.signature_service import create_signature, create_signature_list, get_signature_with_list
from api.utils import generate_hash
from api.middleware.authorization import check_permission, get_list_id

signature_bp = Blueprint('signature', __name__, url_prefix='/signature')

@signature_bp.route('/push', methods=['POST'])
@check_permission("read")
def push_signature_by_user():
    try:
        data_h = dict(request.headers)

        creator_id = data_h.get('Creator-Id')
        list_id = data_h.get('List-Id')

        hash = generate_hash()

        if creator_id and list_id:
            signature = create_signature(hash, creator_id, list_id)

            if not signature:
                return make_response(jsonify({'message': 'Signature already exists'}), 400)
            
            resp = make_response(jsonify(signature), 201)

            return resp

        return make_response({'message': 'Infos are wrong'}, 400)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 500)
    
@signature_bp.route('/create', methods=['POST'])
@check_permission("write")
def create_signature_by_user():
    try:
        data_h = dict(request.headers)

        creator_id = data_h.get('Creator-Id')
        linked_task_id = data_h.get('Task-Id')

        hash = generate_hash()

        if creator_id and linked_task_id:
            signature_list = create_signature_list(hash, creator_id, linked_task_id)

            if not signature_list:
                return make_response(jsonify({'message': 'SignatureList already exists'}), 400)
            
            resp = make_response(jsonify(signature_list), 201)

            return resp

        return make_response({'message': 'Infos are wrong'}, 400)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 500)

@signature_bp.route('/getsignatures', methods=['GET'])
@check_permission("write")
def get_signatures_for_list():
    try:
        data_h = dict(request.headers)

        list_id = data_h.get('List-Id')

        if list_id:
            signatures = get_signature_with_list(list_id)

            if not signatures:
                return make_response(jsonify({'message': 'Signatures with this list doesnt exists'}), 400)
        
            resp = make_response(jsonify(signatures), 200)

            return resp

        return make_response({'message': 'Infos are wrong'}, 400)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 500)
    
@signature_bp.route('/getlistid', methods=['GET'])
@get_list_id()
def get_id():
  return make_response(jsonify({'message': 'Error'}), 500)
    