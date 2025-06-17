import express from "express";
import { uploadDestination } from "../../middleware/upload.middleware";
import {
  getAllDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination,
} from "../../controller/V1/destination.controller";

const router = express.Router();

router.get("/", getAllDestinations);
router.get("/:id", getDestinationById);
router.post("/", uploadDestination.single("image"), createDestination);
router.put("/:id", uploadDestination.single("image"), updateDestination);
router.delete("/:id", deleteDestination);

export default router;
