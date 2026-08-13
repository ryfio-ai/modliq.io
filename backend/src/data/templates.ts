export type ModliqTemplate = {
  id: string;
  category?: 'education' | 'research' | 'manufacturing';
  type:
    | 'goal'
    | 'qc_spec'
    | 'sop_trial'
    | 'control_plan'
    | 'capa'
    | 'workflow'
    | 'assignment'
    | 'lab';
  industry:
    | 'Specialty Chemicals'
    | 'Food Processing'
    | 'Pharma / Nutraceuticals'
    | 'Automotive Components'
    | 'Packaging / Plastics'
    | 'Textiles'
    | 'Biomanufacturing / Fermentation'
    | 'General Manufacturing'
    | 'Education & Academia'
    | 'Applied Research';
  title: string;
  description: string;
  requiredColumns?: string[];
  suggestedGoal?: string;
  payload: Record<string, unknown>;
};

export const MODLIQ_TEMPLATES: ModliqTemplate[] = [
  // ── 1. GOAL TEMPLATES ─────────────────────────────────────────────
  {
    id: 'chemical_yield_max',
    type: 'goal',
    industry: 'Specialty Chemicals',
    title: 'Batch Chemical Reaction Yield Maximization',
    description: 'Maximize batch reaction yield while respecting temperature and pressure thermal limits.',
    requiredColumns: ['yield', 'temperature', 'pressure', 'reaction_time'],
    suggestedGoal: 'Maximize batch yield while keeping reaction temperature below 90°C and pressure below 5 bar.',
    payload: {
      target: 'yield',
      goal_direction: 'maximize',
      threshold: 95.0,
      features: ['temperature', 'pressure', 'reaction_time', 'agitation_speed'],
      constraints: {
        temperature: { max: 90.0 },
        pressure: { max: 5.0 },
      },
    },
  },
  {
    id: 'food_moisture_defect_min',
    type: 'goal',
    industry: 'Food Processing',
    title: 'Baking & Drying Defect Minimization',
    description: 'Minimize scrap defect rate while keeping product moisture within safe quality limits.',
    requiredColumns: ['defect_rate', 'moisture', 'oven_temp', 'belt_speed'],
    suggestedGoal: 'Minimize defect rate while keeping moisture between 8% and 12%.',
    payload: {
      target: 'defect_rate',
      goal_direction: 'minimize',
      threshold: 1.5,
      features: ['moisture', 'oven_temp', 'belt_speed', 'humidity'],
      constraints: {
        moisture: { min: 8.0, max: 12.0 },
      },
    },
  },
  {
    id: 'pharma_assay_max',
    type: 'goal',
    industry: 'Pharma / Nutraceuticals',
    title: 'Tablet Assay & Potency Optimization',
    description: 'Maximize active ingredient assay concentration while enforcing strict pH and temperature bounds.',
    requiredColumns: ['assay_pct', 'ph', 'temp', 'granulation_speed'],
    suggestedGoal: 'Maximize assay result while keeping pH between 6.5 and 7.2 and temperature below 40°C.',
    payload: {
      target: 'assay_pct',
      goal_direction: 'maximize',
      threshold: 99.0,
      features: ['ph', 'temp', 'granulation_speed', 'binder_pct'],
      constraints: {
        ph: { min: 6.5, max: 7.2 },
        temp: { max: 40.0 },
      },
    },
  },
  {
    id: 'automotive_rejection_min',
    type: 'goal',
    industry: 'Automotive Components',
    title: 'Precision Machining Rejection Rate Minimization',
    description: 'Minimize part rejection rate while keeping critical dimensional tolerances within specification.',
    requiredColumns: ['reject_pct', 'dimension_mm', 'tool_wear', 'spindle_speed'],
    suggestedGoal: 'Minimize rejection rate while maintaining dimension within tolerance limits.',
    payload: {
      target: 'reject_pct',
      goal_direction: 'minimize',
      threshold: 0.5,
      features: ['spindle_speed', 'feed_rate', 'coolant_pressure', 'tool_wear'],
      constraints: {
        dimension_mm: { min: 49.95, max: 50.05 },
      },
    },
  },
  {
    id: 'biomfg_fermentation_max',
    type: 'goal',
    industry: 'Biomanufacturing / Fermentation',
    title: 'Bioreactor Fermentation Titre Maximization',
    description: 'Maximize protein fermentation yield while regulating pH and dissolved oxygen saturation.',
    requiredColumns: ['yield_g_l', 'ph', 'dissolved_oxygen', 'agitation_rpm'],
    suggestedGoal: 'Maximize fermentation yield while keeping pH between 6.8 and 7.2 and dissolved oxygen above 30%.',
    payload: {
      target: 'yield_g_l',
      goal_direction: 'maximize',
      threshold: 15.0,
      features: ['ph', 'dissolved_oxygen', 'agitation_rpm', 'glucose_feed_rate'],
      constraints: {
        ph: { min: 6.8, max: 7.2 },
        dissolved_oxygen: { min: 30.0 },
      },
    },
  },

  // ── 2. QC / SPEC TEMPLATES ──────────────────────────────────────────
  {
    id: 'chemical_purity_qc',
    type: 'qc_spec',
    industry: 'Specialty Chemicals',
    title: 'Chemical Product Purity & Viscosity QC Spec',
    description: 'Six Sigma Cpk process capability limits for active chemical concentration and batch viscosity.',
    payload: {
      metrics: [
        { name: 'purity_pct', lsl: 98.5, usl: 100.0, target: 99.2, unit: '%' },
        { name: 'viscosity_cps', lsl: 450, usl: 550, target: 500, unit: 'cP' },
      ],
      sampling_frequency: 'Every 500 kg batch',
    },
  },
  {
    id: 'food_seal_integrity_qc',
    type: 'qc_spec',
    industry: 'Food Processing',
    title: 'Packaging Seal Integrity & Weight Spec',
    description: 'Quality specification limits for package net weight and heat-seal burst strength.',
    payload: {
      metrics: [
        { name: 'net_weight_g', lsl: 495, usl: 510, target: 500, unit: 'g' },
        { name: 'seal_strength_n', lsl: 25.0, usl: 45.0, target: 35.0, unit: 'N' },
      ],
      sampling_frequency: '10 samples per shift',
    },
  },
  {
    id: 'pharma_dissolution_qc',
    type: 'qc_spec',
    industry: 'Pharma / Nutraceuticals',
    title: 'Tablet Dissolution Rate & Hardness Spec',
    description: 'Pharmacopeial quality thresholds for tablet disintegration, hardness, and friability.',
    payload: {
      metrics: [
        { name: 'dissolution_30min', lsl: 85.0, usl: 100.0, target: 95.0, unit: '%' },
        { name: 'hardness_kp', lsl: 7.0, usl: 12.0, target: 9.5, unit: 'kp' },
      ],
      sampling_frequency: 'Composite sample per lot',
    },
  },
  {
    id: 'auto_surface_roughness_qc',
    type: 'qc_spec',
    industry: 'Automotive Components',
    title: 'Crankshaft Bearing Surface Finish Spec',
    description: 'Micro-inch surface roughness (Ra) and micro-hardness limits for engine parts.',
    payload: {
      metrics: [
        { name: 'ra_roughness', lsl: 0.2, usl: 0.8, target: 0.4, unit: 'µm' },
        { name: 'hardness_hrc', lsl: 58.0, usl: 62.0, target: 60.0, unit: 'HRC' },
      ],
      sampling_frequency: '100% CMM inspection',
    },
  },
  {
    id: 'plastics_tensile_qc',
    type: 'qc_spec',
    industry: 'Packaging / Plastics',
    title: 'Extruded Film Tensile & Thickness Spec',
    description: 'Gauge film thickness uniformity and machine-direction elongation at break.',
    payload: {
      metrics: [
        { name: 'film_thickness_microns', lsl: 45.0, usl: 55.0, target: 50.0, unit: 'µm' },
        { name: 'tensile_strength_mpa', lsl: 30.0, usl: 50.0, target: 40.0, unit: 'MPa' },
      ],
      sampling_frequency: 'Continuous laser sensor + manual bench test',
    },
  },

  // ── 3. SOP / TRIAL PLAN TEMPLATES ──────────────────────────────────
  {
    id: 'trial_chemical_7batch',
    type: 'sop_trial',
    industry: 'Specialty Chemicals',
    title: '7-Batch Trial Protocol for Reactor Temperature',
    description: 'Controlled 7-batch trial protocol testing recommended temperature and pressure settings.',
    payload: {
      trial_steps: [
        'Step 1: Calibrate RTD temperature sensors on Reactor 3.',
        'Step 2: Set baseline batch 1 at current parameters (82°C, 4.2 bar).',
        'Step 3: Gradually ramp reaction temperature to 87.5°C over Batches 2-4.',
        'Step 4: Hold pressure steady at 4.5 bar.',
        'Step 5: Pull liquid chromatography samples at T=30min and T=60min.',
        'Step 6: Evaluate yield and byproduct impurity levels.',
        'Step 7: Finalize parameter update if Cpk >= 1.33.',
      ],
    },
  },
  {
    id: 'trial_food_baking_speed',
    type: 'sop_trial',
    industry: 'Food Processing',
    title: 'Oven Speed & Humidity Trial Protocol',
    description: '5-run trial for optimizing oven belt speed and moisture retention.',
    payload: {
      trial_steps: [
        'Verify gas burner calibration and airflow dampers.',
        'Run Run 1: Standard belt speed (4.5 m/min).',
        'Run Run 2: Increase belt speed to 4.8 m/min with +5% steam injection.',
        'Test core product temperature with thermocouple probe.',
        'Log moisture content using NIR rapid moisture analyzer.',
      ],
    },
  },
  {
    id: 'trial_pharma_compression',
    type: 'sop_trial',
    industry: 'Pharma / Nutraceuticals',
    title: 'Tablet Press Compression Force Validation',
    description: 'Design of Experiments (DOE) trial protocol for tablet hardness vs dissolution.',
    payload: {
      trial_steps: [
        'Clean and sanitize rotary tablet press die table.',
        'Set pre-compression force to 2.5 kN.',
        'Vary main compression force across 3 levels: 10 kN, 14 kN, 18 kN.',
        'Collect 20 tablets per setting for weight variation and dissolution.',
      ],
    },
  },
  {
    id: 'trial_biomfg_feed_rate',
    type: 'sop_trial',
    industry: 'Biomanufacturing / Fermentation',
    title: 'Fed-Batch Glucose Feed Rate DOE Trial',
    description: 'Bioreactor feed rate modulation protocol to prevent cell starvation.',
    payload: {
      trial_steps: [
        'Inoculate 50L bioreactor at OD600 = 0.5.',
        'Initiate exponential glucose feed profile at Hour 12.',
        'Monitor dissolved oxygen (DO) spikes for substrate depletion.',
        'Harvest cell broth at Hour 48 and record wet cell weight.',
      ],
    },
  },

  // ── 4. CONTROL PLAN TEMPLATES ───────────────────────────────────────
  {
    id: 'control_plan_automotive',
    type: 'control_plan',
    industry: 'Automotive Components',
    title: 'Machining Line Process Control Plan',
    description: 'IATF 16949 compliant control plan for CNC milling and lathe operations.',
    payload: {
      control_items: [
        { process: 'CNC Milling', characteristic: 'Spindle RPM & Vibration', tool: 'Accelerometer', freq: 'Continuous' },
        { process: 'Coolant Delivery', characteristic: 'Concentration & pH', tool: 'Refractometer', freq: 'Every shift' },
        { process: 'Dimensional Check', characteristic: 'Bore Diameter', tool: 'Air Gauge', freq: '5 parts/hour' },
      ],
    },
  },
  {
    id: 'control_plan_plastics',
    type: 'control_plan',
    industry: 'Packaging / Plastics',
    title: 'Blown Film Extrusion Control Plan',
    description: 'Control plan for resin melt temperature, blow-up ratio, and nip roll tension.',
    payload: {
      control_items: [
        { process: 'Extruder Barrel', characteristic: 'Zone 1-5 Temps', tool: 'TC Array', freq: 'Continuous' },
        { process: 'Die Lip Alignment', characteristic: 'Wall Thickness Variance', tool: 'Gamma Gauge', freq: 'Continuous' },
      ],
    },
  },
  {
    id: 'control_plan_textiles',
    type: 'control_plan',
    industry: 'Textiles',
    title: 'Dyeing & Finishing Control Plan',
    description: 'Control plan for liquor ratio, dye liquor pH, and stenter drying speed.',
    payload: {
      control_items: [
        { process: 'Dye Jet', characteristic: 'Liquor Temperature', tool: 'Inline Probe', freq: 'Continuous' },
        { process: 'Stenter Frame', characteristic: 'Fabric Moisture & Width', tool: 'Opti-Sensor', freq: 'Every roll' },
      ],
    },
  },

  // ── 5. CAPA TEMPLATES ───────────────────────────────────────────────
  {
    id: 'capa_out_of_spec_temp',
    type: 'capa',
    industry: 'Specialty Chemicals',
    title: 'CAPA: Exothermic Reaction Thermal Excursion',
    description: 'Corrective and Preventive Action protocol for reactor temperature spikes exceeding 92°C.',
    payload: {
      problem_statement: 'Batch #B-8842 experienced reactor temperature overshoot of +4.2°C during exothermic addition.',
      containment: 'Quenched batch, quarantined product in Holding Tank T-104, tested impurity profile.',
      root_cause_analysis: 'Cooling jacket control valve hysteresis caused 90s delay in chilled water response.',
      corrective_action: 'Replaced PID control valve actuator and updated loop tuning parameters.',
      preventive_action: 'Added automated secondary cooling override interlock at 89.5°C.',
    },
  },
  {
    id: 'capa_food_foreign_matter',
    type: 'capa',
    industry: 'Food Processing',
    title: 'CAPA: Metal Detector False Rejection Investigation',
    description: 'CAPA for high false rejection rates on packaging Line 2 conveyor.',
    payload: {
      problem_statement: 'Line 2 metal detector triggered 14 false rejections per hour during high-humidity shift.',
      containment: '100% re-inspected rejected pouches using offline X-ray system.',
      root_cause_analysis: 'Electromagnetic noise from adjacent ungrounded VFD drive induced signal drift.',
      corrective_action: 'Installed shielded cable conduit and grounded VFD chassis.',
      preventive_action: 'Added daily ferrite test-wand calibration check to operator start-up log.',
    },
  },
  {
    id: 'capa_pharma_out_of_trend',
    type: 'capa',
    industry: 'Pharma / Nutraceuticals',
    title: 'CAPA: Dissolution Rate Out-of-Trend (OOT)',
    description: 'Investigation protocol for slow tablet dissolution trend in Lot #P-302.',
    payload: {
      problem_statement: 'Tablet Lot P-302 exhibited 86.2% dissolution at 30 min (historical mean 95.4%).',
      containment: 'Placed Lot P-302 on quality hold pending investigation.',
      root_cause_analysis: 'Magnesium stearate lubricant blending time extended from 3 min to 8 min due to timer reset.',
      corrective_action: 'Locked blender timer parameters in PLC recipe manager.',
      preventive_action: 'Updated SOP-PR-402 with mandatory dual-sign-off on blending times.',
    },
  },
  // ── EDUCATION & RESEARCH TEMPLATES ──────────────────────────────────
  {
    id: 'edu_nocode_eda_assignment',
    category: 'education',
    type: 'assignment',
    industry: 'Education & Academia',
    title: 'No-code EDA Assignment',
    description: 'Classroom exercise for profiling dataset distributions, missingness, and correlation matrices.',
    requiredColumns: ['temperature', 'pressure', 'yield'],
    suggestedGoal: 'Analyze variable relationships and identify missing values without code.',
    payload: {
      task: 'Exploratory Data Analysis',
      questions: ['What is the median yield?', 'Which feature has highest correlation with temperature?'],
    },
  },
  {
    id: 'edu_compare_regression_models',
    category: 'education',
    type: 'lab',
    industry: 'Education & Academia',
    title: 'Compare Regression Models Lab',
    description: 'Compare Linear Regression, Random Forest, and XGBoost on R², RMSE, and MAE benchmarks.',
    requiredColumns: ['feature_1', 'feature_2', 'target_continuous'],
    payload: {
      task: 'Model Comparison',
      metrics: ['R2', 'RMSE', 'MAE'],
    },
  },
  {
    id: 'edu_feature_importance_lab',
    category: 'education',
    type: 'lab',
    industry: 'Education & Academia',
    title: 'Feature Importance Lab',
    description: 'Interpret SHAP feature importance rankings and understand key drivers of predictive models.',
    requiredColumns: ['feature_a', 'feature_b', 'target'],
    payload: {
      task: 'SHAP Analysis',
      visual: 'Bar Chart',
    },
  },
  {
    id: 'edu_mfg_quality_analytics_lab',
    category: 'education',
    type: 'lab',
    industry: 'Education & Academia',
    title: 'Manufacturing Quality Analytics Lab',
    description: 'Applied lab analyzing process yield, scrap rates, and equipment operating parameters.',
    requiredColumns: ['batch_id', 'scrap_pct', 'speed'],
    payload: {
      task: 'Applied Quality Engineering',
    },
  },
  {
    id: 'edu_spc_cpk_classroom_demo',
    category: 'education',
    type: 'lab',
    industry: 'Education & Academia',
    title: 'SPC and Cpk Classroom Demo',
    description: 'Interactive classroom demonstration of X-bar control charts, Cpk capability indices, and specification limits.',
    requiredColumns: ['dimension_mm', 'subgroup_id'],
    payload: {
      task: 'Statistical Process Control',
      subgroup_size: 5,
    },
  },
  {
    id: 'edu_data_cleaning_practice',
    category: 'education',
    type: 'assignment',
    industry: 'Education & Academia',
    title: 'Data Cleaning Practice',
    description: 'Practice identifying outliers, duplicate rows, missing fields, and datatype anomalies.',
    requiredColumns: ['raw_value'],
    payload: {
      task: 'Data Hygiene Advisory',
    },
  },
  {
    id: 'res_dataset_exploration',
    category: 'research',
    type: 'assignment',
    industry: 'Applied Research',
    title: 'Research Dataset Exploration',
    description: 'Exploratory data analysis template for academic research papers, thesis chapters, and lab reports.',
    requiredColumns: ['var_x', 'var_y'],
    payload: {
      task: 'Academic Exploratory Research',
    },
  },
];

export function getTemplatesByIndustry(industry?: string): ModliqTemplate[] {
  if (!industry) return MODLIQ_TEMPLATES;
  return MODLIQ_TEMPLATES.filter(
    (t) => t.industry === industry || t.industry === 'General Manufacturing'
  );
}

export function getTemplatesForDatasetColumns(columns: string[]): ModliqTemplate[] {
  const colsLower = columns.map((c) => c.toLowerCase());

  return MODLIQ_TEMPLATES.filter((t) => {
    if (!t.requiredColumns || t.requiredColumns.length === 0) return true;
    return t.requiredColumns.some((reqCol) =>
      colsLower.some((c) => c.includes(reqCol.toLowerCase()))
    );
  });
}
