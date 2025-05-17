from api.entities.entities import db, USER

def fetch_user_from_username(username):
    user = USER.query.filter_by(username=username).first()
    return user

def fetch_user_from_id(user_id):
    user = USER.query.filter_by(id=user_id).first()

    return user

def add_user_to_db(hash, name, surname, no, email, username, password, role):
    try:
        new_user = USER(
            id=hash, 
            name=name,
            surname=surname,
            no=no,
            email=email,
            username=username, 
            password=password,
            role=role
        )

        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        print("Hata:", e)
        return None
    
    return new_user