from flask import render_template, request, jsonify
from models import user_credentials, user_details, attendance, clubs, events

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
            club_details = clubs.query.filter_by(club_name = club)
            for ele in club_details:
                club_id = ele.clubid
            
            roles_data = user_details.query.filter_by(uid = uid, clubid = club_id)
            for ele in roles_data:
                role = ele.role
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