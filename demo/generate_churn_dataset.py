import os
import pandas as pd
import numpy as np

def generate_sample_dataset():
    np.random.seed(42)
    n_samples = 1000

    temperature = np.random.normal(loc=85.0, scale=4.0, size=n_samples)
    pressure = np.random.normal(loc=430.0, scale=20.0, size=n_samples)
    speed = np.random.normal(loc=1200.0, scale=50.0, size=n_samples)
    humidity = np.random.uniform(low=30.0, high=70.0, size=n_samples)

    # Calculate target yield rate with realistic physics-based relationship
    yield_rate = (
        80.0
        + 0.15 * (temperature - 80.0)
        + 0.02 * (pressure - 400.0)
        - 0.005 * (speed - 1100.0)
        - 0.05 * (humidity - 40.0)
        + np.random.normal(loc=0.0, scale=1.2, size=n_samples)
    )

    df = pd.DataFrame({
        "temperature": np.round(temperature, 2),
        "pressure": np.round(pressure, 2),
        "speed": np.round(speed, 2),
        "humidity": np.round(humidity, 2),
        "yield_rate": np.round(yield_rate, 2)
    })

    out_dir = os.path.dirname(__file__)
    os.makedirs(out_dir, exist_ok=True)
    out_file = os.path.join(out_dir, "churn_data.csv")
    df.to_csv(out_file, index=False)
    print(f"Generated sample manufacturing dataset at: {out_file} ({n_samples} rows)")

if __name__ == "__main__":
    generate_sample_dataset()
