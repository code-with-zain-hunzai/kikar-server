import express from "express";
import {
  getAllDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination,
} from "../../../controller/V1/dashboardControllers/destination.controller";

const router = express.Router();

// Base routes
router.get("/", getAllDestinations);
router.get("/:id", getDestinationById); 
router.post("/", createDestination);
router.put("/:id", updateDestination);
router.delete("/:id", deleteDestination);

export default router;
