from models import user_credentials, user_details, attendance, clubs, events
from app import db
from run import flask_app

def clear_all_tables():
    with flask_app.app_context():
        db.session.query(user_credentials).delete()
        db.session.query(user_details).delete()
        db.session.query(attendance).delete()
        db.session.query(clubs).delete()
        db.session.query(events).delete()
        db.session.commit()
    print("All tables cleared.")

def clear_user_credentials():
    with flask_app.app_context():
        db.session.query(user_credentials).delete()
        db.session.commit()
    print("User credentials table cleared.")

def clear_user_details():
    with flask_app.app_context():
        db.session.query(user_details).delete()
        db.session.commit()
    print("User details table cleared.")

def clear_attendance():
    with flask_app.app_context():
        db.session.query(attendance).delete()
        db.session.commit()
    print("Attendance table cleared.")

def clear_clubs():
    with flask_app.app_context():
        db.session.query(clubs).delete()
        db.session.commit()
    print("Clubs table cleared.")

def clear_events():
    with flask_app.app_context():
        db.session.query(events).delete()
        db.session.commit()
    print("Events table cleared.")

def main_menu():
    while True:
        print("\nMenu:")
        print("1. Clear all tables")
        print("2. Clear user_credentials table")
        print("3. Clear user_details table")
        print("4. Clear attendance table")
        print("5. Clear clubs table")
        print("6. Clear events table")
        print("0. Exit")

        choice = input("Enter your choice: ")

        if choice == '1':
            clear_all_tables()
        elif choice == '2':
            clear_user_credentials()
        elif choice == '3':
            clear_user_details()
        elif choice == '4':
            clear_attendance()
        elif choice == '5':
            clear_clubs()
        elif choice == '6':
            clear_events()
        elif choice == '0':
            print("Exiting...")
            break
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main_menu()
