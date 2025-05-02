from api.middleware.jwt import decode_auth_token
from api.services.auth_service import get_user_role
from api.permissions.permissions import HasPermission
from flask import jsonify

def check_permission(required_permission):
    def wrapper(fn):
        def decorator(*args, **kwargs):
            payload = decode_auth_token()
            if not payload:
                return jsonify("Unauthorized"), 401
            
            user_id = payload['user_id']
            if not user_id:
                return jsonify("Unauthorized"), 401
            
            role = get_user_role(user_id)
            if not role:
                return jsonify("Unable to get user role"), 500
            
            if not HasPermission(role, required_permission):
                return jsonify("Forbidden"), 403
            
            return fn(*args, **kwargs)
        return decorator
    return wrapper
            