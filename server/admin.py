from models import user_credentials, user_details, attendance, clubs, events
from app import db
from run import flask_app

# Clear all tables
def clear_all_tables():
    with flask_app.app_context():  # Ensure you're in the app context
        db.session.query(user_credentials).delete()
        db.session.query(user_details).delete()
        db.session.query(attendance).delete()
        db.session.query(clubs).delete()
        db.session.query(events).delete()
        db.session.commit()  # Commit changes
    return True

# Clear user_credentials table
def clear_user_credentials():
    with flask_app.app_context():
        db.session.query(user_credentials).delete()
        db.session.commit()
    return True

# Clear user_details table
def clear_user_details():
    with flask_app.app_context():
        db.session.query(user_details).delete()
        db.session.commit()
    return True

# Clear attendance table
def clear_attendance():
    with flask_app.app_context():
        db.session.query(attendance).delete()
        db.session.commit()
    return True

# Clear clubs table
def clear_clubs():
    with flask_app.app_context():
        db.session.query(clubs).delete()
        db.session.commit()
    return True

# Clear events table
def clear_events():
    with flask_app.app_context():
        db.session.query(events).delete()
        db.session.commit()
    return True

# Call the function to clear all tables
clear_all_tables()
