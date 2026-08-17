export const DEMO_GOAL = "Maximize yield above 95% while keeping temperature below 90°C";

export const DEMO_RESULT = {
  job_id: "demo_job_1001",
  recommended_settings: {
    "Temperature": 87.5,
    "Pressure": 450.0
  },
  recommended_range: {
    "Temperature": [86.5, 88.5],
    "Pressure": [440.0, 460.0]
  },
  expected_outcome: 96.8,
  current_outcome: 91.2,
  threshold_met: true,
  confidence_score: 91.5,
  roi: {
    monthly_savings: 185000,
    annual_savings: 2220000,
    monthly_savings_range: "₹1.60L–₹2.17L/month",
    yield_delta_pct: 5.6,
    payback_period_days: 7
  },
  summary: "Modliqer found that Yield Rate can likely be improved by stabilizing Temperature near 87.5°C and Pressure near 450 kPa. The expected Yield Rate is 96.8%, above the 95.0% target. Temperature is the strongest process driver. Run the recommended range for the next 7 batches before updating the official SOP.",
  drivers: [
    {
      name: "Temperature",
      contribution: 44.2,
      description: "Temperature is the strongest driver, contributing 44% of the model decision. Focus first on stabilizing Temperature around the recommended range."
    },
    {
      name: "Pressure",
      contribution: 32.8,
      description: "Pressure is the second strongest factor, contributing 33% of the model decision. Keep Pressure variation low during each batch."
    },
    {
      name: "Line Speed",
      contribution: 15.0,
      description: "Line Speed is the third factor, contributing 15% of the model decision."
    }
  ],
  chart_data: {
    baseline: 91.2,
    projected: 96.8,
    target: 95.0
  },
  units: {
    "Temperature": "°C",
    "Pressure": "kPa"
  },
  advanced: {
    winner_algorithm: "XGBoost Classifier",
    best_hyperparams: {
      n_estimators: 120,
      max_depth: 6,
      learning_rate: 0.05
    },
    metrics: {
      r2: 0.915,
      rmse: 0.042,
      mae: 0.031
    },
    leaderboard: [
      { algorithm: "XGBoost Classifier", cv_score: 0.915, is_winner: true },
      { algorithm: "LightGBM Classifier", cv_score: 0.902, is_winner: false },
      { algorithm: "Random Forest Classifier", cv_score: 0.895, is_winner: false },
      { algorithm: "CatBoost Classifier", cv_score: 0.889, is_winner: false },
      { algorithm: "Gradient Boosting Classifier", cv_score: 0.881, is_winner: false }
    ],
    training_rows: 1500,
    features_used: ["Temperature", "Pressure", "Line Speed"],
    optuna_trials: 30
  },
  is_demo_fallback: false
};

export const TEMPLATE_LIST = [
  {
    id: "temp_yield",
    title: "Yield Optimization",
    goal: "Maximize yield rate above 95% while keeping temperature below 90°C",
    category: "Chemical / Processing"
  },
  {
    id: "temp_defect",
    title: "Defect Minimization",
    goal: "Minimize scrap and defect rate below 1.5%",
    category: "Assembly / Quality"
  }
];
