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
  console.log('Travel Package Route:', req.method, req.path);
  next();
});

// Base routes
router
  .route("/packages")
  .get(getAllTravelPackages)
  .post(createTravelPackage);

// ID specific routes
router
  .route("/packages/:id")
  .get(getTravelPackageById)
  .put(updateTravelPackage)
  .delete(deleteTravelPackage);

// Additional routes
router.get("/packages/search", getAllTravelPackages);
router.get("/packages/featured", getAllTravelPackages);

export default router;
