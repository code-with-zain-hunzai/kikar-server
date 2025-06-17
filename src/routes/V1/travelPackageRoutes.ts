import express from 'express';
import {
  getAllTravelPackages,
  getTravelPackageById,
  createTravelPackage,
  updateTravelPackage,
  deleteTravelPackage,
} from '../../controller/V1/travelPackage.controller';
import { uploadPackage } from '../../middleware/upload.middleware';

const router = express.Router();

// Debug middleware for this router
router.use((req, res, next) => {
  console.log('Travel Package Route:', req.method, req.originalUrl);
  console.log('Request Body:', req.body);
  next();
});

// Base routes
router.get('/packages', getAllTravelPackages);
router.get('/packages/:id', getTravelPackageById);
router.post('/packages', uploadPackage.array('images', 5), createTravelPackage);
router.put('/packages/:id', uploadPackage.array('images', 5), updateTravelPackage);
router.delete('/packages/:id', deleteTravelPackage);

// Additional routes
router.get('/packages/search', getAllTravelPackages);
router.get('/packages/featured', getAllTravelPackages);

export default router;
