from tkinter.messagebox import NO
from flask import Flask, jsonify
from flask import request
import numpy as np
from flask_cors import CORS
from functions import prepare_model, preprocess_data, predict

app = Flask(__name__)
# allow cors from all source
CORS(app)

# contants
MODEL_PATH = '../best_1/model'
MODEL_INPUT_WIDTH = 28
MODEL_INPUT_HEIGHT = 28


@app.route("/predict", methods=['POST'])
def index():
    data = request.get_json()
    np_data = np.array(data["img_arr"])
    model = prepare_model(path=MODEL_PATH)
    preprocessed_data = preprocess_data(img_arr=np_data, model_width=MODEL_INPUT_WIDTH, model_height=MODEL_INPUT_HEIGHT)
    result = predict(model=model, input_data=preprocessed_data)
    if result:
        return jsonify(
            result=str(result)
        ), 200

    return jsonify(
        error="there's something error"
    ), 400


if __name__ == "__main__":
    app.run(debug=True)