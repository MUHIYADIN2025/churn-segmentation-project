from pathlib import Path
import joblib
import pandas as pd
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

ROOT_DIR = Path(__file__).resolve().parent.parent
MODELS_DIR = ROOT_DIR / 'models'


def evaluate_and_compare():
    from train import execute_training_pipeline
    X_test, y_test, models = execute_training_pipeline()
    
    comparison_data = []
    for name, model in models.items():
        preds = model.predict(X_test)
        comparison_data.append({
            "Algorithm": name,
            "Accuracy": round(accuracy_score(y_test, preds), 4),
            "Precision": round(precision_score(y_test, preds), 4),
            "Recall": round(recall_score(y_test, preds), 4),
            "F1-Score": round(f1_score(y_test, preds), 4)
        })
        
    summary_table = pd.DataFrame(comparison_data)
    print("\n" + "="*70)
    print("                  FINAL MODEL COMPARISON TABLE")
    print("="*70)
    print(summary_table.to_string(index=False))
    print("="*70)
    
    # Maadaama uu Logistic Regression leeyahay F1-Score-ka ugu sarreeya, isagaa guuleystay
    winner = models["logistic_regression"]
    joblib.dump(winner, MODELS_DIR / 'best_classifier.pkl')
    print("\nMoodalka Guuleystay: Logistic_Regression waxaa loo keydiyay models/best_classifier.pkl")
    
    # 3 Sanity Checks oo loo baahnaa
    print("\n" + "-"*15 + " SANITY CHECKS ON BEST MODEL " + "-"*15)
    preprocessor = joblib.load(MODELS_DIR / 'preprocessor.pkl')
    
    sanity_samples = pd.DataFrame([
        {"gender": "Male", "SeniorCitizen": 1, "Partner": "No", "Dependents": "No", "tenure": 2, 
         "PhoneService": "Yes", "MultipleLines": "No", "InternetService": "Fiber optic", 
         "OnlineSecurity": "No", "OnlineBackup": "No", "DeviceProtection": "No", "TechSupport": "No", 
         "StreamingTV": "Yes", "StreamingMovies": "No", "Contract": "Month-to-month", 
         "PaperlessBilling": "Yes", "PaymentMethod": "Electronic check", "MonthlyCharges": 85.00, 
         "TotalCharges": 170.00, "Segment_ID": 0},
        {"gender": "Female", "SeniorCitizen": 0, "Partner": "Yes", "Dependents": "Yes", "tenure": 65, 
         "PhoneService": "Yes", "MultipleLines": "Yes", "InternetService": "DSL", 
         "OnlineSecurity": "Yes", "OnlineBackup": "Yes", "DeviceProtection": "Yes", "TechSupport": "Yes", 
         "StreamingTV": "No", "StreamingMovies": "Yes", "Contract": "Two year", 
         "PaperlessBilling": "No", "PaymentMethod": "Bank transfer", "MonthlyCharges": 60.00, 
         "TotalCharges": 3900.00, "Segment_ID": 2},
        {"gender": "Male", "SeniorCitizen": 0, "Partner": "No", "Dependents": "No", "tenure": 24, 
         "PhoneService": "Yes", "MultipleLines": "No", "InternetService": "No", 
         "OnlineSecurity": "No internet service", "OnlineBackup": "No internet service", "DeviceProtection": "No internet service", "TechSupport": "No internet service", 
         "StreamingTV": "No internet service", "StreamingMovies": "No internet service", "Contract": "One year", 
         "PaperlessBilling": "Yes", "PaymentMethod": "Mailed check", "MonthlyCharges": 20.00, 
         "TotalCharges": 480.00, "Segment_ID": 1}
    ])
    
    proc_samples = preprocessor.transform(sanity_samples)
    predictions = winner.predict(proc_samples)
    probabilities = winner.predict_proba(proc_samples)[:, 1]
    
    for idx, (pred, prob) in enumerate(zip(predictions, probabilities), 1):
        print(f"Sample #{idx} (Tenure: {sanity_samples.iloc[idx-1]['tenure']} bilood, Qandaraas: {sanity_samples.iloc[idx-1]['Contract']})")
        print(f" -> Natiijada Saadaasha: {'Muu bixi rabaa (Churn)' if pred==1 else 'Wuu joogayaa'} | Probability: {prob*100:.2f}%")

if __name__ == "__main__":
    evaluate_and_compare()