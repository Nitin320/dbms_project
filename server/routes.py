from flask import render_template, request, jsonify
from models import user_credentials

def register_routes(app, db):

    @app.route('/api/cred', methods=['GET'], endpoint = 'test')
    def index():
        cred = user_credentials.query.first()
        return jsonify({"username": cred.username, "password": cred.password, "uid": cred.uid})
        # return render_template('http://localhost:3000/test', data = cred[0])

    @app.route('/api/signin', methods=['GET', 'POST'], endpoint = 'signin')
    def signin():

        #creds = user_credentials.query.all()
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

        # For demonstration, we will just return the received data
        if stat:
            return jsonify({
                "message": "Sign-in successful!",
                "data": {
                    "uid" : uid,
                    "email": username,
                    "club": club,
                }
            }), 200
        else:
            return jsonify({
                "message": "Sign-in failed!",
                "data": {
                    "uid" : uid,
                    "email": username,
                    "club": club,
                }
            }), 401