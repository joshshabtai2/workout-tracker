from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory('.', path)

workouts = []

@app.route('/workouts', methods=['GET'])
def get_workouts():
    return jsonify(workouts)

@app.route('/workouts', methods=['POST'])
def add_workout():
    data = request.get_json()
    workouts.append(data)
    return jsonify(data), 201

@app.route('/workouts/<int:index>', methods=['DELETE'])
def delete_workout(index):
    if 0 <= index < len(workouts):
        deleted = workouts.pop(index)
        return jsonify(deleted)
    return jsonify({'error': 'Not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
