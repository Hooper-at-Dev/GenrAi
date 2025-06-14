from flask import Flask, request, jsonify
from flask_cors import CORS  # Added for CORS
import os
import librosa
import numpy as np
import tensorflow as tf
from tensorflow.image import resize
from werkzeug.utils import secure_filename
import gc  # Added for garbage collection

app = Flask(__name__)
CORS(app)  # Enable CORS globally

# Configure upload folder
UPLOAD_FOLDER = './uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {'mp3', 'wav'}

# Ensure upload folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Enable GPU memory growth to avoid pre-allocating all memory
gpus = tf.config.list_physical_devices('GPU')
if gpus:
    try:
        for gpu in gpus:
            tf.config.experimental.set_memory_growth(gpu, True)
        print("[INFO] Enabled GPU memory growth")
    except RuntimeError as e:
        print("[WARNING] Could not set memory growth:", e)

# Load model on GPU if available
print("[INFO] Loading model...")
try:
    with tf.device('/GPU:0' if gpus else '/CPU:0'):
        model = tf.keras.models.load_model('./Trained_model.h5')
    print("[INFO] Model loaded on GPU" if gpus else "[INFO] Model loaded on CPU")
except Exception as e:
    print("[ERROR] Failed to load model:", e)
    raise

# Load genre class names
classes = ["blues", "classical", "country", "disco", "hip-hop", "jazz", "metal", "pop", "reggae", "rock"]

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def load_and_preprocess_file(file_path, target_shape=(256, 256)):
    data = []
    audio_data, sample_rate = librosa.load(file_path, sr=None)
    chunk_duration = 4
    overlap_duration = 2
    chunk_samples = chunk_duration * sample_rate
    overlap_samples = overlap_duration * sample_rate
    num_chunks = int(np.ceil((len(audio_data) - chunk_samples) / (chunk_samples - overlap_samples)) + 1)

    for i in range(num_chunks):
        start = i * (chunk_samples - overlap_samples)
        end = start + chunk_samples
        chunk = audio_data[start:end]
        mel_spectrogram = librosa.feature.melspectrogram(y=chunk, sr=sample_rate)
        mel_spectrogram = resize(np.expand_dims(mel_spectrogram, axis=-1), target_shape)
        data.append(mel_spectrogram)

    return np.array(data)

def model_prediction(X_test):
    with tf.device('/GPU:0' if gpus else '/CPU:0'):
        y_pred = model.predict(X_test)
    predicted_categories = np.argmax(y_pred, axis=1)
    unique_elements, counts = np.unique(predicted_categories, return_counts=True)
    max_count = np.max(counts)
    max_element = unique_elements[counts == max_count]
    return max_element[0], unique_elements, counts

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        try:
            X_test = load_and_preprocess_file(file_path)
            c_index, u_elements, counts = model_prediction(X_test)

            # Calculate percentages
            total = sum(counts)
            predictions = []
            for value, index in zip(counts, range(len(counts))):
                percentage = (value / total) * 100
                genre = classes[u_elements[index]]
                predictions.append({
                    'genre': genre,
                    'percentage': round(percentage, 2)
                })

            # Clean up GPU memory
            tf.keras.backend.clear_session()
            gc.collect()

            os.remove(file_path)

            return jsonify({
                'predicted_genre': classes[c_index],
                'predictions': predictions
            })

        except Exception as e:
            if os.path.exists(file_path):
                os.remove(file_path)
            tf.keras.backend.clear_session()
            gc.collect()
            return jsonify({'error': f'Processing failed: {str(e)}'}), 500

    return jsonify({'error': 'Invalid file format'}), 400

if __name__ == '__main__':
    if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
