from api.entities.entities import db, TASK, USER

def add_task_to_db(
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
    try:
        new_task = TASK(
            id=hash,
            creator_id=creator_id,
            question1=question1, 
            question2=question2, 
            question3=question3,
            answer1A=answer1A,
            answer1B=answer1B,
            answer1C=answer1C,
            answer1D=answer1D,
            answer2A=answer2A,
            answer2B=answer2B,
            answer2C=answer2C,
            answer2D=answer2D,
            answer3A=answer3A,
            answer3B=answer3B,
            answer3C=answer3C,
            answer3D=answer3D,
            answerQuestion1=answerQuestion1,
            answerQuestion2=answerQuestion2,
            answerQuestion3=answerQuestion3
        )

        db.session.add(new_task)
        db.session.commit()
    except Exception as e:
        print("Hata:", e)
        return None
    
    return new_task

def fetch_tasks_with_userid(creator_id):
    tasks = TASK.query.join(USER).filter(USER.id == creator_id).all()

    return tasks

def fetch_task_with_taskid(taskid):
    task = TASK.query.filter_by(id=taskid).first()
    return task

def fetch_taskid_with_creatorid(creator_id):
    task = TASK.query.join(USER).filter(USER.id == creator_id).first()
    task_id = task.id

    return task_id
