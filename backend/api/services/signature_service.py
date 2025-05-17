from api.repositories.signature_repository import  (add_signature_to_db, 
                                                    add_signature_list_to_db, 
                                                    fetch_signatures_with_list, 
                                                    fetch_signature_listid_with_creatorid)

def create_signature(hash, creator_id, list_id):
    signature = add_signature_to_db(hash, creator_id, list_id)
    if signature:
        return signature.json()
    
    return None

def create_signature_list(hash, creator_id, linked_task_id):
    signature_list = add_signature_list_to_db(hash, creator_id, linked_task_id)
    if signature_list:
        return signature_list.json()
    
    return None

def get_signature_with_list(list_id):
    signatures = fetch_signatures_with_list(list_id)
    if signatures:
        signature_json_list = [signature.json() for signature in signatures]
        return signature_json_list
    
    return None

def get_signature_listid_by_creatorid(creator_id):
    signature_listid = fetch_signature_listid_with_creatorid(creator_id)
    if signature_listid:
        return signature_listid

    return None
