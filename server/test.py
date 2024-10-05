'''from app import db
from models import user_credentials

cred = user_credentials(uid = 2204, username = 'u1@gmail.com', password = 'p1')
db.session.add(cred)
db.session.commit()
print('Data added successfully')'''


from app import app, db
from models import user_credentials  # Adjust accordingly

with app.app_context():
    cred = user_credentials(uid=2204, username='u1@gmail.com', password='p1')
    db.session.add(cred)
    db.session.commit()
    print('Data added successfully')

    data = user_credentials.query.all()
    print(data)
    for i in data:
        items = str(i).split('\t')
        print(items)
