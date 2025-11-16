import express from "express";
import cors from "cors";
import feasibilityRoutes from "./routes/feasibility.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/feasibility", feasibilityRoutes);

app.get("/", (req, res) => {
    res.send("PowerSage backend running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
