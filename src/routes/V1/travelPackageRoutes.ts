import express from "express";
import {
  getAllTravelPackages,
  getTravelPackageById,
  createTravelPackage,
  updateTravelPackage,
  deleteTravelPackage,
} from "../../controller/V1/travelPackage.controller";

const router = express.Router();

// Debug middleware for this router
router.use((req, res, next) => {
  console.log('Travel Package Route:', req.method, req.originalUrl);
  console.log('Request Body:', req.body);
  next();
});

// Base routes
router.get("/packages", getAllTravelPackages);
router.post("/packages", createTravelPackage);

// ID specific routes
router.get("/packages/:id", getTravelPackageById);
router.put("/packages/:id", updateTravelPackage);
router.delete("/packages/:id", deleteTravelPackage);

// Additional routes
router.get("/packages/search", getAllTravelPackages);
router.get("/packages/featured", getAllTravelPackages);

export default router;
