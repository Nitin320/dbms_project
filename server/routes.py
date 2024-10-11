from flask import render_template, request, jsonify
import re
import base64
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
        club_id = data.get('club_id')

        # Here, you can process the sign-in logic (e.g., verify credentials)

        stat = False
        uid = None
        pfp = None
        pfp_name = None
        cred = user_credentials.query.filter_by(username = username)

        for i in cred:
            if i.password == password:
                stat = True
                uid = i.uid
                break

        if stat:
            club_id = get_clubid_from_clubname(club)
            role = get_role_from_clubid_uid(club_id, uid)
            user = user_details.query.filter_by(uid = uid, clubid = club_id)
            for i in user:
                name = i.name
                pfp = i.pfp
                pfp_name = i.pfp_name
                #converting pfp to base 64 string
                if pfp:
                    pfp = base64.b64encode(pfp).decode('utf-8')
                    ext = pfp_name.split('.')[1]
                    if ext == 'jpg':
                        ext = 'jpeg'
                    pfp = 'data:image/{};base64,'.format(ext) + pfp
                

    
            return jsonify({
                "message": "Sign-in successful!",
                "data": {
                    "uid" : uid,
                    "email": username,
                    "club": club,
                    "clubid":club_id,
                    "role": role, 
                    "name": name, 
                    "pfp": pfp, 
                    "pfp_name": pfp_name
                }
            }), 200
        else:
            return jsonify({
                "message": "Sign-in failed!",
                "data": {
                    "uid" : None,
                    "email": None,
                    "club": None,
                    "role": None, 
                    "name": None, 
                    "pfp": pfp, 
                    "pfp_name": pfp_name
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
        '''if not re.match(r'^[0-9]+[a-zA-Z]+[0-9]+@mgits.ac.in$', username):
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
        else:'''
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
        club = data.get('club')
        club_id = get_clubid_from_clubname(club)
        event_data = events.query.filter_by(completed = 0, approved = 1)
        events_list = []
        for ele in event_data:
            events_list.append({
                "event_id": ele.eventid,
                "event_name": ele.eventname,
                "event_date": ele.start_date,
                "timr": ele.time,
                "venue": ele.venue,
                "max_volunteers": ele.max_volunteers,
                "current_volunteers": ele.current_volunteers
            })
        return jsonify({
            "message": "Events fetched successfully",
            "data": events_list
        }), 200
    
    @app.route('/api/getUnapprovedEvents', methods=['GET', 'POST'], endpoint = 'getUnapprovedEvent')
    def getUnapprovedEvents():
        data = request.get_json()
        club = data.get('club')
        club_id = get_clubid_from_clubname(club)
        event_data = events.query.filter_by(completed = 0, approved = 0, clubid = club_id)
        events_list = []
        for ele in event_data:
            events_list.append({
                "event_id": ele.eventid,
                "event_name": ele.eventname,
                "event_date": ele.start_date,
                "timr": ele.time,
                "venue": ele.venue,
                "max_volunteers": ele.max_volunteers,
                "current_volunteers": ele.current_volunteers
            })
        return jsonify({
            "message": "Events fetched successfully",
            "data": events_list
        }), 200
    
    @app.route('/api/uploadPfp', methods=['GET', 'POST'], endpoint = 'uploadPfp')
    def uploadPfp():
        # Parse the incoming JSON data
        data = request.get_json()
        uid = data.get('uid')
        image_data = data.get('image')  # base64 image string
        filename = data.get('filename')

        #implement some method to compress the image

        # Decode the base64 image (remove the data URL prefix if it exists)
        if image_data.startswith('data:image/'):
            # Strip the data URL prefix (e.g. 'data:image/png;base64,')
            image_data1 = image_data.split(',')[1]

        # Convert the base64 string to bytes
        image_bytes = base64.b64decode(image_data1)

        # Query the users from the database
        users = user_details.query.filter_by(uid=uid)
        
        # Update the profile picture for all matched users
        for user in users:
            user.pfp = image_bytes  # Store the image as bytes
            user.pfp_name = filename  # Save the filename
        
        # Commit the changes to the database
        db.session.commit()

        # Return success message
        return jsonify({
            "message": "Successfully saved profile picture",
            "data": {
                'pfp': image_data,
            }
        }), 200
    
    @app.route('/api/create_event', methods=['GET', 'POST'])
    def create_event():
        try:
            data = request.get_json()
            print(f"Received data: {data}")  # Log the incoming data

            # Extract event details from the request
            club = data.get('club')  # Check if this is None or empty
            club_id = get_clubid_from_clubname(club)
            event_name = data.get('eventName')
            start_date = data.get('startDate')
            end_date = data.get('endDate')
            event_time = data.get('eventTime')
            venue = data.get('venue')
            max_volunteers = data.get('maxVolunteers')

            # Ensure required fields are provided
            if not event_name or not start_date or not venue or club_id is None:
                print(f"Missing required fields: {data}")
                return jsonify({
                    "message": "Event name, start date, venue, and club ID are required."
                }), 400

            # Create a new event record
            new_event = events(
                clubid=club_id,
                eventname=event_name,
                start_date=start_date,
                end_date=end_date,
                time=event_time,
                venue=venue,
                max_volunteers=max_volunteers,
                current_volunteers=0,  # Initially 0
                approved=0,  # Assuming the lead's event is approved by default
                completed=0  # Event is not completed yet
            )

            # Add to the database
            db.session.add(new_event)
            db.session.commit()

            return jsonify({
                "message": "Event created successfully!"
            }), 200

        except Exception as e:
            print(f"Error occurred while creating event: {str(e)}")  # Log the error
            return jsonify({
                "message": "An error occurred while creating the event."
            }), 500

    @app.route('/api/getMembers', methods=['GET', 'POST'], endpoint = 'getMembers')
    def getMembers():
        data = request.get_json()
        club = data.get('club')
        club_id = get_clubid_from_clubname(club)
        members_data = user_details.query.filter_by(clubid = club_id, role = "Member")
        members_list = []
        for ele in members_data:
            members_list.append({
                "uid": ele.uid,
                "name": ele.name,
                "role": ele.role
            })
        return jsonify({
            "message": "Members fetched successfully",
            "data": members_list
        }), 200
    
    @app.route('/api/getPfp', methods=['GET', 'POST'], endpoint = 'getPfp')
    def getPfp():
        data = request.get_json()
        uid = data.get('uid')
        user = user_details.query.filter_by(uid = uid)
        pfp = None
        pfp_name = None
        for ele in user:
            pfp = ele.pfp
            pfp_name = ele.pfp_name
            if pfp:
                pfp = base64.b64encode(pfp).decode('utf-8')
                ext = pfp_name.split('.')[1]
                if ext == 'jpg':
                    ext = 'jpeg'
                pfp = 'data:image/{};base64,'.format(ext) + pfp
        return jsonify({
            "message": "Profile picture fetched successfully",
            "data": {
                "pfp": pfp,
                "pfp_name": pfp_name
            }
        }), 200
    
    @app.route('/api/assignLead', methods=['GET', 'POST'], endpoint = 'assignLead')
    def assignLead():
        data = request.get_json()
        uid = data.get('memberId')
        club = data.get('club')
        club_id = get_clubid_from_clubname(club)
        #fetch current lead
        lead = user_details.query.filter_by(clubid = club_id, role = "Lead")
        for ele in lead:
            ele.role = "Member"
        #assign new lead
        user = user_details.query.filter_by(uid = uid, clubid = club_id)
        for ele in user:
            ele.role = "Lead"
        db.session.commit()
        return jsonify({
            "message": "Lead assigned successfully"
        }), 200
        
    @app.route('/api/assignColead', methods=['GET', 'POST'], endpoint = 'assignColead')
    def assignColead():
        data = request.get_json()
        uid = data.get('memberId')
        club = data.get('club')
        club_id = get_clubid_from_clubname(club)
        #fetch current lead
        lead = user_details.query.filter_by(clubid = club_id, role = "Co-Lead")
        for ele in lead:
            ele.role = "Member"
        #assign new lead
        user = user_details.query.filter_by(uid = uid, clubid = club_id)
        for ele in user:
            ele.role = "Co-Lead"
        db.session.commit()
        return jsonify({
            "message": "Co-Lead assigned successfully"
        }), 200

    @app.route('/api/eventApproval', methods=['GET', 'POST'], endpoint = 'eventApproval')
    def eventApproval():
        data = request.get_json()
        if data.get('action') == 'approve':
            event_id = data.get('eventId')
            event = events.query.filter_by(eventid = event_id)
            for ele in event:
                ele.approved = 1
            db.session.commit()
            return jsonify({
                "message": "Event approved successfully"
            }), 200
        elif data.get('action') == 'reject':
            event_id = data.get('eventId')
            event = events.query.filter_by(eventid = event_id)
            for ele in event:
                db.session.delete(ele)
            db.session.commit()
            return jsonify({
                "message": "Event rejected successfully"
            }), 200
       
    @app.route('/api/delete_member', methods=['GET', 'POST'], endpoint = 'delete_member')
    def delete_member():
        data = request.get_json()
        uid = data.get('memberId')
        club = data.get('club')
        club_id = get_clubid_from_clubname(club)
        print(data)

        members = user_details.query.filter_by(uid = uid, clubid = club_id)
        if members:
            for member in members:
                db.session.delete(member)
            db.session.commit()
            return jsonify({
                "message": "Member {} deleted successfully".format(uid)
            }), 200
        else:
            return jsonify({
                "message": "Member not found"
            }), 404