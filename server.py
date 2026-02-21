from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

def get_db():
    conn = sqlite3.connect('workouts.db')
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS workouts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT NOT NULL,
            type TEXT NOT NULL,
            exercise TEXT NOT NULL,
            sets INTEGER NOT NULL,
            reps INTEGER NOT NULL,
            weight REAL NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory('.', path)

@app.route('/workouts', methods=['GET'])
def get_workouts():
    conn = get_db()
    workouts = conn.execute('SELECT * FROM workouts ORDER BY date DESC').fetchall()
    conn.close()
    return jsonify([dict(w) for w in workouts])

@app.route('/workouts', methods=['POST'])
def add_workout():
    data = request.get_json()
    conn = get_db()
    conn.execute('''
        INSERT INTO workouts (date, type, exercise, sets, reps, weight)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', (data['date'], data['type'], data['exercise'], data['sets'], data['reps'], data['weight']))
    conn.commit()
    conn.close()
    return jsonify(data), 201

@app.route('/workouts/<int:id>', methods=['DELETE'])
def delete_workout(id):
    conn = get_db()
    conn.execute('DELETE FROM workouts WHERE id = ?', (id,))
    conn.commit()
    conn.close()
    return jsonify({'deleted': id})

if __name__ == '__main__':
    init_db()
    app.run(debug=True)