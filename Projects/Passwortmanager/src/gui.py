from PyQt6.QtWidgets import (
    QApplication, QMainWindow, QVBoxLayout, QHBoxLayout, QWidget,
    QLabel, QLineEdit, QPushButton, QTableWidget, QTableWidgetItem, QHeaderView, QMessageBox, QCheckBox
)
from PyQt6.QtGui import QIcon, QClipboard
from PyQt6.QtWidgets import QAbstractItemView, QToolButton
from PyQt6.QtCore import QMimeData, Qt
import sys
import os
from database import add_password



class managerWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Password Manager")
        self.setGeometry(1200, 500, 800, 600)
        self.init_ui()

    def init_ui(self):
        layout = QVBoxLayout()

        self.table = QTableWidget()
        self.table.setColumnCount(6)  # Eine zusätzliche Spalte für den Kopier-Button und Checkbox
        self.table.setHorizontalHeaderLabels(["", "Service", "Email", "Username", "Password", "Copy"])

        # Add password button
        self.add_button = QPushButton("Add Password")

        # Delete password button
        self.delete_button = QPushButton("Delete Password")

        layout.addWidget(self.table)
        layout.addWidget(self.add_button)
        layout.addWidget(self.delete_button)

        # Set layout for the main window
        central_widget = QWidget()
        central_widget.setLayout(layout)
        self.setCentralWidget(central_widget)

        # Set header view for the table
        header = self.table.horizontalHeader()
        header.setSectionResizeMode(0, QHeaderView.ResizeMode.ResizeToContents)  # Checkbox-Spalte
        header.setSectionResizeMode(1, QHeaderView.ResizeMode.Stretch)
        header.setSectionResizeMode(2, QHeaderView.ResizeMode.Stretch)
        header.setSectionResizeMode(3, QHeaderView.ResizeMode.Stretch)
        header.setSectionResizeMode(4, QHeaderView.ResizeMode.Stretch)
        header.setSectionResizeMode(5, QHeaderView.ResizeMode.ResizeToContents)  # Kopier-Button-Spalte

        # Load passwords from the database
        self.load_passwords()

        self.add_button.clicked.connect(self.add_password)
        self.delete_button.clicked.connect(self.delete_selected_passwords)

    def delete_selected_passwords(self):
    # Iteriere durch die Zeilen und überprüfe die Checkboxen
        rows_to_delete = []
        for row in range(self.table.rowCount()):
            checkbox_widget = self.table.cellWidget(row, 0)  # Checkbox ist in der ersten Spalte
            if checkbox_widget:
                checkbox = checkbox_widget.findChild(QCheckBox)
                if checkbox and checkbox.isChecked():
                    rows_to_delete.append(row)

        if not rows_to_delete:
            QMessageBox.warning(self, "Error", "Please select at least one password to delete.")
            return

        # Lösche die ausgewählten Einträge
        from database import delete_password
        for row in sorted(rows_to_delete, reverse=True):  # Von unten nach oben löschen
            service = self.table.item(row, 1).text()  # Service-Spalte
            email = self.table.item(row, 2).text()    # Email-Spalte
            delete_password(service, email)          # Lösche aus der Datenbank
            self.table.removeRow(row)                # Lösche aus der Tabelle


    def load_passwords(self):
        # Load passwords from the database
        from database import get_passwords
        passwords = get_passwords()
        self.table.setRowCount(len(passwords))

        # Berechne den absoluten Pfad zum Icon
        base_dir = os.path.dirname(os.path.abspath(__file__))
        icon_path = os.path.join(base_dir, "assets", "copy_icon.png")

        for row, password in enumerate(passwords):
            # Checkbox in der ersten Spalte hinzufügen
            checkbox = QCheckBox()
            checkbox_widget = QWidget()
            checkbox_layout = QHBoxLayout(checkbox_widget)
            checkbox_layout.addWidget(checkbox)
            checkbox_layout.setAlignment(Qt.AlignmentFlag.AlignCenter)
            checkbox_layout.setContentsMargins(0, 0, 0, 0)
            self.table.setCellWidget(row, 0, checkbox_widget)

            # Füge die restlichen Daten hinzu
            for column, item in enumerate(password):
                if column == 3:  # Passwort-Spalte maskieren
                    item = "●●●●●"
                self.table.setItem(row, column + 1, QTableWidgetItem(str(item)))  # +1 wegen der Checkbox-Spalte

            # Kopier-Button in der letzten Spalte hinzufügen
            copy_button = QToolButton()
            if os.path.exists(icon_path):
                copy_button.setIcon(QIcon(icon_path))  # Icon für den Button
            else:
                print("Icon not found, using fallback.")
                copy_button.setText("Copy")  # Fallback-Text
            copy_button.setToolTip("Copy Password")
            copy_button.clicked.connect(lambda _, r=row: self.copy_password(r))  # Verbinde mit der Kopierfunktion
            self.table.setCellWidget(row, 5, copy_button)  # Spalte 5 wegen der Checkbox-Spalte

    def copy_password(self, row):
        # Kopiere das Passwort der ausgewählten Zeile in die Zwischenablage
        from database import get_passwords
        passwords = get_passwords()
        _, _, _, password = passwords[row]  # Hole das Passwort der Zeile

        # Passwort in die Zwischenablage kopieren
        clipboard = QApplication.clipboard()
        clipboard.setText(password)


     

    def add_password(self):
        # Open add password window
        self.add_password_window = addPasswordWindow()
        self.add_password_window.show()
        self.close()


class LoginWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Login")
        self.setGeometry(1200, 500, 400, 200)
        self.setFixedSize(400, 200)
        self.init_ui()

    def init_ui(self):
        layout = QVBoxLayout()

        username_label = QLabel("Username:")
        password_label = QLabel("Password:")

        self.username_input = QLineEdit()
        self.password_input = QLineEdit()

        self.password_input.setEchoMode(QLineEdit.EchoMode.Password)

        login_button = QPushButton("Login")

        login_button.clicked.connect(self.login)

        layout.addWidget(username_label)
        layout.addWidget(self.username_input)
        layout.addWidget(password_label)
        layout.addWidget(self.password_input)
        layout.addWidget(login_button)

        central_widget = QWidget()
        central_widget.setLayout(layout)
        #festlegen der Layout für das Hauptfenster
        self.setCentralWidget(central_widget)
    
    def login(self):
        username = self.username_input.text()
        password = self.password_input.text()
        if username and password:
            from database import check_password
            if check_password(username, password):
                self.close()  # Login-Fenster schließen
                self.manager_window = managerWindow()  # Passwortmanager-Fenster öffnen
                self.manager_window.show()
            else:
                QMessageBox.warning(self, "Error", "Invalid username or password.")


class RegisterWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Register")
        self.setGeometry(1200, 500, 400, 200)
        self.setFixedSize(400, 200)  # Fenstergröße festlegen
        self.init_ui()

    def init_ui(self):
        layout = QVBoxLayout()

        username_label = QLabel("Username:")
        password_label = QLabel("Password:")

        self.username_input = QLineEdit()
        self.password_input = QLineEdit()

        self.password_input.setEchoMode(QLineEdit.EchoMode.Password)

        register_button = QPushButton("Register")

        register_button.clicked.connect(self.register)

        layout.addWidget(username_label)
        layout.addWidget(self.username_input)
        layout.addWidget(password_label)
        layout.addWidget(self.password_input)
        layout.addWidget(register_button)

        central_widget = QWidget()
        central_widget.setLayout(layout)
        #festlegen der Layout für das Hauptfenster
        self.setCentralWidget(central_widget)    
    
    def register(self):
        username = self.username_input.text()
        password = self.password_input.text()

        if username and password:
            from database import add_user
            add_user(username, password)
            QMessageBox.information(self, "Erfolg", "Benutzer registriert!")
            self.close()
            self.login_window = LoginWindow()
            self.login_window.show()
        else:
            QMessageBox.warning(self, "Fehler", "Bitte alle Felder ausfüllen!")
        
class addPasswordWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Add Password")
        self.setGeometry(1200, 500, 400, 200)
        self.init_ui()

    def init_ui(self):
        layout = QVBoxLayout()

        service_label = QLabel("Service:")
        email_label = QLabel("Email:")
        username_label = QLabel("Username:")
        password_label = QLabel("Password:")

        self.service_input = QLineEdit()
        self.email_input = QLineEdit()
        self.username_input = QLineEdit()
        self.password_input = QLineEdit()


        add_button = QPushButton("Add Password")

        add_button.clicked.connect(self.add_password)

        layout.addWidget(service_label)
        layout.addWidget(self.service_input)
        layout.addWidget(email_label)
        layout.addWidget(self.email_input)
        layout.addWidget(username_label)
        layout.addWidget(self.username_input)
        layout.addWidget(password_label)
        layout.addWidget(self.password_input)
        layout.addWidget(add_button)

        central_widget = QWidget()
        central_widget.setLayout(layout)
        
        # Festlegen des Layouts für das Hauptfenster
        self.setCentralWidget(central_widget) 
    
    def add_password(self):
        service = self.service_input.text()
        email = self.email_input.text()
        username = self.username_input.text()
        password = self.password_input.text()

        if service and email and username and password:
            add_password(service, email, username, password)
            self.close()
            self.manager_window = managerWindow()
            self.manager_window.show()
        else:
            QMessageBox.warning(self, "Error", "Please fill in all fields.")

if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = LoginWindow()
    window.show()
    sys.exit(app.exec())