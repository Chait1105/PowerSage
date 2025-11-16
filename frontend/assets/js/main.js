// main.js handles navigation interactions and calculator front-end fetch.
// Simple utility functions.

function showToast(msg) {
    const t = document.createElement("div");
    t.style.position = "fixed";
    t.style.right = "20px";
    t.style.bottom = "20px";
    t.style.background = "#063447";
    t.style.color = "#fff";
    t.style.padding = "10px 14px";
    t.style.borderRadius = "8px";
    t.style.zIndex = 9999;
    t.innerText = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3000);
}

// Calculator helper: send POST to backend and fill result container
async function postFeasibility(data, resultElement) {
    try {
        resultElement.innerHTML = "<em>Calculating…</em>";
        const res = await fetch("http://localhost:5000/api/feasibility", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error("Server error");
        const json = await res.json();
        resultElement.innerHTML = `
      <div style="font-weight:700;margin-bottom:8px">Estimated Result</div>
      <div>System size: <strong>${json.recommended_kw} kW</strong></div>
      <div>Annual generation: <strong>${json.estimated_generation} kWh</strong></div>
      <div>Estimated system cost: <strong>₹${numberWithCommas(json.system_cost)}</strong></div>
      <div>Monthly savings: <strong>₹${numberWithCommas(json.monthly_savings)}</strong></div>
      <div>Payback: <strong>${json.payback ? json.payback + " years" : "—"}</strong></div>
      <div>CO₂ saved/year: <strong>${numberWithCommas(json.co2_saved)} kg</strong></div>
    `;
    } catch (err) {
        resultElement.innerHTML = "<em>Calculation failed</em>";
        showToast("Calculation failed. Is backend running?");
        console.error(err);
    }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
