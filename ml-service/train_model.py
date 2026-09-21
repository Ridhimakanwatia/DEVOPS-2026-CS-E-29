"""
Trains a model that predicts a laptop's best-fit use case from its specs.
Run this once (and again any time your laptop catalog changes) with:
    python train_model.py

It connects to the SAME MongoDB database your Node backend uses, pulls
every laptop, engineers numeric features from the specs, and trains a
classifier to predict the primary use-case tag. This replaces guesswork
with an actual trained model, using your real seeded data as training data.
"""

import os
import re
import joblib
import pandas as pd
from dotenv import load_dotenv
from pymongo import MongoClient
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    raise SystemExit("MONGO_URI not found — add it to ml-service/.env (same value as your backend's .env)")


def parse_number(value, default=0):
    """Pulls the first number out of a string like '16 GB' -> 16, '512 GB SSD' -> 512."""
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


def build_features(laptop):
    specs = laptop.get('specs', {}) or {}
    return {
        'price': laptop.get('price', 0),
        'ram_gb': parse_number(specs.get('ram')),
        'storage_gb': parse_number(specs.get('storage')),
        'has_gpu': has_dedicated_gpu(specs.get('graphics')),
        'portability': PORTABILITY_MAP.get(laptop.get('portability'), 1),
        'condition': CONDITION_MAP.get(laptop.get('condition'), 2),
        'is_desktop': 1 if laptop.get('type') == 'desktop' else 0,
    }


def main():
    client = MongoClient(MONGO_URI)
    db = client.get_database()  # uses the database name already in your connection string
    laptops = list(db.laptops.find())

    if len(laptops) < 5:
        raise SystemExit(f"Only found {len(laptops)} laptops in the database — run the Node seed script first (npm run seed in Backend).")

    rows = []
    labels = []
    for laptop in laptops:
        use_tags = laptop.get('useTags', [])
        if not use_tags:
            continue
        rows.append(build_features(laptop))
        labels.append(use_tags[0])  # primary use case as the label

    X = pd.DataFrame(rows)
    y_raw = labels

    label_encoder = LabelEncoder()
    y = label_encoder.fit_transform(y_raw)

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    if len(X_test) > 0:
        preds = model.predict(X_test)
        acc = accuracy_score(y_test, preds)
        print(f"Validation accuracy: {acc:.2f} (on {len(X_test)} held-out laptops)")
    else:
        print("Dataset too small for a held-out test split — trained on everything.")

    joblib.dump(model, 'model.pkl')
    joblib.dump(label_encoder, 'label_encoder.pkl')
    joblib.dump(list(X.columns), 'feature_columns.pkl')

    print(f"Trained on {len(X)} laptops. Saved model.pkl, label_encoder.pkl, feature_columns.pkl")


if __name__ == '__main__':
    main()