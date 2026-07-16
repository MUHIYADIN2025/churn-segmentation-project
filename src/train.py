import os
os.environ["OMP_NUM_THREADS"] = "1"
import pandas as pd
import joblib
from sklearn.cluster import KMeans
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from preprocess import load_and_clean_data, build_preprocessing_pipeline

def execute_training_pipeline():
    df = load_and_clean_data()
    
    # 1. Unsupervised Clustering (K-Means) sidii Feature Engineering
    cluster_features = ['tenure', 'MonthlyCharges', 'TotalCharges']
    from sklearn.preprocessing import StandardScaler
    sc = StandardScaler()
    scaled_clus = sc.fit_transform(df[cluster_features])
    
    kmeans_model = KMeans(n_clusters=3, n_init=10, random_state=42)
    df['Segment_ID'] = kmeans_model.fit_predict(scaled_clus)
    
    # Keydi moodallada kooxaynta
    joblib.dump(kmeans_model, 'models/kmeans_model.pkl')
    joblib.dump(sc, 'models/cluster_scaler.pkl')
    
    # 2. Supervised Learning Matrix Execution
    X_train, X_test, y_train, y_test, preprocessor = build_preprocessing_pipeline(df)
    
    # Labada moodal ee Supervised-ka ah oo lagu tababarayo xog isku mid ah
    models = {
    "logistic_regression": LogisticRegression(max_iter=1000, random_state=42),
    "random_forest": RandomForestClassifier(
        n_estimators=100,
        random_state=42
    )
}
    trained_models = {}
    for name, model in models.items():
        print(f"Tababaraya moodalka rasmiga ah: {name}...")
        model.fit(X_train, y_train)
        trained_models[name] = model
        joblib.dump(model, f'models/{name}.pkl')
        
    return X_test, y_test, trained_models

if __name__ == "__main__":
    execute_training_pipeline()

    