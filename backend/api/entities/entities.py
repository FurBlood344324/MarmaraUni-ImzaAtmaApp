from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import UniqueConstraint

db = SQLAlchemy()
    
class USER(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.String(10), unique=True, nullable=False, primary_key=True)
    name = db.Column(db.String(20), unique=False, nullable=False)
    surname = db.Column(db.String(20), unique=False, nullable=False)
    no = db.Column(db.String(9), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), unique=False, nullable=False)
    role = db.Column(db.String(20), unique=False, nullable=False)

    signatures = db.relationship(
        'SIGNATURE',
        foreign_keys='SIGNATURE.creator_id',
        backref='creator',
        lazy=True
    )

    signature_lists = db.relationship(
        'SIGNATURE_LIST',
        foreign_keys='SIGNATURE_LIST.creator_id',
        backref='creator',
        lazy=True
    )

    tasks = db.relationship(
        'TASK',
        foreign_keys='TASK.creator_id',
        backref='creator',
        lazy=True
    )

    def json(self, include_signature=False , include_signature_list=False, include_task=False):
        data = {
            'id': self.id,
            'name': self.name,
            'surname': self.surname,
            'no': self.no,
            'email': self.email,
            'username': self.username,
            'password': self.password,
            'role': self.role,
        }

        if include_signature and self.signatures:
            data['signatures'] = self.signatures.json()

        if include_signature_list and self.signature_lists:
            data['signature_lists'] = self.signature_lists.json()

        if include_task and self.tasks:
            data['tasks'] = self.tasks.json()

        return data

class SIGNATURE(db.Model):
    __tablename__ = 'signatures'

    id = db.Column(db.String(10), unique=True, nullable=False, primary_key=True)

    creator_id = db.Column(db.String(10), db.ForeignKey('users.id'), nullable=False)

    list_id = db.Column(db.String(10), db.ForeignKey('signature_lists.id'), nullable=False)

    __table_args__ = (
        UniqueConstraint('creator_id', 'list_id', name='uix_creator_list'),
    )

    def json(self):
        return {
            'id': self.id,
            'creator_id': self.creator_id,
            'list_id': self.list_id
        }

class SIGNATURE_LIST(db.Model):
    __tablename__ = 'signature_lists'

    id = db.Column(db.String(10), unique=True, nullable=False, primary_key=True)

    creator_id = db.Column(db.String(10), db.ForeignKey('users.id'), nullable=False)

    linked_task_id = db.Column(db.String(10), db.ForeignKey('tasks.id'), unique=True, nullable=False)

    signatures = db.relationship(
        'SIGNATURE',
        foreign_keys='SIGNATURE.list_id',
        backref='list',
        lazy=True
    )

    def json(self, include_signature=False):
        data = {
            'id': self.id,
            'creator_id': self.creator_id
        }

        if include_signature and self.signatures:
            data['signatures'] = self.signatures.json()

        return data
    
class TASK(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.String(10), unique=True, nullable=False, primary_key=True)
    question1 = db.Column(db.String(500), unique=False, nullable=False)
    question2 = db.Column(db.String(500), unique=False, nullable=False)
    question3 = db.Column(db.String(500), unique=False, nullable=False) 
    answer1A = db.Column(db.String(200), unique=False, nullable=False)
    answer1B = db.Column(db.String(200), unique=False, nullable=False)
    answer1C = db.Column(db.String(200), unique=False, nullable=False)
    answer1D = db.Column(db.String(200), unique=False, nullable=False)
    answer2A = db.Column(db.String(200), unique=False, nullable=False)
    answer2B = db.Column(db.String(200), unique=False, nullable=False)
    answer2C = db.Column(db.String(200), unique=False, nullable=False)
    answer2D = db.Column(db.String(200), unique=False, nullable=False)
    answer3A = db.Column(db.String(200), unique=False, nullable=False)
    answer3B = db.Column(db.String(200), unique=False, nullable=False)
    answer3C = db.Column(db.String(200), unique=False, nullable=False)
    answer3D = db.Column(db.String(200), unique=False, nullable=False)
    answerQuestion1 = db.Column(db.String(5), unique=False, nullable=False)
    answerQuestion2 = db.Column(db.String(5), unique=False, nullable=False)
    answerQuestion3 = db.Column(db.String(5), unique=False, nullable=False)


    creator_id = db.Column(db.String(10), db.ForeignKey('users.id'), nullable=False)

    signature_list = db.relationship(
        'SIGNATURE_LIST',
        foreign_keys='SIGNATURE_LIST.linked_task_id',
        backref='task',
        uselist=False,
        lazy=True
    )

    def json(self, include_signature_list=False):
        data = {
            'id': self.id,
            'question1': self.question1,
            'question2': self.question2,
            'question3': self.question3,
            'answer1A': self.answer1A,
            'answer1B': self.answer1B,
            'answer1C': self.answer1C,
            'answer1D': self.answer1D,
            'answer2A': self.answer2A,
            'answer2B': self.answer2B,
            'answer2C': self.answer2C,
            'answer2D': self.answer2D,
            'answer3A': self.answer3A,
            'answer3B': self.answer3B,
            'answer3C': self.answer3C,
            'answer3D': self.answer3D,
            'answerQuestion1': self.answerQuestion1,
            'answerQuestion2': self.answerQuestion2,
            'answerQuestion3': self.answerQuestion3
        }

        if include_signature_list and self.signature_list:
            data['signature_list'] = self.signature_list.json()

        return data
    