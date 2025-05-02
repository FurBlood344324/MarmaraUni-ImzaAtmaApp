from api.entities.entities import db, USER

def fetch_user_from_username(username):
    user = USER.query.filter_by(username=username).first()
    return user

def fetch_user_from_id(user_id):
    user = USER.query.filter_by(id=user_id).first()
    return user

def add_user_to_db(hash, username, password, role):
    user = USER.query.filter_by(username=username).first()
    if user:
        return None
    new_user = USER(
        id=hash, 
        username=username, 
        password=password,
        role=role
    )
    db.session.add(new_user)
    db.session.commit()
    return new_user