from flask import Blueprint, request, jsonify, make_response
from api.middleware.authorization import check_permission, get_task_id
from api.utils import generate_hash
from api.services.task_service import create_task, get_tasks_with_userid, get_task_by_taskid

task_bp = Blueprint('task', __name__, url_prefix='/task')

@task_bp.route('/create', methods=['POST'])
@check_permission("write")
def create_task_by_user():
    try:
        data_h = dict(request.headers)
        data_b = request.get_json()

        creator_id = data_h.get('Creator-Id')

        question1 = data_b.get('question1')
        question2 = data_b.get('question2')
        question3 = data_b.get('question3')
        answer1A = data_b.get('answer1A')
        answer1B = data_b.get('answer1B')
        answer1C = data_b.get('answer1C')
        answer1D = data_b.get('answer1D')
        answer2A = data_b.get('answer2A')
        answer2B = data_b.get('answer2B')
        answer2C = data_b.get('answer2C')
        answer2D = data_b.get('answer2D')
        answer3A = data_b.get('answer3A')
        answer3B = data_b.get('answer3B')
        answer3C = data_b.get('answer3C')
        answer3D = data_b.get('answer3D')
        answerQuestion1 = data_b.get('answerQuestion1')
        answerQuestion2 = data_b.get('answerQuestion2')
        answerQuestion3 = data_b.get('answerQuestion3')

        hash = generate_hash()

        if creator_id:
            task = create_task(
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

            if not task:
                return make_response(jsonify({'message': 'Task already exists'}), 400)

            resp = make_response(jsonify(task), 201)

            return resp

        return make_response({'message': 'Infos are wrong'}, 400)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 500)

@task_bp.route('/gettasks', methods=['GET'])
@check_permission("write")
def get_task_for_user():
    try:
        data_h = dict(request.headers)

        creator_id = data_h.get('Creator-Id')

        if creator_id:
            tasks = get_tasks_with_userid(creator_id)

            if not tasks:
                return make_response(jsonify({'message': 'Tasks with this user doesnt exists'}), 400)

            resp = make_response(jsonify(tasks), 200)

            return resp

        return make_response({'message': 'Infos are wrong'}, 400)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 500)
    
@task_bp.route('/gettaskbytaskid', methods=['GET'])
@check_permission("read")
def get_task_with_taskid():
    try:
        data_h = dict(request.headers)

        task_id = data_h.get('Task-Id')

        if task_id:
            task = get_task_by_taskid(task_id)

            if not task:
                return make_response(jsonify({'message': 'Task with this taskid doesnt exists'}), 400)
            
            resp = make_response(jsonify(task), 200)

            return resp
        
        return make_response({'message': 'Infos are wrong'}, 400)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 500)
    
@task_bp.route('/<taskid>/checktask', methods=['POST'])
@check_permission("read")
def task_check(taskid):
    if not taskid:
        return make_response(jsonify({'message': 'Invalid taskid'}), 400)
    try:
        data_b = request.get_json()

        answer1 = data_b.get('answer1')
        answer2 = data_b.get('answer2')
        answer3 = data_b.get('answer3')

        if answer1 and answer2 and answer3:
            task = get_task_by_taskid(taskid)

            answerQuestion1 = task.get('answerQuestion1')
            answerQuestion2 = task.get('answerQuestion2')
            answerQuestion3 = task.get('answerQuestion3')

            if answerQuestion1 and answerQuestion2 and answerQuestion3:
                if (answerQuestion1 == answer1) and (answerQuestion2 == answer2) and (answerQuestion3 == answer3):
                    return make_response(jsonify({'message': 'true'}), 200)

                return make_response(jsonify({'message': 'Invalid answers'}), 400)
            
            return make_response(jsonify({'message': 'Missing answers from task'}), 400)
        
        return make_response(jsonify({'message': 'Missing answers from request body'}), 400)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 500)
    
@task_bp.route('/gettaskid', methods=['GET'])
@get_task_id()
def get_id():
  return make_response(jsonify({'message': 'Error'}), 500)
