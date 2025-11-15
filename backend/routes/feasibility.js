import express from "express";
import { calculateFeasibility } from "../controllers/feasibilityController.js";


const router = express.Router();
router.post("/", calculateFeasibility);
export default router;