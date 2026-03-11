from flask import Flask, request, jsonify
from predictor import predict_future

app = Flask(__name__)


@app.route("/predict", methods=["POST"])
def predict():

    data = request.get_json()

    result = predict_future(data)

    return jsonify({
        "message": "Prediction successful",
        "predictions": result
    })


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=8000,
        debug=True
    )