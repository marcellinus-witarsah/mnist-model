import tensorflow as tf
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

if __name__ == '__main__':
    with open('../test.csv/test.csv', 'r') as f:
        df = pd.read_csv(f)
        print(df.head())

    img_arr = df.iloc[:, :].to_numpy(dtype=np.float32).reshape(-1, 28, 28, 1)
    # img_arr = None
    path = "../best_1/model"
    model = tf.keras.models.load_model(path)
    for img in img_arr[:5]:
        print(img.shape)
        img_expanded = np.expand_dims(img, axis=0)
        result = model.predict(img_expanded)
        print(np.argmax(result))
        plt.title("prediction: {}".format(np.argmax(result)))
        plt.imshow(img, cmap="Greys")
        plt.show()

    # print(model.summary())
    # result = model.predict(img_array)
    # print(np.argmax(result))

