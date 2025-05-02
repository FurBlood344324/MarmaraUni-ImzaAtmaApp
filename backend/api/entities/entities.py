from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class RESP(db.Model):
    __tablename__ = 'resps'

    id = db.Column(db.String(10), unique=True, nullable=False, primary_key=True)
    message = db.Column(db.String(120), unique=False, nullable=False)

    def json(self):
        return {
            'id': self.id,
            'message': self.message,
        }
    
class USER(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.String(10), unique=True, nullable=False, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), unique=False, nullable=False)
    role = db.Column(db.String(20), unique=False, nullable=False)

    def json(self):
        return {
            'id': self.id,
            'username': self.username,
            'password': self.password,
            'role': self.role,
        }
    