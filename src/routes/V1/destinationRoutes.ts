import express from "express";
import { upload } from "../../middleware/upload.middleware";
import {
  getAllDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination,
} from "../../controller/V1/destination.controller";

const router = express.Router();

router.get("/", getAllDestinations);
router.get("/search", getAllDestinations);
router.get("/:id", getDestinationById);
router.post("/", upload.single("image"), createDestination);
router.put("/:id", upload.single("image"), updateDestination);
router.delete("/:id", deleteDestination);

export default router;
