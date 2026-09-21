import re
import joblib
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model = joblib.load('model.pkl')
label_encoder = joblib.load('label_encoder.pkl')
feature_columns = joblib.load('feature_columns.pkl')


def parse_number(value, default=0):
    if value is None:
        return default
    match = re.search(r'\d+', str(value))
    return int(match.group()) if match else default


def has_dedicated_gpu(graphics_str):
    if not graphics_str:
        return 0
    return 0 if 'integrated' in graphics_str.lower() else 1


PORTABILITY_MAP = {'high': 2, 'medium': 1, 'low': 0}
CONDITION_MAP = {'new': 2, 'refurbished': 1, 'used': 0}


@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ML service is running'})


@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    specs = data.get('specs', {}) or {}
    features = {
        'price': data.get('price', 0),
        'ram_gb': parse_number(specs.get('ram')),
        'storage_gb': parse_number(specs.get('storage')),
        'has_gpu': has_dedicated_gpu(specs.get('graphics')),
        'portability': PORTABILITY_MAP.get(data.get('portability'), 1),
        'condition': CONDITION_MAP.get(data.get('condition'), 2),
        'is_desktop': 1 if data.get('type') == 'desktop' else 0,
    }

    # Build the feature row in the exact column order the model was trained on
    row = [[features[col] for col in feature_columns]]

    prediction = model.predict(row)[0]
    probabilities = model.predict_proba(row)[0]
    confidence = round(max(probabilities) * 100, 1)

    predicted_use_case = label_encoder.inverse_transform([prediction])[0]

    return jsonify({
        'predictedUseCase': predicted_use_case,
        'confidence': confidence,
    })


if __name__ == '__main__':
    app.run(port=5001, debug=True)