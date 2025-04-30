from api.entities.resp_entity import db, API_RESP

def fetch_all_resps():
    return [api.json() for api in API_RESP.query.all()]

def add_resp_to_db(hash, message):
    new_resp = API_RESP(
      id=hash,
      message=message
    )
    db.session.add(new_resp)
    db.session.commit()

    return new_resp.json()
