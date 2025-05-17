from api.middleware.jwt import decode_auth_token
from api.services.auth_service import get_user_role
from api.services.signature_service import get_signature_listid_by_creatorid
from api.services.task_service import get_taskid_by_creatorid
from api.permissions.permissions import HasPermission
from flask import jsonify
from functools import wraps

def check_permission(required_permission):
    def wrapper_check(fn):
        @wraps(fn)
        def decorator_check(*args, **kwargs):
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
        return decorator_check
    return wrapper_check

def get_user_id():
    def wrapper_get_user_id(fn):
        @wraps(fn)
        def decorator_get_user_id(*args, **kwargs):
            payload = decode_auth_token()
            if not payload:
                return jsonify("Unauthorized"), 401
            
            user_id = payload['user_id']
            if not user_id:
                return jsonify("Unauthorized"), 401

            if user_id:
                return {
                    'user_id': user_id
                }, 200

            return fn(*args, **kwargs)
        return decorator_get_user_id
    return wrapper_get_user_id

def get_list_id():
    def wrapper_get_list_id(fn):
        @wraps(fn)
        def decorator_get_list_id(*args, **kwargs):
            payload = decode_auth_token()
            if not payload:
                return jsonify("Unauthorized"), 401
            
            user_id = payload['user_id']
            if not user_id:
                return jsonify("Unauthorized"), 401
            
            role = get_user_role(user_id)
            if not role:
                return jsonify("Unable to get user role"), 500
            
            list_id = get_signature_listid_by_creatorid(user_id)

            if list_id:
                return {
                    'list_id': list_id
                }, 200

            return fn(*args, **kwargs)
        return decorator_get_list_id
    return wrapper_get_list_id

def get_task_id():
    def wrapper_get_task_id(fn):
        @wraps(fn)
        def decorator_get_task_id(*args, **kwargs):
            payload = decode_auth_token()
            if not payload:
                return jsonify("Unauthorized"), 401
            
            user_id = payload['user_id']
            if not user_id:
                return jsonify("Unauthorized"), 401
            
            role = get_user_role(user_id)
            if not role:
                return jsonify("Unable to get user role"), 500
            
            task_id = get_taskid_by_creatorid(user_id)

            if task_id:
                return {
                    'task_id': task_id
                }, 200

            return fn(*args, **kwargs)
        return decorator_get_task_id
    return wrapper_get_task_id
            