import express from "express";
import { getProfiles, getProfileById, getOwnProfile, updateOwnProfile, deleteOwnProfile } from "../../../controller/V1/userControllers/profileControllers";
import { auth } from "../../../middleware/authMiddleware";

const router = express.Router();

router.get("/", auth, getProfiles);

router.get("/:type/:id", auth, getProfileById);

router.get("/me", auth, getOwnProfile);
router.put("/me", auth, updateOwnProfile);
router.delete("/me", auth, deleteOwnProfile);

export default router;