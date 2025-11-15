async function calculate() {
    const data = {
        monthly_bill: Number(document.getElementById("bill").value),
        consumption: Number(document.getElementById("consumption").value),
        roof_area: Number(document.getElementById("roof").value),
        location: "india",
        panel_efficiency: 0.18,
        tariff: Number(document.getElementById("tariff").value)
    };


    const response = await fetch("http://localhost:5000/api/feasibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });


    const result = await response.json();


    document.getElementById("result").innerHTML = `
<b>System Size:</b> ${result.recommended_kw} kW<br>
<b>Generation:</b> ${result.estimated_generation} kWh/year<br>
<b>Cost:</b> ₹${result.system_cost}<br>
<b>Annual Savings:</b> ₹${result.annual_savings}<br>
<b>Payback:</b> ${result.payback.toFixed(1)} years<br>
<b>CO₂ Saved:</b> ${result.co2_saved} kg/year
`;
}