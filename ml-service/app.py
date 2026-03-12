import os
from flask import Flask, request, jsonify
from predictor import predict_future

app = Flask(__name__)

port = int(os.environ.get("PORT", 10000))

@app.route("/")
def home():
    return {
        "status": "Intellexa ML Service Running",
        "service": "ML Prediction API"
    }

@app.route("/predict", methods=["POST"])
def predict():
    try:

        data = request.get_json()

        result = predict_future(data)

        return jsonify({
            "success": True,
            "predictions": result
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=port
    )