from turtle import width
import tensorflow as tf
import cv2
import numpy as np
import matplotlib.pyplot as plt


def prepare_model (path):
    """
    :param path: location path of the model
    :return: return a tensorfloe model based on the model path
    """
    model = tf.keras.models.load_model(path)
    return model


def preprocess_data(img_arr, model_width, model_height):
    """
    :param img_arr: image in array form
    :param model_width: model input width for resize the image
    :param model_height: model input height for resize the image
    :return: preprocessed image that has been normalized and resized for prediciton
    """
    # inverse image from white to black and otherwise
    img_arr = img_arr.astype(np.float32)
    inverse_img_arr = (255-img_arr)

    # normalize the inverted image into range of 0 - 1
    normalize_img_arr = inverse_img_arr/255.0

    # resize into model input size 
    model_input_dim = (model_width, model_height)
    resized_img_arr = cv2.resize(normalize_img_arr, model_input_dim, interpolation=cv2.INTER_AREA)
    plt.imshow(resized_img_arr, cmap="Greys")
    plt.show()
    return resized_img_arr


def predict(model, input_data):
    """
    :param model: tensorflow model used for prediction
    :param input_data: the preprocessed data
    :return: prediction result
    """
    tf_input_data = tf.convert_to_tensor(input_data)
    tf_input_data = tf.expand_dims(tf_input_data, axis=0)
    result = model.predict(tf_input_data)
    return np.argmax(result)
    