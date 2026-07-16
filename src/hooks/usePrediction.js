import { useMemo, useState } from 'react';
import { predictCustomer } from '../services/api';

const defaultForm = {
  gender: 'Male',
  SeniorCitizen: 0,
  Partner: 'Yes',
  Dependents: 'No',
  tenure: 24,
  PhoneService: 'Yes',
  MultipleLines: 'No',
  InternetService: 'Fiber optic',
  OnlineSecurity: 'No',
  OnlineBackup: 'Yes',
  DeviceProtection: 'No',
  TechSupport: 'No',
  StreamingTV: 'Yes',
  StreamingMovies: 'Yes',
  Contract: 'Month-to-month',
  PaperlessBilling: 'Yes',
  PaymentMethod: 'Electronic check',
  MonthlyCharges: 89.5,
  TotalCharges: 2148.0,
  model: 'logistic_regression',
};

export const usePrediction = () => {
  const [formData, setFormData] = useState(defaultForm);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);

  // Keep the form state in sync with user input before each prediction request.

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const submitPrediction = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await predictCustomer(formData);
      setResult(response);
      setHistory((prev) => [
        { ...response, timestamp: new Date().toLocaleTimeString(), model: formData.model },
        ...prev,
      ].slice(0, 6));
    } catch (err) {
      setError(err?.response?.data?.detail || 'Unable to connect to the backend service.');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const riskLevel = useMemo(() => {
    if (!result?.churn_probability) return 'Low Risk';
    const value = result.churn_probability * 100;
    if (value <= 30) return 'Low Risk';
    if (value <= 70) return 'Medium Risk';
    return 'High Risk';
  }, [result]);

  return {
    formData,
    updateField,
    submitPrediction,
    result,
    loading,
    error,
    history,
    riskLevel,
  };
};
