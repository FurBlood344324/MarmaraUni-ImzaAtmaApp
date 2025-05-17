from api.repositories.task_repository import (add_task_to_db, 
                                              fetch_tasks_with_userid, 
                                              fetch_task_with_taskid,
                                              fetch_taskid_with_creatorid)

def create_task(
                hash, 
                creator_id, 
                question1, 
                question2, 
                question3,
                answer1A,
                answer1B,
                answer1C,
                answer1D,
                answer2A,
                answer2B,
                answer2C,
                answer2D,
                answer3A,
                answer3B,
                answer3C,
                answer3D,
                answerQuestion1,
                answerQuestion2,
                answerQuestion3
            ):
    task = add_task_to_db(
                hash, 
                creator_id, 
                question1, 
                question2, 
                question3,
                answer1A,
                answer1B,
                answer1C,
                answer1D,
                answer2A,
                answer2B,
                answer2C,
                answer2D,
                answer3A,
                answer3B,
                answer3C,
                answer3D,
                answerQuestion1,
                answerQuestion2,
                answerQuestion3
            )
    if task:
        return task.json(include_signature_list=False)
    
    return None

def get_tasks_with_userid(creator_id):
    tasks = fetch_tasks_with_userid(creator_id)
    if tasks:
        task_json_list = [task.json() for task in tasks]
        return task_json_list
    
    return None

def get_task_by_taskid(taskid):
    task = fetch_task_with_taskid(taskid)
    if task:
        return task.json()
    
    return None
    
def get_taskid_by_creatorid(creator_id):
    task_id = fetch_taskid_with_creatorid(creator_id)
    if task_id:
        return task_id
    
    return None
