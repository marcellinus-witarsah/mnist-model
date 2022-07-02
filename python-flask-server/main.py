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
MODEL = None


@app.route("/predict", methods=['POST'])
def index():
    data = request.get_json()
    np_data = np.array(data["img_arr"])
    preprocessed_data = preprocess_data(img_arr=np_data, model_width=MODEL_INPUT_WIDTH, model_height=MODEL_INPUT_HEIGHT)
    result = predict(model=MODEL, input_data=preprocessed_data)
    return jsonify(
        result=str(result)
    ), 200

    
if __name__ == "__main__":
    try:
        MODEL = prepare_model(path=MODEL_PATH)
        app.run(port=5000, debug=True)
    except:
        print("Server is exited unexpectedly. Please contact server admin.")