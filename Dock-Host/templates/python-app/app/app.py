from flask import Flask, jsonify

from config import build_payload, get_port

app = Flask(__name__)


@app.get("/")
def home():
    return jsonify(build_payload())


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=get_port())
