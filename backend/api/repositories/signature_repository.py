from api.entities.entities import db, SIGNATURE, SIGNATURE_LIST, USER

def add_signature_to_db(hash, creator_id, list_id):
    try:
        new_signature = SIGNATURE(
            id=hash,
            creator_id=creator_id,
            list_id=list_id
        )

        db.session.add(new_signature)
        db.session.commit()
    except Exception as e:
        print("Hata:", e)
        return None
    
    return new_signature

def add_signature_list_to_db(hash, creator_id, linked_task_id):
    try:
        new_signature_list = SIGNATURE_LIST(
            id=hash,
            creator_id=creator_id,
            linked_task_id=linked_task_id
        )

        db.session.add(new_signature_list)
        db.session.commit()
    except Exception as e:
        print("Hata:", e)
        return None
    
    return new_signature_list

def fetch_signatures_with_list(list_id):
    signatures = SIGNATURE.query.join(SIGNATURE_LIST).filter(SIGNATURE_LIST.id == list_id).all()

    return signatures

def fetch_signature_listid_with_creatorid(creator_id):
    signature_list = SIGNATURE_LIST.query.join(USER).filter(USER.id == creator_id).first()
    signature_listid = signature_list.id

    return signature_listid
