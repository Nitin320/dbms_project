from flask import render_template, request, jsonify
import re
from models import user_credentials, user_details, attendance, clubs, events

def get_clubid_from_clubname(club):
    club_details = clubs.query.all()
    for ele in club_details:
        if ele.club_name.upper() == club.upper():
            club_id = ele.clubid
    return club_id

def get_role_from_clubid_uid(club_id, uid):
    roles_data = user_details.query.filter_by(uid = uid, clubid = club_id)
    for ele in roles_data:
        role = ele.role
    return role

def register_routes(app, db):

    @app.route('/api/cred', methods=['GET'], endpoint = 'test')
    def index():
        cred = user_credentials.query.first()
        return jsonify({"username": cred.username, "password": cred.password, "uid": cred.uid})

    @app.route('/api/signin', methods=['GET', 'POST'], endpoint = 'signin')
    def signin():

        # Get JSON data from the request
        data = request.get_json()
        
        # Extract the data
        username = data.get('email')
        password = data.get('password')
        club = data.get('club')

        # Here, you can process the sign-in logic (e.g., verify credentials)

        stat = False
        uid = None
        cred = user_credentials.query.filter_by(username = username)

        for i in cred:
            if i.password == password:
                stat = True
                uid = i.uid
                break

        if stat:
            club_id = get_clubid_from_clubname(club)
            role = get_role_from_clubid_uid(club_id, uid)

    
            return jsonify({
                "message": "Sign-in successful!",
                "data": {
                    "uid" : uid,
                    "email": username,
                    "club": club,
                    "role": role
                }
            }), 200
        else:
            return jsonify({
                "message": "Sign-in failed!",
                "data": {
                    "uid" : None,
                    "email": None,
                    "club": None,
                    "role": None
                }
            }), 401
        
    @app.route('/api/signup', methods=['GET', 'POST'], endpoint = 'signup')
    def signup():

        # Get JSON data from the request
        data = request.get_json()

        ins_tbl1 = False 
        ins_tbl2 = False
        
        # Extract the data
        username = data.get('email')
        password = data.get('password')
        club = data.get('club')
        role = data.get('role')
        name = data.get('name')

        #ensuring password is not empty string
        if password == '':
            return jsonify({
                "message": "Password cannot be empty!",
                "data": {
                    "uid" : None,
                    "email": None,
                    "club": None,
                    "role": None, 
                    "name": None
                }
            }), 401

        #ensure that email is of form <num><str><num>@mgits.ac.in
        if not re.match(r'^[0-9]+[a-zA-Z]+[0-9]+@mgits.ac.in$', username):
            return jsonify({
                "message": "Invalid email address!",
                "data": {
                    "uid" : None,
                    "email": None,
                    "club": None,
                    "role": None, 
                    "name": None
                }
            }), 401
        else:
            uid = username.split('@')[0]
        
        #ensuring record with same email does not exist in user_credentials table already
        cred = user_credentials.query.filter_by(username = username)
        for i in cred:
            return jsonify({
                "message": "User already exists!",
                "data": {
                    "uid" : None,
                    "email": None,
                    "club": None,
                    "role": None, 
                    "name": None
                }
            }), 401
        
        #adding user to user_credentials 
        cred = user_credentials(uid = uid, username = username, password = password)
        db.session.add(cred)
        db.session.commit()
        ins_tbl1 = True

        #adding user to user_details
        club_id = get_clubid_from_clubname(club)
        user = user_details(uid = uid, clubid = club_id, role = role, name = name)
        db.session.add(user)
        db.session.commit()
        ins_tbl2 = True 

        if ins_tbl1 and ins_tbl2:
            return jsonify({
                "message": "Sign-up successful!",
                "data": {
                    "uid" : uid,
                    "email": username,
                    "club": club,
                    "role": role, 
                    "name": name
                }
            }), 200
        else:
            return jsonify({
                "message": "Sign-Up unsucessful", 
                "data": {
                    "uid": None, 
                    "email": None, 
                    "club": None, 
                    "role": None, 
                    "name": None,
                    "ins_tbl1": ins_tbl1, 
                    "ins_tbl2": ins_tbl2
                }
            }), 401
        
    @app.route('/api/getEvents', methods=['GET', 'POST'], endpoint = 'getEvent')
    def getEvents():
        data = request.get_json()
        #role = data.get('role')
        club = data.get('club')
        club_id = get_clubid_from_clubname(club)
        event_data = events.query.filter_by(completed = 0, approved = 1)
        events_list = []
        for ele in event_data:
            events_list.append({
                "event_name": ele.eventname,
                "event_date": ele.start_date,
                "venue": ele.venue,
                "max_volunteers": ele.max_volunteers,
                "current_volunteers": ele.current_volunteers
            })
        return jsonify({
            "message": "Events fetched successfully",
            "data": events_list
        }), 200
    