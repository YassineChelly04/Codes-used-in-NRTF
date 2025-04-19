!pip install onnxmltools
warnings.filterwarnings('ignore')

#%% Import libraries
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import xgboost as xgb
import optuna
from onnxmltools.convert import convert_xgboost
from onnxconverter_common.data_types import FloatTensorType

#%% Load and preprocess data
df = pd.read_csv('/kaggle/input/3-models-dataset/anomaly_detection_dataset.csv')

# Store original feature names for reference
original_features = df.drop(['timestamp', 'anomaly_label', 'anomaly_type'], axis=1).columns.tolist()

# Prepare data
df = df.drop(['timestamp', 'anomaly_type'], axis=1)
X = df.drop('anomaly_label', axis=1)
y = df['anomaly_label']

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

#%% Convert feature names to ONNX-compatible format
X_train.columns = [f'f{i}' for i in range(X_train.shape[1])]
X_test.columns = [f'f{i}' for i in range(X_test.shape[1])]

# Create feature map for future reference
feature_map = pd.DataFrame({
    'original_name': original_features,
    'onnx_name': X_train.columns.tolist()
})
feature_map.to_csv('feature_mapping.csv', index=False)

#%% Optuna objective function
def objective(trial):
    params = {
        'tree_method': 'gpu_hist',
        'objective': 'binary:logistic',
        'eval_metric': 'logloss',
        'verbosity': 0,
        'learning_rate': trial.suggest_float('learning_rate', 1e-3, 0.1, log=True),
        'max_depth': trial.suggest_int('max_depth', 3, 10),
        'subsample': trial.suggest_float('subsample', 0.5, 1.0),
        'colsample_bytree': trial.suggest_float('colsample_bytree', 0.5, 1.0),
        'gamma': trial.suggest_float('gamma', 0, 1),
        'reg_lambda': trial.suggest_float('reg_lambda', 1e-8, 1.0, log=True),
        'reg_alpha': trial.suggest_float('reg_alpha', 1e-8, 1.0, log=True),
    }
    
    model = xgb.XGBClassifier(**params)
    model.fit(X_train, y_train, 
             eval_set=[(X_test, y_test)], 
             early_stopping_rounds=10, 
             verbose=False)
    preds = model.predict(X_test)
    return accuracy_score(y_test, preds)

#%% Run optimization
study = optuna.create_study(direction='maximize')
study.optimize(objective, n_trials=50, show_progress_bar=True)

#%% Train final model with best params
best_params = study.best_params
best_params.update({
    'tree_method': 'gpu_hist',
    'objective': 'binary:logistic',
    'eval_metric': 'logloss',
    'verbosity': 1
})

final_model = xgb.XGBClassifier(**best_params)
final_model.fit(X_train, y_train, 
               eval_set=[(X_test, y_test)], 
               early_stopping_rounds=10)

# Set feature names explicitly
final_model.get_booster().feature_names = X_train.columns.tolist()

#%% Evaluate model
test_preds = final_model.predict(X_test)
accuracy = accuracy_score(y_test, test_preds)
print(f"\nTest Accuracy: {accuracy:.4f}")

#%% Convert to ONNX
initial_type = [('float_input', FloatTensorType([None, X_train.shape[1]]))]
onnx_model = convert_xgboost(
    final_model,
    initial_types=initial_type,
    name='XGBoostAnomalyDetector',
    target_opset=12
)

# Save ONNX model
with open("xgboost_anomaly_detector.onnx", "wb") as f:
    f.write(onnx_model.SerializeToString())

print("Model saved as xgboost_anomaly_detector.onnx")
