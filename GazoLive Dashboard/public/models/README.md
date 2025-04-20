# ONNX Models Directory

This directory is where you should place your ONNX model files:

1. `biogas_production_predictor.onnx` - Predicts biogas production based on input parameters
2. `optimal_temperature_predictor.onnx` - Predicts optimal temperature settings
3. `xgboost_anomaly_detector.onnx` - Detects anomalies in system parameters

## Model Details

### Biogas Production Predictor
- Input: Temperature, pH, organic loading rate, hydraulic retention time
- Output: Predicted biogas production (m³/h)

### Optimal Temperature Predictor
- Input: Organic loading rate, pH, substrate type
- Output: Optimal temperature for maximum biogas yield

### XGBoost Anomaly Detector
- Input: Temperature, pH, biogas production, pressure, conductivity
- Output: Anomaly score (0 = normal, 1 = anomaly)

## Usage

These models are loaded and used by the `lib/onnx-models.tsx` file in the application.
