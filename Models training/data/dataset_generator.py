import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, accuracy_score
import xgboost as xgb
import optuna
import onnxruntime
import onnx
from skl2onnx import convert_sklearn
from skl2onnx.common.data_types import FloatTensorType

# Note: This code assumes X_train, X_test, y_train, y_test are already defined
# You should add your data loading and preprocessing code here

# Define Optuna objective for hyperparameter tuning
def objective(trial):
    param = {
        'objective': 'reg:squarederror',
        'eval_metric': 'rmse',
        'tree_method': 'hist',
        'max_depth': trial.suggest_int('max_depth', 3, 10),
        'learning_rate': trial.suggest_float('learning_rate', 0.01, 0.3),
        'n_estimators': trial.suggest_int('n_estimators', 50, 300),
        'subsample': trial.suggest_float('subsample', 0.6, 1.0),
        'colsample_bytree': trial.suggest_float('colsample_bytree', 0.6, 1.0),
        'min_child_weight': trial.suggest_int('min_child_weight', 1, 10),
    }
    
    model = xgb.XGBRegressor(**param)
    model.fit(X_train, y_train)
    
    y_pred = model.predict(X_test)
    mse = mean_squared_error(y_test, y_pred)
    
    return -mse  # Negative MSE because optuna maximizes the objective

# Create and run the Optuna study
study = optuna.create_study(direction='maximize')
study.optimize(objective, n_trials=100)

# Train final model with best parameters
best_params = study.best_params
best_params['objective'] = 'reg:squarederror'
best_params['eval_metric'] = 'rmse'
best_params['tree_method'] = 'hist'

final_model = xgb.XGBRegressor(**best_params)
final_model.fit(X_train, y_train)

# Evaluate the model
y_pred = final_model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
print(f"Final model RMSE: {rmse:.4f}")
print(f"Best trial: {study.best_trial.value}")
print(f"Best parameters: {study.best_params}")

# Convert to ONNX
initial_type = [('float_input', FloatTensorType([None, X_train.shape[1]]))]
onx = convert_sklearn(final_model, initial_types=initial_type)

# Save the ONNX model
onnx_filename = "xgboost_model.onnx"
with open(onnx_filename, "wb") as f:
    f.write(onx.SerializeToString())

print(f"Model exported as {onnx_filename}")

# Test the ONNX model
sess = onnxruntime.InferenceSession(onnx_filename)
input_name = sess.get_inputs()[0].name
label_name = sess.get_outputs()[0].name

onnx_pred = sess.run([label_name], {input_name: X_test.astype(np.float32)})[0]
onnx_mse = mean_squared_error(y_test, onnx_pred)
onnx_rmse = np.sqrt(onnx_mse)
print(f"ONNX model RMSE: {onnx_rmse:.4f}")
