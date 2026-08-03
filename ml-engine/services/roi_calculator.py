def calculate_roi(opt_result: dict, req) -> dict:
    """
    Computes estimated financial impact based on yield gain, monthly volume, and unit value.
    """
    current_out = opt_result.get("current_outcome", 90.0)
    expected_out = opt_result.get("expected_outcome", 95.0)

    # Percentage point improvement
    yield_diff = max(0.0, expected_out - current_out)
    
    monthly_vol = getattr(req, "monthly_volume", 100000)
    unit_val = getattr(req, "unit_value", 75.0)

    monthly_savings = (yield_diff / 100.0) * monthly_vol * unit_val
    annual_savings = monthly_savings * 12.0

    min_savings = round(monthly_savings * 0.85, 2)
    max_savings = round(monthly_savings * 1.15, 2)

    return {
        "monthly_savings": round(monthly_savings, 2),
        "annual_savings": round(annual_savings, 2),
        "monthly_savings_range": f"₹{min_savings/100000:.2f}L–₹{max_savings/100000:.2f}L/month" if min_savings > 100000 else f"₹{min_savings:,.0f}–₹{max_savings:,.0f}/month",
        "yield_delta_pct": round(yield_diff, 2),
        "payback_period_days": 7
    }
