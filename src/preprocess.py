import os
import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer


def load_and_clean_data():
    local_path = os.path.join('dataset', 'telcom_segmented_customers.csv')

    if os.path.exists(local_path):
        df = pd.read_csv(local_path)
    else:
        url = "https://raw.githubusercontent.com/IBM/telco-customer-churn-on-icp4d/master/data/Telco-Customer-Churn.csv"
        df = pd.read_csv(url)

    df.drop(columns=['customerID'], errors='ignore', inplace=True)

    # NOTE: fillna(..., inplace=True) on a column-slice silently fails under
    # pandas' Copy-on-Write mode. Assigning the result back fixes it.
    df['TotalCharges'] = pd.to_numeric(df['TotalCharges'].str.strip(), errors='coerce')
    df['TotalCharges'] = df['TotalCharges'].fillna(df['TotalCharges'].median())

    df['Churn'] = df['Churn'].map({'Yes': 1, 'No': 0})
    return df


def build_preprocessing_pipeline(df, target_col='Churn', test_size=0.2, random_state=42):
    """
    Splits df into train/test (stratified on the target), then fits a
    ColumnTransformer (StandardScaler for numeric columns, OneHotEncoder
    for categorical columns -- including the engineered Segment_ID, which
    is numeric) on the training set only, and applies it to both splits.

    The fitted preprocessor is saved to models/preprocessor.pkl so the
    FastAPI service (api/app.py) can load and reuse the exact same
    transformation at inference time.

    Returns:
        X_train, X_test : transformed feature matrices (numpy arrays)
        y_train, y_test : target Series
        preprocessor     : the fitted ColumnTransformer
    """
    X = df.drop(columns=[target_col])
    y = df[target_col]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=test_size, random_state=random_state, stratify=y
    )

    numeric_cols = X_train.select_dtypes(include=['int64', 'float64']).columns.tolist()
    categorical_cols = X_train.select_dtypes(include=['object']).columns.tolist()

    preprocessor = ColumnTransformer(
        transformers=[
            ('num', StandardScaler(), numeric_cols),
            ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_cols),
        ],
        remainder='drop',
    )

    X_train_transformed = preprocessor.fit_transform(X_train)
    X_test_transformed = preprocessor.transform(X_test)

    os.makedirs('models', exist_ok=True)
    joblib.dump(preprocessor, 'models/preprocessor.pkl')

    return X_train_transformed, X_test_transformed, y_train, y_test, preprocessor