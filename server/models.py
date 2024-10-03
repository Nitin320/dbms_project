from app import db

class user_credentials(db.Model):
    __tablename__ = 'user_credentials'

    #defining the columns of the table

    uid = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Text, unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)

    # defining the relationship thing.(what to display when we print the object)
    
    def __repr__(self):
        return "{}\t{}\t{}".format(self.uid, self.username, self.password)
    
class user_details(db.Model):
    __tablename__ = 'user_details'

    #defining the columns of the table

    uid = db.Column(db.Integer)
    name = db.Column(db.Text, unique=True, nullable=False)
    clubid = db.Column(db.Integer, nullable=False)
    role = db.Column(db.Text, nullable=False, default = 'member')
    #(fa1,fa2,member,colead,lead,admin,temp) possible values for roles

    __table_args__ = (
        db.PrimaryKeyConstraint('uid', 'clubid'),
    )

    def __repr__(self):
        return "{}\t{}\t{}\t{}".format(self.uid, self.name, self.clubid, self.role)
    
class clubs(db.Model):
    __tablename__ = 'clubs'

    #defining the columns of the table

    clubid = db.Column(db.Integer, primary_key=True)
    club_name = db.Column(db.Text, unique=True, nullable=False)
    fa1 = db.Column(db.Integer, nullable=False)
    fa2 = db.Column(db.Integer, nullable=True)

    def __repr__(self):
        return "{}\t{}\t{}\t{}".format(self.clubid, self.clubname, self.fa1, self.fa2)
    
class events(db.Model):
    __tablename__ = 'events'

    #defining the columns of the table

    eventid = db.Column(db.Integer, primary_key=True)
    eventname = db.Column(db.Text, unique=True, nullable=False)
    clubid = db.Column(db.Integer, nullable=False)
    start_date = db.Column(db.Text, nullable=False)
    end_date = db.Column(db.Text, nullable=False)
    time = db.Column(db.Text, nullable=False)
    venue = db.Column(db.Text, nullable=False)
    completed = db.Column(db.Boolean, nullable=False, default = False)
    max_volunteers = db.Column(db.Integer, nullable=False)
    current_volunteers = db.Column(db.Integer, nullable=False, default = 0)
    approved = db.Column(db.Boolean, nullable=False, default = False)

    def __repr__(self):
        return "{}\t{}\t{}\t{}\t{}\t{}\t{}\t{}\t{}\t{}\t{}".format(self.eventid, self.eventname, self.clubid, self.start_date, self.end_date, self.time, self.venue, self.completed, self.max_volunteers, self.current_volunteers, self.approved)
    
class attendance(db.Model):
    __tablename__ = 'attendance'

    #defining the columns of the table

    uid = db.Column(db.Integer)
    eventid = db.Column(db.Integer)
    role = db.Column(db.Text, nullable=False)
    attended = db.Column(db.Boolean, nullable=False, default=False)

    __table_args__ = (
        db.PrimaryKeyConstraint('uid', 'eventid'),
    )

    def __repr__(self):
        return "{}\t{}\t{}".format(self.uid, self.eventid, self.attended)

    
