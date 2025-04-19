#%% Environment Setup
!pip install lightgbm onnxmltools scikit-learn pandas numpy
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
import lightgbm as lgb
from onnxmltools.convert import convert_lightgbm
from onnxconverter_common.data_types import FloatTensorType

#%% Data Preparation
# Load dataset
df = pd.read_csv('/kaggle/input/3-models-dataset/optimal_parameter_dataset.csv')

# Select target parameter (change this to predict different targets)
TARGET = 'optimal_temperature'  # Options: optimal_temperature, optimal_ph, optimal_airflow

# Prepare features and target
X = df.drop(['timestamp', 'optimal_temperature', 'optimal_ph', 'optimal_airflow'], axis=1)
y = df[TARGET]

# One-hot encode categorical features
X = pd.get_dummies(X, columns=['substrate_type'], prefix='substrate')

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

#%% LightGBM Model Training
# Create and train model
model = lgb.LGBMRegressor(
    objective='regression',
    num_leaves=31,
    learning_rate=0.05,
    n_estimators=1000,
    random_state=42,
)

model.fit(X_train, y_train,
          eval_set=[(X_test, y_test)])

#%% Model Evaluation
predictions = model.predict(X_test)
print(f'\nModel Performance for {TARGET}:')
print(f'RMSE: {mean_squared_error(y_test, predictions, squared=False):.4f}')
print(f'R² Score: {r2_score(y_test, predictions):.4f}')

#%% ONNX Conversion
# Convert to ONNX format
initial_type = [('float_input', FloatTensorType([None, X_train.shape[1]]))]
onnx_model = convert_lightgbm(
    model,
    initial_types=initial_type,
    name='OptimalParameterPredictor',
    target_opset=12
)

# Save ONNX model
with open(f"{TARGET.replace(' ', '_')}_predictor.onnx", "wb") as f:
    f.write(onnx_model.SerializeToString())

print(f'\nONNX model saved as {TARGET.replace(" ", "_")}_predictor.onnx')
