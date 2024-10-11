#this file is for creating random clubid

import random
from models import clubs  # Import the clubs model

def generate_unique_club_id():
    while True:
        unique_id = random.randint(1000, 9999)  # Adjust the range as necessary
        if not clubs.query.filter_by(clubid=unique_id).first():
            return unique_id
