// This file uses dummy logic temporarily
// Replace this with ML model predictions later


export function calculateFeasibility(req, res) {
    const {
        monthly_bill,
        consumption,
        roof_area,
        location,
        panel_efficiency,
        tariff
    } = req.body;


    // Dummy calculations
    const recommended_kw = Math.min(5, roof_area * 0.12);
    const estimated_generation = recommended_kw * 1500;
    const system_cost = recommended_kw * 60000;
    const annual_savings = estimated_generation * tariff;
    const monthly_savings = annual_savings / 12;
    const payback = system_cost / annual_savings;


    res.json({
        recommended_kw,
        estimated_generation,
        system_cost,
        annual_savings,
        monthly_savings,
        payback,
        co2_saved: estimated_generation * 0.82
    });
}