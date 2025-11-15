import express from "express";
import cors from "cors";
import feasibilityRoutes from "./routes/feasibility.js";


const app = express();
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("PowerSage Backend Running...");
});


app.use("/api/feasibility", feasibilityRoutes);


const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));