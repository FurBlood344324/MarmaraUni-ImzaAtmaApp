from api.entities.entities import db, RESP

def fetch_all_resps():
    return [api for api in RESP.query.all()]

def add_resp_to_db(hash, message):
    new_resp = RESP(
      id=hash,
      message=message
    )
    db.session.add(new_resp)
    db.session.commit()

    return new_resp
