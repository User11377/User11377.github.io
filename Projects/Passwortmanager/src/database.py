import sqlite3
from bcrypt import hashpw, gensalt, checkpw
from cryptography.fernet import Fernet

DB_PATH = 'passwords.db'
KEY = b'wf-ylwqIcYWFFbL8NdLeGhyaeibHqVBdx6RomAJLe2k='  # Ersetzen Sie dies durch Ihren tatsächlichen Schlüssel
cipher = Fernet(KEY)

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            username TEXT NOT NULL,
            password TEXT NOT NULL
        )
''')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS passwords (
            id INTEGER PRIMARY KEY,
            service TEXT NOT NULL,
            email TEXT NOT NULL,
            username TEXT NOT NULL,
            password TEXT NOT NULL
        )
''')

    conn.commit()
    conn.close()

def add_user(username, password):
    hashed_password = hashpw(password.encode('utf-8'), gensalt())
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('INSERT INTO users (username, password) VALUES (?, ?)', (username, hashed_password))
    conn.commit()
    conn.close()




def get_user(username):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('SELECT username, password FROM users WHERE username = ?', (username,))
    user = cursor.fetchone()
    conn.close()
    return user

def get_any_user():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('SELECT username FROM users LIMIT 1')
    user = cursor.fetchone()
    conn.close()
    return user

def get_passwords():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Nur die benötigten Spalten abrufen
    cursor.execute('SELECT service, email, username, password FROM passwords')
    passwords = cursor.fetchall()
    conn.close()
    return [(service, email, username, cipher.decrypt(password).decode('utf-8')) for service, email, username, password in passwords]

def add_password(service, email, username, password):
    encrypted_password = cipher.encrypt(password.encode('utf-8'))
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('INSERT INTO passwords (service, email, username, password) VALUES (?, ?, ?, ?)', (service, email, username, encrypted_password))
    conn.commit()
    conn.close()

def delete_password(service, email):
    import sqlite3
    conn = sqlite3.connect("passwords.db")  # Passe den Datenbanknamen an
    cursor = conn.cursor()

    # Lösche den Eintrag basierend auf Service und Email
    cursor.execute("DELETE FROM passwords WHERE service = ? AND email = ?", (service, email))

    conn.commit()
    conn.close()
    
def check_password(username, password):
    user = get_user(username)
    if user:
        # Vergleiche das eingegebene Passwort mit dem gehashten Passwort
        return checkpw(password.encode('utf-8'), user[1])
    return False




