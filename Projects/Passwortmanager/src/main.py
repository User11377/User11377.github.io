import sys
import os
from PyQt6.QtWidgets import QApplication
from gui import LoginWindow, RegisterWindow
from database import init_db, get_user, get_any_user

def main():
    app = QApplication(sys.argv)

    base_dir = os.path.dirname(os.path.abspath(__file__))
    style_path = os.path.join(base_dir, "style.qss")
    with open(style_path, "r") as style_file:
        style = style_file.read()
        app.setStyleSheet(style)

    
    init_db()
    users = get_any_user()
    if users:
        window = LoginWindow()
    else:
        window = RegisterWindow()

    window.show()
    sys.exit(app.exec())

if __name__ == "__main__":
    main()
    

