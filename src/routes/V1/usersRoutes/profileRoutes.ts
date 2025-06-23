import express from "express";
import { getProfiles, getProfileById } from "../../../controller/V1/userControllers/profileControllers";
import { auth } from "../../../middleware/authMiddleware";

const router = express.Router();

router.get("/", auth, getProfiles);

// Get specific profile by type and ID
router.get("/:type/:id", auth, getProfileById);

export default router;