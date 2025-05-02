import jwt, os
from dotenv import load_dotenv
from flask import request

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")

def encode_token(payload):
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    return token

def decode_token(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None
    
def decode_auth_token():
    try:
        token = request.headers.get("Authorization", "").replace("Bearer ", "")
        return decode_token(token)
    except Exception as e:
        return None
    
def decode_header_token(header):
    try:
        token = request.headers.get(header)
        return decode_token(token)
    except Exception as e:
        return None
