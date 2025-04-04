from PyQt6.QtWidgets import (
    QApplication, QMainWindow, QVBoxLayout, QHBoxLayout, QWidget,
    QLabel, QLineEdit, QPushButton, QTableWidget, QTableWidgetItem, QHeaderView
)
import sys
import os

class PasswordManagerGUI(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Passwortmanager")
        self.setGeometry(100, 100, 800, 600)  # Fenstergröße: Breite x Höhe
        self.init_ui()

    def init_ui(self):
        # Haupt-Widget und Layout
        main_widget = QWidget()
        main_layout = QVBoxLayout()

        # Master-Passwort-Bereich
        master_layout = QHBoxLayout()
        master_label = QLabel("Master-Passwort:")
        self.master_input = QLineEdit()
        self.master_input.setEchoMode(QLineEdit.EchoMode.Password)
        master_button = QPushButton("Entsperren")
        master_layout.addWidget(master_label)
        master_layout.addWidget(self.master_input)
        master_layout.addWidget(master_button)

        # Passwort-Tabelle
        self.table = QTableWidget()
        self.table.setColumnCount(3)
        self.table.setHorizontalHeaderLabels(["Service", "Benutzername", "Passwort"])
        self.table.horizontalHeader().setSectionResizeMode(QHeaderView.ResizeMode.Stretch)

        # Buttons für Aktionen
        button_layout = QHBoxLayout()
        add_button = QPushButton("Passwort hinzufügen")
        delete_button = QPushButton("Passwort löschen")
        search_button = QPushButton("Suchen")
        button_layout.addWidget(add_button)
        button_layout.addWidget(delete_button)
        button_layout.addWidget(search_button)

        # Layouts zusammenfügen
        main_layout.addLayout(master_layout)
        main_layout.addWidget(self.table)
        main_layout.addLayout(button_layout)

        main_widget.setLayout(main_layout)
        self.setCentralWidget(main_widget)

def main():
    app = QApplication(sys.argv)

    # Absoluter Pfad zur style.qss (relativ zu diesem Skript)
    base_dir = os.path.dirname(os.path.abspath(__file__))
    style_path = os.path.join(base_dir, "style.qss")

    if os.path.exists(style_path):
        with open(style_path, "r", encoding="utf-8") as f:
            app.setStyleSheet(f.read())
    else:
        print("Warnung: style.qss nicht gefunden. Standardstil wird verwendet.")

    window = PasswordManagerGUI()
    window.show()
    sys.exit(app.exec())

if __name__ == "__main__":
    main()