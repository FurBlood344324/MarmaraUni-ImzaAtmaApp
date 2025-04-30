from api.repositories.resp_repository import fetch_all_resps, add_resp_to_db

def get_all_resps():
    return fetch_all_resps()

def create_resp(hash, message):
    return add_resp_to_db(hash, message)