# Telecom Customer Segmentation & Churn Prediction System

Prepared by: Muhiadin Said Hassan

## Overview
This project combines machine learning and a modern web interface to predict customer churn for a telecom business. It uses clustering to segment customers and classification models to estimate whether a customer is likely to leave.

## Project Goals
- Identify at-risk customers early
- Segment customers into behavioral groups
- Predict churn using Logistic Regression or Random Forest
- Provide a professional frontend dashboard for predictions and analytics

## Tech Stack
- Python
- FastAPI
- Scikit-learn
- Pandas / NumPy
- React
- Vite
- Tailwind CSS
- Recharts
- Axios

## Backend API
The FastAPI backend is available at:
- http://127.0.0.1:8000

### Endpoint
- POST /predict

### Example request
```json
{
  "gender": "Male",
  "SeniorCitizen": 0,
  "Partner": "Yes",
  "Dependents": "No",
  "tenure": 24,
  "PhoneService": "Yes",
  "MultipleLines": "No",
  "InternetService": "Fiber optic",
  "OnlineSecurity": "No",
  "OnlineBackup": "Yes",
  "DeviceProtection": "No",
  "TechSupport": "No",
  "StreamingTV": "Yes",
  "StreamingMovies": "Yes",
  "Contract": "Month-to-month",
  "PaperlessBilling": "Yes",
  "PaymentMethod": "Electronic check",
  "MonthlyCharges": 89.5,
  "TotalCharges": 2148.0,
  "model": "logistic_regression"
}
```

## Frontend Setup
Install dependencies:
```bash
npm install
```

Start the frontend:
```bash
npm run dev
```

Open the app at:
```text
http://localhost:5173/
```

## Project Structure
```text
churn-segmentation-project/
├── api/
│   └── app.py
├── models/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── README.md
└── vite.config.js
```

## Features
- Customer prediction form
- Churn probability and risk level display
- Customer segment visualization
- Analytics dashboard with charts
- Responsive modern UI
- Dark/light mode support

## Next Steps
- Add more model evaluation metrics
- Improve API validation and error handling
- Connect the dashboard charts to live prediction history

## Author
Muhiadin Said Hassan

Project Repository: https://github.com/MUHIYADIN2025/churn-segmentation-project


GitHub Profile: https://github.com/MUHIYADIN2025
