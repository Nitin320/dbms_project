from app import db

class user_credentials(db.Model):
    __tablename__ = 'user_credentials'

    #defining the columns of the table

    uid = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

    # defining the relationship thing.(what to display when we print the object)
    
    def __repr__(self):
        return {'uid': self.uid, 'username': self.username, 'password': self.password}
    

    
