from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class API_RESP(db.Model):
    __tablename__ = 'api_resp'

    id = db.Column(db.String(10), unique=True, nullable=False, primary_key=True)
    message = db.Column(db.String(120), unique=False, nullable=False)

    def json(self):
        return {
            'id': self.id,
            'message': self.message,
        }