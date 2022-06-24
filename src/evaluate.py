import pandas as pd
import os
import matplotlib.pyplot as plt


def model_diagnostics(history):
    """
    Function to show accuracy and loss of training and validation.
    """
    # plot accuracy
    plt.figure(figsize=(7, 15))
    plt.subplot(211)
    plt.title('Accuracy')
    plt.plot(history['sparse_categorical_accuracy'], color='blue', label='training')
    plt.plot(history['val_sparse_categorical_accuracy'], color='orange', label='validation')
    plt.legend()
    plt.xlabel('Epochs')
    plt.ylabel('Sparse Categorical Accuracy')

    # plot loss
    plt.subplot(212)
    plt.title('Binary Cross Entropy Loss')
    plt.plot(history['loss'], color='blue', label='training')
    plt.plot(history['val_loss'], color='orange', label='validation')
    plt.legend()
    plt.xlabel('Epochs')
    plt.ylabel('Loss')
    plt.show()


if __name__ == "__main__":
    history_csv_path = os.path.join(os.getcwd(), '../best_1', 'history.csv')
    with open(history_csv_path, 'r') as f:
        history_pd = pd.read_csv(f)
    print(history_pd)

    model_diagnostics(history_pd)
