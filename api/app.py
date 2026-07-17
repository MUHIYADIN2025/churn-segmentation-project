import os
from pathlib import Path
from typing import Literal

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib

ROOT_DIR = Path(__file__).resolve().parent.parent
MODELS_DIR = ROOT_DIR / 'models'

app = FastAPI(title="Telecom Customer Segmentation & Churn Predictive Engine", version="1.0.0")

# Allow the React frontend (running on a different port) to call this API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten to your actual frontend origin before production
    allow_methods=["*"],
    allow_headers=["*"],
)

# Soo rar dhammaan moodalladii la keydiyay
try:
    preprocessor = joblib.load(MODELS_DIR / "preprocessor.pkl")
    cluster_scaler = joblib.load(MODELS_DIR / "cluster_scaler.pkl")
    kmeans_model = joblib.load(MODELS_DIR / "kmeans_model.pkl")
    models = {
        "logistic_regression": joblib.load(MODELS_DIR / "logistic_regression.pkl"),
        "random_forest": joblib.load(MODELS_DIR / "random_forest.pkl"),
    }
except Exception as e:
    raise RuntimeError(f"Moodalladii halkan lagama helin: {str(e)}")


class CustomerRecord(BaseModel):
    gender: str
    SeniorCitizen: int
    Partner: str
    Dependents: str
    tenure: int
    PhoneService: str
    MultipleLines: str
    InternetService: str
    OnlineSecurity: str
    OnlineBackup: str
    DeviceProtection: str
    TechSupport: str
    StreamingTV: str
    StreamingMovies: str
    Contract: str
    PaperlessBilling: str
    PaymentMethod: str
    MonthlyCharges: float
    TotalCharges: float
    model: Literal["logistic_regression", "random_forest"]

@app.post("/predict")
def run_predictive_inference(payload: CustomerRecord):
    try:
        chosen_model_name = payload.model
        data = payload.model_dump(exclude={"model"})
        input_data = pd.DataFrame([data])

        # 1. Dynamic K-Means Segment Assignment
        cluster_metrics = input_data[["tenure", "MonthlyCharges", "TotalCharges"]]
        scaled_metrics = cluster_scaler.transform(cluster_metrics)
        input_data["Segment_ID"] = kmeans_model.predict(scaled_metrics)[0]

        # 2. Supervised Preprocessing & Live Inference
        processed_matrix = preprocessor.transform(input_data)
        classifier = models[chosen_model_name]

        prediction = int(classifier.predict(processed_matrix)[0])
        probability = float(classifier.predict_proba(processed_matrix)[0][1])

        return {
            "churn_prediction": "Yes" if prediction == 1 else "No",
            "churn_probability": round(probability, 4),
            "segment_id": int(input_data["Segment_ID"].iloc[0]),
            "model_used": chosen_model_name,
        }

    except Exception as err:
        raise HTTPException(
            status_code=400,
            detail=f"Inference generated an error: {str(err)}"
        )
@app.get("/health")
def health_check():
    return {"status": "ok", "models_loaded": list(models.keys())}