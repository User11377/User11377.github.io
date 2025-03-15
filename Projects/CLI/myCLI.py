import subprocess
import sys
from PyQt6.QtWidgets import QHBoxLayout, QApplication, QWidget, QVBoxLayout, QLineEdit, QTextEdit, QPushButton,QLabel
import os

class TerminalWindow(QWidget):
    def __init__(self):
        super().__init__()

        #init Window
        self.setWindowTitle("JM-CLI")
        self.setGeometry(100,100,800,500)

        #init style
        self.set_qss_from_file('Projects/CLI/style.qss')

        #init layout
        layout = QVBoxLayout()


        #init output_box
        self.output_box = QTextEdit(self)
        self.output_box.setReadOnly(True)
        layout.addWidget(self.output_box)

        self.output_box.setText("(c) JM_CLI since 2025")

        input_layout = QHBoxLayout()

        self.path_label = QLabel(self)
        self.update_prompt()
        input_layout.addWidget(self.path_label)

        #init inputfield
        self.command_input = QLineEdit(self)
        self.command_input.setPlaceholderText("")
        input_layout.addWidget(self.command_input)

        self.command_input.setFocus()

        layout.addLayout(input_layout)

        self.setLayout(layout)

        #set logic
        self.command_input.returnPressed.connect(self.run_command)
    
        self.update_prompt()
    

    def set_qss_from_file(self,path):
        with open(path, 'r') as f:
            qss = f.read()
            self.setStyleSheet(qss)

    def update_prompt(self):
        current_path = os.getcwd()
        self.path_label.setText(f"{current_path} > ")


    def run_command(self):
        self.output_box.append("\n")
        #la to list all
        #add to add 2 numbers
        input = self.command_input.text()
        self.command_input.clear()
        current_path = os.getcwd()
        self.output_box.append(f"{current_path}> "+ input)

        input = input.strip()

        input = input.upper()


        #split
        parts = input.split()  # Teilt den String an Leerzeichen
        try:
            command = parts[0]  # Erstes Wort ist der Befehl
        except IndexError:
            self.output_box.append(f"{current_path}> to few arguments")
            return
        
        args = parts[1:]    # Alles danach sind die Argumente

 

        if command =="HELP" :
            help_text = "Here is a list of what you can do\n"
            help_text += "1. LA - list all folders and datas of your current path\n"
            help_text += "2. ADD - Add 2 numbers [add 1 1] = 2\n"
            help_text += "3. HELP - Show this help message\n"
            help_text += "4. CLEAR - clears all your Requests\n"
            help_text += "5. CD - change directory -> cd [directory]"
            self.output_box.append(help_text)
        elif command == "LA":
            self.list_all_files()

        elif command == "CLEAR":
            self.output_box.clear()
            self.output_box.setText("(c) JM_CLI since 2025")
        
        elif command == "ADD":
            if len(args) < 2:
                self.output_box.append("ERROR! Usage: add num1 num2")
            else :
                try:
                    num1 = float(args[0])
                    num2 = float(args[1])
                    result = num1 + num2
                    self.output_box.append(f"Result: {result}")
                except ValueError:
                    self.output_box.append("Error: Please enter valid numbers!")
        
        #change directory
        elif command == "CD":
            if len(args) < 1:
                self.output_box("Error! Usage: cd <path>")
            else:
                new_path = os.path.join(current_path, args[0])

                if os.path.isdir(new_path):
                    os.chdir(new_path)
                    current_path = os.getcwd()
                    self.path_label.clear()
                    self.path_label.setText(current_path + "> ")
                    self.output_box.append(f"Changed directory to: {current_path}")
                else:
                    self.output_box.append(f"Error: The directory '{new_path}' does not exist.")

            
        else:
            self.output_box.append("wrong command, enter 'help' to get more information")

    def list_all_files (self):
        current_path = os.getcwd()
        files = os.listdir(current_path)
        self.output_box.append(f"Files in {current_path}")
        for file in files:
            self.output_box.append(file)

        

if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = TerminalWindow()
    window.show()
    sys.exit(app.exec())
