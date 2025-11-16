// Dummy controller — replace with ML model integration later.
// Accepts JSON body and returns feasibility output.

export function calculateFeasibility(req, res) {
    try {
        const {
            monthly_bill = 0,
            consumption = 0,
            roof_area = 0,
            location = "default",
            panel_efficiency = 0.18,
            tariff = 8
        } = req.body || {};

        // Basic heuristic placeholder:
        // recommended_kw = min(capacity_by_area, capacity_by_consumption)
        const capacityByArea = Math.max(0.5, (roof_area * 0.12)); // kW per sqft heuristic
        const averageYield = {
            high: 1600,
            medium: 1400,
            low: 1200,
            default: 1400
        }[location] || 1400;

        const requiredKw = Math.min(
            capacityByArea,
            Math.max(0.5, (consumption * 12) / averageYield)
        );

        const estimatedGeneration = Math.round(requiredKw * averageYield); // kWh/year
        const systemCost = Math.round(requiredKw * 60000); // currency
        const annualSavings = Math.round(estimatedGeneration * tariff);
        const monthlySavings = Math.round(annualSavings / 12);
        const payback = annualSavings > 0 ? +(systemCost / annualSavings).toFixed(1) : null;
        const co2_saved = Math.round(estimatedGeneration * 0.82); // kg/year approx

        res.json({
            recommended_kw: +requiredKw.toFixed(2),
            estimated_generation: estimatedGeneration,
            system_cost: systemCost,
            annual_savings: annualSavings,
            monthly_savings: monthlySavings,
            payback,
            co2_saved
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
}
