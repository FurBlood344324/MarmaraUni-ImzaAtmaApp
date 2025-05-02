import string, random
from api.middleware.jwt import decode_token

def generate_hash(length = 6):
    chars = string.ascii_letters + string.digits
    hash = "".join(random.choice(chars) for _ in range(length))
    return hash

def get_userid_from_token(token):
    try:
        payload = decode_token(token)
        if not payload:
            return None
        return payload["user_id"]
    except Exception as e:
        return None