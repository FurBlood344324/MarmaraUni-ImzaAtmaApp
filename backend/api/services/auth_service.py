import datetime
from datetime import datetime, timedelta
from api.repositories.user_repository import fetch_user_from_username, fetch_user_from_id, add_user_to_db
from api.utils import generate_hash
from api.middleware.jwt import encode_token

def create_user(hash, username, password, role):
    user = add_user_to_db(hash, username,password, role)
    if user:
        return user.json()
    return None

def generate_token(username, password):
    user = fetch_user_from_username(username)
    if (not user) or password != user.password:
        return "Unauthorized"
    
    payload = {
        "user_id": user.id,
        "exp": datetime.utcnow() + timedelta(hours=2)
    }

    token = encode_token(payload)
    return token

def get_user_role(user_id):
    user = fetch_user_from_id(user_id)
    if not user:
        return None
    return user.role