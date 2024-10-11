import tkinter as tk
from tkinter import filedialog
import base64
from app import app, db
from models import user_details  # Adjust accordingly

def select_image():
    encoded_string = ""
    file_path = filedialog.askopenfilename(title="Select an Image", 
                                            filetypes=[("Image files", "*.jpg *.jpeg *.png *.gif")])
    if file_path:
        try:
            # Open the image and convert it to a Base64 string
            with open(file_path, "rb") as image_file:
                encoded_string = base64.b64encode(image_file.read()).decode('utf-8')

            
            print("Base64 string has been written to output.txt")

            # Update database here
            with app.app_context():
                users_to_update = user_details.query.filter_by(pfp=None).all()
                for user in users_to_update:
                    pfp_bytes = base64.b64decode(encoded_string)  # Convert Base64 string to bytes
                    user.pfp = pfp_bytes  # Update with Base64 string
                    user.pfp_name = file_path.split('/')[-1]  # Optional: store file name
                    db.session.commit()  # Commit changes to the database

            print("Database has been updated with new profile pictures.")

        except Exception as e:
            print(f"Error: {e}")

# Create a simple Tkinter window
root = tk.Tk()
root.title("Image to Base64 Converter")

# Create a button to select an image
select_button = tk.Button(root, text="Select Image", command=select_image)
select_button.pack(pady=20)

# Run the application
root.mainloop()
